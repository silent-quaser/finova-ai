"use client";

import {
  useEffect,
  useState,
} from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import PageWrapper from "../../components/ui/PageWrapper";

import api from "../../services/api";

import toast from "react-hot-toast";

export default function TransactionsPage() {
  const [transactions, setTransactions] =
    useState([]);

  const [editingId, setEditingId] =
    useState(null);

  const [formData, setFormData] =
    useState({
      category: "",
      amount: "",
      type: "expense",
      description: "",
    });

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

  async function handleSubmit(
    e
  ) {
    e.preventDefault();

    try {
      const token =
        localStorage.getItem(
          "token"
        );

      if (editingId) {
        await api.put(
          `/transactions/${editingId}`,
          {
            category:
              formData.category,
            amount:
              Number(
                formData.amount
              ),
            type:
              formData.type,
            description:
              formData.description,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success(
          "Transaction updated successfully"
        );
      } else {
        await api.post(
          "/transactions",
          {
            category:
              formData.category,
            amount:
              Number(
                formData.amount
              ),
            type:
              formData.type,
            description:
              formData.description,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success(
          "Transaction added successfully"
        );
      }

      setEditingId(null);

      setFormData({
        category: "",
        amount: "",
        type: "expense",
        description: "",
      });

      fetchTransactions();

      window.location.reload();
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data
          ?.message ||
          "Transaction action failed"
      );
    }
  }

  async function handleDelete(
    id
  ) {
    try {
      const token =
        localStorage.getItem(
          "token"
        );

      await api.delete(
        `/transactions/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(
        "Transaction deleted"
      );

      fetchTransactions();
    } catch (error) {
      console.log(error);

      toast.error(
        "Failed to delete transaction"
      );
    }
  }

  function handleEdit(
    transaction
  ) {
    setEditingId(
      transaction._id
    );

    setFormData({
      category:
        transaction.category,
      amount:
        transaction.amount,
      type:
        transaction.type,
      description:
        transaction.description || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <DashboardLayout>
      
      <PageWrapper>
        
        <div className="space-y-8">
          
          <div>
            
            <h1 className="text-5xl font-bold mb-2">
              Transactions
            </h1>

            <p className="text-zinc-400 text-lg">
              Manage and track your financial activity
            </p>

          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            
            <div className="glass rounded-[32px] p-8 border border-white/10">
              
              <h2 className="text-4xl font-bold mb-2">
                {editingId
                  ? "Edit Transaction"
                  : "Add Transaction"}
              </h2>

              <p className="text-zinc-400 mb-8">
                Track your income and expenses
              </p>

              <form
                onSubmit={
                  handleSubmit
                }
                className="space-y-6"
              >
                
                <div>
                  
                  <label className="block mb-3 text-zinc-400">
                    Type
                  </label>

                  <select
                    value={
                      formData.type
                    }
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        type:
                          e.target.value,
                      })
                    }
                    className="w-full glass rounded-2xl px-5 py-4 border border-white/10 outline-none"
                  >
                    
                    <option value="expense">
                      Expense
                    </option>

                    <option value="income">
                      Income
                    </option>

                  </select>

                </div>

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
                    Amount
                  </label>

                  <input
                    type="number"
                    required
                    value={
                      formData.amount
                    }
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        amount:
                          e.target.value,
                      })
                    }
                    className="w-full glass rounded-2xl px-5 py-4 border border-white/10 outline-none"
                    placeholder="3000"
                  />

                </div>

                <div>
                  
                  <label className="block mb-3 text-zinc-400">
                    Description
                  </label>

                  <textarea
                    value={
                      formData.description
                    }
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description:
                          e.target.value,
                      })
                    }
                    className="w-full glass rounded-2xl px-5 py-4 border border-white/10 outline-none resize-none"
                    rows={4}
                    placeholder="Optional description"
                  />

                </div>

                <button
                  type="submit"
                  className="finova-button w-full py-4 rounded-2xl font-semibold"
                >
                  {editingId
                    ? "Update Transaction"
                    : "Add Transaction"}
                </button>

              </form>

            </div>

            <div className="glass rounded-[32px] p-8 border border-white/10 overflow-x-auto">
              
              <h2 className="text-4xl font-bold mb-2">
                Transactions
              </h2>

              <p className="text-zinc-400 mb-8">
                Financial activity history
              </p>

              <table className="w-full min-w-[700px]">
                
                <thead>
                  
                  <tr className="text-left text-zinc-400 border-b border-white/10">
                    
                    <th className="pb-4">
                      Category
                    </th>

                    <th className="pb-4">
                      Type
                    </th>

                    <th className="pb-4">
                      Amount
                    </th>

                    <th className="pb-4">
                      Date
                    </th>

                    <th className="pb-4">
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody>
                  
                  {transactions.map(
                    (
                      transaction
                    ) => (
                      <tr
                        key={
                          transaction._id
                        }
                        className="border-b border-white/5"
                      >
                        
                        <td className="py-5">
                          {
                            transaction.category
                          }
                        </td>

                        <td className="py-5 capitalize">
                          {
                            transaction.type
                          }
                        </td>

                        <td
                          className={`py-5 font-semibold ${
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
                        </td>

                        <td className="py-5">
                          {new Date(
                            transaction.createdAt
                          ).toLocaleDateString()}
                        </td>

                        <td className="py-5">

                          <div className="flex gap-3">

                            <button
                              onClick={() =>
                                handleEdit(
                                  transaction
                                )
                              }
                              className="bg-cyan-500/15 text-cyan-400 px-4 py-2 rounded-xl hover:bg-cyan-500/25 transition-all"
                            >
                              Edit
                            </button>

                            <button
                              onClick={() =>
                                handleDelete(
                                  transaction._id
                                )
                              }
                              className="bg-red-500/15 text-red-400 px-4 py-2 rounded-xl hover:bg-red-500/25 transition-all"
                            >
                              Delete
                            </button>

                          </div>

                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </PageWrapper>

    </DashboardLayout>
  );
}