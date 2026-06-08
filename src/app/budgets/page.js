"use client";

import {
  useEffect,
  useState,
} from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import PageWrapper from "../../components/ui/PageWrapper";

import api from "../../services/api";

import toast from "react-hot-toast";

export default function BudgetsPage() {
  const [budgets, setBudgets] =
    useState([]);

  const [formData, setFormData] =
    useState({
      category: "",
      limit: "",
    });

  useEffect(() => {
    fetchBudgets();
  }, []);

  async function fetchBudgets() {
    try {
      const token =
        localStorage.getItem(
          "token"
        );

      const response =
        await api.get(
          "/budgets",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      setBudgets(
        response.data
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(
    e
  ) {
    e.preventDefault();

    try {
      const token =
        localStorage.getItem(
          "token"
        );

      await api.post(
        "/budgets",
        {
          category:
            formData.category,
          limit: Number(
            formData.limit
          ),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(
        "Budget created successfully"
      );

      setFormData({
        category: "",
        limit: "",
      });

      fetchBudgets();
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data
          ?.message ||
          "Failed to create budget"
      );
    }
  }

  return (
    <DashboardLayout>
      
      <PageWrapper>
        
        <div className="space-y-8">
          
          <div>
            
            <h1 className="text-5xl font-bold mb-2">
              Budget Planner
            </h1>

            <p className="text-zinc-400 text-lg">
              Manage monthly spending limits
            </p>

          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            
            <div className="glass rounded-[32px] p-8 border border-white/10">
              
              <h2 className="text-4xl font-bold mb-2">
                Create Budget
              </h2>

              <p className="text-zinc-400 mb-8">
                Set category spending limits
              </p>

              <form
                onSubmit={
                  handleSubmit
                }
                className="space-y-6"
              >
                
                <div>
                  
                  <label className="block mb-3 text-zinc-400">
                    Category
                  </label>

                  <input
                    type="text"
                    required
                    value={
                      formData.category
                    }
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category:
                          e.target.value,
                      })
                    }
                    className="w-full glass rounded-2xl px-5 py-4 border border-white/10 outline-none"
                    placeholder="Food"
                  />

                </div>

                <div>
                  
                  <label className="block mb-3 text-zinc-400">
                    Spending Limit
                  </label>

                  <input
                    type="number"
                    required
                    value={
                      formData.limit
                    }
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        limit:
                          e.target.value,
                      })
                    }
                    className="w-full glass rounded-2xl px-5 py-4 border border-white/10 outline-none"
                    placeholder="5000"
                  />

                </div>

                <button
                  type="submit"
                  className="finova-button w-full py-4 rounded-2xl font-semibold"
                >
                  Create Budget
                </button>

              </form>

            </div>

            <div className="glass rounded-[32px] p-8 border border-white/10">
              
              <h2 className="text-4xl font-bold mb-2">
                Active Budgets
              </h2>

              <p className="text-zinc-400 mb-8">
                Current budget allocations
              </p>

              <div className="space-y-4">
                
                {budgets.map(
                  (
                    budget,
                    index
                  ) => (
                    <div
                      key={
                        budget._id ||
                        index
                      }
                      className="glass rounded-3xl p-6 border border-white/5"
                    >
                      
                      <div className="flex items-center justify-between">
                        
                        <h3 className="text-2xl font-semibold">
                          {
                            budget.category
                          }
                        </h3>

                        <span className="text-cyan-400 text-2xl font-bold">
                          $
                          {
                            budget.limit
                          }
                        </span>

                      </div>

                    </div>
                  )
                )}

              </div>

            </div>

          </div>

        </div>

      </PageWrapper>

    </DashboardLayout>
  );
}