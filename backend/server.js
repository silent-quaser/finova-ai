const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

require("dotenv").config();

const authRoutes =
  require("./routes/authRoutes");

const transactionRoutes =
  require("./routes/transactionRoutes");

const analyticsRoutes =
  require("./routes/analyticsRoutes");

const aiRoutes =
  require("./routes/aiRoutes");

const budgetRoutes =
  require("./routes/budgetRoutes");

const reportRoutes =
  require("./routes/reportRoutes");

const ocrRoutes =
  require("./routes/ocrRoutes");

const chatRoutes =
  require("./routes/chatRoutes");

const summaryRoutes =
  require("./routes/summaryRoutes");

const healthRoutes =
  require("./routes/healthRoutes");

const goalRoutes =
  require("./routes/goalRoutes");

const insightRoutes =
  require("./routes/insightRoutes");

  const openaiRoutes =
  require("./routes/openaiRoutes");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://finova-met08secf-silent-quasers-projects.vercel.app",
    ],
    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE",
      "OPTIONS",
    ],
    credentials: true,
  })
);

app.use(express.json());

mongoose
  .connect(
    process.env.MONGO_URI
  )
  .then(() => {
    console.log(
      "MongoDB Connected"
    );
  })
  .catch((error) => {
    console.log(error);
  });

app.get("/", (req, res) => {
  res.send(
    "Finova AI Backend Running"
  );
});

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/transactions",
  transactionRoutes
);

app.use(
  "/api/analytics",
  analyticsRoutes
);

app.use(
  "/api/ai",
  aiRoutes
);

app.use(
  "/api/budgets",
  budgetRoutes
);

app.use(
  "/api/reports",
  reportRoutes
);

app.use(
  "/api/ocr",
  ocrRoutes
);

app.use(
  "/api/chat",
  chatRoutes
);

app.use(
  "/api/summary",
  summaryRoutes
);

app.use(
  "/api/health",
  healthRoutes
);

app.use(
  "/api/goals",
  goalRoutes
);

app.use(
  "/api/insights",
  insightRoutes
);

app.use(
  "/api/openai",
  openaiRoutes
);

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});