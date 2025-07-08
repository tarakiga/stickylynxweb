import React from 'react';
import { Pencil, Trash2, PlusCircle, Eye, EyeOff } from 'lucide-react';

export interface PremiumCardListProps {
  logo: string;
  name: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onCreate?: () => void;
  createLabel?: string;
  onView?: () => void;
  onPreview?: () => void;
}

const PremiumCardList: React.FC<PremiumCardListProps> = ({ logo, name, onEdit, onDelete, onCreate, createLabel, onView }) => (
  <div className="flex items-center gap-4 bg-white rounded-2xl shadow-lg border border-gray-100 px-6 py-4 hover:shadow-2xl transition-shadow duration-200 w-full">
    <img src={logo} alt="logo" className="w-14 h-14 rounded-xl object-cover shadow-sm bg-gray-100" />
    <span className="font-semibold text-lg flex-1 text-gray-900 ml-2">{name}</span>
    <div className="flex gap-2 ml-auto">
      {onView && <button aria-label="View" className="p-2 rounded-lg hover:bg-gray-100 transition" onClick={onView}><Eye size={20} /></button>}
      {onEdit && <button aria-label="Edit" className="p-2 rounded-lg hover:bg-yellow-100 transition" onClick={onEdit}><Pencil size={20} /></button>}
      {onDelete && <button aria-label="Delete" className="p-2 rounded-lg hover:bg-red-100 transition" onClick={onDelete}><Trash2 size={20} /></button>}
      {onCreate && (
        <button
          aria-label={createLabel || 'Create'}
          className="p-2 rounded-lg hover:bg-blue-100 transition inline-flex items-center gap-1"
          onClick={onCreate}
        >
          <PlusCircle size={20} />
          {createLabel ? <span>{createLabel}</span> : null}
        </button>
      )}
    </div>
  </div>
);

export default PremiumCardList; 