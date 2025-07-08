import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { LayoutGrid, Pencil, Trash2, PlusCircle, Eye, EyeOff } from 'lucide-react';

const PremiumCard = ({ header, children }: { header: string; children: React.ReactNode }) => (
  <div className="card rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-shadow duration-200 bg-white">
    <div className="card-header flex items-center gap-2 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-t-2xl p-4">
      <LayoutGrid size={20} className="opacity-80" />
      <span className="font-semibold text-lg">{header}</span>
    </div>
    <div className="card-body p-6 text-gray-800">{children}</div>
  </div>
);

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
    <img src={logo} alt="logo" className="w-14 h-14 rounded-xl object-cover shadow-sm bg-gray-100" />
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
  title: 'Components/PremiumCard',
  component: PremiumCard,
  argTypes: {
    header: { control: 'text' },
    children: { control: 'text' },
  },
} as Meta<typeof PremiumCard>;

export const Default: StoryObj<typeof PremiumCard> = {
  args: {
    header: 'Premium Card Header',
    children: 'This is the card body with a more premium look and feel.',
  },
};

export const ListStyle: StoryObj<typeof PremiumCardList> = {
  render: (args) => <PremiumCardList {...args} />,
  args: {
    logo: 'https://via.placeholder.com/56',
    name: 'StickyLynx Restaurant',
    onEdit: () => alert('Edit'),
    onDelete: () => alert('Delete'),
    onCreate: () => alert('Create'),
    onView: () => alert('View'),
    onPreview: () => alert('Preview'),
  },
}; 