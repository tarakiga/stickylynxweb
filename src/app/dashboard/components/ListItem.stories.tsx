import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Link2, Image as ImageIcon } from 'lucide-react';

const PremiumListItem = ({ type, content, url, thumbnail }: { type: 'link' | 'text' | 'media'; content: string; url?: string; thumbnail?: string }) => {
  if (type === 'link') {
    return (
      <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition group border-b border-gray-100">
        {thumbnail ? (
          <img src={thumbnail} alt="thumb" className="w-10 h-10 rounded-full object-cover shadow-sm" />
        ) : (
          <span className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-700"><Link2 size={18} /></span>
        )}
        <a href={url} className="text-info underline font-medium group-hover:text-yellow-600 transition">{content}</a>
      </div>
    );
  }
  if (type === 'media') {
    return (
      <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition border-b border-gray-100">
        {thumbnail ? (
          <img src={thumbnail} alt="media" className="w-14 h-14 rounded-xl object-cover shadow" />
        ) : (
          <span className="w-14 h-14 flex items-center justify-center rounded-xl bg-blue-100 text-blue-700"><ImageIcon size={22} /></span>
        )}
        <span className="font-medium text-gray-800">{content}</span>
      </div>
    );
  }
  return <span className="block p-3 text-gray-700">{content}</span>;
};

export default {
  title: 'Components/PremiumListItem',
  component: PremiumListItem,
  argTypes: {
    type: { control: { type: 'select', options: ['link', 'text', 'media'] } },
    content: { control: 'text' },
    url: { control: 'text' },
    thumbnail: { control: 'text' },
  },
} as Meta<typeof PremiumListItem>;

export const Link: StoryObj<typeof PremiumListItem> = {
  args: {
    type: 'link',
    content: 'My Website',
    url: 'https://example.com',
    thumbnail: '',
  },
};

export const Text: StoryObj<typeof PremiumListItem> = {
  args: {
    type: 'text',
    content: 'This is a text item.',
  },
};

export const Media: StoryObj<typeof PremiumListItem> = {
  args: {
    type: 'media',
    content: 'Image or video description',
    thumbnail: 'https://via.placeholder.com/64',
  },
}; 