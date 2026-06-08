const Transaction = require(
  "../models/Transaction"
);

const {
  generateFinancialInsights,
} = require(
  "../services/geminiService"
);

async function getAIInsights(
  req,
  res
) {
  try {
    const transactions =
      await Transaction.find({
        user: req.user._id,
      });

    if (
      transactions.length === 0
    ) {
      return res.status(400).json({
        message:
          "Add transactions first to generate AI insights",
      });
    }

    const insights =
      await generateFinancialInsights(
        transactions
      );

    res.json({
      insights,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = {
  getAIInsights,
};