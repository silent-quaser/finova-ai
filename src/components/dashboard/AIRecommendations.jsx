"use client";

export default function AIRecommendations({
  transactions,
}) {
  const expenses =
    transactions.filter(
      (transaction) =>
        transaction.type ===
        "expense"
    );

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

  const totalExpenses =
    expenses.reduce(
      (
        acc,
        transaction
      ) =>
        acc +
        transaction.amount,
      0
    );

  const recommendations = [];

  if (
    totalExpenses >
    income * 0.8
  ) {
    recommendations.push(
      "Your expenses are high compared to income. Consider reducing non-essential spending."
    );
  }

  const categoryTotals = {};

  expenses.forEach(
    (transaction) => {
      categoryTotals[
        transaction.category
      ] =
        (categoryTotals[
          transaction.category
        ] || 0) +
        transaction.amount;
    }
  );

  let topCategory =
    "";

  let highest = 0;

  Object.entries(
    categoryTotals
  ).forEach(
    ([category, amount]) => {
      if (amount > highest) {
        highest = amount;

        topCategory =
          category;
      }
    }
  );

  if (topCategory) {
    recommendations.push(
      `Your highest spending category is formatCurrency(topCategory}.`
    );
  }

  if (
    income - totalExpenses >
    income * 0.3
  ) {
    recommendations.push(
      "Your savings rate is strong this month."
    );
  }

  if (
    recommendations.length === 0
  ) {
    recommendations.push(
      "Your financial activity looks stable. Continue monitoring your expenses regularly."
    );
  }

  return (
    <div className="glass rounded-3xl p-8">
      
      <div className="mb-6">
        
        <h2 className="text-3xl font-bold mb-2">
          AI Recommendations
        </h2>

        <p className="text-zinc-400">
          Personalized financial insights based on your transaction behavior
        </p>

      </div>

      <div className="space-y-4">
        
        {recommendations.map(
          (
            recommendation,
            index
          ) => (
            <div
              key={index}
              className="bg-cyan-500/10 border border-cyan-500/20 rounded-2xl p-5"
            >
              <p className="text-zinc-200">
                {recommendation}
              </p>
            </div>
          )
        )}

      </div>

    </div>
  );
}