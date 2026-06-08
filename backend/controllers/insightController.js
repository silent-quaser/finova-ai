const {
  generateInsights,
} = require(
  "../services/insightService"
);

async function getAIInsights(
  req,
  res
) {
  try {
    const insights =
      await generateInsights(
        req.user._id
      );

    res.json({
      insights,
    });
  } catch (error) {
    res.status(500).json({
      message:
        "Failed to generate AI insights",
    });
  }
}

module.exports = {
  getAIInsights,
};