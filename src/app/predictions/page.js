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
  TrendingDown,
  AlertTriangle,
} from "lucide-react";

export default function PredictionsPage() {
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

  const predictedExpenses =
    (
      expenses * 1.12
    ).toFixed(2);

  const predictedSavings =
    (
      income -
      predictedExpenses
    ).toFixed(2);

  const savingsTrend =
    predictedSavings > 0;

  return (
    <DashboardLayout>

      <PageWrapper>

        <div className="space-y-8">

          <div>

            <h1 className="text-5xl font-bold mb-2">
              AI Financial Predictions
            </h1>

            <p className="text-zinc-400 text-lg">
              Predictive analytics and future financial forecasting
            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            <div className="glass rounded-3xl p-8 border border-white/10">

              <p className="text-zinc-400 mb-3 text-lg">
                Predicted Expenses
              </p>

              <h2 className="text-5xl font-bold text-red-400">
                ${predictedExpenses}
              </h2>

              <p className="text-zinc-500 mt-3">
                Estimated next-month spending
              </p>

            </div>

            <div className="glass rounded-3xl p-8 border border-white/10">

              <p className="text-zinc-400 mb-3 text-lg">
                Predicted Savings
              </p>

              <h2 className="text-5xl font-bold text-cyan-400">
                ${predictedSavings}
              </h2>

              <p className="text-zinc-500 mt-3">
                Estimated future savings
              </p>

            </div>

            <div className="glass rounded-3xl p-8 border border-white/10">

              <p className="text-zinc-400 mb-3 text-lg">
                Financial Trend
              </p>

              <div className="flex items-center gap-3">

                {savingsTrend ? (
                  <TrendingUp
                    size={42}
                    className="text-green-400"
                  />
                ) : (
                  <TrendingDown
                    size={42}
                    className="text-red-400"
                  />
                )}

                <h2 className="text-4xl font-bold">
                  {savingsTrend
                    ? "Positive"
                    : "Risk"}
                </h2>

              </div>

            </div>

            <div className="glass rounded-3xl p-8 border border-white/10">

              <p className="text-zinc-400 mb-3 text-lg">
                Risk Level
              </p>

              <div className="flex items-center gap-3">

                <AlertTriangle
                  size={42}
                  className={
                    predictedSavings >
                    0
                      ? "text-yellow-400"
                      : "text-red-400"
                  }
                />

                <h2 className="text-4xl font-bold">
                  {predictedSavings >
                  0
                    ? "Moderate"
                    : "High"}
                </h2>

              </div>

            </div>

          </div>

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
                  AI Forecast
                </h2>

                <p className="text-zinc-400 text-lg">
                  Predictive financial intelligence
                </p>

              </div>

            </div>

            <p className="text-2xl text-zinc-200 leading-relaxed">

              {predictedSavings >
              0
                ? `Based on your current transaction patterns, your finances are expected to remain stable next month with estimated savings of $${predictedSavings}. Maintaining controlled spending habits can further improve long-term stability.`
                : `Your current spending trend indicates elevated financial risk. If expense growth continues, savings may become negative next month. Reducing discretionary spending is strongly recommended.`}

            </p>

          </div>

        </div>

      </PageWrapper>

    </DashboardLayout>
  );
}