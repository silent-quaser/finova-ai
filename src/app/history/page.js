import DashboardLayout from "../../components/layout/DashboardLayout";
import PageHeader from "../../components/ui/PageHeader";

export default function HistoryPage() {
  return (
    <DashboardLayout>

      <PageHeader
        title="History"
        description="Review your historical financial records"
      />

      <div className="glass rounded-3xl p-10">
        <p className="text-zinc-300">
          Financial history section coming soon.
        </p>
      </div>

    </DashboardLayout>
  );
}