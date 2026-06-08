import DashboardLayout from "../../components/layout/DashboardLayout";
import PageHeader from "../../components/ui/PageHeader";

export default function ProfilePage() {
  return (
    <DashboardLayout>

      <PageHeader
        title="Profile"
        description="Manage your account information"
      />

      <div className="glass rounded-3xl p-10">
        <p className="text-zinc-300">
          User profile management coming soon.
        </p>
      </div>

    </DashboardLayout>
  );
}