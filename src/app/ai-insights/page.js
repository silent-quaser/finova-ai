"use client";

import {
  useEffect,
  useState,
} from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import PageWrapper from "../../components/ui/PageWrapper";

import api from "../../services/api";

import {
  Brain,
  TrendingUp,
  AlertTriangle,
  ShieldCheck,
  Wallet,
  BadgeDollarSign,
} from "lucide-react";

export default function AIInsightsPage() {
  const [transactions, setTransactions] =
    useState([]);

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

  const expenseRatio =
    income > 0
      ? (
          (expenses / income) *
          100
        ).toFixed(1)
      : 0;

  const expenseCategories =
    transactions.reduce(
      (acc, transaction) => {
        if (
          transaction.type ===
          "expense"
        ) {
          acc[
            transaction.category
          ] =
            (acc[
              transaction.category
            ] || 0) +
            transaction.amount;
        }

        return acc;
      },
      {}
    );

  const highestExpenseCategory =
    Object.keys(
      expenseCategories
    ).length > 0
      ? Object.keys(
          expenseCategories
        ).reduce((a, b) =>
          expenseCategories[a] >
          expenseCategories[b]
            ? a
            : b
        )
      : "N/A";

  const insights = [
    {
      title:
        savingsRate >= 40
          ? "Strong Savings"
          : "Low Savings",
      description:
        savingsRate >= 40
          ? `Your savings rate is ${savingsRate}% which indicates healthy financial discipline.`
          : `Your savings rate is only ${savingsRate}%. Consider reducing unnecessary spending.`,
      icon:
        savingsRate >= 40
          ? ShieldCheck
          : AlertTriangle,
      color:
        savingsRate >= 40
          ? "text-green-400"
          : "text-red-400",
    },

    {
      title:
        "Top Spending Category",
      description: `Most of your expenses are concentrated in ${highestExpenseCategory}. Monitoring this category can improve financial stability.`,
      icon: Wallet,
      color:
        "text-yellow-400",
    },

    {
      title:
        expenseRatio > 70
          ? "High Expense Ratio"
          : "Balanced Spending",
      description:
        expenseRatio > 70
          ? `Your expense ratio is ${expenseRatio}%, which may create long-term financial pressure.`
          : `Your expense ratio remains balanced at ${expenseRatio}%.`,
      icon:
        expenseRatio > 70
          ? AlertTriangle
          : TrendingUp,
      color:
        expenseRatio > 70
          ? "text-red-400"
          : "text-cyan-400",
    },
  ];

  function generateRecommendation() {
    if (
      income === 0 &&
      expenses === 0
    ) {
      return "No financial activity detected yet. Start adding transactions to unlock personalized AI insights.";
    }

    if (
      savingsRate >= 50
    ) {
      return "Your financial condition is currently very healthy. Maintaining consistent savings and controlled spending habits will help accelerate long-term wealth growth and investment opportunities.";
    }

    if (
      expenseRatio > 70
    ) {
      return "Your current expenses consume a large portion of your income. Reducing high-frequency discretionary spending and improving budget allocation can significantly improve financial stability.";
    }

    return "Your finances are moderately stable. Increasing monthly savings contributions while maintaining controlled expenses can improve your financial health score substantially over time.";
  }

  return (
    <DashboardLayout>

      <PageWrapper>

        <div className="space-y-8">

          <div>

            <h1 className="text-5xl font-bold mb-2">
              AI Insights
            </h1>

            <p className="text-zinc-400 text-lg">
              AI-powered financial intelligence and recommendations
            </p>

          </div>

          {/* STATS */}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            <div className="glass rounded-3xl p-8 border border-white/10">

              <p className="text-zinc-400 mb-3 text-lg">
                Savings
              </p>

              <h2 className="text-5xl font-bold text-cyan-400">
                ${savings}
              </h2>

            </div>

            <div className="glass rounded-3xl p-8 border border-white/10">

              <p className="text-zinc-400 mb-3 text-lg">
                Savings Rate
              </p>

              <h2 className="text-5xl font-bold text-green-400">
                {savingsRate}%
              </h2>

            </div>

            <div className="glass rounded-3xl p-8 border border-white/10">

              <p className="text-zinc-400 mb-3 text-lg">
                Expense Ratio
              </p>

              <h2 className="text-5xl font-bold text-red-400">
                {expenseRatio}%
              </h2>

            </div>

            <div className="glass rounded-3xl p-8 border border-white/10">

              <p className="text-zinc-400 mb-3 text-lg">
                Top Expense
              </p>

              <h2 className="text-4xl font-bold text-yellow-400 capitalize">
                {
                  highestExpenseCategory
                }
              </h2>

            </div>

          </div>

          {/* INSIGHTS */}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {insights.map(
              (
                insight,
                index
              ) => {
                const Icon =
                  insight.icon;

                return (
                  <div
                    key={index}
                    className="glass rounded-[32px] p-8 border border-white/10"
                  >

                    <div className="w-16 h-16 rounded-3xl bg-cyan-500/10 flex items-center justify-center mb-6">

                      <Icon
                        size={30}
                        className={
                          insight.color
                        }
                      />

                    </div>

                    <h2 className="text-3xl font-bold mb-4">
                      {
                        insight.title
                      }
                    </h2>

                    <p className="text-zinc-400 text-lg leading-relaxed">
                      {
                        insight.description
                      }
                    </p>

                  </div>
                );
              }
            )}

          </div>

          {/* AI RECOMMENDATION */}

          <div className="glass rounded-[32px] p-10 border border-white/10">

            <div className="flex items-center gap-5 mb-8">

              <div className="w-20 h-20 rounded-3xl bg-cyan-500/10 flex items-center justify-center">

                <Brain
                  size={40}
                  className="text-cyan-400"
                />

              </div>

              <div>

                <h2 className="text-4xl font-bold">
                  AI Recommendation
                </h2>

                <p className="text-zinc-400 text-lg">
                  Personalized financial strategy
                </p>

              </div>

            </div>

            <p className="text-2xl text-zinc-200 leading-relaxed">
              {
                generateRecommendation()
              }
            </p>

          </div>

          {/* EXTRA INSIGHT */}

          <div className="glass rounded-[32px] p-10 border border-white/10">

            <div className="flex items-center gap-5 mb-8">

              <div className="w-20 h-20 rounded-3xl bg-green-500/10 flex items-center justify-center">

                <BadgeDollarSign
                  size={40}
                  className="text-green-400"
                />

              </div>

              <div>

                <h2 className="text-4xl font-bold">
                  AI Financial Health
                </h2>

                <p className="text-zinc-400 text-lg">
                  Smart financial evaluation
                </p>

              </div>

            </div>

            <p className="text-2xl text-zinc-200 leading-relaxed">
              {savingsRate >= 50
                ? "Excellent financial health detected. Your current savings habits indicate strong long-term stability."
                : savingsRate >= 25
                ? "Moderate financial health detected. Improving monthly savings can significantly strengthen stability."
                : "Financial health requires improvement. Reducing non-essential expenses can improve your future stability."}
            </p>

          </div>

        </div>

      </PageWrapper>

    </DashboardLayout>
  );
}