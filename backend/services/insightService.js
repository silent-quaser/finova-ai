const {
  GoogleGenerativeAI,
} = require(
  "@google/generative-ai"
);

const Transaction =
  require("../models/Transaction");

const genAI =
  new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
  );

async function generateInsights(
  userId
) {
  try {
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

    const categories =
      {};

    transactions.forEach(
      (transaction) => {
        if (
          transaction.type ===
          "expense"
        ) {
          if (
            !categories[
              transaction
                .category
            ]
          ) {
            categories[
              transaction
                .category
            ] = 0;
          }

          categories[
            transaction
              .category
          ] +=
            transaction.amount;
        }
      }
    );

    const model =
      genAI.getGenerativeModel(
        {
          model:
            "gemini-1.5-flash",
        }
      );

    const prompt = `
You are Finova AI, an advanced fintech intelligence engine.

Analyze this financial data:

Income: $formatCurrency(income}
Expenses: $formatCurrency(expenses}
Savings: $formatCurrency(savings}

Expense Categories:
formatCurrency(JSON.stringify(
  categories,
  null,
  2
)}

Generate:
1. Financial health insight
2. Spending behavior analysis
3. Savings recommendation
4. Smart financial improvement tip

Keep the response concise, modern, professional, and easy to read.
`;

    const result =
      await model.generateContent(
        prompt
      );

    return (
      result.response.text()
    );
  } catch (error) {
    console.log(error);

    return "Unable to generate AI insights right now.";
  }
}

module.exports = {
  generateInsights,
};