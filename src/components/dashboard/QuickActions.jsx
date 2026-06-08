"use client";

import Link from "next/link";

import {
  Plus,
  ScanLine,
  Target,
  Brain,
} from "lucide-react";

const actions = [
  {
    title: "Add Transaction",
    description:
      "Record income or expenses",
    icon: Plus,
    href: "/transactions",
    iconBg:
      "bg-cyan-500/15",
    iconColor:
      "text-cyan-400",
  },
  {
    title: "Scan Receipt",
    description:
      "Extract receipt data with AI",
    icon: ScanLine,
    href:
      "/receipt-scanner",
    iconBg:
      "bg-green-500/15",
    iconColor:
      "text-green-400",
  },
  {
    title: "Track Goals",
    description:
      "Monitor savings goals",
    icon: Target,
    href: "/goals",
    iconBg:
      "bg-yellow-500/15",
    iconColor:
      "text-yellow-400",
  },
  {
    title: "AI Insights",
    description:
      "View smart recommendations",
    icon: Brain,
    href:
      "/ai-insights",
    iconBg:
      "bg-purple-500/15",
    iconColor:
      "text-purple-400",
  },
];

export default function QuickActions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      {actions.map(
        (action, index) => {
          const Icon =
            action.icon;

          return (
            <Link
              key={index}
              href={action.href}
              className="glass rounded-[32px] p-10 border border-white/10 hover:border-cyan-500/30 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
            >

              <div
                className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-8 ${action.iconBg}`}
              >

                <Icon
                  size={40}
                  className={
                    action.iconColor
                  }
                />

              </div>

              <h2 className="text-4xl font-bold mb-4">
                {action.title}
              </h2>

              <p className="text-zinc-400 text-xl leading-relaxed">
                {
                  action.description
                }
              </p>

            </Link>
          );
        }
      )}

    </div>
  );
}