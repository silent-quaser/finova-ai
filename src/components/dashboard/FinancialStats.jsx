"use client";

import {
  motion,
} from "framer-motion";

export default function FinancialStats({
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

  const total =
    income + expenses;

  const expenseRatio =
    total > 0
      ? Math.round(
          (expenses /
            total) *
            100
        )
      : 0;

  const savingsRatio =
    total > 0
      ? 100 -
        expenseRatio
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
      className="glass rounded-[32px] p-8 border border-white/10 h-full"
    >
      
      <div className="mb-8">
        
        <h2 className="text-4xl font-bold mb-2">
          Financial Performance
        </h2>

        <p className="text-zinc-400 text-lg">
          Live financial efficiency indicators
        </p>

      </div>

      <div className="space-y-10">
        
        <div>
          
          <div className="flex items-center justify-between mb-4">
            
            <span className="text-2xl font-semibold">
              Expense Ratio
            </span>

            <span className="text-red-400 text-2xl font-bold">
              {expenseRatio}%
            </span>

          </div>

          <div className="w-full h-6 bg-white/5 rounded-full overflow-hidden">
            
            <div
              className="h-full bg-red-400 rounded-full"
              style={{
                width: `${expenseRatio}%`,
              }}
            ></div>

          </div>

        </div>

        <div>
          
          <div className="flex items-center justify-between mb-4">
            
            <span className="text-2xl font-semibold">
              Savings Ratio
            </span>

            <span className="text-green-400 text-2xl font-bold">
              {savingsRatio}%
            </span>

          </div>

          <div className="w-full h-6 bg-white/5 rounded-full overflow-hidden">
            
            <div
              className="h-full bg-green-400 rounded-full"
              style={{
                width: `${savingsRatio}%`,
              }}
            ></div>

          </div>

        </div>

      </div>

    </motion.div>
  );
}