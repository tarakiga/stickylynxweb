"use client";
import { useEffect, useState } from "react";
import RestaurantModal from "./RestaurantModal";
import PremiumButton from '../../../components/PremiumButton';
import CategoryCard from '@/components/CategoryCard';
import PremiumModal from '@/components/PremiumModal';
import MenuBuilder, { AddCategoryStepperModal } from './MenuBuilder';
import BottomDrawer from "./BottomDrawer";
import PremiumCardList from '../../../components/PremiumCardList';
import MenuItemForm from '../../../components/MenuItemForm';
import { Link as LinkIcon, QrCode } from 'lucide-react';
import { QRCodeCanvas as QRCode } from 'qrcode.react';

export interface Restaurant {
  id: number;
  name: string;
  description?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  opening_hours?: unknown;
  logo_url?: string;
  cover_image_url?: string;
  slug?: string; // Added slug for preview
}

// Types for menu items and categories
export interface MenuItemPrice {
  label: string;
  price: string | number;
}

export interface MenuItem {
  id?: number;
  name: string;
  description?: string;
  prices: MenuItemPrice[];
  category_id?: number;
}

export interface MenuCategory {
  id?: number;
  name: string;
  description?: string;
  restaurant_id?: number;
}

export default function RestaurantList() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState<Restaurant | null>(null);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [categoryStepperOpen, setCategoryStepperOpen] = useState(false);
  const [categoryModalRestaurantId, setCategoryModalRestaurantId] = useState<number | null>(null);
  const [menuModalOpen, setMenuModalOpen] = useState(false);
  const [menuModalRestaurant, setMenuModalRestaurant] = useState<Restaurant | null>(null);
  const [menuStatus, setMenuStatus] = useState<Record<number, boolean>>({}); // restaurantId -> hasMenu
  const [itemModalOpen, setItemModalOpen] = useState(false);
  const [itemModalData, setItemModalData] = useState<MenuItem | null>(null);
  const [itemModalCatId, setItemModalCatId] = useState<number | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<Restaurant | null>(null);
  const [deleteCounts, setDeleteCounts] = useState<{ categories: number; items: number }>({ categories: 0, items: 0 });
  const [previewSlug, setPreviewSlug] = useState<string | null>(null);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [qrSlug, setQrSlug] = useState<string | null>(null);

  const categories = [
    {
      key: 'food',
      logo: '/assets/images/foodMenu.png',
      title: 'Food Menu',
      description: 'Create and manage your restaurant or food menu.'
    },
    {
      key: 'influencer',
      logo: '/assets/images/influencer.png',
      title: 'Influencer Profile',
      description: 'Showcase your influencer brand and collaborations.'
    },
    {
      key: 'musician',
      logo: '/assets/images/musician.png',
      title: 'Musicians/Bands EPK',
      description: 'Electronic Press Kit for musicians and bands.'
    },
    {
      key: 'film',
      logo: '/assets/images/filmMaker.png',
      title: 'Filmmakers/Actors EPK',
      description: 'Electronic Press Kit for filmmakers and actors.'
    },
    {
      key: 'author',
      logo: '/assets/images/author.png',
      title: 'Authors/Speakers EPK',
      description: 'Electronic Press Kit for authors and speakers.'
    },
    {
      key: 'startup',
      logo: '/assets/images/startup.png',
      title: 'Startups/Businesses EPK',
      description: 'Electronic Press Kit for startups and businesses.'
    },
  ];

  // Fetch restaurants
  useEffect(() => {
    setLoading(true);
    fetch("/api/restaurants", { credentials: "include" })
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then(data => {
        setRestaurants(Array.isArray(data) ? data : []);
        setError(null);
      })
      .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Failed to fetch'))
      .finally(() => setLoading(false));
  }, []);

  // Fetch menu status for all restaurants
  useEffect(() => {
    if (!restaurants.length) return;
    const fetchMenus = async () => {
      const status: Record<number, boolean> = {};
      await Promise.all(
        restaurants.map(async (r) => {
          const cats = await fetch(`/api/menu-categories?restaurant_id=${r.id}`).then(res => res.json());
          status[r.id] = Array.isArray(cats) && cats.length > 0;
        })
      );
      setMenuStatus(status);
    };
    fetchMenus();
  }, [restaurants]);

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
      let saved;
      try {
        saved = await res.json();
      } catch {
        saved = null;
      }
      if (!res.ok || !saved || saved.error) {
        setError(saved?.error || "Failed to save");
        return undefined;
      }
      // Refetch
      const updated = await fetch("/api/restaurants", { credentials: "include" }).then(r => r.json());
      setRestaurants(updated);
      return saved; // return the saved restaurant
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to save');
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  // Delete restaurant
  const handleDelete = async (id: number) => {
    const restaurant = restaurants.find(r => r.id === id) || null;
    setPendingDelete(restaurant);
    setDeleteModalOpen(true);
    // Fetch menu categories and items count for this restaurant
    if (restaurant) {
      const cats = await fetch(`/api/menu-categories?restaurant_id=${restaurant.id}`).then(res => res.json());
      let itemCount = 0;
      for (const cat of cats) {
        const items = await fetch(`/api/menu-items?category_id=${cat.id}`).then(res => res.json());
        itemCount += Array.isArray(items) ? items.length : 0;
      }
      setDeleteCounts({ categories: Array.isArray(cats) ? cats.length : 0, items: itemCount });
    } else {
      setDeleteCounts({ categories: 0, items: 0 });
    }
  };

  async function confirmDelete() {
    if (!pendingDelete) return;
    setDeleteModalOpen(false);
    setLoading(true);
    try {
      const res = await fetch("/api/restaurants", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: pendingDelete.id }),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete");
      setRestaurants(restaurants.filter(r => r.id !== pendingDelete.id));
      setPendingDelete(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to delete');
    } finally {
      setLoading(false);
    }
  }

  function cancelDelete() {
    setDeleteModalOpen(false);
    setPendingDelete(null);
  }

  // Add refetchMenuData to RestaurantList
  const refetchMenuData = () => {
    if (!menuModalRestaurant) return;
    fetch(`/api/menu-categories?restaurant_id=${menuModalRestaurant.id}`)
      .then(r => r.json())
      .then(cats => setMenuStatus((prev) => ({ ...prev, [menuModalRestaurant.id]: Array.isArray(cats) && cats.length > 0 })));
  };

  // Implement handleCatSave with error handling
  const handleCatSave = async (cat: MenuCategory, items: MenuItem[]) => {
    try {
      // Save category first
      const res = await fetch('/api/menu-categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...cat, restaurant_id: menuModalRestaurant?.id }),
      });
      if (!res.ok) {
        const err = await res.json();
        alert(err.error || 'Failed to save category');
        return;
      }
      const savedCat = await res.json();
      // Save items for this category
      console.log('Saving items:', items);
      for (const item of items) {
        // Convert all price values in prices to numbers
        const fixedPrices = (item.prices || []).map((p: MenuItemPrice) => ({
          ...p,
          price: typeof p.price === 'string' ? parseFloat(p.price) : p.price,
        }));
        const itemToSend = { ...item, prices: fixedPrices, category_id: savedCat.id };
        console.log('Posting item:', itemToSend);
        const itemRes = await fetch('/api/menu-items', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(itemToSend),
        });
        if (!itemRes.ok) {
          const err = await itemRes.json();
          alert(err.error || 'Failed to save item');
          return;
        }
      }
      refetchMenuData();
    } catch (err) {
      alert('Unexpected error saving category or items');
      console.error('Unexpected save error:', err);
    }
  };

  function handleCreateMenu(restaurant: Restaurant) {
    setMenuModalRestaurant(restaurant);
    setMenuModalOpen(true);
    setCategoryModalOpen(false);
    setCategoryModalRestaurantId(null);
    setCategoryStepperOpen(false);
    setItemModalOpen(false);
    setItemModalData(null);
    setItemModalCatId(null);
  }

  function handleEdit(restaurant: Restaurant) {
    setModalMode('edit');
    setEditData(restaurant);
    setModalOpen(true);
  }

  function handleView(restaurant: Restaurant) {
    if (restaurant.slug) setPreviewSlug(restaurant.slug);
  }

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Your Lynx</h2>
        <PremiumButton
          variant="secondary"
          icon={null}
          onClick={() => {
            setCategoryModalOpen(true);
            setCategoryModalRestaurantId(null);
            setCategoryStepperOpen(false);
            setMenuModalOpen(false);
            setItemModalOpen(false);
            setItemModalData(null);
            setItemModalCatId(null);
          }}
        >
          {categoryModalRestaurantId ? '+ Add Menu' : '+ Create an item'}
        </PremiumButton>
      </div>
      {loading && <div className="text-gray-500">Loading...</div>}
      {error && (
        <PremiumModal isOpen={!!error} onClose={() => setError(null)}>
          <div className="flex flex-col items-center text-center p-6">
            <div className="mb-4 text-red-600">
              <svg width="48" height="48" fill="none" viewBox="0 0 24 24"><path d="M12 9v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M15 9h.01M9 9h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h2 className="text-xl font-bold mb-2">Failed to Save</h2>
            <p className="mb-4 text-gray-600">{error}</p>
            <button
              className="px-6 py-2 rounded-lg bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition"
              onClick={() => setError(null)}
            >
              Close
            </button>
          </div>
        </PremiumModal>
      )}
      {!loading && !error && (
        <div className="flex flex-col gap-4 w-full">
          {restaurants.map((restaurant: Restaurant) => {
            const hasMenu = menuStatus[restaurant.id];
            return (
              <div className="relative" key={restaurant.id}>
                <PremiumCardList
                  logo={restaurant.logo_url || '/assets/images/foodMenu.png'}
                  name={restaurant.name}
                  onEdit={() => handleEdit(restaurant)}
                  onDelete={() => handleDelete(restaurant.id)}
                  onCreate={() => handleCreateMenu(restaurant)}
                  createLabel={hasMenu ? 'Edit Menu' : '+ Add Menu'}
                  onView={hasMenu ? () => handleView(restaurant) : undefined}
                  extraActions={hasMenu && restaurant.slug ? (
                    <>
                      <button
                        className="p-2 rounded-lg hover:bg-gray-100 transition ml-2"
                        title="Show QR code"
                        onClick={() => setQrSlug(restaurant.slug!)}
                      >
                        <QrCode size={20} />
                      </button>
                      <button
                        className="p-2 rounded-lg hover:bg-gray-100 transition ml-2"
                        title="Copy menu link"
                        onClick={async () => {
                          await navigator.clipboard.writeText(`${window.location.origin}/menu/${restaurant.slug}`);
                          setCopiedSlug(restaurant.slug ? restaurant.slug : null);
                          setTimeout(() => setCopiedSlug(null), 1500);
                        }}
                      >
                        <LinkIcon size={20} />
                      </button>
                      {copiedSlug === restaurant.slug && (
                        <span className="ml-2 bg-black text-white text-xs rounded px-2 py-1 shadow">Link copied!</span>
                      )}
                    </>
                  ) : undefined}
                />
              </div>
            );
          })}
        </div>
      )}
      <RestaurantModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initialData={editData || undefined}
        mode={modalMode}
      />
      {categoryModalOpen && categoryModalRestaurantId === null && (
        <PremiumModal isOpen={categoryModalOpen} onClose={() => setCategoryModalOpen(false)}>
          <h2 className="text-xl font-bold mb-4">What are you creating?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categories.map(cat => (
              <button
                key={cat.key}
                className="text-left focus:outline-none"
                onClick={() => {
                  setCategoryModalRestaurantId(null);
                  setCategoryModalOpen(false);
                  setCategoryStepperOpen(false);
                  if (cat.key === 'food') {
                    setModalMode('create');
                    setEditData(null);
                    setModalOpen(true);
                  } else {
                    // Placeholder for other categories
                    alert(`Form for '${cat.title}' coming soon!`);
                  }
                }}
              >
                <CategoryCard logo={cat.logo} title={cat.title} description={cat.description} />
              </button>
            ))}
          </div>
        </PremiumModal>
      )}
      {/* Menu Drawer */}
      {menuModalOpen && menuModalRestaurant && !categoryModalOpen && !itemModalOpen && (
        <BottomDrawer isOpen={menuModalOpen} onClose={() => { setMenuModalOpen(false); setMenuModalRestaurant(null); }} title={menuModalRestaurant.name + " Menu"}>
          <MenuBuilder
            restaurantId={menuModalRestaurant.id}
            onAddCategory={() => {
              setCategoryModalOpen(false);
              setCategoryModalRestaurantId(menuModalRestaurant.id);
              setCategoryStepperOpen(true);
              setMenuModalOpen(false);
              setItemModalOpen(false);
              setItemModalData(null);
              setItemModalCatId(null);
            }}
            onAddItem={(catId: number) => {
              setItemModalOpen(true);
              setItemModalData(null);
              setItemModalCatId(catId);
              setMenuModalOpen(false);
              setCategoryModalOpen(false);
              setCategoryModalRestaurantId(null);
            }}
            onEditItem={(item: MenuItem, catId: number) => {
              setItemModalOpen(true);
              setItemModalData(item);
              setItemModalCatId(catId);
              setMenuModalOpen(false);
              setCategoryModalOpen(false);
              setCategoryModalRestaurantId(null);
            }}
          />
        </BottomDrawer>
      )}
      {/* Category Stepper Drawer */}
      {categoryStepperOpen && categoryModalRestaurantId && !menuModalOpen && !itemModalOpen && (
        <BottomDrawer isOpen={categoryStepperOpen} onClose={() => {
          setCategoryStepperOpen(false);
          setCategoryModalRestaurantId(null);
          setMenuModalOpen(true);
        }} title="Add Category">
          <AddCategoryStepperModal
            isOpen={categoryStepperOpen}
            onClose={() => {
              setCategoryStepperOpen(false);
              setCategoryModalRestaurantId(null);
              setMenuModalOpen(true);
            }}
            onSave={handleCatSave}
            onCategorySaved={refetchMenuData}
          />
        </BottomDrawer>
      )}
      {/* Item Drawer */}
      {itemModalOpen && itemModalCatId && !menuModalOpen && !categoryModalOpen && (
        <BottomDrawer isOpen={itemModalOpen} onClose={() => {
          setItemModalOpen(false);
          setItemModalData(null);
          setItemModalCatId(null);
          setMenuModalOpen(true);
        }} title={itemModalData ? "Edit Item" : "Add Item"}>
          <MenuItemForm
            initialItem={itemModalData || undefined}
            onSave={async (item) => {
              // POST to /api/menu-items
              await fetch('/api/menu-items', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...item, category_id: itemModalCatId }),
              });
              setItemModalOpen(false);
              setItemModalData(null);
              setItemModalCatId(null);
              setMenuModalOpen(true);
              refetchMenuData();
            }}
            onCancel={() => {
              setItemModalOpen(false);
              setItemModalData(null);
              setItemModalCatId(null);
              setMenuModalOpen(true);
            }}
          />
        </BottomDrawer>
      )}
      {/* Custom Delete Modal */}
      {deleteModalOpen && pendingDelete && (
        <PremiumModal isOpen={deleteModalOpen} onClose={cancelDelete}>
          <div className="flex flex-col items-center text-center p-4">
            <div className="mb-4 text-red-600">
              <svg width="48" height="48" fill="none" viewBox="0 0 24 24"><path d="M12 9v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M15 9h.01M9 9h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h2 className="text-xl font-bold mb-2">Delete &quot;{pendingDelete.name}&quot;?</h2>
            <p className="mb-2 text-gray-600">This action <span className="text-red-600 font-semibold">cannot be undone</span>.</p>
            <p className="mb-2 text-gray-600">Deleting this Lynx will also delete:</p>
            <ul className="mb-6 text-gray-700 text-sm list-disc list-inside">
              <li><span className="font-semibold">{deleteCounts.categories}</span> menu categor{deleteCounts.categories === 1 ? 'y' : 'ies'}</li>
              <li><span className="font-semibold">{deleteCounts.items}</span> menu item{deleteCounts.items === 1 ? '' : 's'}</li>
            </ul>
            <div className="flex gap-4 justify-center">
              <button
                className="px-6 py-2 rounded-lg bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition"
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition shadow"
                onClick={confirmDelete}
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </PremiumModal>
      )}
      {/* Frontend Preview Modal */}
      {previewSlug && (
        <PremiumModal isOpen={!!previewSlug} onClose={() => setPreviewSlug(null)}>
          <div className="w-full max-w-3xl h-[80vh] flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-lg">Frontend Preview</span>
              <button className="text-gray-500 hover:text-gray-800" onClick={() => setPreviewSlug(null)}>Close</button>
            </div>
            <iframe
              src={`/menu/${previewSlug}`}
              className="flex-1 w-full rounded-xl border"
              style={{ minHeight: 400 }}
              title="Frontend Preview"
            />
          </div>
        </PremiumModal>
      )}
      {/* QR Code Modal */}
      {qrSlug && (
        <PremiumModal isOpen={!!qrSlug} onClose={() => setQrSlug(null)}>
          <div className="flex flex-col items-center justify-center p-6">
            <h2 className="text-lg font-semibold mb-4">Scan to view menu</h2>
            <QRCode value={`${window.location.origin}/menu/${qrSlug}`} size={200} />
            <div className="mt-4 text-gray-500 text-sm">{window.location.origin}/menu/{qrSlug}</div>
            <button className="mt-6 px-6 py-2 rounded-lg bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition" onClick={() => setQrSlug(null)}>Close</button>
          </div>
        </PremiumModal>
      )}
    </section>
  );
} 