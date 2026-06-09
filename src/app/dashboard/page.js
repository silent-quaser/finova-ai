"use client";

import {
  useEffect,
  useState,
} from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import PageWrapper from "../../components/ui/PageWrapper";

import SummaryCards from "../../components/dashboard/SummaryCards";

import AnalyticsChart from "../../components/charts/AnalyticsChart";

import HealthScore from "../../components/dashboard/HealthScore";

import AIRecommendations from "../../components/dashboard/AIRecommendations";

import ActivityFeed from "../../components/dashboard/ActivityFeed";

import FinancialStats from "../../components/dashboard/FinancialStats";

import SpendingBreakdown from "../../components/dashboard/SpendingBreakdown";

import GoalsTracker from "../../components/dashboard/GoalsTracker";

import SmartNotifications from "../../components/dashboard/SmartNotifications";

import QuickActions from "../../components/dashboard/QuickActions";

import AIHeroCard from "../../components/dashboard/AIHeroCard";

import ExecutiveSummary from "../../components/dashboard/ExecutiveSummary";

import TransactionFilters from "../../components/dashboard/TransactionFilters";

import DashboardSkeleton from "../../components/ui/DashboardSkeleton";

import EmptyDashboardState from "../../components/dashboard/EmptyDashboardState";

import api from "../../services/api";

import BudgetAlerts from "../../components/dashboard/BudgetAlerts";

export default function DashboardPage() {
  const [transactions, setTransactions] =
    useState([]);

  const [
    filteredTransactions,
    setFilteredTransactions,
  ] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [type, setType] =
    useState("");

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    filterTransactions();
  }, [
    search,
    category,
    type,
    transactions,
  ]);

  async function fetchTransactions() {
    try {
      setLoading(true);

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

      setFilteredTransactions(
        response.data
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function filterTransactions() {
    let filtered =
      [...transactions];

    if (search) {
      filtered =
        filtered.filter(
          (transaction) =>
            transaction.category
              .toLowerCase()
              .includes(
                search.toLowerCase()
              )
        );
    }

    if (category) {
      filtered =
        filtered.filter(
          (transaction) =>
            transaction.category ===
            category
        );
    }

    if (type) {
      filtered =
        filtered.filter(
          (transaction) =>
            transaction.type ===
            type
        );
    }

    setFilteredTransactions(
      filtered
    );
  }

  if (loading) {
    return (
      <DashboardLayout>
        
        <PageWrapper>
          
          <DashboardSkeleton />

        </PageWrapper>

      </DashboardLayout>
    );
  }

  if (
    filteredTransactions.length ===
    0
  ) {
    return (
      <DashboardLayout>
        
        <PageWrapper>
          
          <div className="space-y-8">
            
            <div>
              
              <h1 className="text-5xl font-bold mb-2">
                Financial Dashboard
              </h1>

              <p className="text-zinc-400 text-lg">
                AI-powered financial management
                and analytics
              </p>

            </div>

            <EmptyDashboardState />

          </div>

        </PageWrapper>

      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      
      <PageWrapper>
        
        <div className="space-y-8">
          
          <div>
            
            <h1 className="text-5xl font-bold mb-2">
              Financial Dashboard
            </h1>

            <p className="text-zinc-400 text-lg">
              AI-powered financial management
              and analytics
            </p>

          </div>

          <QuickActions />

          <AIHeroCard
            transactions={
              filteredTransactions
            }
          />
<ExecutiveSummary
  transactions={
    filteredTransactions
  }
/>

          <SummaryCards
            transactions={
              filteredTransactions
            }
          />

          <TransactionFilters
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            type={type}
            setType={setType}
          />

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            
            <HealthScore
  transactions={
    filteredTransactions
  }
/>

            <FinancialStats
              transactions={
                filteredTransactions
              }
            />

          </div>

          <SmartNotifications
            transactions={
              filteredTransactions
            }
          />
          <BudgetAlerts
  transactions={
    filteredTransactions
  }
/>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            
            <AIRecommendations
              transactions={
                filteredTransactions
              }
            />

            <ActivityFeed
              transactions={
                filteredTransactions
              }
            />

          </div>

          <SpendingBreakdown
            transactions={
              filteredTransactions
            }
          />

          <GoalsTracker />

          <AnalyticsChart
            transactions={
              filteredTransactions
            }
          />

          <div className="glass rounded-[32px] p-8 border border-white/10">
            
            <div className="mb-8">
              
              <h2 className="text-4xl font-bold mb-2">
                Recent Transactions
              </h2>

              <p className="text-zinc-400 text-lg">
                Track your latest financial activity
              </p>

            </div>

            <div className="space-y-4">
              
              {filteredTransactions
                .slice(0, 8)
                .map(
                  (
                    transaction,
                    index
                  ) => (
                    <div
                      key={
                        transaction._id ||
                        index
                      }
                      className="glass rounded-3xl p-6 border border-white/5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 hover:border-cyan-500/20 transition-all"
                    >
                      
                      <div className="flex items-center gap-5">
                        
                        <div
                          className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold ${
                            transaction.type ===
                            "income"
                              ? "bg-green-500/15 text-green-400"
                              : "bg-red-500/15 text-red-400"
                          }`}
                        >
                          
                          {transaction.type ===
                          "income"
                            ? "+"
                            : "-"}

                        </div>

                        <div>
                          
                          <h3 className="text-2xl font-semibold capitalize">
                            {
                              transaction.category
                            }
                          </h3>

                          <p className="text-zinc-400 capitalize">
                            {
                              transaction.type
                            }
                          </p>

                        </div>

                      </div>

                      <div className="flex flex-col lg:items-end">
                        
                        <h2
                          className={`text-3xl font-bold ${
                            transaction.type ===
                            "income"
                              ? "text-green-400"
                              : "text-red-400"
                          }`}
                        >
                          
                          $
                          {
                            transaction.amount
                          }

                        </h2>

                        <p className="text-zinc-400">
                          
                          {new Date(
                            transaction.createdAt
                          ).toLocaleDateString()}

                        </p>

                      </div>

                    </div>
                  )
                )}

            </div>

          </div>

        </div>

      </PageWrapper>

    </DashboardLayout>
  );
}