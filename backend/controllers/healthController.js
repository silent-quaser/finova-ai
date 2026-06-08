const {
  calculateHealthScore,
} = require(
  "../services/healthService"
);

async function getHealthScore(
  req,
  res
) {
  try {
    const result =
      await calculateHealthScore(
        req.user._id
      );

    res.json({
      success: true,
      health: result,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = {
  getHealthScore,
};