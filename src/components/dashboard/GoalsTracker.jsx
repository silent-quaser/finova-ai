"use client";

import {
  motion,
} from "framer-motion";

import {
  Target,
  TrendingUp,
} from "lucide-react";

export default function GoalsTracker() {
  const goals = [
    {
      title:
        "Emergency Fund",
      current: 6200,
      target: 10000,
      color:
        "from-cyan-500 to-blue-500",
    },
    {
      title:
        "Vacation Savings",
      current: 2400,
      target: 5000,
      color:
        "from-green-500 to-emerald-500",
    },
    {
      title:
        "Investment Portfolio",
      current: 8500,
      target: 15000,
      color:
        "from-purple-500 to-pink-500",
    },
  ];

  return (
    <div className="glass rounded-[32px] p-8">
      
      <div className="flex items-center justify-between mb-8">
        
        <div>
          
          <h2 className="text-3xl font-bold mb-2">
            Financial Goals
          </h2>

          <p className="text-zinc-400">
            AI-powered savings progress tracking
          </p>

        </div>

        <div className="w-14 h-14 rounded-2xl bg-cyan-500/15 flex items-center justify-center">
          
          <Target
            size={28}
            className="text-cyan-400"
          />

        </div>

      </div>

      <div className="space-y-6">
        
        {goals.map(
          (
            goal,
            index
          ) => {
            const percentage =
              (
                (goal.current /
                  goal.target) *
                100
              ).toFixed(0);

            return (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay:
                    index * 0.1,
                }}
                whileHover={{
                  scale: 1.01,
                }}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                
                <div className="flex items-center justify-between mb-5">
                  
                  <div>
                    
                    <h3 className="text-xl font-semibold mb-1">
                      {
                        goal.title
                      }
                    </h3>

                    <p className="text-zinc-400 text-sm">
                      ${goal.current.toLocaleString()} saved of ${goal.target.toLocaleString()}
                    </p>

                  </div>

                  <div className="flex items-center gap-2 text-cyan-400">
                    
                    <TrendingUp
                      size={18}
                    />

                    <span className="font-semibold">
                      {
                        percentage
                      }
                      %
                    </span>

                  </div>

                </div>

                <div className="w-full h-4 rounded-full bg-white/5 overflow-hidden">
                  
                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    animate={{
                      width: `${percentage}%`,
                    }}
                    transition={{
                      duration: 1,
                    }}
                    className={`h-full rounded-full bg-gradient-to-r ${goal.color}`}
                  />

                </div>

              </motion.div>
            );
          }
        )}

      </div>

    </div>
  );
}