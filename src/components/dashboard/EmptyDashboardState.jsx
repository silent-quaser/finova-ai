"use client";

import {
  PlusCircle,
  Sparkles,
  Target,
} from "lucide-react";

import {
  motion,
} from "framer-motion";

import { useRouter } from "next/navigation";

export default function EmptyDashboardState() {
  const router = useRouter();

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
      className="relative overflow-hidden rounded-[32px] border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-transparent p-10"
    >
      
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-400/10 blur-3xl rounded-full" />

      <div className="relative z-10 max-w-3xl">
        
        <div className="w-20 h-20 rounded-[28px] bg-cyan-500/15 flex items-center justify-center mb-8">
          
          <Sparkles
            size={40}
            className="text-cyan-400"
          />

        </div>

        <h2 className="text-5xl font-bold mb-5 leading-tight">
          Welcome to{" "}
          <span className="gradient-text">
            Finova AI
          </span>
        </h2>

        <p className="text-zinc-300 text-lg leading-relaxed mb-10">
          Start tracking your financial activity to unlock AI-powered analytics, savings insights, smart recommendations, and executive financial intelligence.
        </p>

        <div className="flex flex-wrap gap-5">
          
          <button
            onClick={() =>
              router.push(
                "/transactions"
              )
            }
            className="finova-button px-8 py-4 rounded-2xl font-semibold flex items-center gap-3"
          >
            
            <PlusCircle size={22} />

            Add Transactions

          </button>

          <button
            onClick={() =>
              router.push(
                "/goals"
              )
            }
            className="glass px-8 py-4 rounded-2xl font-semibold flex items-center gap-3 border border-white/10 hover:border-cyan-500/30 transition-all"
          >
            
            <Target size={22} />

            Create Goals

          </button>

        </div>

      </div>

    </motion.div>
  );
}