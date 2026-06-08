const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const router =
  express.Router();

router.get(
  "/",
  authMiddleware,
  async (req, res) => {
    try {
      res.json({
        insights: [
          "Your monthly savings increased by 12%.",

          "Food expenses are higher than last month.",

          "Investment contributions remain consistent.",

          "Recurring subscriptions detected in entertainment category.",
        ],
      });
    } catch (error) {
      console.log(error);

      res
        .status(500)
        .json({
          message:
            "Failed to fetch insights",
        });
    }
  }
);

module.exports = router;