"use client";

import DashboardLayout from "../../components/layout/DashboardLayout";

import MonthlySummary from "../../components/dashboard/MonthlySummary";

export default function SummaryPage() {
  return (
    <DashboardLayout>
      
      <div className="space-y-8">

        <div>
          
          <h1 className="text-4xl font-bold mb-2">
            Financial Summary
          </h1>

          <p className="text-zinc-400">
            AI-powered monthly financial intelligence and recommendations
          </p>

        </div>

        <MonthlySummary />

      </div>

    </DashboardLayout>
  );
}