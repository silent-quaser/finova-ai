"use client";

import Link from "next/link";

import {
  LayoutDashboard,
  Wallet,
  PieChart,
  Brain,
  Settings,
  ScanSearch,
  FileText,
  MessageSquare,
  BarChart3,
  Target,
  TrendingUp,
  X,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },

  {
    title: "Transactions",
    icon: Wallet,
    href: "/transactions",
  },

  {
    title: "Analytics",
    icon: PieChart,
    href: "/analytics",
  },

  {
    title: "Predictions",
    icon: TrendingUp,
    href: "/predictions",
  },

  {
    title: "AI Insights",
    icon: Brain,
    href: "/ai-insights",
  },

  {
    title: "AI Chat",
    icon: MessageSquare,
    href: "/ai-chat",
  },

  {
    title: "Financial Summary",
    icon: BarChart3,
    href: "/summary",
  },

  {
    title: "Goals",
    icon: Target,
    href: "/goals",
  },

  {
    title: "Budgets",
    icon: Wallet,
    href: "/budgets",
  },

  {
    title: "Receipt Scanner",
    icon: ScanSearch,
    href: "/receipt-scanner",
  },

  {
    title: "Reports",
    icon: FileText,
    href: "/reports",
  },

  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}) {
  return (
    <>
      
      {sidebarOpen && (
        <div
          onClick={() =>
            setSidebarOpen(false)
          }
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      <aside
        className={`fixed left-0 top-0 md:top-20 w-64 h-screen md:h-[calc(100vh-80px)] border-r border-white/10 bg-black/40 backdrop-blur-xl p-5 overflow-y-auto z-50 transition-transform duration-300 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }`}
      >
        
        <div className="flex items-center justify-between mb-8 md:hidden">
          
          <h2 className="text-lg font-bold">
            Menu
          </h2>

          <button
            onClick={() =>
              setSidebarOpen(false)
            }
          >
            <X size={22} />
          </button>

        </div>

        <div className="hidden md:block mb-8">
          
          <h2 className="text-zinc-500 text-xs uppercase tracking-[0.3em]">
            Navigation
          </h2>

        </div>

        <nav className="flex flex-col gap-2">
          
          {menuItems.map(
            (item) => {
              const Icon =
                item.icon;

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={() =>
                    setSidebarOpen(false)
                  }
                  className="flex items-center gap-4 px-4 py-3 rounded-2xl text-zinc-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition-all duration-200"
                >
                  
                  <Icon size={20} />

                  <span className="text-[15px] font-medium">
                    {item.title}
                  </span>

                </Link>
              );
            }
          )}

        </nav>

      </aside>

    </>
  );
}