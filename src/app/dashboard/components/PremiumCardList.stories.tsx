import React from 'react';
import { Pencil, Trash2, PlusCircle, Eye, EyeOff } from 'lucide-react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Image from 'next/image';

const PremiumCardList = ({ logo, name, onEdit, onDelete, onCreate, onView, onPreview }: {
  logo: string;
  name: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onCreate?: () => void;
  onView?: () => void;
  onPreview?: () => void;
}) => (
  <div className="flex items-center gap-4 bg-white rounded-2xl shadow-lg border border-gray-100 px-6 py-4 hover:shadow-2xl transition-shadow duration-200 w-full max-w-2xl">
    {logo && (
      <Image src={logo} alt="logo" width={56} height={56} className="w-14 h-14 rounded-xl object-cover shadow-sm bg-gray-100" />
    )}
    <span className="font-semibold text-lg flex-1 text-gray-900 ml-2">{name}</span>
    <div className="flex gap-2 ml-auto">
      {onView && <button aria-label="View" className="p-2 rounded-lg hover:bg-gray-100 transition" onClick={onView}><Eye size={20} /></button>}
      {onPreview && <button aria-label="Preview" className="p-2 rounded-lg hover:bg-gray-100 transition" onClick={onPreview}><EyeOff size={20} /></button>}
      {onEdit && <button aria-label="Edit" className="p-2 rounded-lg hover:bg-yellow-100 transition" onClick={onEdit}><Pencil size={20} /></button>}
      {onDelete && <button aria-label="Delete" className="p-2 rounded-lg hover:bg-red-100 transition" onClick={onDelete}><Trash2 size={20} /></button>}
      {onCreate && <button aria-label="Create" className="p-2 rounded-lg hover:bg-blue-100 transition" onClick={onCreate}><PlusCircle size={20} /></button>}
    </div>
  </div>
);

export default {
  title: 'Components/PremiumCardList',
  component: PremiumCardList,
  argTypes: {
    logo: { control: 'text' },
    name: { control: 'text' },
    onEdit: { action: 'edit' },
    onDelete: { action: 'delete' },
    onCreate: { action: 'create' },
    onView: { action: 'view' },
    onPreview: { action: 'preview' },
  },
} as Meta<typeof PremiumCardList>;

export const ListStyle: StoryObj<typeof PremiumCardList> = {
  args: {
    logo: 'https://via.placeholder.com/56',
    name: 'StickyLynx Restaurant',
  },
}; 