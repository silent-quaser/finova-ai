"use client";

import DashboardLayout from "../../components/layout/DashboardLayout";

export default function SettingsPage() {
  const user =
    typeof window !==
      "undefined" &&
    localStorage.getItem(
      "user"
    )
      ? JSON.parse(
          localStorage.getItem(
            "user"
          )
        )
      : null;

  return (
    <DashboardLayout>
      
      <div className="space-y-8">

        <div>
          <h1 className="text-4xl font-bold mb-2">
            Settings
          </h1>

          <p className="text-zinc-400">
            Manage your Finova AI account
          </p>
        </div>

        <div className="glass rounded-3xl p-8">
          
          <div className="flex items-center gap-5 mb-8">
            
            <div className="w-20 h-20 rounded-full bg-cyan-500/10 flex items-center justify-center text-3xl">
              👤
            </div>

            <div>
              <h2 className="text-3xl font-bold">
                {user?.name ||
                  "Finova User"}
              </h2>

              <p className="text-zinc-400">
                {user?.email}
              </p>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
              
              <h3 className="text-xl font-semibold mb-3">
                Account Status
              </h3>

              <p className="text-green-400">
                Active
              </p>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
              
              <h3 className="text-xl font-semibold mb-3">
                AI Insights
              </h3>

              <p className="text-cyan-400">
                Enabled
              </p>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
              
              <h3 className="text-xl font-semibold mb-3">
                Budget Tracking
              </h3>

              <p className="text-cyan-400">
                Enabled
              </p>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
              
              <h3 className="text-xl font-semibold mb-3">
                Security
              </h3>

              <p className="text-green-400">
                JWT Protected
              </p>

            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}