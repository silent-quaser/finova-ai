"use client";

import DashboardLayout from "../../components/layout/DashboardLayout";

import GoalsTracker from "../../components/dashboard/GoalsTracker";

export default function GoalsPage() {
  return (
    <DashboardLayout>
      
      <div className="space-y-8">
        
        <div>
          
          <h1 className="text-4xl font-bold mb-2">
            Financial Goals
          </h1>

          <p className="text-zinc-400">
            Track savings targets and monitor financial progress
          </p>

        </div>

        <GoalsTracker />

      </div>

    </DashboardLayout>
  );
}