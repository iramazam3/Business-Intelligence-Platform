import { ProductManager } from "@/components/products/product-manager";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/ui/page-header";

export default function ProductsPage() {
  return (
    <AppShell>
      <div className="space-y-8 pt-4">
        <PageHeader
          title="Products"
          description="Manage AI SaaS products and pricing."
        />

        <ProductManager />
      </div>
    </AppShell>
  );
}
