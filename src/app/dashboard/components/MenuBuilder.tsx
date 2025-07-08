"use client";
import React, { useEffect, useState, useRef } from "react";
import PremiumButton from '../../../components/PremiumButton';
import PremiumModal from '../../../components/PremiumModal';
import PremiumInput from '../../../components/PremiumInput';
import PremiumTextArea from '../../../components/PremiumTextArea';
import FieldRepeater from '../../../components/FieldRepeater';
import BottomDrawer from "./BottomDrawer";
import { Check, X, Pencil, Trash2 } from 'lucide-react';

function AddCategoryStepperModal({ isOpen, onClose, onSave, restaurantId, onCategorySaved }: { isOpen: boolean, onClose: () => void, onSave: (cat: any, items: any[]) => void, restaurantId: number, onCategorySaved?: () => void }) {
  const [categoryName, setCategoryName] = useState('');
  const [categoryDesc, setCategoryDesc] = useState('');
  const [items, setItems] = useState<any[]>([]);
  const [currentItem, setCurrentItem] = useState<any>({ name: '', description: '', prices: [{ label: '', price: '' }] });
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
    if (!currentItem.prices || !currentItem.prices.length || currentItem.prices.some((p: any) => !p.label.trim() || !p.price)) {
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
            <PremiumInput label="Item Name" value={currentItem.name} onChange={e => setCurrentItem((i: any) => ({ ...i, name: e.target.value }))} required />
            <PremiumTextArea label="Description" value={currentItem.description} onChange={e => setCurrentItem((i: any) => ({ ...i, description: e.target.value }))} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Prices (add one or more)</label>
            {(currentItem.prices || []).map((p: any, idx: number) => (
              <div key={idx} className="flex gap-2 items-center">
                <PremiumInput label={idx === 0 ? 'Option' : ''} value={p.label || ''} onChange={e => {
                  const next = [...(currentItem.prices || [])];
                  next[idx] = { ...next[idx], label: e.target.value };
                  setCurrentItem((i: any) => ({ ...i, prices: next }));
                }} placeholder="e.g. Small, Medium, Large" />
                <PremiumInput label={idx === 0 ? 'Price' : ''} type="number" value={p.price || ''} onChange={e => {
                  const next = [...(currentItem.prices || [])];
                  next[idx] = { ...next[idx], price: e.target.value };
                  setCurrentItem((i: any) => ({ ...i, prices: next }));
                }} placeholder="Price" />
                <button type="button" className="text-red-500 px-2 py-1 rounded hover:bg-red-50" onClick={() => {
                  setCurrentItem((i: any) => ({ ...i, prices: (i.prices || []).filter((_: any, i2: number) => i2 !== idx) }));
                }} aria-label="Remove price option" disabled={(currentItem.prices || []).length === 1}>&minus;</button>
              </div>
            ))}
            <button type="button" className="text-yellow-600 px-2 py-1 rounded hover:bg-yellow-50 w-fit mt-1" onClick={() => {
              setCurrentItem((i: any) => ({ ...i, prices: [...(i?.prices || []), { label: '', price: '' }] }));
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
  onEditItem: (item: any, catId: number) => void
}) {
  const [categories, setCategories] = useState<any[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [editingCatId, setEditingCatId] = useState<number | null>(null);
  const [tempCatName, setTempCatName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch categories and items
  const refetchMenuData = () => {
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
  };

  useEffect(() => {
    refetchMenuData();
  }, [restaurantId]);

  // Filter items by category
  const getItemsForCategory = (catId: number) => items.filter((i: any) => i.category_id === catId);

  // Delete Category
  const handleCatDelete = async (catId: number) => {
    if (!window.confirm('Delete this category and all its items?')) return;
    await fetch('/api/menu-categories', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: catId }),
    });
    setCategories(cats => cats.filter(c => c.id !== catId));
    setItems(items => items.filter(i => i.category_id !== catId));
  };

  // Delete Item
  const handleItemDelete = async (itemId: number) => {
    if (!window.confirm('Delete this item?')) return;
    await fetch('/api/menu-items', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: itemId }),
    });
    setItems(items => items.filter(i => i.id !== itemId));
  };

  // Add/Edit Category (with validation)
  const handleCatSave = async (cat: any, items: any[]) => {
    setSaveError(null);
    try {
      // Save category first
      const res = await fetch('/api/menu-categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...cat, restaurant_id: restaurantId }),
      });
      if (!res.ok) {
        const err = await res.json();
        setSaveError(err.error || 'Failed to save category');
        console.error('Category save error:', err);
        return;
      }
      const savedCat = await res.json();
      // Save items for this category
      for (const item of items) {
        // Sanitize prices: ensure price is a number
        const sanitizedPrices = (item.prices || []).map((p: any) => ({
          label: p.label,
          price: Number(p.price),
        }));
        const itemRes = await fetch('/api/menu-items', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...item, prices: sanitizedPrices, category_id: savedCat.id }),
        });
        if (!itemRes.ok) {
          const err = await itemRes.json();
          setSaveError(err.error || 'Failed to save item');
          console.error('Item save error:', err);
          return;
        }
      }
      // Refetch categories and items
      const cats = await fetch(`/api/menu-categories?restaurant_id=${restaurantId}`).then(r => r.json());
      setCategories(Array.isArray(cats) ? cats : []);
      const its = await fetch(`/api/menu-items`).then(r => r.json());
      setItems(Array.isArray(its) ? its : []);
    } catch (err) {
      setSaveError('Unexpected error saving category or items');
      console.error('Unexpected save error:', err);
    }
  };

  // Inline edit save handler
  const handleCatNameSave = async (catId: number) => {
    const trimmed = tempCatName.trim();
    if (!trimmed) return;
    // Optimistically update UI
    setCategories(cats => cats.map(c => c.id === catId ? { ...c, name: trimmed } : c));
    setEditingCatId(null);
    // Persist to backend
    await fetch('/api/menu-categories', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: catId, name: trimmed }),
    });
    refetchMenuData();
  };

  return (
    <section className="flex flex-col h-full min-h-0">
      <h3 className="text-lg font-semibold mb-4">Menu Builder</h3>
      {saveError && <div className="text-red-600 mb-2">{saveError}</div>}
      <div className="flex-1 min-h-0 flex flex-col">
        <div className="flex-1 min-h-0 overflow-y-auto pr-2">
          {loading && <div className="text-gray-500">Loading menu...</div>}
          {error && <div className="text-red-600">{error}</div>}
          {!loading && !error && (
            <div className="space-y-6">
              {categories.map(cat => (
                <div key={cat.id} className="bg-white rounded-xl shadow p-4">
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
                              if (e.key === 'Enter') { handleCatNameSave(cat.id); }
                            }}
                          />
                          <button
                            type="button"
                            aria-label="Save category name"
                            className="p-1 rounded hover:bg-green-100 transition ml-1"
                            onClick={() => handleCatNameSave(cat.id)}
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
                            onClick={() => { setEditingCatId(cat.id); setTempCatName(cat.name); setTimeout(() => { inputRef.current?.focus(); inputRef.current?.select(); }, 0); }}
                          >
                            <Pencil size={18} className="text-yellow-600" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="text-gray-500 text-sm mb-2">{cat.description}</div>
                  <div className="space-y-2">
                    {getItemsForCategory(cat.id).map(item => (
                      <div key={item.id} className="bg-gray-50 rounded p-3 flex justify-between items-center">
                        <div>
                          <div className="font-medium text-gray-900">{item.name}</div>
                          <div className="text-xs text-gray-500">{item.description}</div>
                          {item.prices ? (
                            <div className="flex gap-2 mt-1">
                              {item.prices.map((p: any, idx: number) => (
                                <span key={idx} className="bg-yellow-100 text-yellow-800 rounded px-2 py-0.5 text-xs">{p.label}: ${p.price}</span>
                              ))}
                            </div>
                          ) : (
                            <div className="text-xs text-blue-700 mt-1">${item.price}</div>
                          )}
                        </div>
                        <div className="flex gap-2 ml-2">
                          <button
                            type="button"
                            aria-label="Edit item"
                            className="p-2 rounded-lg hover:bg-yellow-100 transition"
                            onClick={() => onEditItem(item, cat.id)}
                          >
                            <Pencil size={18} className="text-yellow-600" />
                          </button>
                          <button
                            type="button"
                            aria-label="Delete item"
                            className="p-2 rounded-lg hover:bg-red-100 transition"
                            onClick={() => handleItemDelete(item.id)}
                          >
                            <Trash2 size={18} className="text-red-500" />
                          </button>
                        </div>
                      </div>
                    ))}
                    <PremiumButton variant="primary" className="mt-2" onClick={() => onAddItem(cat.id)}>+ Add Item</PremiumButton>
                  </div>
                </div>
              ))}
              <PremiumButton variant="primary" onClick={onAddCategory}>+ Add Category</PremiumButton>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export { AddCategoryStepperModal }; 