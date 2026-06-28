import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-400">
          404 Error
        </p>

        <h1 className="mt-4 text-5xl font-bold">Page not found</h1>

        <p className="mt-4 text-slate-400">
          The page you are looking for does not exist in Catalyst.
        </p>

        <Link
          href="/dashboard"
          className="mt-8 inline-block rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-200"
        >
          Back to Dashboard
        </Link>
      </div>
    </main>
  );
}
