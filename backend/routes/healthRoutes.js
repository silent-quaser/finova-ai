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
        score: 78,
        status: "Good",
        income: 4900,
        expenses: 3200,
      });
    } catch (error) {
      console.log(error);

      res
        .status(500)
        .json({
          message:
            "Failed to load health score",
        });
    }
  }
);

module.exports = router;