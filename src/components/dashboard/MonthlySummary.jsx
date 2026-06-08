"use client";

import {
  motion,
} from "framer-motion";

import {
  TrendingUp,
  DollarSign,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function MonthlySummary() {
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
      className="relative overflow-hidden glass rounded-[36px] p-10 border border-cyan-500/10"
    >
      
      <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full"></div>

      <div className="relative z-10">
        
        <div className="flex items-center gap-4 mb-8">
          
          <div className="w-16 h-16 rounded-3xl bg-cyan-500/15 flex items-center justify-center border border-cyan-500/20">
            
            <Sparkles
              size={30}
              className="text-cyan-400"
            />

          </div>

          <div>
            
            <h2 className="text-5xl font-bold">
              Monthly Financial Summary
            </h2>

            <p className="text-zinc-400 text-lg mt-1">
              AI-generated financial intelligence overview
            </p>

          </div>

        </div>

        <div className="glass rounded-3xl p-8 border border-white/10 mb-8">
          
          <p className="text-2xl leading-relaxed text-zinc-200">
            Your financial activity remains healthy this month.
            Income continues to exceed expenses, and your
            overall savings trend is stable. Maintaining
            controlled spending and consistent savings habits
            will further improve your long-term financial growth.
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="glass rounded-3xl p-6 border border-green-500/10 hover:border-green-500/30 transition-all">
            
            <div className="flex items-center justify-between mb-5">
              
              <h3 className="text-xl font-semibold">
                Income Growth
              </h3>

              <TrendingUp
                className="text-green-400"
                size={28}
              />

            </div>

            <h1 className="text-5xl font-bold text-green-400 mb-2">
              +18%
            </h1>

            <p className="text-zinc-400">
              Compared to last month
            </p>

          </div>

          <div className="glass rounded-3xl p-6 border border-cyan-500/10 hover:border-cyan-500/30 transition-all">
            
            <div className="flex items-center justify-between mb-5">
              
              <h3 className="text-xl font-semibold">
                Savings Rate
              </h3>

              <DollarSign
                className="text-cyan-400"
                size={28}
              />

            </div>

            <h1 className="text-5xl font-bold text-cyan-400 mb-2">
              62%
            </h1>

            <p className="text-zinc-400">
              Healthy savings ratio
            </p>

          </div>

          <div className="glass rounded-3xl p-6 border border-purple-500/10 hover:border-purple-500/30 transition-all">
            
            <div className="flex items-center justify-between mb-5">
              
              <h3 className="text-xl font-semibold">
                Financial Stability
              </h3>

              <ShieldCheck
                className="text-purple-400"
                size={28}
              />

            </div>

            <h1 className="text-5xl font-bold text-purple-400 mb-2">
              Good
            </h1>

            <p className="text-zinc-400">
              AI evaluated status
            </p>

          </div>

        </div>

      </div>

    </motion.div>
  );
}