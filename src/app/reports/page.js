"use client";

import {
  FileText,
  Download,
  TrendingUp,
  PieChart,
  Sparkles,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import PageWrapper from "../../components/ui/PageWrapper";

import api from "../../services/api";

import toast from "react-hot-toast";

import jsPDF from "jspdf";

export default function ReportsPage() {
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

  const income =
    transactions
      .filter(
        (transaction) =>
          transaction.type ===
          "income"
      )
      .reduce(
        (
          acc,
          transaction
        ) =>
          acc +
          transaction.amount,
        0
      );

  const expenses =
    transactions
      .filter(
        (transaction) =>
          transaction.type ===
          "expense"
      )
      .reduce(
        (
          acc,
          transaction
        ) =>
          acc +
          transaction.amount,
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

  function getAIAnalysis() {
    if (
      savingsRate >= 40
    ) {
      return "Financial performance is currently strong with healthy savings behavior and controlled spending patterns.";
    }

    if (
      savingsRate >= 20
    ) {
      return "Financial condition remains moderately stable, though increasing monthly savings would improve long-term security.";
    }

    return "Financial risk is elevated due to low savings performance. Expense optimization is recommended.";
  }

  function downloadReport() {
    try {
      const doc =
        new jsPDF();

      doc.setFontSize(24);

      doc.text(
        "FINOVA AI FINANCIAL REPORT",
        20,
        25
      );

      doc.setFontSize(12);

      doc.text(
        `Generated: ${new Date().toLocaleDateString()}`,
        20,
        40
      );

      doc.setFontSize(18);

      doc.text(
        "Financial Overview",
        20,
        60
      );

      doc.setFontSize(13);

      doc.text(
        `Total Income: $${income}`,
        20,
        75
      );

      doc.text(
        `Total Expenses: $${expenses}`,
        20,
        85
      );

      doc.text(
        `Savings: $${savings}`,
        20,
        95
      );

      doc.text(
        `Savings Rate: ${savingsRate}%`,
        20,
        105
      );

      doc.text(
        `Transactions: ${transactions.length}`,
        20,
        115
      );

      doc.setFontSize(18);

      doc.text(
        "AI Financial Analysis",
        20,
        140
      );

      doc.setFontSize(13);

      const analysis =
        getAIAnalysis();

      const splitText =
        doc.splitTextToSize(
          analysis,
          170
        );

      doc.text(
        splitText,
        20,
        155
      );

      doc.setFontSize(18);

      doc.text(
        "Financial Health",
        20,
        190
      );

      doc.setFontSize(13);

      doc.text(
        savings >= 0
          ? "Financial health status is stable with positive savings."
          : "Financial health risk detected due to negative savings.",
        20,
        205
      );

      doc.save(
        "finova-ai-report.pdf"
      );

      toast.success(
        "Professional PDF report downloaded"
      );
    } catch (error) {
      console.log(error);

      toast.error(
        "Failed to generate PDF report"
      );
    }
  }

  const reports = [
    {
      title:
        "Monthly Financial Report",
      description:
        "Comprehensive monthly financial overview and insights",
      icon: FileText,
    },

    {
      title:
        "Expense Analysis",
      description:
        "Detailed expense breakdown and category tracking",
      icon: PieChart,
    },

    {
      title:
        "Savings Performance",
      description:
        "Savings growth and financial stability analysis",
      icon: TrendingUp,
    },

    {
      title:
        "AI Recommendation Report",
      description:
        "AI-generated financial recommendations and strategies",
      icon: Sparkles,
    },
  ];

  return (
    <DashboardLayout>

      <PageWrapper>

        <div className="space-y-8">

          <div>

            <h1 className="text-5xl font-bold mb-2">
              Financial Reports
            </h1>

            <p className="text-zinc-400 text-lg">
              Download AI-generated financial summaries and analytics reports
            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="glass rounded-3xl p-8 border border-white/10">

              <p className="text-zinc-400 mb-3 text-lg">
                Total Income
              </p>

              <h2 className="text-5xl font-bold text-green-400">
                ${income}
              </h2>

            </div>

            <div className="glass rounded-3xl p-8 border border-white/10">

              <p className="text-zinc-400 mb-3 text-lg">
                Total Expenses
              </p>

              <h2 className="text-5xl font-bold text-red-400">
                ${expenses}
              </h2>

            </div>

            <div className="glass rounded-3xl p-8 border border-white/10">

              <p className="text-zinc-400 mb-3 text-lg">
                Savings
              </p>

              <h2
                className={`text-5xl font-bold ${
                  savings >= 0
                    ? "text-cyan-400"
                    : "text-red-400"
                }`}
              >
                ${savings}
              </h2>

            </div>

          </div>

          <div className="glass rounded-[32px] p-10 border border-white/10">

            <div className="flex items-center justify-between mb-10">

              <div>

                <h2 className="text-4xl font-bold mb-2">
                  Available Reports
                </h2>

                <p className="text-zinc-400 text-lg">
                  Generate and export financial insights
                </p>

              </div>

              <button
                onClick={
                  downloadReport
                }
                className="finova-button px-8 py-4 rounded-2xl font-semibold flex items-center gap-3"
              >

                <Download size={22} />

                Download PDF

              </button>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {reports.map(
                (
                  report,
                  index
                ) => {
                  const Icon =
                    report.icon;

                  return (
                    <div
                      key={index}
                      className="glass rounded-3xl p-8 border border-white/10 hover:border-cyan-500/20 transition-all"
                    >

                      <div className="w-16 h-16 rounded-3xl bg-cyan-500/15 flex items-center justify-center mb-6">

                        <Icon
                          className="text-cyan-400"
                          size={30}
                        />

                      </div>

                      <h3 className="text-3xl font-bold mb-3">
                        {report.title}
                      </h3>

                      <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                        {report.description}
                      </p>

                      <button
                        onClick={
                          downloadReport
                        }
                        className="w-full finova-button py-4 rounded-2xl font-semibold"
                      >
                        Generate Report
                      </button>

                    </div>
                  );
                }
              )}

            </div>

          </div>

          <div className="glass rounded-[32px] p-10 border border-white/10">

            <h2 className="text-4xl font-bold mb-8">
              Report Statistics
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

              <div className="glass rounded-3xl p-6 border border-white/10">

                <p className="text-zinc-400 mb-2">
                  Generated Reports
                </p>

                <h2 className="text-4xl font-bold text-cyan-400">
                  {transactions.length}
                </h2>

              </div>

              <div className="glass rounded-3xl p-6 border border-white/10">

                <p className="text-zinc-400 mb-2">
                  Export Formats
                </p>

                <h2 className="text-4xl font-bold text-white">
                  1
                </h2>

              </div>

              <div className="glass rounded-3xl p-6 border border-white/10">

                <p className="text-zinc-400 mb-2">
                  AI Insights
                </p>

                <h2 className="text-4xl font-bold text-purple-400">
                  24
                </h2>

              </div>

              <div className="glass rounded-3xl p-6 border border-white/10">

                <p className="text-zinc-400 mb-2">
                  Financial Score
                </p>

                <h2 className="text-4xl font-bold text-green-400">
                  {savingsRate >= 40
                    ? "92"
                    : savingsRate >= 20
                    ? "74"
                    : "48"}
                </h2>

              </div>

            </div>

          </div>

        </div>

      </PageWrapper>

    </DashboardLayout>
  );
}