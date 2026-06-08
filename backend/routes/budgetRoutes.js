const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const router =
  express.Router();

let budgets = [];

router.get(
  "/",
  authMiddleware,
  async (req, res) => {
    try {
      res.json(budgets);
    } catch (error) {
      console.log(error);

      res
        .status(500)
        .json({
          message:
            "Failed to fetch budgets",
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
        category,
        limit,
      } = req.body;

      const newBudget = {
        _id: Date.now(),
        category,
        limit,
      };

      budgets.push(
        newBudget
      );

      res.status(201).json(
        newBudget
      );
    } catch (error) {
      console.log(error);

      res
        .status(500)
        .json({
          message:
            "Failed to create budget",
        });
    }
  }
);

module.exports = router;