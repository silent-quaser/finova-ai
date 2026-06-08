"use client";

import {
  motion,
} from "framer-motion";

export default function SummaryCards({
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

  const balance =
    income - expenses;

  const cards = [
    {
      title: "Income",
      value: income,
      color:
        "text-green-400",
      glow:
        "shadow-green-500/20",
    },
    {
      title: "Expenses",
      value: expenses,
      color:
        "text-red-400",
      glow:
        "shadow-red-500/20",
    },
    {
      title: "Balance",
      value: balance,
      color:
        balance >= 0
          ? "text-cyan-400"
          : "text-red-400",
      glow:
        "shadow-cyan-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      
      {cards.map(
        (
          card,
          index
        ) => (
          <motion.div
            key={card.title}
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
              y: -6,
              scale: 1.02,
            }}
            className={`glass rounded-3xl p-7 overflow-hidden shadow-2xl ${card.glow} transition-all`}
          >
            
            <p className="text-zinc-400 text-sm mb-3 uppercase tracking-wider">
              {card.title}
            </p>

            <h2
              className={`text-3xl xl:text-4xl font-bold break-words ${card.color}`}
            >
              $
              {card.value.toLocaleString()}
            </h2>

          </motion.div>
        )
      )}

    </div>
  );
}