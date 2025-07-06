"use client";
import { useEffect, useState } from "react";
import RestaurantModal from "./RestaurantModal";

interface Restaurant {
  id: number;
  name: string;
  description?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  opening_hours?: any;
  logo_url?: string;
  cover_image_url?: string;
}

export default function RestaurantList() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState<Restaurant | null>(null);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");

  // Fetch restaurants
  useEffect(() => {
    setLoading(true);
    fetch("/api/restaurants", { credentials: "include" })
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then(data => {
        setRestaurants(data);
        setError(null);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Create or edit restaurant
  const handleSave = async (data: Partial<Restaurant>) => {
    setLoading(true);
    try {
      const method = modalMode === "create" ? "POST" : "PATCH";
      const res = await fetch("/api/restaurants", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(modalMode === "edit" ? { ...data, id: editData?.id } : data),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to save");
      // Refetch
      const updated = await fetch("/api/restaurants", { credentials: "include" }).then(r => r.json());
      setRestaurants(updated);
      setModalOpen(false);
      setEditData(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete restaurant
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this restaurant?")) return;
    setLoading(true);
    try {
      const res = await fetch("/api/restaurants", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete");
      setRestaurants(restaurants.filter(r => r.id !== id));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Your Restaurants</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium shadow hover:bg-blue-700"
          onClick={() => {
            setModalMode("create");
            setEditData(null);
            setModalOpen(true);
          }}
        >
          + Create New Restaurant
        </button>
      </div>
      {loading && <div className="text-gray-500">Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      {!loading && !error && restaurants.length === 0 && (
        <div className="text-gray-500">No restaurants found.</div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {restaurants.map(r => (
          <div
            key={r.id}
            className="bg-white rounded-lg shadow p-5 flex flex-col gap-2 hover:shadow-lg transition-shadow focus-within:ring-2 focus-within:ring-blue-400"
            tabIndex={0}
            aria-label={`Restaurant: ${r.name}`}
          >
            <h3 className="text-lg font-bold">{r.name}</h3>
            <p className="text-gray-600 text-sm flex-1">{r.description}</p>
            <div className="flex items-center justify-between mt-2">
              <div className="flex gap-2">
                <button
                  className="text-blue-600 hover:underline text-xs"
                  onClick={() => {
                    setModalMode("edit");
                    setEditData(r);
                    setModalOpen(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="text-gray-500 hover:text-red-600 text-xs"
                  onClick={() => handleDelete(r.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <RestaurantModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initialData={editData || undefined}
        mode={modalMode}
      />
    </section>
  );
} 