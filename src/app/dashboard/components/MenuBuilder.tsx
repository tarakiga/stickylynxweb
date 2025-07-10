"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import PremiumButton from '../../../components/PremiumButton';
import PremiumInput from '../../../components/PremiumInput';
import PremiumTextArea from '../../../components/PremiumTextArea';
import BottomDrawer from "./BottomDrawer";
import { Check, X, Pencil, Trash2 } from 'lucide-react';
import PremiumModal from '../../../components/PremiumModal';

// Types for menu builder
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
  isPending?: boolean;
}

function AddCategoryStepperModal({ isOpen, onClose, onSave, onCategorySaved }: { isOpen: boolean, onClose: () => void, onSave: (cat: MenuCategory, items: MenuItem[]) => void, onCategorySaved?: () => void }) {
  const [categoryName, setCategoryName] = useState('');
  const [categoryDesc, setCategoryDesc] = useState('');
  const [items, setItems] = useState<MenuItem[]>([]);
  const [currentItem, setCurrentItem] = useState<MenuItem>({ name: '', description: '', prices: [{ label: '', price: '' }] });
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [itemError, setItemError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Drawer header content (reverted to original)
  const header = (
    <div className="flex items-center w-full gap-4">
      <PremiumInput
        label="Category Name"
        value={categoryName}
        onChange={e => setCategoryName(e.target.value)}
        required
        className="max-w-xs flex-1"
      />
      <div className="flex-1" />
      <div className="text-sm text-gray-500 whitespace-nowrap ml-auto">Item {currentItemIndex + 1} of {items.length + 1}</div>
    </div>
  );

  // Save current item to items array
  const saveCurrentItem = () => {
    if (!currentItem.name.trim()) {
      setItemError('Item name is required.');
      return false;
    }
    if (!currentItem.prices || !currentItem.prices.length || currentItem.prices.some((p: MenuItemPrice) => !p.label.trim() || !p.price)) {
      setItemError('Each item must have at least one price with label and value.');
      return false;
    }
    setItemError(null);
    setItems(prev => {
      const updated = [...prev];
      updated[currentItemIndex] = { ...currentItem };
      return updated;
    });
    return true;
  };

  // Add or go to next item
  const handleAddItem = () => {
    if (!saveCurrentItem()) return;
    setItems(prev => [...prev, { name: '', description: '', prices: [{ label: '', price: '' }] }]);
    setCurrentItem({ name: '', description: '', prices: [{ label: '', price: '' }] });
    setCurrentItemIndex(items.length); // new item will be at the end
  };

  // Go back to previous item
  const handleBack = () => {
    if (currentItemIndex === 0) return;
    if (!saveCurrentItem()) return;
    setCurrentItemIndex(idx => {
      setCurrentItem(items[idx - 1]);
      return idx - 1;
    });
  };

  // Go to next created item
  const handleNext = () => {
    if (!saveCurrentItem()) return;
    if (currentItemIndex < items.length - 1) {
      setCurrentItemIndex(idx => {
        setCurrentItem(items[idx + 1]);
        return idx + 1;
      });
    } else {
      setItems(prev => [...prev, { name: '', description: '', prices: [{ label: '', price: '' }] }]);
      setCurrentItem({ name: '', description: '', prices: [{ label: '', price: '' }] });
      setCurrentItemIndex(items.length); // new item will be at the end
    }
  };

  // Save category and all items
  const handleSaveCategory = () => {
    if (!categoryName.trim()) return;
    if (!saveCurrentItem()) return;
    // Locally build the updated items array
    const updated = [...items];
    updated[currentItemIndex] = { ...currentItem };
    onSave({ name: categoryName, description: categoryDesc }, updated.filter(i => i && i.name && i.prices && i.prices.length));
    if (onCategorySaved) onCategorySaved();
    onClose();
    // Reset state after a short delay to avoid state update on unmounted component
    setTimeout(() => {
      setCategoryName('');
      setCategoryDesc('');
      setItems([]);
      setCurrentItem({ name: '', description: '', prices: [{ label: '', price: '' }] });
      setCurrentItemIndex(0);
    }, 0);
  };

  useEffect(() => {
    // When modal opens, reset state
    if (isOpen) {
      setCategoryName(''); setCategoryDesc(''); setItems([]); setCurrentItem({ name: '', description: '', prices: [{ label: '', price: '' }] }); setCurrentItemIndex(0);
    }
  }, [isOpen]);

  return (
    <BottomDrawer isOpen={isOpen} onClose={onClose} title={header}>
      <div className="flex flex-col gap-6 min-w-[400px] max-w-2xl">
        <form ref={formRef} className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={e => { e.preventDefault(); handleAddItem(); }}>
          <div className="flex flex-col gap-4">
            <PremiumInput label="Item Name" value={currentItem.name} onChange={e => setCurrentItem((i) => ({ ...i, name: e.target.value }))} required />
            <PremiumTextArea label="Description" value={currentItem.description} onChange={e => setCurrentItem((i) => ({ ...i, description: e.target.value }))} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Prices (add one or more)</label>
            {(currentItem.prices || []).map((p: MenuItemPrice, idx: number) => (
              <div key={idx} className="flex gap-2 items-center">
                <PremiumInput label={idx === 0 ? 'Option' : ''} value={p.label || ''} onChange={e => {
                  const next = [...(currentItem.prices || [])];
                  next[idx] = { ...next[idx], label: e.target.value };
                  setCurrentItem((i) => ({ ...i, prices: next }));
                }} placeholder="e.g. Small, Medium, Large" />
                <PremiumInput label={idx === 0 ? 'Price' : ''} type="number" value={p.price || ''} onChange={e => {
                  const next = [...(currentItem.prices || [])];
                  next[idx] = { ...next[idx], price: e.target.value };
                  setCurrentItem((i) => ({ ...i, prices: next }));
                }} placeholder="Price" />
                <button type="button" className="text-red-500 px-2 py-1 rounded hover:bg-red-50" onClick={() => {
                  setCurrentItem((i) => ({ ...i, prices: (i.prices || []).filter((_: MenuItemPrice, i2: number) => i2 !== idx) }));
                }} aria-label="Remove price option" disabled={(currentItem.prices || []).length === 1}>&minus;</button>
              </div>
            ))}
            <button type="button" className="text-yellow-600 px-2 py-1 rounded hover:bg-yellow-50 w-fit mt-1" onClick={() => {
              setCurrentItem((i) => ({ ...i, prices: [...(i?.prices || []), { label: '', price: '' }] }));
            }} aria-label="Add price option">+ Add Price Option</button>
          </div>
          {itemError && <div className="col-span-2 text-red-600 text-sm">{itemError}</div>}
        </form>
      </div>
      {/* Bottom actions */}
      <div className="flex justify-between mt-6">
        {currentItemIndex > 0 ? (
          <PremiumButton variant="secondary" onClick={handleBack}>← Back</PremiumButton>
        ) : <div />}
        <div className="flex gap-2">
          {currentItemIndex < items.length ? (
            <PremiumButton variant="primary" onClick={handleNext}>Next →</PremiumButton>
          ) : (
            <PremiumButton variant="primary" onClick={handleAddItem}>+ Add Item</PremiumButton>
          )}
          <PremiumButton variant="primary" onClick={handleSaveCategory}>Save Category</PremiumButton>
        </div>
      </div>
    </BottomDrawer>
  );
}

export default function MenuBuilder({ restaurantId, onAddCategory, onAddItem, onEditItem }: {
  restaurantId: number,
  onAddCategory: () => void,
  onAddItem: (catId: number) => void,
  onEditItem: (item: MenuItem, catId: number) => void
}) {
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingCatId, setEditingCatId] = useState<number | null>(null);
  const [tempCatName, setTempCatName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  // Removed unused setOptimisticCategories and setAddCatError
  const [deleteModal, setDeleteModal] = useState<{ type: 'category' | 'item'; id: number; name: string; itemCount?: number } | null>(null);

  // Fetch categories and items
  const refetchMenuData = useCallback(() => {
    if (!restaurantId) return;
    setLoading(true);
    Promise.all([
      fetch(`/api/menu-categories?restaurant_id=${restaurantId}`).then(r => r.json()),
      fetch(`/api/menu-items`).then(r => r.json()),
    ])
      .then(([cats, its]) => {
        setCategories(Array.isArray(cats) ? cats : []);
        setItems(Array.isArray(its) ? its : []);
        setError(null);
      })
      .catch(() => setError("Failed to fetch menu data"))
      .finally(() => setLoading(false));
  }, [restaurantId]);

  useEffect(() => {
    refetchMenuData();
  }, [restaurantId, refetchMenuData]);

  // Filter items by category
  const getItemsForCategory = (catId: number) => items.filter((i) => i.category_id === catId);

  // Delete Item
  const handleItemDelete = (itemId: number) => {
    const item = items.find(i => i.id === itemId);
    if (!item) return;
    setDeleteModal({ type: 'item', id: itemId, name: item.name });
  };

  // Inline edit save handler
  const handleCatNameSave = async (catId: number) => {
    const trimmed = tempCatName.trim();
    if (!trimmed) return;
    // Optimistically update UI
    setCategories(cats => cats.map(c => (c.id ?? -1) === (catId ?? -1) ? { ...c, name: trimmed } : c));
    setEditingCatId(null);
    // Persist to backend
    await fetch('/api/menu-categories', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: catId ?? -1, name: trimmed }),
    });
    refetchMenuData();
  };

  // Optimistic add category handler
  // Removed handleOptimisticAddCategory as it is unused

  const handleCategoryDelete = (catId: number) => {
    const cat = categories.find(c => c.id === catId);
    if (!cat) return;
    const itemCount = items.filter(i => i.category_id === catId).length;
    setDeleteModal({ type: 'category', id: catId, name: cat.name, itemCount });
  };
  const confirmDelete = async () => {
    if (!deleteModal) return;
    if (deleteModal.type === 'category') {
      await fetch('/api/menu-categories', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: deleteModal.id }),
      });
      setCategories(prev => prev.filter(c => c.id !== deleteModal.id));
      setItems(prev => prev.filter(i => i.category_id !== deleteModal.id));
    } else if (deleteModal.type === 'item') {
      await fetch('/api/menu-items', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: deleteModal.id }),
      });
      setItems(prev => prev.filter(i => i.id !== deleteModal.id));
    }
    setDeleteModal(null);
  };
  const cancelDelete = () => setDeleteModal(null);

  return (
    <section className="flex flex-col h-full min-h-0">
      <h3 className="text-lg font-semibold mb-4">Menu Builder</h3>
      <div className="flex-1 min-h-0 flex flex-col">
        <div className="flex-1 min-h-0 overflow-y-auto pr-2">
          {loading && categories.length === 0 ? (
            <div className="flex flex-col items-center gap-4">
              <PremiumButton variant="primary" onClick={onAddCategory} disabled={loading}>
                + Add Category
                <span className="ml-2 animate-spin">{/* spinner icon here if desired */}</span>
              </PremiumButton>
              <div className="text-gray-400 text-sm">Loading menu...</div>
            </div>
          ) : loading ? (
            <div className="text-gray-500">Loading menu...</div>
          ) : error ? (
            <div className="text-red-600">{error}</div>
          ) : (
            <div className="space-y-6">
              {categories.map((cat: MenuCategory) => (
                <div key={cat.id} className="bg-white rounded-xl shadow p-4 opacity-100 relative border border-black">
                  {/* Removed isPending UI as optimisticCategories is not used */}
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2 min-w-0">
                      {editingCatId === cat.id ? (
                        <>
                          <PremiumInput
                            label="Category Name"
                            value={tempCatName}
                            onChange={e => setTempCatName(e.target.value)}
                            className="max-w-xs flex-1"
                            ref={inputRef}
                            onKeyDown={e => {
                              if (e.key === 'Escape') { setEditingCatId(null); setTempCatName(''); }
                              if (e.key === 'Enter') { handleCatNameSave(cat.id ?? -1); }
                            }}
                          />
                          <button
                            type="button"
                            aria-label="Save category name"
                            className="p-1 rounded hover:bg-green-100 transition ml-1"
                            onClick={() => handleCatNameSave(cat.id ?? -1)}
                          >
                            <Check size={20} className="text-green-600" />
                          </button>
                          <button
                            type="button"
                            aria-label="Cancel editing category name"
                            className="p-1 rounded hover:bg-red-100 transition"
                            onClick={() => { setEditingCatId(null); setTempCatName(''); }}
                          >
                            <X size={20} className="text-red-500" />
                          </button>
                        </>
                      ) : (
                        <>
                          <span className="font-bold text-blue-900 text-base truncate max-w-xs" title={cat.name}>{cat.name}</span>
                          <button
                            type="button"
                            aria-label="Edit category name"
                            className="p-1 rounded hover:bg-yellow-100 transition"
                            onClick={() => { setEditingCatId(cat.id ?? -1); setTempCatName(cat.name); setTimeout(() => { inputRef.current?.focus(); inputRef.current?.select(); }, 0); }}
                          >
                            <Pencil size={18} className="text-yellow-600" />
                          </button>
                          {/* Delete button for category */}
                          {!cat.isPending && (
                            <button
                              type="button"
                              aria-label="Delete category"
                              className="p-1 rounded hover:bg-red-100 transition"
                              onClick={() => handleCategoryDelete(cat.id ?? -1)}
                            >
                              <Trash2 size={18} className="text-red-500" />
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                  <div className="text-gray-500 text-sm mb-2">{cat.description}</div>
                  <div className="space-y-2">
                    {getItemsForCategory(cat.id ?? -1).map(item => (
                      <div key={item.id ?? Math.random()} className="bg-gray-50 rounded p-3 flex justify-between items-center">
                        <div>
                          <div className="font-medium text-gray-900">{item.name}</div>
                          <div className="text-xs text-gray-500 whitespace-normal break-words w-full min-w-0">{item.description}</div>
                          {item.prices && item.prices.length > 0 && (
                            <div className="flex gap-2 mt-1">
                              {item.prices.map((p: MenuItemPrice, idx: number) => (
                                <span key={idx} className="bg-yellow-100 text-yellow-800 rounded px-2 py-0.5 text-xs">{p.label}: ${p.price}</span>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2 ml-2">
                          <button
                            type="button"
                            aria-label="Edit item"
                            className="p-2 rounded-lg hover:bg-yellow-100 transition"
                            onClick={() => onEditItem(item, cat.id ?? -1)}
                          >
                            <Pencil size={18} className="text-yellow-600" />
                          </button>
                          <button
                            type="button"
                            aria-label="Delete item"
                            className="p-2 rounded-lg hover:bg-red-100 transition"
                            onClick={() => handleItemDelete(item.id ?? -1)}
                          >
                            <Trash2 size={18} className="text-red-500" />
                          </button>
                        </div>
                      </div>
                    ))}
                    <PremiumButton variant="primary" className="mt-2" onClick={() => onAddItem(cat.id ?? -1)}>+ Add Item</PremiumButton>
                  </div>
                </div>
              ))}
              <PremiumButton variant="primary" onClick={onAddCategory}>+ Add Category</PremiumButton>
            </div>
          )}
        </div>
      </div>
      {/* Delete Modal */}
      {deleteModal && (
        <PremiumModal isOpen={!!deleteModal} onClose={cancelDelete}>
          <div className="flex flex-col items-center text-center p-4">
            <div className="mb-4 text-red-600">
              <svg width="48" height="48" fill="none" viewBox="0 0 24 24"><path d="M12 9v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M15 9h.01M9 9h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h2 className="text-xl font-bold mb-2">
              Delete {deleteModal.type === 'category' ? `category "${deleteModal.name}"` : `item "${deleteModal.name}"`}?
            </h2>
            <p className="mb-2 text-gray-600">This action <span className="text-red-600 font-semibold">cannot be undone</span>.</p>
            {deleteModal.type === 'category' && (
              <div className="mb-2 text-gray-600">Deleting this category will also delete:
                <ul className="mb-4 text-gray-700 text-sm list-disc list-inside">
                  <li><span className="font-semibold">{deleteModal.itemCount}</span> menu item{deleteModal.itemCount === 1 ? '' : 's'}</li>
                </ul>
              </div>
            )}
            <div className="flex gap-4 justify-center">
              <PremiumButton variant="secondary" onClick={cancelDelete}>Cancel</PremiumButton>
              <PremiumButton variant="danger" onClick={confirmDelete}>Delete Permanently</PremiumButton>
            </div>
          </div>
        </PremiumModal>
      )}
    </section>
  );
}

export { AddCategoryStepperModal }; 