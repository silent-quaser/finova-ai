const express = require("express");

const OpenAI =
  require("openai");

const authMiddleware =
  require("../middleware/authMiddleware");

const {
  getFinancialResponse,
} = require(
  "../aiKnowledge/financialKnowledge"
);

const router =
  express.Router();

const openai =
  new OpenAI({
    apiKey:
      process.env.OPENAI_API_KEY,
  });

router.post(
  "/chat",
  authMiddleware,
  async (req, res) => {
    try {
      const { message } =
        req.body;

      const completion =
        await openai.chat.completions.create(
          {
            model:
              "gpt-3.5-turbo",

            messages: [
              {
                role:
                  "system",

                content:
                  "You are Finova AI, a professional financial assistant helping users with budgeting, saving, investing, and financial planning.",
              },

              {
                role:
                  "user",

                content:
                  message,
              },
            ],
          }
        );

      res.json({
        response:
          completion
            .choices[0]
            .message.content,
      });
    } catch (error) {
      console.log(
        "OpenAI failed, using Finova AI Knowledge Engine"
      );

      res.json({
        response:
          getFinancialResponse(
            req.body.message
          ),
      });
    }
  }
);

module.exports =
  router;