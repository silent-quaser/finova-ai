const Transaction = require(
  "../models/Transaction"
);

async function getAnalytics(
  req,
  res
) {
  try {
    const transactions =
      await Transaction.find({
        user: req.user._id,
      });

    const totalIncome =
      transactions
        .filter(
          (transaction) =>
            transaction.type ===
            "income"
        )
        .reduce(
          (acc, transaction) =>
            acc +
            transaction.amount,
          0
        );

    const totalExpenses =
      transactions
        .filter(
          (transaction) =>
            transaction.type ===
            "expense"
        )
        .reduce(
          (acc, transaction) =>
            acc +
            transaction.amount,
          0
        );

    const balance =
      totalIncome -
      totalExpenses;

    const categoryBreakdown =
      {};

    transactions.forEach(
      (transaction) => {
        if (
          !categoryBreakdown[
            transaction.category
          ]
        ) {
          categoryBreakdown[
            transaction.category
          ] = 0;
        }

        categoryBreakdown[
          transaction.category
        ] += transaction.amount;
      }
    );

    res.json({
      balance,
      totalIncome,
      totalExpenses,
      transactionCount:
        transactions.length,
      categoryBreakdown,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = {
  getAnalytics,
};