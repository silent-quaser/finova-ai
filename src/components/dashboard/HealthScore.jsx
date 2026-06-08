"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

import api from "../../services/api";

export default function HealthScore() {
  const [data, setData] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchHealthScore();
  }, []);

  async function fetchHealthScore() {
    try {
      const token =
        localStorage.getItem(
          "token"
        );

      const response =
        await api.get(
          "/health",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      setData(
        response.data
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="glass rounded-[32px] p-8 border border-white/10">
        <p className="text-zinc-400">
          Loading health score...
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="glass rounded-[32px] p-8 border border-white/10">
        <p className="text-red-400">
          Failed to load health score
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="glass rounded-[32px] p-8 border border-white/10 h-full"
    >
      
      <div className="mb-8">
        
        <h2 className="text-4xl font-bold mb-2">
          Financial Health Score
        </h2>

        <p className="text-zinc-400 text-lg">
          AI-powered financial stability analysis
        </p>

      </div>

      <div className="flex flex-col items-center">
        
        <div className="relative w-72 h-72 flex items-center justify-center mb-10">
          
          <div className="absolute inset-0 rounded-full border-[18px] border-cyan-500/20"></div>

          <div className="text-center">
            
            <h1 className="text-8xl font-bold text-cyan-400 leading-none">
              {data.score}
            </h1>

            <p className="text-zinc-400 text-3xl mt-4">
              /100
            </p>

          </div>

        </div>

        <div className="w-full">
          
          <h3 className="text-3xl font-bold mb-6 text-center">
            Financial Status
          </h3>

          <div className="grid grid-cols-2 gap-5">
            
            <div className="glass rounded-3xl p-6 border border-white/10 text-center">
              
              <p className="text-zinc-400 text-lg mb-4">
                Total Income
              </p>

              <h2 className="text-4xl font-bold text-green-400">
                ${data.income}
              </h2>

            </div>

            <div className="glass rounded-3xl p-6 border border-white/10 text-center">
              
              <p className="text-zinc-400 text-lg mb-4">
                Total Expenses
              </p>

              <h2 className="text-4xl font-bold text-red-400">
                ${data.expenses}
              </h2>

            </div>

          </div>

          <div className="mt-10">
            
            <div className="flex items-center justify-between mb-4">
              
              <span className="text-zinc-400 text-xl">
                Health Status
              </span>

              <span className="text-cyan-400 font-bold text-2xl">
                {data.status}
              </span>

            </div>

            <div className="w-full h-4 bg-white/5 rounded-full overflow-hidden">
              
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                style={{
                  width: `${data.score}%`,
                }}
              ></div>

            </div>

          </div>

        </div>

      </div>

    </motion.div>
  );
}