const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const router =
  express.Router();

router.post(
  "/",
  authMiddleware,
  async (req, res) => {
    try {
      const { message } =
        req.body;

      const response = `
Finova AI Chat Assistant

Message received:
"${message}"

This AI assistant is currently running in stable demo mode.
`;

      res.json({
        response,
      });
    } catch (error) {
      console.log(error);

      res
        .status(500)
        .json({
          message:
            "Chat server error",
        });
    }
  }
);

module.exports = router;