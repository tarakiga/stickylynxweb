import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { GripVertical, Plus } from 'lucide-react';

const PremiumListEditor = ({ items }: { items: { type: 'link' | 'text' | 'media'; content: string; url?: string; thumbnail?: string }[] }) => (
  <div className="card rounded-2xl shadow-lg border border-gray-100 bg-white p-6">
    <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
      <GripVertical size={18} className="text-yellow-500" /> List Editor
    </h3>
    <ul className="space-y-2">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-yellow-50 transition cursor-pointer">
          <GripVertical size={16} className="text-gray-300 cursor-pointer" />
          {item.type === 'link' && <a href={item.url} className="text-info underline font-medium">{item.content}</a>}
          {item.type === 'text' && <span className="text-gray-700">{item.content}</span>}
          {item.type === 'media' && <img src={item.thumbnail} alt="media" className="w-12 h-12 rounded-xl object-cover shadow" />}
        </li>
      ))}
    </ul>
    <button className="btn-primary mt-6 flex items-center gap-2 px-5 py-2 rounded-lg shadow hover:scale-105 transition-transform cursor-pointer">
      <Plus size={18} /> Add Item
    </button>
  </div>
);

export default {
  title: 'Components/PremiumListEditor',
  component: PremiumListEditor,
  argTypes: {
    items: { control: 'object' },
  },
} as Meta<typeof PremiumListEditor>;

export const Default: StoryObj<typeof PremiumListEditor> = {
  args: {
    items: [
      { type: 'link', content: 'My Website', url: 'https://example.com' },
      { type: 'text', content: 'This is a text item.' },
      { type: 'media', content: 'Image', thumbnail: 'https://via.placeholder.com/64' },
    ],
  },
}; 