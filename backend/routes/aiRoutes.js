const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const router =
  express.Router();

router.post(
  "/chat",
  authMiddleware,
  async (req, res) => {
    try {
      const { message } =
        req.body;

      const reply = `
Finova AI Assistant

You said:
"${message}"

AI financial analysis is currently running in demo mode.
`;

      res.json({
        reply,
      });
    } catch (error) {
      console.log(error);

      res
        .status(500)
        .json({
          message:
            "AI server error",
        });
    }
  }
);

router.get(
  "/insights",
  authMiddleware,
  async (req, res) => {
    try {
      const insights = `
Executive Financial Summary

• Your spending activity is currently stable.

• Savings performance remains moderate.

• Expense optimization opportunities were detected in recurring categories.

• Maintaining a positive savings rate above 20% is recommended.

• AI confidence score: 87%.
`;

      res.json({
        insights,
      });
    } catch (error) {
      console.log(error);

      res
        .status(500)
        .json({
          message:
            "AI insights error",
        });
    }
  }
);

module.exports = router;