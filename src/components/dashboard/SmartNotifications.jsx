"use client";

import {
  BellRing,
  AlertTriangle,
  TrendingUp,
  Wallet,
} from "lucide-react";

import {
  motion,
} from "framer-motion";

export default function SmartNotifications({
  transactions,
}) {
  const income =
    transactions
      .filter(
        (transaction) =>
          transaction.type ===
          "income"
      )
      .reduce(
        (
          acc,
          transaction
        ) =>
          acc +
          transaction.amount,
        0
      );

  const expenses =
    transactions
      .filter(
        (transaction) =>
          transaction.type ===
          "expense"
      )
      .reduce(
        (
          acc,
          transaction
        ) =>
          acc +
          transaction.amount,
        0
      );

  const savings =
    income - expenses;

  const notifications = [
    {
      icon: TrendingUp,
      title:
        "Savings Performance",
      description:
        savings > 0
          ? "Your savings trend is positive this month."
          : "Your expenses currently exceed income.",
      color:
        savings > 0
          ? "text-green-400"
          : "text-red-400",
      bg:
        savings > 0
          ? "bg-green-500/10"
          : "bg-red-500/10",
    },
    {
      icon: Wallet,
      title:
        "Expense Monitoring",
      description:
        expenses >
        income * 0.7
          ? "Your spending is approaching your recommended limit."
          : "Your spending is within a healthy range.",
      color:
        expenses >
        income * 0.7
          ? "text-yellow-400"
          : "text-cyan-400",
      bg:
        expenses >
        income * 0.7
          ? "bg-yellow-500/10"
          : "bg-cyan-500/10",
    },
    {
      icon: AlertTriangle,
      title:
        "AI Financial Insight",
      description:
        savings > income * 0.25
          ? "Excellent savings discipline detected."
          : "Reducing discretionary spending may improve savings growth.",
      color:
        "text-cyan-400",
      bg:
        "bg-cyan-500/10",
    },
  ];

  return (
    <div className="glass rounded-[32px] p-8">
      
      <div className="flex items-center justify-between mb-8">
        
        <div>
          
          <h2 className="text-3xl font-bold mb-2">
            Smart Notifications
          </h2>

          <p className="text-zinc-400">
            AI-powered financial alerts
          </p>

        </div>

        <div className="w-14 h-14 rounded-2xl bg-cyan-500/15 flex items-center justify-center">
          
          <BellRing
            size={26}
            className="text-cyan-400"
          />

        </div>

      </div>

      <div className="space-y-5">
        
        {notifications.map(
          (
            notification,
            index
          ) => {
            const Icon =
              notification.icon;

            return (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay:
                    index * 0.1,
                }}
                whileHover={{
                  scale: 1.01,
                }}
                className="flex items-start gap-5 rounded-3xl border border-white/10 bg-white/5 p-6 hover:border-cyan-500/20 transition-all"
              >
                
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center formatCurrency(notification.bg}`}
                >
                  
                  <Icon
                    size={24}
                    className={
                      notification.color
                    }
                  />

                </div>

                <div>
                  
                  <h3 className="text-lg font-semibold mb-2">
                    {
                      notification.title
                    }
                  </h3>

                  <p className="text-zinc-400 leading-relaxed">
                    {
                      notification.description
                    }
                  </p>

                </div>

              </motion.div>
            );
          }
        )}

      </div>

    </div>
  );
}