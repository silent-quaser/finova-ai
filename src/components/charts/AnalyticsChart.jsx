"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

export default function AnalyticsChart({
  transactions,
}) {
  const monthlyData = {};

  transactions.forEach(
    (transaction) => {
      const date =
        new Date(
          transaction.createdAt
        );

      const month =
        date.toLocaleString(
          "default",
          {
            month: "short",
          }
        );

      if (!monthlyData[month]) {
        monthlyData[month] = {
          income: 0,
          expenses: 0,
        };
      }

      if (
        transaction.type ===
        "income"
      ) {
        monthlyData[month]
          .income +=
          transaction.amount;
      }

      if (
        transaction.type ===
        "expense"
      ) {
        monthlyData[month]
          .expenses +=
          transaction.amount;
      }
    }
  );

  const chartData =
    Object.entries(
      monthlyData
    ).map(
      ([month, values]) => ({
        month,
        income:
          values.income,
        expenses:
          values.expenses,
        savings:
          values.income -
          values.expenses,
      })
    );

  return (
    <div className="glass rounded-3xl p-8">
      
      <div className="mb-8">
        
        <h2 className="text-3xl font-bold mb-2">
          Financial Analytics
        </h2>

        <p className="text-zinc-400">
          Income, expense, and savings trends
        </p>

      </div>

      <div className="w-full h-[380px]">
        
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          
          <LineChart
            data={chartData}
          >
            
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.08)"
            />

            <XAxis
              dataKey="month"
              stroke="#94a3b8"
            />

            <YAxis
              stroke="#94a3b8"
            />

            <Tooltip />

            <Legend />

            <Line
              type="monotone"
              dataKey="income"
              stroke="#22c55e"
              strokeWidth={3}
              dot={{ r: 4 }}
            />

            <Line
              type="monotone"
              dataKey="expenses"
              stroke="#ef4444"
              strokeWidth={3}
              dot={{ r: 4 }}
            />

            <Line
              type="monotone"
              dataKey="savings"
              stroke="#06b6d4"
              strokeWidth={3}
              dot={{ r: 4 }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}