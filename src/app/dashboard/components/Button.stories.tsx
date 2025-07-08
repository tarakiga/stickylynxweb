import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ArrowRight, Loader2 } from 'lucide-react';

const PremiumButton = ({ children, variant = 'primary', icon, loading, disabled, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'danger'; icon?: React.ReactNode; loading?: boolean }) => {
  const base =
    'relative inline-flex items-center justify-center gap-2 px-7 py-3 rounded-2xl font-semibold text-lg shadow-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-offset-2';
  const variants: Record<string, string> = {
    primary:
      'bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 text-gray-900 hover:from-yellow-400 hover:to-yellow-600 focus:ring-yellow-300/60',
    secondary:
      'bg-gradient-to-br from-blue-900 to-blue-700 text-white hover:from-blue-800 hover:to-blue-600 focus:ring-blue-400/60',
    danger:
      'bg-gradient-to-br from-red-600 to-red-400 text-white hover:from-red-700 hover:to-red-500 focus:ring-red-400/60',
  };
  const state =
    disabled || loading
      ? 'opacity-60 cursor-not-allowed pointer-events-none'
      : 'cursor-pointer hover:scale-105 active:scale-95';
  return (
    <button className={`${base} ${variants[variant]} ${state}`} disabled={disabled || loading} {...props}>
      {loading ? <Loader2 className="animate-spin mr-2" size={20} /> : icon && <span className="-ml-1">{icon}</span>}
      {children}
    </button>
  );
};

export default {
  title: 'Components/PremiumButton',
  component: PremiumButton,
  argTypes: {
    children: { control: 'text' },
    variant: { control: { type: 'select', options: ['primary', 'secondary', 'danger'] } },
    icon: { control: false },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} as Meta<typeof PremiumButton>;

export const Default: StoryObj<typeof PremiumButton> = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
    icon: <ArrowRight size={18} />,
    loading: false,
    disabled: false,
  },
};

export const Hover: StoryObj<typeof PremiumButton> = {
  args: {
    ...Default.args,
    children: 'Hover Me',
  },
  parameters: {
    pseudo: { hover: true },
  },
};

export const Focus: StoryObj<typeof PremiumButton> = {
  args: {
    ...Default.args,
    children: 'Focus Me',
  },
  parameters: {
    pseudo: { focus: true },
  },
};

export const Active: StoryObj<typeof PremiumButton> = {
  args: {
    ...Default.args,
    children: 'Active',
  },
  parameters: {
    pseudo: { active: true },
  },
};

export const Disabled: StoryObj<typeof PremiumButton> = {
  args: {
    ...Default.args,
    children: 'Disabled',
    disabled: true,
  },
};

export const Loading: StoryObj<typeof PremiumButton> = {
  args: {
    ...Default.args,
    children: 'Loading...',
    loading: true,
  },
}; 