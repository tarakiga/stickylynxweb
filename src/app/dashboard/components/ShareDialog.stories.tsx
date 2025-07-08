import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Copy, Check, Twitter, Facebook, MessageCircle } from 'lucide-react';

const PremiumShareDialog = ({ link }: { link: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };
  return (
    <div className="p-6 border rounded-2xl shadow-lg bg-white max-w-md mx-auto">
      <h4 className="font-semibold text-lg mb-2">Share Your List</h4>
      <div className="flex items-center gap-2 mb-4">
        <input className="input-field w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-900" value={link} readOnly />
        <button
          className={`p-2 rounded-full transition-colors ${copied ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'} cursor-pointer`}
          onClick={handleCopy}
          aria-label="Copy link"
        >
          {copied ? <Check size={18} /> : <Copy size={18} />}
        </button>
      </div>
      <div className="flex gap-3 mt-2">
        <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition cursor-pointer">
          <Twitter size={16} /> Twitter
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition cursor-pointer">
          <Facebook size={16} /> Facebook
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition cursor-pointer">
          <MessageCircle size={16} /> WhatsApp
        </button>
      </div>
    </div>
  );
};

export default {
  title: 'Components/PremiumShareDialog',
  component: PremiumShareDialog,
  argTypes: {
    link: { control: 'text' },
  },
} as Meta<typeof PremiumShareDialog>;

export const Default: StoryObj<typeof PremiumShareDialog> = {
  args: {
    link: 'https://sticklynx.com/username/mylink',
  },
}; 