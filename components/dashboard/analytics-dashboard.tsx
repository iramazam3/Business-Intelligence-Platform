"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatCurrency } from "@/lib/format";

type Analytics = {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  totalCustomers: number;
  totalProducts: number;
  monthlyRevenue: { month: string; revenue: number }[];
  revenueByProduct: { product: string; revenue: number }[];
  topCustomers: { customer: string; revenue: number }[];
  ordersByStatus: { status: string; count: number }[];
  highestRevenueProduct: { product: string; revenue: number } | null;
  bestCustomer: { customer: string; revenue: number } | null;
  pendingOrders: number;
  revenueTrend: number;
};

export function AnalyticsDashboard() {
  const [data, setData] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnalytics() {
      const res = await fetch("/api/analytics");
      const analytics = await res.json();
      setData(analytics);
      setLoading(false);
    }

    fetchAnalytics();
  }, []);

  if (loading) {
    return <p className="text-slate-500">Loading analytics...</p>;
  }

  if (!data) {
    return <p className="text-red-500">Failed to load analytics.</p>;
  }

  const kpis = [
    { label: "Total Revenue", value: formatCurrency(data.totalRevenue) },
    { label: "Total Orders", value: data.totalOrders },
    {
      label: "Average Order Value",
      value: formatCurrency(data.averageOrderValue),
    },
    { label: "Total Customers", value: data.totalCustomers },
    { label: "Total Products", value: data.totalProducts },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="rounded-xl border border-slate-200 bg-white p-5"
          >
            <p className="text-sm text-slate-500">{kpi.label}</p>
            <p className="mt-3 text-2xl font-bold text-slate-900">
              {kpi.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h3 className="font-semibold text-slate-900">Monthly Revenue</h3>
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.monthlyRevenue}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#059669"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h3 className="font-semibold text-slate-900">Revenue by Product</h3>
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.revenueByProduct.slice(0, 8)}>
                <XAxis dataKey="product" hide />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Bar dataKey="revenue" fill="#059669" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h3 className="font-semibold text-slate-900">Top Customers</h3>
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.topCustomers}>
                <XAxis dataKey="customer" hide />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Bar dataKey="revenue" fill="#314158" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h3 className="font-semibold text-slate-900">Orders by Status</h3>
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.ordersByStatus}
                  dataKey="count"
                  nameKey="status"
                  outerRadius={100}
                  label
                >
                  {data.ordersByStatus.map((_, index) => (
                    <Cell
                      key={index}
                      fill={
                        [
                          "#f59e0b", // Completed
                          "#059669", // Pending
                          "#ef4444", // Cancelled
                        ][index]
                      }
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h3 className="font-semibold text-slate-900">Business Insights</h3>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <p className="rounded-lg bg-slate-50 p-4 text-sm text-slate-700">
            Highest revenue product:{" "}
            <strong>{data.highestRevenueProduct?.product ?? "N/A"}</strong>
          </p>

          <p className="rounded-lg bg-slate-50 p-4 text-sm text-slate-700">
            Best customer by revenue:{" "}
            <strong>{data.bestCustomer?.customer ?? "N/A"}</strong>
          </p>

          <p className="rounded-lg bg-slate-50 p-4 text-sm text-slate-700">
            Pending orders: <strong>{data.pendingOrders}</strong>
          </p>

          <p className="rounded-lg bg-slate-50 p-4 text-sm text-slate-700">
            Revenue trend vs previous month:{" "}
            <strong>{data.revenueTrend}%</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
