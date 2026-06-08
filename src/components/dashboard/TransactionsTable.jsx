"use client";

import {
  motion,
} from "framer-motion";

export default function TransactionsTable({
  transactions,
}) {
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
      
      <div className="flex items-center justify-between mb-8">
        
        <div>
          
          <h2 className="text-4xl font-bold mb-2">
            Recent Transactions
          </h2>

          <p className="text-zinc-400 text-lg">
            Track your latest financial activity
          </p>

        </div>

      </div>

      <div className="space-y-4">
        
        {transactions.length ===
        0 ? (
          <div className="text-center py-16 text-zinc-400">
            
            No transactions found

          </div>
        ) : (
          transactions.map(
            (
              transaction,
              index
            ) => (
              <motion.div
                key={
                  transaction._id ||
                  index
                }
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="glass rounded-3xl p-6 border border-white/5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 hover:border-cyan-500/20 transition-all"
              >
                
                <div className="flex items-center gap-5">
                  
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold ${
                      transaction.type ===
                      "income"
                        ? "bg-green-500/15 text-green-400"
                        : "bg-red-500/15 text-red-400"
                    }`}
                  >
                    
                    {transaction.type ===
                    "income"
                      ? "+"
                      : "-"}

                  </div>

                  <div>
                    
                    <h3 className="text-2xl font-semibold capitalize">
                      {
                        transaction.category
                      }
                    </h3>

                    <p className="text-zinc-400 capitalize">
                      {
                        transaction.type
                      }
                    </p>

                  </div>

                </div>

                <div className="flex flex-col lg:items-end">
                  
                  <h2
                    className={`text-3xl font-bold ${
                      transaction.type ===
                      "income"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    
                    $
                    {
                      transaction.amount
                    }

                  </h2>

                  <p className="text-zinc-400">
                    
                    {new Date(
                      transaction.createdAt
                    ).toLocaleDateString()}

                  </p>

                </div>

              </motion.div>
            )
          )
        )}

      </div>

    </motion.div>
  );
}