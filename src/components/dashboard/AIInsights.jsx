"use client";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import {
  Brain,
} from "lucide-react";

import {
  getAIInsights,
} from "../../services/aiService";

export default function AIInsights({
  refreshKey,
}) {
  const [insights, setInsights] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  async function fetchInsights() {
    try {
      setLoading(true);

      const data =
        await getAIInsights();

      setInsights(data.insights);
    } catch (error) {
      setInsights(
        "Add some transactions to generate AI-powered financial insights."
      );

      toast.error(
        error.response?.data
          ?.message ||
          "Failed to generate insights"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchInsights();
  }, [refreshKey]);

  return (
    <div
      className="
        glass
        rounded-3xl
        p-6
        h-full
      "
    >
      <div className="flex items-center gap-3 mb-6">
        
        <div
          className="
            w-12
            h-12
            rounded-2xl
            bg-cyan-500/10
            flex
            items-center
            justify-center
          "
        >
          <Brain
            className="text-cyan-400"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold">
            AI Insights
          </h2>

          <p className="text-zinc-400">
            Gemini-powered financial analysis
          </p>
        </div>

      </div>

      <div
        className="
          text-zinc-300
          leading-relaxed
          whitespace-pre-wrap
          text-sm
          max-h-[400px]
          overflow-y-auto
        "
      >
        {loading
          ? "Generating AI insights..."
          : insights}
      </div>
    </div>
  );
}