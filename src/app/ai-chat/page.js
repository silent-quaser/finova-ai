"use client";

import {
  useEffect,
  useState,
} from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import PageWrapper from "../../components/ui/PageWrapper";

import api from "../../services/api";

import {
  Bot,
  Send,
} from "lucide-react";

export default function AIChatPage() {
  const [message, setMessage] =
    useState("");

  const [transactions, setTransactions] =
    useState([]);

  const [chat, setChat] =
    useState([
      {
        type: "bot",
        text:
          "Hello! I'm Finova AI. I can analyze your spending, savings, budgeting, and financial habits. Ask me anything.",
      },
    ]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  async function fetchTransactions() {
    try {
      const token =
        localStorage.getItem(
          "token"
        );

      const response =
        await api.get(
          "/transactions",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      setTransactions(
        response.data
      );
    } catch (error) {
      console.log(error);
    }
  }

  const income = transactions
    .filter(
      (transaction) =>
        transaction.type ===
        "income"
    )
    .reduce(
      (acc, transaction) =>
        acc + transaction.amount,
      0
    );

  const expenses = transactions
    .filter(
      (transaction) =>
        transaction.type ===
        "expense"
    )
    .reduce(
      (acc, transaction) =>
        acc + transaction.amount,
      0
    );

  const savings =
    income - expenses;

  const savingsRate =
    income > 0
      ? (
          (savings / income) *
          100
        ).toFixed(1)
      : 0;

  function generateAIResponse(
    input
  ) {
    const text =
      input.toLowerCase();

    if (
      text.includes("summary")
    ) {
      return `You currently have total income of $${income}, expenses of $${expenses}, and savings of $${savings}. Your current savings rate is ${savingsRate}%.`;
    }

    if (
      text.includes("saving") ||
      text.includes("save")
    ) {
      if (
        Number(
          savingsRate
        ) >= 40
      ) {
        return `Excellent savings discipline detected. Your savings rate is currently ${savingsRate}%, which is financially strong.`;
      }

      return `Your current savings rate is ${savingsRate}%. Reducing recurring expenses and increasing monthly contributions can improve long-term stability.`;
    }

    if (
      text.includes("expense") ||
      text.includes("spending")
    ) {
      if (
        expenses > income
      ) {
        return "Your expenses currently exceed your income. Reducing discretionary spending should be a priority.";
      }

      return `Your total tracked expenses are $${expenses}. Monitoring high-frequency purchases can improve savings efficiency.`;
    }

    if (
      text.includes("income")
    ) {
      return `Your current total income is $${income}. Increasing income streams through freelancing, internships, or side projects can accelerate financial growth.`;
    }

    if (
      text.includes("budget")
    ) {
      return "A practical budgeting strategy is the 50-30-20 rule: 50% needs, 30% wants, and 20% savings/investments.";
    }

    if (
      text.includes("investment") ||
      text.includes("invest")
    ) {
      return "Long-term diversified investing generally provides better financial stability compared to short-term speculative strategies.";
    }

    if (
      text.includes("debt")
    ) {
      return "Focus on paying high-interest debt first while maintaining minimum payments on other obligations.";
    }

    if (
      text.includes("financial health")
    ) {
      if (
        Number(
          savingsRate
        ) >= 50
      ) {
        return "Your financial health appears excellent based on current savings and spending behavior.";
      }

      if (
        Number(
          savingsRate
        ) >= 25
      ) {
        return "Your financial health is moderately stable, though increasing savings would strengthen long-term security.";
      }

      return "Your financial health needs improvement. Lowering unnecessary expenses can significantly improve stability.";
    }

    if (
      text.includes("hello") ||
      text.includes("hi")
    ) {
      return "Hello! Ask me anything related to budgeting, expenses, savings, investing, or financial planning.";
    }

    return "Based on your current financial activity, maintaining disciplined spending and improving savings consistency will strengthen your overall financial stability.";
  }

  async function sendMessage() {
  if (!message.trim())
    return;

  const updatedChat = [
    ...chat,
    {
      type: "user",
      text: message,
    },
  ];

  setChat(updatedChat);

  const currentMessage =
    message;

  setMessage("");

  try {
    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/openai/chat`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            message:
              currentMessage,
          }),
        }
      );

    const data =
      await response.json();

    setChat([
      ...updatedChat,
      {
        type: "bot",
        text:
          data.response,
      },
    ]);
  } catch (error) {
    console.log(error);

    setChat([
      ...updatedChat,
      {
        type: "bot",
        text:
          "OpenAI request failed. Please try again.",
      },
    ]);
  }
}

  return (
    <DashboardLayout>

      <PageWrapper>

        <div className="space-y-8">

          <div>

            <h1 className="text-5xl font-bold mb-2">
              AI Financial Chat
            </h1>

            <p className="text-zinc-400 text-lg">
              Chat with your AI-powered financial assistant
            </p>

          </div>

          <div className="glass rounded-[32px] p-8 border border-white/10 h-[700px] flex flex-col">

            <div className="flex-1 overflow-y-auto space-y-6 mb-8 pr-2">

              {chat.map(
                (
                  item,
                  index
                ) => (
                  <div
                    key={index}
                    className={`flex ${
                      item.type ===
                      "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >

                    <div
                      className={`max-w-[75%] rounded-3xl px-6 py-5 ${
                        item.type ===
                        "user"
                          ? "bg-cyan-500 text-white"
                          : "glass border border-white/10"
                      }`}
                    >

                      {item.type ===
                        "bot" && (
                        <div className="flex items-center gap-3 mb-3">

                          <Bot
                            size={22}
                            className="text-cyan-400"
                          />

                          <span className="font-semibold text-cyan-400">
                            Finova AI
                          </span>

                        </div>
                      )}

                      <p className="text-lg leading-relaxed">
                        {item.text}
                      </p>

                    </div>

                  </div>
                )
              )}

            </div>

            <div className="flex gap-4">

              <input
                type="text"
                value={message}
                onChange={(e) =>
                  setMessage(
                    e.target.value
                  )
                }
                onKeyDown={(e) => {
                  if (
                    e.key ===
                    "Enter"
                  ) {
                    sendMessage();
                  }
                }}
                placeholder="Ask about savings, investments, budgeting..."
                className="flex-1 glass rounded-2xl px-6 py-5 border border-white/10 bg-transparent outline-none text-lg"
              />

              <button
                onClick={
                  sendMessage
                }
                className="finova-button px-8 rounded-2xl flex items-center justify-center"
              >

                <Send size={24} />

              </button>

            </div>

          </div>

        </div>

      </PageWrapper>

    </DashboardLayout>
  );
}