"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import {
  motion,
} from "framer-motion";

const COLORS = [
  "#06b6d4",
  "#3b82f6",
  "#8b5cf6",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
];

export default function SpendingBreakdown({
  transactions,
}) {
  const categoryTotals = {};

  transactions.forEach(
    (transaction) => {
      if (
        transaction.type ===
        "expense"
      ) {
        if (
          !categoryTotals[
            transaction
              .category
          ]
        ) {
          categoryTotals[
            transaction
              .category
          ] = 0;
        }

        categoryTotals[
          transaction
            .category
        ] +=
          transaction.amount;
      }
    }
  );

  const chartData =
    Object.entries(
      categoryTotals
    ).map(
      ([name, value]) => ({
        name,
        value,
      })
    );

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
      className="glass rounded-[32px] p-8"
    >
      
      <div className="mb-8">
        
        <h2 className="text-3xl font-bold mb-2">
          Spending Breakdown
        </h2>

        <p className="text-zinc-400">
          Expense distribution by category
        </p>

      </div>

      <div className="w-full h-[420px]">
        
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          
          <PieChart>
            
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={90}
              outerRadius={140}
              paddingAngle={4}
              dataKey="value"
            >
              
              {chartData.map(
                (
                  entry,
                  index
                ) => (
                  <Cell
                    key={`cell-formatCurrency(index}`}
                    fill={
                      COLORS[
                        index %
                          COLORS.length
                      ]
                    }
                  />
                )
              )}

            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </motion.div>
  );
}