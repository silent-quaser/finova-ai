const {
  generateMonthlySummary,
} = require(
  "../services/summaryService"
);

async function getMonthlySummary(
  req,
  res
) {
  try {
    const summary =
      await generateMonthlySummary(
        req.user._id
      );

    res.json({
      success: true,
      summary,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = {
  getMonthlySummary,
};