"use client";

import {
  motion,
} from "framer-motion";

export default function ExecutiveSummary({
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

  let summary =
    "";

  if (income === 0) {
    summary =
      "No financial activity detected yet. Start adding transactions to generate AI-powered insights and recommendations.";
  } else if (
    savings > 0
  ) {
    summary =
      `Your financial health looks stable. You earned $${income} while spending $${expenses}, leaving positive savings of $${savings}. Your spending remains under control and your current savings trend is healthy.`;
  } else {
    summary =
      `Your expenses currently exceed your income. You earned $${income} but spent $${expenses}, resulting in a negative balance of $${Math.abs(
        savings
      )}. Consider reducing unnecessary expenses and improving savings discipline.`;
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
      className="glass rounded-[32px] p-8 border border-white/10"
    >
      
      <h2 className="text-4xl font-bold mb-3">
        Financial Summary
      </h2>

      <p className="text-zinc-400 text-lg mb-8">
        AI-powered monthly financial intelligence and recommendations
      </p>

      <div className="glass rounded-3xl p-8 border border-cyan-500/10">
        
        <p className="text-xl leading-relaxed text-zinc-200">
          {summary}
        </p>

      </div>

    </motion.div>
  );
}