import Image from "next/image";
import Link from "next/link";
import { Boxes, LayoutDashboard, ShoppingCart, Users } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/customers", label: "Customers", icon: Users },
  { href: "/products", label: "Products", icon: Boxes },
  { href: "/orders", label: "Orders", icon: ShoppingCart },
];

export function Sidebar() {
  return (
    <aside className="w-full border-b border-slate-200 bg-white px-4 py-4 md:min-h-screen md:w-64 md:border-b-0 md:border-r md:py-6">
      <div className="mb-4 md:mb-8">
        <Link href="/" className="mb-8 block">
          <Image
            src="/logo_light.png"
            alt="Catalyst"
            width={260}
            height={72}
            priority
          />
        </Link>
      </div>

      <nav className="flex gap-2 overflow-x-auto md:block md:space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
