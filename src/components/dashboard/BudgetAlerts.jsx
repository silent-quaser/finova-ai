"use client";

import {
  AlertTriangle,
  ShieldAlert,
  TrendingDown,
} from "lucide-react";

export default function BudgetAlerts({
  transactions,
}) {
  const income = transactions
    .filter(
      (transaction) =>
        transaction.type ===
        "income"
    )
    .reduce(
      (acc, transaction) =>
        acc + transaction.amount,
      0
    );

  const expenses = transactions
    .filter(
      (transaction) =>
        transaction.type ===
        "expense"
    )
    .reduce(
      (acc, transaction) =>
        acc + transaction.amount,
      0
    );

  const savings =
    income - expenses;

  const expenseRatio =
    income > 0
      ? (
          (expenses / income) *
          100
        ).toFixed(1)
      : 0;

  const alerts = [];

  if (
    Number(expenseRatio) >
    80
  ) {
    alerts.push({
      icon:
        AlertTriangle,
      title:
        "High Expense Ratio",
      description:
        "Your expenses exceed 80% of your income. Spending reduction is recommended.",
      color:
        "text-red-400",
    });
  }

  if (savings < 0) {
    alerts.push({
      icon:
        TrendingDown,
      title:
        "Negative Savings",
      description:
        "Your expenses currently exceed your income.",
      color:
        "text-red-400",
    });
  }

  if (
    savings > 0 &&
    Number(expenseRatio) <
      60
  ) {
    alerts.push({
      icon:
        ShieldAlert,
      title:
        "Healthy Financial Status",
      description:
        "Your savings and expense ratio currently indicate stable financial health.",
      color:
        "text-green-400",
    });
  }

  return (
    <div className="space-y-6">

      {alerts.map(
        (
          alert,
          index
        ) => {
          const Icon =
            alert.icon;

          return (
            <div
              key={index}
              className="glass rounded-3xl p-6 border border-white/10 flex items-start gap-5"
            >

              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center">

                <Icon
                  size={28}
                  className={
                    alert.color
                  }
                />

              </div>

              <div>

                <h3 className="text-2xl font-bold mb-2">
                  {
                    alert.title
                  }
                </h3>

                <p className="text-zinc-400 text-lg">
                  {
                    alert.description
                  }
                </p>

              </div>

            </div>
          );
        }
      )}

    </div>
  );
}