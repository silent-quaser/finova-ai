import {
  Bell,
} from "lucide-react";

const notifications = [
  {
    title:
      "Budget Alert",
    message:
      "Food expenses increased by 18%",
  },
  {
    title:
      "AI Suggestion",
    message:
      "You can save more on subscriptions",
  },
  {
    title:
      "Monthly Summary",
    message:
      "Your savings improved this month",
  },
];

export default function NotificationDropdown() {
  return (
    <div className="glass rounded-3xl p-6">
      
      <div className="flex items-center gap-3 mb-6">
        
        <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center">
          <Bell className="text-cyan-400" />
        </div>

        <div>
          <h2 className="text-2xl font-bold">
            Notifications
          </h2>

          <p className="text-zinc-400">
            Smart financial alerts
          </p>
        </div>

      </div>

      <div className="space-y-4">
        
        {notifications.map(
          (
            notification,
            index
          ) => (
            <div
              key={index}
              className="bg-white/5 border border-white/5 rounded-2xl p-5 flex flex-col gap-2"
            >
              <h3 className="font-semibold">
                {
                  notification.title
                }
              </h3>

              <p className="text-sm text-zinc-400">
                {
                  notification.message
                }
              </p>
            </div>
          )
        )}

      </div>

    </div>
  );
}