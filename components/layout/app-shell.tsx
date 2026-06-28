import { Sidebar } from "./sidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex flex-col md:flex-row">
        <Sidebar />
        <main className="min-h-screen flex-1">
          <div className="p-4 md:p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
