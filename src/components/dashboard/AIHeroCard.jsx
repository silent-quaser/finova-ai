"use client";

import {
  Sparkles,
  TrendingUp,
} from "lucide-react";

import {
  motion,
} from "framer-motion";

export default function AIHeroCard({
  transactions,
}) {
  const income =
    transactions
      .filter(
        (transaction) =>
          transaction.type ===
          "income"
      )
      .reduce(
        (
          acc,
          transaction
        ) =>
          acc +
          transaction.amount,
        0
      );

  const expenses =
    transactions
      .filter(
        (transaction) =>
          transaction.type ===
          "expense"
      )
      .reduce(
        (
          acc,
          transaction
        ) =>
          acc +
          transaction.amount,
        0
      );

  const savings =
    income - expenses;

  const savingsRate =
    income > 0
      ? (
          (savings / income) *
          100
        ).toFixed(1)
      : 0;

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
      transition={{
        duration: 0.5,
      }}
      className="relative overflow-hidden rounded-[32px] p-8 border border-cyan-500/20 bg-gradient-to-br from-cyan-500/15 via-blue-500/10 to-transparent"
    >
      
      <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-400/10 blur-3xl rounded-full" />

      <div className="relative z-10">
        
        <div className="flex items-center gap-3 mb-6">
          
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/15 flex items-center justify-center">
            
            <Sparkles
              size={28}
              className="text-cyan-400"
            />

          </div>

          <div>
            
            <h2 className="text-3xl font-bold">
              AI Financial Insight
            </h2>

            <p className="text-zinc-300">
              Personalized intelligence summary
            </p>

          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="glass rounded-2xl p-5">
            
            <p className="text-zinc-400 text-sm mb-2">
              Savings Rate
            </p>

            <h3 className="text-3xl font-bold text-cyan-400">
              {savingsRate}%
            </h3>

          </div>

          <div className="glass rounded-2xl p-5">
            
            <p className="text-zinc-400 text-sm mb-2">
              Net Savings
            </p>

            <h3 className="text-3xl font-bold text-green-400">
              $
              {savings.toLocaleString()}
            </h3>

          </div>

          <div className="glass rounded-2xl p-5">
            
            <div className="flex items-center gap-2 mb-2">
              
              <TrendingUp
                size={18}
                className="text-cyan-400"
              />

              <p className="text-zinc-400 text-sm">
                AI Recommendation
              </p>

            </div>

            <p className="text-sm leading-relaxed text-zinc-200">
              {savingsRate >
              30
                ? "Excellent financial performance. Your savings trend is strong."
                : "Consider reducing discretionary expenses to improve savings growth."}
            </p>

          </div>

        </div>

      </div>

    </motion.div>
  );
}