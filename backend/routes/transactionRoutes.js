const express = require("express");

const Transaction = require("../models/Transaction");

const authMiddleware = require("../middleware/authMiddleware");

const sendEmail = require("../utils/sendEmail");

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
        }).sort({
          createdAt: -1,
        });

      res.json(
        transactions
      );
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

router.post(
  "/",
  authMiddleware,
  async (req, res) => {
    try {
      const {
        type,
        category,
        amount,
        description,
      } = req.body;

      const transaction =
        await Transaction.create({
          user:
            req.user.id,
          type,
          category,
          amount,
          description,
        });

      const allTransactions =
        await Transaction.find({
          user:
            req.user.id,
        });

      const income =
        allTransactions
          .filter(
            (item) =>
              item.type ===
              "income"
          )
          .reduce(
            (
              acc,
              item
            ) =>
              acc +
              item.amount,
            0
          );

      const expenses =
        allTransactions
          .filter(
            (item) =>
              item.type ===
              "expense"
          )
          .reduce(
            (
              acc,
              item
            ) =>
              acc +
              item.amount,
            0
          );

      const savings =
        income - expenses;

      console.log(
        "Income:",
        income
      );

      console.log(
        "Expenses:",
        expenses
      );

      console.log(
        "Ratio:",
        expenses / income
      );

      if (
        income > 0 &&
        expenses / income > 0.8
      ) {
        try {
          await sendEmail({
            to:
              process.env.EMAIL_USER,

            subject:
              "Finova AI Financial Alert",

            text: `
High Expense Warning

Your financial activity indicates elevated spending.

Income: $${income}
Expenses: $${expenses}
Savings: $${savings}

Finova AI recommends reducing discretionary expenses to improve financial stability.
            `,
          });
        } catch (error) {
          console.log(
            "Production email skipped"
          );
        }
      }

      if (savings < 0) {
        try {
          await sendEmail({
            to:
              process.env.EMAIL_USER,

            subject:
              "Finova AI Savings Alert",

            text: `
Negative Savings Detected

Your expenses currently exceed your income.

Income: $${income}
Expenses: $${expenses}
Savings: $${savings}

Immediate budget optimization is recommended.
            `,
          });
        } catch (error) {
          console.log(
            "Production email skipped"
          );
        }
      }

      res.status(201).json(
        transaction
      );
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

router.put(
  "/:id",
  authMiddleware,
  async (req, res) => {
    try {
      const transaction =
        await Transaction.findById(
          req.params.id
        );

      if (!transaction) {
        return res
          .status(404)
          .json({
            message:
              "Transaction not found",
          });
      }

      if (
        transaction.user.toString() !==
        req.user.id
      ) {
        return res
          .status(401)
          .json({
            message:
              "Not authorized",
          });
      }

      const updatedTransaction =
        await Transaction.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        );

      res.json(
        updatedTransaction
      );
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

router.delete(
  "/:id",
  authMiddleware,
  async (req, res) => {
    try {
      const transaction =
        await Transaction.findById(
          req.params.id
        );

      if (!transaction) {
        return res
          .status(404)
          .json({
            message:
              "Transaction not found",
          });
      }

      if (
        transaction.user.toString() !==
        req.user.id
      ) {
        return res
          .status(401)
          .json({
            message:
              "Not authorized",
          });
      }

      await transaction.deleteOne();

      res.json({
        message:
          "Transaction deleted",
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