"use client";

import { useState } from "react";

import toast from "react-hot-toast";

import {
  createTransaction,
} from "../../services/transactionService";

import Button from "../ui/Button";
import Input from "../ui/Input";

export default function AddTransactionForm({
  onTransactionAdded,
}) {
  const [formData, setFormData] =
    useState({
      type: "expense",
      category: "",
      amount: "",
      description: "",
    });

  const [loading, setLoading] =
    useState(false);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !formData.category ||
      !formData.amount
    ) {
      toast.error(
        "Please fill required fields"
      );

      return;
    }

    try {
      setLoading(true);

      await createTransaction({
        ...formData,
        amount: Number(
          formData.amount
        ),
      });

      toast.success(
        "Transaction added"
      );

      setFormData({
        type: "expense",
        category: "",
        amount: "",
        description: "",
      });

      if (onTransactionAdded) {
        onTransactionAdded();
      }
    } catch (error) {
      toast.error(
        error.response?.data
          ?.message ||
          "Failed to add transaction"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="
        glass
        rounded-3xl
        p-6
      "
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">
          Add Transaction
        </h2>

        <p className="text-zinc-400">
          Track your income and expenses
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div>
          <label className="block mb-2 text-sm text-zinc-400">
            Type
          </label>

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="
              w-full
              bg-white/5
              border
              border-white/10
              rounded-xl
              px-4
              py-3
              outline-none
            "
          >
            <option value="expense">
              Expense
            </option>

            <option value="income">
              Income
            </option>
          </select>
        </div>

        <Input
          label="Category"
          name="category"
          placeholder="Food, Salary, Rent..."
          value={formData.category}
          onChange={handleChange}
        />

        <Input
          label="Amount"
          type="number"
          name="amount"
          placeholder="Enter amount"
          value={formData.amount}
          onChange={handleChange}
        />

        <Input
          label="Description"
          name="description"
          placeholder="Optional description"
          value={formData.description}
          onChange={handleChange}
        />

        <Button
          type="submit"
          className="w-full"
        >
          {loading
            ? "Adding..."
            : "Add Transaction"}
        </Button>
      </form>
    </div>
  );
}