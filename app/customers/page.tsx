import { CustomerManager } from "@/components/customers/customer-manager";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/ui/page-header";

export default function CustomersPage() {
  return (
    <AppShell>
      <div className="space-y-8 pt-4">
        <PageHeader
          title="Customers"
          description="Manage AI SaaS customer accounts."
        />

        <CustomerManager />
      </div>
    </AppShell>
  );
}
