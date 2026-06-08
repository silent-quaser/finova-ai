"use client";

import {
  useEffect,
  useState,
} from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import PageWrapper from "../../components/ui/PageWrapper";

import AnalyticsChart from "../../components/charts/AnalyticsChart";

import api from "../../services/api";

import toast from "react-hot-toast";

export default function AnalyticsPage() {
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

  const balance =
    income - expenses;

  const savingsRate =
    income > 0
      ? (
          (balance / income) *
          100
        ).toFixed(1)
      : 0;

  const expenseRate =
    income > 0
      ? (
          (expenses / income) *
          100
        ).toFixed(1)
      : 0;

  const topCategory =
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
      topCategory
    ).length > 0
      ? Object.keys(
          topCategory
        ).reduce((a, b) =>
          topCategory[a] >
          topCategory[b]
            ? a
            : b
        )
      : "N/A";

  function downloadReport() {
    const report = `
FINOVA AI ANALYTICS REPORT

Total Balance: $${balance}
Income: $${income}
Expenses: $${expenses}
Transactions: ${transactions.length}

Savings Rate: ${savingsRate}%
Expense Ratio: ${expenseRate}%

Top Expense Category:
${highestExpenseCategory}

Financial Analysis:
${
  balance >= 0
    ? "Your finances are stable and savings remain positive."
    : "Your expenses currently exceed income."
}
`;

    const blob = new Blob(
      [report],
      {
        type: "text/plain",
      }
    );

    const url =
      window.URL.createObjectURL(blob);

    const a =
      document.createElement("a");

    a.href = url;

    a.download =
      "finova-report.txt";

    a.click();

    toast.success(
      "Financial report downloaded"
    );
  }

  return (
    <DashboardLayout>
      
      <PageWrapper>

        <div className="space-y-8">

          <div>

            <h1 className="text-5xl font-bold mb-2">
              Financial Analytics
            </h1>

            <p className="text-zinc-400 text-lg">
              Advanced AI-powered financial insights and trends
            </p>

          </div>

          <button
            onClick={
              downloadReport
            }
            className="finova-button px-8 py-4 rounded-2xl font-semibold"
          >
            Download Financial Report
          </button>

          {/* MAIN CARDS */}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            <div className="glass rounded-3xl p-8 border border-white/10">

              <p className="text-zinc-400 mb-3 text-lg">
                Total Balance
              </p>

              <h2
                className={`text-5xl font-bold ${
                  balance >= 0
                    ? "text-cyan-400"
                    : "text-red-400"
                }`}
              >
                ${balance}
              </h2>

              <p className="text-zinc-500 mt-3">
                Current financial balance
              </p>

            </div>

            <div className="glass rounded-3xl p-8 border border-white/10">

              <p className="text-zinc-400 mb-3 text-lg">
                Income
              </p>

              <h2 className="text-5xl font-bold text-green-400">
                ${income}
              </h2>

              <p className="text-zinc-500 mt-3">
                Total tracked income
              </p>

            </div>

            <div className="glass rounded-3xl p-8 border border-white/10">

              <p className="text-zinc-400 mb-3 text-lg">
                Expenses
              </p>

              <h2 className="text-5xl font-bold text-red-400">
                ${expenses}
              </h2>

              <p className="text-zinc-500 mt-3">
                Total tracked expenses
              </p>

            </div>

            <div className="glass rounded-3xl p-8 border border-white/10">

              <p className="text-zinc-400 mb-3 text-lg">
                Transactions
              </p>

              <h2 className="text-5xl font-bold text-white">
                {
                  transactions.length
                }
              </h2>

              <p className="text-zinc-500 mt-3">
                Tracked financial activities
              </p>

            </div>

          </div>

          {/* SECOND ROW */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="glass rounded-3xl p-8 border border-white/10">

              <p className="text-zinc-400 mb-3 text-lg">
                Savings Rate
              </p>

              <h2 className="text-5xl font-bold text-cyan-400">
                {savingsRate}%
              </h2>

              <p className="text-zinc-500 mt-3">
                Percentage of income saved
              </p>

            </div>

            <div className="glass rounded-3xl p-8 border border-white/10">

              <p className="text-zinc-400 mb-3 text-lg">
                Expense Ratio
              </p>

              <h2 className="text-5xl font-bold text-red-400">
                {expenseRate}%
              </h2>

              <p className="text-zinc-500 mt-3">
                Income spent on expenses
              </p>

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

              <p className="text-zinc-500 mt-3">
                Highest spending category
              </p>

            </div>

          </div>

          {/* CHART */}

          <div className="glass rounded-[32px] p-8 border border-white/10">

            <h2 className="text-4xl font-bold mb-2">
              Financial Analytics
            </h2>

            <p className="text-zinc-400 text-lg mb-10">
              Income, expense, and savings trends
            </p>

            <AnalyticsChart
              transactions={
                transactions
              }
            />

          </div>

        </div>

      </PageWrapper>

    </DashboardLayout>
  );
}