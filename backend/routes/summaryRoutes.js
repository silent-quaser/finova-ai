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
        summary:
          "Your financial condition is stable. Income exceeds expenses and your savings trend is improving steadily.",
      });
    } catch (error) {
      console.log(error);

      res
        .status(500)
        .json({
          message:
            "Failed to generate summary",
        });
    }
  }
);

module.exports = router;