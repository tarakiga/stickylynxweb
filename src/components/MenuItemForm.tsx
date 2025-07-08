import React, { useState } from 'react';
import PremiumInput from './PremiumInput';
import PremiumTextArea from './PremiumTextArea';
import PremiumButton from './PremiumButton';

export interface MenuItemFormProps {
  initialItem?: {
    name?: string;
    description?: string;
    prices?: { label: string; price: string | number }[];
  };
  onSave: (item: { name: string; description: string; prices: { label: string; price: number }[] }) => void;
  onCancel: () => void;
}

const MenuItemForm: React.FC<MenuItemFormProps> = ({ initialItem, onSave, onCancel }) => {
  const [name, setName] = useState(initialItem?.name || '');
  const [description, setDescription] = useState(initialItem?.description || '');
  const [prices, setPrices] = useState<{ label: string; price: string | number }[]>(initialItem?.prices?.length ? initialItem.prices : [{ label: '', price: '' }]);
  const [error, setError] = useState<string | null>(null);

  const handlePriceChange = (idx: number, field: 'label' | 'price', value: string) => {
    setPrices(prices => prices.map((p, i) => i === idx ? { ...p, [field]: value } : p));
  };

  const handleAddPrice = () => setPrices(prices => [...prices, { label: '', price: '' }]);
  const handleRemovePrice = (idx: number) => setPrices(prices => prices.length > 1 ? prices.filter((_, i) => i !== idx) : prices);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Item name is required.');
      return;
    }
    if (!prices.length || prices.some(p => !p.label.trim() || !p.price)) {
      setError('Each item must have at least one price with label and value.');
      return;
    }
    setError(null);
    onSave({
      name: name.trim(),
      description: description.trim(),
      prices: prices.map(p => ({ label: p.label.trim(), price: Number(p.price) })),
    });
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <PremiumInput label="Item Name" value={name} onChange={e => setName(e.target.value)} required />
      <PremiumTextArea label="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Prices (add one or more)</label>
        {prices.map((p, idx) => (
          <div key={idx} className="flex gap-2 items-center">
            <PremiumInput label={idx === 0 ? 'Option' : ''} value={p.label} onChange={e => handlePriceChange(idx, 'label', e.target.value)} placeholder="e.g. Small, Medium, Large" />
            <PremiumInput label={idx === 0 ? 'Price' : ''} type="number" value={p.price} onChange={e => handlePriceChange(idx, 'price', e.target.value)} placeholder="Price" />
            <button type="button" className="text-red-500 px-2 py-1 rounded hover:bg-red-50" onClick={() => handleRemovePrice(idx)} disabled={prices.length === 1}>&minus;</button>
          </div>
        ))}
        <button type="button" className="text-yellow-600 px-2 py-1 rounded hover:bg-yellow-50 w-fit mt-1" onClick={handleAddPrice} aria-label="Add price option">+ Add Price Option</button>
      </div>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <div className="flex gap-2 justify-end mt-4">
        <PremiumButton type="button" variant="secondary" onClick={onCancel}>Cancel</PremiumButton>
        <PremiumButton type="submit" variant="primary">Save Item</PremiumButton>
      </div>
    </form>
  );
};

export default MenuItemForm; 