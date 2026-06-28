import { AnalyticsDashboard } from "@/components/dashboard/analytics-dashboard";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/ui/page-header";

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="space-y-8 pt-4">
        <PageHeader
          title="Dashboard"
          description="Detailed performance overview."
        />

        <AnalyticsDashboard />
      </div>
    </AppShell>
  );
}
