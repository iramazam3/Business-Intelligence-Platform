"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ConfirmModal } from "@/components/ui/confirm-modal";

type Customer = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  region: string;
};

const emptyForm = {
  name: "",
  company: "",
  email: "",
  phone: "",
  region: "",
};

export function CustomerManager() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function fetchCustomers() {
    try {
      const res = await fetch("/api/customers");

      if (!res.ok) {
        throw new Error("Failed to fetch customers");
      }

      const data = await res.json();
      setCustomers(data);
    } catch {
      toast.error("Something went wrong while loading customers.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function loadCustomers() {
      await fetchCustomers();
    }

    loadCustomers();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setSaving(true);

      const url = editingId ? `/api/customers/${editingId}` : "/api/customers";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Save failed");
      }

      toast.success(
        editingId
          ? "Customer updated successfully."
          : "Customer added successfully.",
      );

      setForm(emptyForm);
      setEditingId(null);
      fetchCustomers();
    } catch {
      toast.error("Something went wrong while saving the customer.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteId) return;

    try {
      const res = await fetch(`/api/customers/${deleteId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      toast.success("Customer deleted successfully.");
      setDeleteId(null);
      fetchCustomers();
    } catch {
      toast.error("Something went wrong while deleting the customer.");
    }
  }

  const filteredCustomers = customers.filter((customer) =>
    `${customer.name} ${customer.company} ${customer.email} ${customer.region}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit}
        className="grid gap-4 rounded-xl border border-slate-200 bg-white p-6 md:grid-cols-2"
      >
        <input
          className="rounded-lg border p-2"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          className="rounded-lg border p-2"
          placeholder="Company"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          required
        />

        <input
          className="rounded-lg border p-2"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          className="rounded-lg border p-2"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          required
        />

        <input
          className="rounded-lg border p-2"
          placeholder="Region"
          value={form.region}
          onChange={(e) => setForm({ ...form, region: e.target.value })}
          required
        />

        <button
          disabled={saving}
          className="rounded-lg bg-slate-900 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving
            ? "Saving..."
            : editingId
              ? "Update Customer"
              : "Add Customer"}
        </button>
      </form>

      <input
        className="w-full rounded-lg border border-slate-200 p-3"
        placeholder="Search customers..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        {loading ? (
          <p className="p-6 text-slate-500">Loading customers...</p>
        ) : filteredCustomers.length === 0 ? (
          <p className="p-6 text-slate-500">No customers found.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100 text-slate-600">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Company</th>
                <th className="p-3">Email</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Region</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="border-t">
                  <td className="p-3">{customer.name}</td>
                  <td className="p-3">{customer.company}</td>
                  <td className="p-3">{customer.email}</td>
                  <td className="p-3">{customer.phone}</td>
                  <td className="p-3">{customer.region}</td>
                  <td className="space-x-2 p-3">
                    <button
                      className="text-emerald-600"
                      onClick={() => {
                        setEditingId(customer.id);
                        setForm({
                          name: customer.name,
                          company: customer.company,
                          email: customer.email,
                          phone: customer.phone,
                          region: customer.region,
                        });
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="text-red-600"
                      onClick={() => setDeleteId(customer.id)}
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
        title="Delete Customer"
        description="Are you sure you want to delete this customer? This action cannot be undone."
        confirmText="Delete Customer"
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
