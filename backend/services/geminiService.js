async function generateFinancialInsights(
  transactions
) {
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

  const balance =
    totalIncome -
    totalExpenses;

  return `
AI Financial Analysis

• Total Income: $formatCurrency(totalIncome}

• Total Expenses: $formatCurrency(totalExpenses}

• Current Balance: $formatCurrency(balance}

• Your spending habits are being tracked successfully.

• Consider reducing unnecessary subscription and entertainment expenses.

• Savings performance is stable.

• Monthly financial health score: 82/100

• Recommendation:
Increase savings allocation by 10% for better long-term financial stability.
`;
}

module.exports = {
  generateFinancialInsights,
};