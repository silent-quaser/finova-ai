const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const router =
  express.Router();

router.get(
  "/",
  authMiddleware,
  async (req, res) => {
    try {
      res.json([
        {
          title:
            "Emergency Fund",
          current: 6200,
          target: 10000,
        },
        {
          title:
            "Vacation Savings",
          current: 2400,
          target: 5000,
        },
      ]);
    } catch (error) {
      console.log(error);

      res
        .status(500)
        .json({
          message:
            "Failed to fetch goals",
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
        title,
        current,
        target,
      } = req.body;

      res.status(201).json({
        title,
        current,
        target,
      });
    } catch (error) {
      console.log(error);

      res
        .status(500)
        .json({
          message:
            "Failed to create goal",
        });
    }
  }
);

module.exports = router;