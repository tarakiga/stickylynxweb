import React from 'react';
import { X } from 'lucide-react';

export interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const PremiumModal: React.FC<PremiumModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm font-[Asap]">
      <div className="relative bg-white/90 p-8 rounded-2xl shadow-2xl w-full max-w-3xl border border-gray-100 transform transition-all duration-300 scale-95 opacity-0 animate-modalIn max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X size={22} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default PremiumModal; 