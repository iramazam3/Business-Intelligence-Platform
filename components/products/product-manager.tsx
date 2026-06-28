"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ConfirmModal } from "@/components/ui/confirm-modal";

type Product = {
  id: string;
  name: string;
  category: string;
  price: string;
  stockQuantity: number;
};

const emptyForm = {
  name: "",
  category: "",
  price: "",
  stockQuantity: "",
};

export function ProductManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function fetchProducts() {
    try {
      const res = await fetch("/api/products");

      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await res.json();
      setProducts(data);
    } catch {
      toast.error("Something went wrong while loading products.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function loadProducts() {
      await fetchProducts();
    }

    loadProducts();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setSaving(true);

      const url = editingId ? `/api/products/${editingId}` : "/api/products";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          category: form.category,
          price: Number(form.price),
          stockQuantity: Number(form.stockQuantity),
        }),
      });

      if (!res.ok) {
        throw new Error("Save failed");
      }

      toast.success(
        editingId
          ? "Product updated successfully."
          : "Product added successfully.",
      );

      setForm(emptyForm);
      setEditingId(null);
      fetchProducts();
    } catch {
      toast.error("Something went wrong while saving the product.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteId) return;

    try {
      const res = await fetch(`/api/products/${deleteId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      toast.success("Product deleted successfully.");
      setDeleteId(null);
      fetchProducts();
    } catch {
      toast.error("Something went wrong while deleting the product.");
    }
  }

  const filteredProducts = products.filter((product) =>
    `${product.name} ${product.category}`
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
          placeholder="Product name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          className="rounded-lg border p-2"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        />

        <input
          className="rounded-lg border p-2"
          placeholder="Price"
          type="number"
          min="0"
          step="0.01"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />

        <input
          className="rounded-lg border p-2"
          placeholder="Stock quantity"
          type="number"
          min="0"
          value={form.stockQuantity}
          onChange={(e) => setForm({ ...form, stockQuantity: e.target.value })}
          required
        />

        <button
          disabled={saving}
          className="rounded-lg bg-slate-900 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? "Saving..." : editingId ? "Update Product" : "Add Product"}
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
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        {loading ? (
          <p className="p-6 text-slate-500">Loading products...</p>
        ) : filteredProducts.length === 0 ? (
          <p className="p-6 text-slate-500">No products found.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100 text-slate-600">
              <tr>
                <th className="p-3">Product</th>
                <th className="p-3">Category</th>
                <th className="p-3">Price</th>
                <th className="p-3">Stock</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-t">
                  <td className="p-3 font-medium text-slate-900">
                    {product.name}
                  </td>
                  <td className="p-3">{product.category}</td>
                  <td className="p-3">${Number(product.price).toFixed(2)}</td>
                  <td className="p-3">{product.stockQuantity}</td>
                  <td className="space-x-2 p-3">
                    <button
                      className="text-emerald-600"
                      onClick={() => {
                        setEditingId(product.id);
                        setForm({
                          name: product.name,
                          category: product.category,
                          price: String(product.price),
                          stockQuantity: String(product.stockQuantity),
                        });
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="text-red-600"
                      onClick={() => setDeleteId(product.id)}
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
        title="Delete Product"
        description="Are you sure you want to delete this product? This action cannot be undone."
        confirmText="Delete Product"
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
