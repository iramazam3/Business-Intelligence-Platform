import { OrderManager } from "@/components/orders/order-manager";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/ui/page-header";

export default function OrdersPage() {
  return (
    <AppShell>
      <div className="space-y-8 pt-4">
        <PageHeader
          title="Orders"
          description="Manage customer orders and order status."
        />

        <OrderManager />
      </div>
    </AppShell>
  );
}
