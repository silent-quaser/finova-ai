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
        summary: {
          totalIncome: 12000,
          totalExpenses: 8500,
          savings: 3500,
        },

        monthlyReport: [
          {
            month: "January",
            income: 4000,
            expenses: 2800,
          },
          {
            month: "February",
            income: 4200,
            expenses: 3000,
          },
          {
            month: "March",
            income: 3800,
            expenses: 2700,
          },
        ],
      });
    } catch (error) {
      console.log(error);

      res
        .status(500)
        .json({
          message:
            "Server error",
        });
    }
  }
);

module.exports = router;