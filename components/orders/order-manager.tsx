"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ConfirmModal } from "@/components/ui/confirm-modal";
import { formatCurrency, formatDate } from "@/lib/format";

type Customer = {
  id: string;
  name: string;
  company: string;
};

type Product = {
  id: string;
  name: string;
  price: string;
};

type Order = {
  id: string;
  quantity: number;
  unitPrice: string;
  totalAmount: string;
  status: "Pending" | "Completed" | "Cancelled";
  orderDate: string;
  customer: Customer;
  product: Product;
};

const emptyForm = {
  customerId: "",
  productId: "",
  quantity: "1",
  status: "Pending",
};

export function OrderManager() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function fetchData() {
    try {
      const [ordersRes, customersRes, productsRes] = await Promise.all([
        fetch("/api/orders"),
        fetch("/api/customers"),
        fetch("/api/products"),
      ]);

      if (!ordersRes.ok || !customersRes.ok || !productsRes.ok) {
        throw new Error("Failed to fetch order data");
      }

      const [ordersData, customersData, productsData] = await Promise.all([
        ordersRes.json(),
        customersRes.json(),
        productsRes.json(),
      ]);

      setOrders(ordersData);
      setCustomers(customersData);
      setProducts(productsData);
    } catch {
      toast.error("Something went wrong while loading orders.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function loadData() {
      await fetchData();
    }

    loadData();
  }, []);

  const selectedProduct = products.find(
    (product) => product.id === form.productId,
  );

  const calculatedTotal =
    selectedProduct && form.quantity
      ? Number(selectedProduct.price) * Number(form.quantity)
      : 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setSaving(true);

      const url = editingId ? `/api/orders/${editingId}` : "/api/orders";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerId: form.customerId,
          productId: form.productId,
          quantity: Number(form.quantity),
          status: form.status,
        }),
      });

      if (!res.ok) {
        throw new Error("Save failed");
      }

      toast.success(
        editingId
          ? "Order status updated successfully."
          : "Order added successfully.",
      );

      setForm(emptyForm);
      setEditingId(null);
      fetchData();
    } catch {
      toast.error("Something went wrong while saving the order.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteId) return;

    try {
      const res = await fetch(`/api/orders/${deleteId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      toast.success("Order deleted successfully.");
      setDeleteId(null);
      fetchData();
    } catch {
      toast.error("Something went wrong while deleting the order.");
    }
  }

  const filteredOrders = orders.filter((order) =>
    `${order.customer.company} ${order.customer.name} ${order.product.name} ${order.status}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit}
        className="grid gap-4 rounded-xl border border-slate-200 bg-white p-6 md:grid-cols-2"
      >
        {!editingId && (
          <>
            <select
              className="rounded-lg border p-2"
              value={form.customerId}
              onChange={(e) => setForm({ ...form, customerId: e.target.value })}
              required
            >
              <option value="">Select customer</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.company} — {customer.name}
                </option>
              ))}
            </select>

            <select
              className="rounded-lg border p-2"
              value={form.productId}
              onChange={(e) => setForm({ ...form, productId: e.target.value })}
              required
            >
              <option value="">Select product</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} (${Number(product.price).toFixed(2)})
                </option>
              ))}
            </select>

            <input
              className="rounded-lg border p-2"
              type="number"
              min="1"
              placeholder="Quantity"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
              required
            />

            <div className="rounded-lg border bg-slate-50 p-2 text-slate-700">
              Total: {formatCurrency(calculatedTotal)}
            </div>
          </>
        )}

        <select
          className="rounded-lg border p-2"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          required
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <button
          disabled={saving}
          className="rounded-lg bg-slate-900 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving
            ? "Saving..."
            : editingId
              ? "Update Order Status"
              : "Add Order"}
        </button>

        {editingId && (
          <button
            type="button"
            className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700"
            onClick={() => {
              setEditingId(null);
              setForm(emptyForm);
            }}
          >
            Cancel Edit
          </button>
        )}
      </form>

      <input
        className="w-full rounded-lg border border-slate-200 p-3"
        placeholder="Search orders..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        {loading ? (
          <p className="p-6 text-slate-500">Loading orders...</p>
        ) : filteredOrders.length === 0 ? (
          <p className="p-6 text-slate-500">No orders found.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100 text-slate-600">
              <tr>
                <th className="p-3">Customer</th>
                <th className="p-3">Product</th>
                <th className="p-3">Quantity</th>
                <th className="p-3">Unit Price</th>
                <th className="p-3">Total</th>
                <th className="p-3">Status</th>
                <th className="p-3">Order Date</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-t">
                  <td className="p-3">
                    <p className="font-medium text-slate-900">
                      {order.customer.company}
                    </p>
                    <p className="text-xs text-slate-500">
                      {order.customer.name}
                    </p>
                  </td>

                  <td className="p-3">{order.product.name}</td>
                  <td className="p-3">{order.quantity}</td>
                  <td className="p-3">
                    {formatCurrency(Number(order.unitPrice))}
                  </td>
                  <td className="p-3 font-medium">
                    {formatCurrency(Number(order.totalAmount))}
                  </td>
                  <td className="p-3">{order.status}</td>
                  <td className="p-3">{formatDate(order.orderDate)}</td>

                  <td className="space-x-2 p-3">
                    <button
                      className="text-emerald-600"
                      onClick={() => {
                        setEditingId(order.id);
                        setForm({
                          customerId: "",
                          productId: "",
                          quantity: String(order.quantity),
                          status: order.status,
                        });
                      }}
                    >
                      Edit Status
                    </button>

                    <button
                      className="text-red-600"
                      onClick={() => setDeleteId(order.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <ConfirmModal
        open={!!deleteId}
        title="Delete Order"
        description="Are you sure you want to delete this order? This action cannot be undone."
        confirmText="Delete Order"
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
