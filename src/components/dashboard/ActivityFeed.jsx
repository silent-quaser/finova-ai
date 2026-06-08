"use client";

import {
  ArrowDownRight,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

export default function ActivityFeed({
  transactions = [],
}) {
  return (
    <div className="glass rounded-[32px] p-8 border border-white/10">

      <div className="flex items-center justify-between mb-8">

        <div>
          
          <h2 className="text-5xl font-bold mb-2">
            Activity Feed
          </h2>

          <p className="text-zinc-400 text-xl">
            Real-time financial activity
          </p>

        </div>

        <div className="w-20 h-20 rounded-3xl bg-cyan-500/15 flex items-center justify-center">
          
          <Sparkles
            size={36}
            className="text-cyan-400"
          />

        </div>

      </div>

      <div className="space-y-6 max-h-[700px] overflow-y-auto pr-2">

        {transactions.length ===
        0 ? (
          <div className="text-center py-20 text-zinc-500 text-xl">
            No transactions yet
          </div>
        ) : (
          transactions.map(
            (
              transaction,
              index
            ) => (
              <div
                key={index}
                className="glass rounded-3xl p-6 border border-white/10 flex items-center justify-between"
              >

                <div className="flex items-center gap-5">

                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                      transaction.type ===
                      "income"
                        ? "bg-green-500/15"
                        : "bg-red-500/15"
                    }`}
                  >

                    {transaction.type ===
                    "income" ? (
                      <ArrowUpRight
                        size={28}
                        className="text-green-400"
                      />
                    ) : (
                      <ArrowDownRight
                        size={28}
                        className="text-red-400"
                      />
                    )}

                  </div>

                  <div>

                    <h3 className="text-2xl font-bold capitalize">
                      {
                        transaction.category
                      }
                    </h3>

                    <p className="text-zinc-400 text-lg">
                      {new Date(
                        transaction.date
                      ).toLocaleDateString()}
                    </p>

                  </div>

                </div>

                <div className="text-right">

                  <h2
                    className={`text-4xl font-bold ${
                      transaction.type ===
                      "income"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {transaction.type ===
                    "income"
                      ? "+"
                      : "-"}
                    $
                    {
                      transaction.amount
                    }
                  </h2>

                  <p className="text-zinc-400 text-lg capitalize">
                    {
                      transaction.type
                    }
                  </p>

                </div>

              </div>
            )
          )
        )}

      </div>

    </div>
  );
}