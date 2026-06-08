"use client";

import {
  useEffect,
  useState,
} from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import PageWrapper from "../../components/ui/PageWrapper";

import api from "../../services/api";

export default function FinancialSummaryPage() {
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

  let summary =
    "";

  if (income === 0) {
    summary =
      "No financial activity detected yet. Add transactions to generate insights.";
  } else if (
    savings > 0
  ) {
    summary =
      `Your finances are healthy. Total income is $${income}, while expenses are $${expenses}. You currently maintain positive savings of $${savings}, indicating good financial discipline and sustainable spending habits.`;
  } else {
    summary =
      `Your current expenses exceed your income. You earned $${income} but spent $${expenses}, resulting in a deficit of $${Math.abs(
        savings
      )}. Reducing unnecessary expenses is recommended.`;
  }

  return (
    <DashboardLayout>
      
      <PageWrapper>
        
        <div className="space-y-8">
          
          <div>
            
            <h1 className="text-5xl font-bold mb-2">
              Financial Summary
            </h1>

            <p className="text-zinc-400 text-lg">
              AI-powered monthly financial intelligence and recommendations
            </p>

          </div>

          <div className="glass rounded-[32px] p-10 border border-white/10">
            
            <h2 className="text-4xl font-bold mb-6">
              Executive Overview
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              
              <div className="glass rounded-3xl p-6 border border-white/10">
                
                <p className="text-zinc-400 mb-3">
                  Total Income
                </p>

                <h2 className="text-5xl font-bold text-green-400">
                  ${income}
                </h2>

              </div>

              <div className="glass rounded-3xl p-6 border border-white/10">
                
                <p className="text-zinc-400 mb-3">
                  Total Expenses
                </p>

                <h2 className="text-5xl font-bold text-red-400">
                  ${expenses}
                </h2>

              </div>

              <div className="glass rounded-3xl p-6 border border-white/10">
                
                <p className="text-zinc-400 mb-3">
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

            <div className="glass rounded-3xl p-8 border border-cyan-500/10">
              
              <p className="text-xl leading-relaxed text-zinc-200">
                {summary}
              </p>

            </div>

          </div>

        </div>

      </PageWrapper>

    </DashboardLayout>
  );
}