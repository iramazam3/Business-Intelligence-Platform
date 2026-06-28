"use client";

import Image from "next/image";
import Link from "next/link";
import { BarChart3, Database, LineChart, ShieldCheck } from "lucide-react";
import {
  Bar,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const previewData = [
  { month: "Jan", revenue: 40, growth: 45 },
  { month: "Feb", revenue: 65, growth: 58 },
  { month: "Mar", revenue: 50, growth: 62 },
  { month: "Apr", revenue: 80, growth: 70 },
  { month: "May", revenue: 70, growth: 76 },
  { month: "Jun", revenue: 95, growth: 88 },
  { month: "Jul", revenue: 75, growth: 92 },
  { month: "Aug", revenue: 110, growth: 108 },
];

const features = [
  {
    title: "Centralized Operations",
    description:
      "Manage customers, products, and orders from a centralized platform.",
    icon: Database,
  },
  {
    title: "Sales Analytics",
    description:
      "Monitor revenue, order trends, customer activity, and product performance with real-time metrics.",
    icon: BarChart3,
  },
  {
    title: "Interactive Dashboards",
    description:
      "Visualize KPIs, revenue trends, and operational insights through interactive dashboards.",
    icon: LineChart,
  },
  {
    title: "Scalable Data Platform",
    description:
      "Powered by PostgreSQL and Prisma with a scalable relational database architecture.",
    icon: ShieldCheck,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-7xl px-6 pt-8 pb-20">
        <nav className="mb-8">
          <Image
            src="/logo_dark.png"
            alt="Catalyst Logo"
            width={260}
            height={72}
            priority
          />
        </nav>

        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="max-w-3xl text-5xl font-bold tracking-tight">
              Transform business data into actionable insights.
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Catalyst helps AI SaaS companies manage customers, products, and
              orders while turning business data into actionable insights
              through interactive dashboards and analytics.
            </p>

            <Link
              href="/dashboard"
              className="mt-8 inline-block rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-500"
            >
              View Dashboard
            </Link>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <div className="h-72 rounded-xl bg-slate-800 p-4">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={previewData}>
                  <XAxis hide />
                  <YAxis hide />

                  <Tooltip cursor={false} content={() => null} />

                  <Bar
                    dataKey="revenue"
                    fill="#10b981"
                    radius={[6, 6, 0, 0]}
                    barSize={24}
                  />

                  <Line
                    type="monotone"
                    dataKey="growth"
                    stroke="#ffffff"
                    strokeWidth={3}
                    dot={false}
                    activeDot={false}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <section className="mt-24 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-xl border border-slate-800 bg-slate-900 p-6"
              >
                <Icon className="mb-4 text-emerald-400" size={28} />
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </section>
      </section>

      <footer className="border-t border-slate-800 px-6 py-6 text-center text-sm text-slate-500">
        Catalyst © 2026.
      </footer>
    </main>
  );
}
