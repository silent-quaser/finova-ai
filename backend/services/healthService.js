const Transaction =
  require(
    "../models/Transaction"
  );

async function calculateHealthScore(
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

  if (income === 0) {
    return {
      score: 0,
      status:
        "No financial data",
    };
  }

  const savingsRatio =
    (income - expenses) /
    income;

  let score = Math.max(
    0,
    Math.min(
      100,
      Math.round(
        savingsRatio * 100
      )
    )
  );

  let status = "Poor";

  if (score >= 80) {
    status = "Excellent";
  } else if (
    score >= 60
  ) {
    status = "Good";
  } else if (
    score >= 40
  ) {
    status = "Average";
  }

  return {
    score,
    status,
    income,
    expenses,
  };
}

module.exports = {
  calculateHealthScore,
};