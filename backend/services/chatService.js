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

async function generateChatResponse(
  userId,
  userMessage
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

    const model =
      genAI.getGenerativeModel(
        {
          model:
            "gemini-1.5-flash",
        }
      );

    const prompt = `
You are Finova AI, an advanced financial assistant.

User Financial Data:
- Total Income: $formatCurrency(income}
- Total Expenses: $formatCurrency(expenses}
- Total Savings: $formatCurrency(savings}
- Transactions Count: formatCurrency(transactions.length}

User Question:
formatCurrency(userMessage}

Provide:
- concise financial advice
- actionable recommendations
- budgeting insights
- savings guidance
- investment awareness if relevant

Keep responses professional, modern, and concise.
`;

    const result =
      await model.generateContent(
        prompt
      );

    return (
      result.response.text()
    );
  } catch (error) {
    console.log(
      "FULL GEMINI ERROR:",
      error
    );

    return "Finova AI is temporarily unavailable.";
  }
}

module.exports = {
  generateChatResponse,
};