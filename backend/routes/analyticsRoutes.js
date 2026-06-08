const express = require("express");

const Transaction = require("../models/Transaction");

const authMiddleware = require("../middleware/authMiddleware");

const router =
  express.Router();

router.get(
  "/",
  authMiddleware,
  async (req, res) => {
    try {
      const transactions =
        await Transaction.find({
          user:
            req.user.id,
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

      const balance =
        income - expenses;

      res.json({
        income,
        expenses,
        balance,
        transactions,
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