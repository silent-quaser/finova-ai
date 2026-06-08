const Transaction =
  require(
    "../models/Transaction"
  );

async function generateMonthlySummary(
  userId
) {
  const transactions =
    await Transaction.find({
      user: userId,
    });

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

  const categoryTotals = {};

  transactions.forEach(
    (transaction) => {
      if (
        transaction.type ===
        "expense"
      ) {
        categoryTotals[
          transaction.category
        ] =
          (categoryTotals[
            transaction.category
          ] || 0) +
          transaction.amount;
      }
    }
  );

  let topCategory =
    "Unknown";

  let topAmount = 0;

  Object.entries(
    categoryTotals
  ).forEach(
    ([category, amount]) => {
      if (amount > topAmount) {
        topAmount = amount;

        topCategory =
          category;
      }
    }
  );

  let recommendation =
    "Your finances are stable. Continue monitoring spending regularly.";

  if (
    expenses > income * 0.8
  ) {
    recommendation =
      "Your expenses are relatively high compared to income. Consider reducing non-essential spending.";
  }

  if (
    topCategory === "Food"
  ) {
    recommendation =
      "Dining and food expenses are your largest category. Reducing restaurant spending could improve savings.";
  }

  return {
    income,
    expenses,
    savings,
    topCategory,
    recommendation,
  };
}

module.exports = {
  generateMonthlySummary,
};