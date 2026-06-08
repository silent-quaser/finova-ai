"use client";

import {
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

import {
  X,
  Wallet,
} from "lucide-react";

import toast from "react-hot-toast";

import api from "../../services/api";

export default function AddTransactionModal({
  open,
  onClose,
  refreshTransactions,
}) {
  const [formData, setFormData] =
    useState({
      category: "",
      amount: "",
      type: "expense",
      description: "",
    });

  const [loading, setLoading] =
    useState(false);

  if (!open) return null;

  async function handleSubmit(
    e
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      const token =
        localStorage.getItem(
          "token"
        );

      if (!token) {
        toast.error(
          "Please login again"
        );

        return;
      }

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

      if (
        refreshTransactions
      ) {
        await refreshTransactions();
      }

      onClose();

      setFormData({
        category: "",
        amount: "",
        type: "expense",
        description: "",
      });
    } catch (error) {
      console.log(error);

      toast.error(
        "Failed to add transaction"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        className="glass rounded-[32px] w-full max-w-lg p-8 border border-white/10"
      >
        
        <div className="flex items-center justify-between mb-8">
          
          <div className="flex items-center gap-4">
            
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/15 flex items-center justify-center">
              
              <Wallet
                size={26}
                className="text-cyan-400"
              />

            </div>

            <div>
              
              <h2 className="text-3xl font-bold">
                Add Transaction
              </h2>

              <p className="text-zinc-400">
                Record financial activity
              </p>

            </div>

          </div>

          <button
            onClick={onClose}
            className="w-11 h-11 rounded-2xl glass flex items-center justify-center"
          >
            
            <X size={20} />

          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          
          <div>
            
            <label className="block mb-3 text-sm text-zinc-400">
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
              className="w-full glass rounded-2xl px-5 py-4 outline-none border border-white/10"
              placeholder="Food, Salary, Rent"
            />

          </div>

          <div>
            
            <label className="block mb-3 text-sm text-zinc-400">
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
              className="w-full glass rounded-2xl px-5 py-4 outline-none border border-white/10"
              placeholder="Enter amount"
            />

          </div>

          <div>
            
            <label className="block mb-3 text-sm text-zinc-400">
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
              className="w-full glass rounded-2xl px-5 py-4 outline-none border border-white/10"
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
            
            <label className="block mb-3 text-sm text-zinc-400">
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
              className="w-full glass rounded-2xl px-5 py-4 outline-none border border-white/10 resize-none"
              rows={4}
              placeholder="Optional notes"
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="finova-button w-full py-4 rounded-2xl font-semibold disabled:opacity-50"
          >
            
            {loading
              ? "Adding..."
              : "Add Transaction"}

          </button>

        </form>

      </motion.div>

    </div>
  );
}