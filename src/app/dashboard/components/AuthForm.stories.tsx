import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

const PremiumAuthForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  return (
    <form className="p-6 border rounded-2xl shadow-lg bg-white w-full max-w-xs mx-auto">
      <div className="relative mb-6">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          id="email"
          type="email"
          className="input-field w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-900 focus:ring-2 focus:ring-yellow-300 focus:border-yellow-400 transition-all duration-150 peer"
          placeholder=" "
        />
        <label htmlFor="email" className="label absolute left-10 top-1/2 -translate-y-1/2 bg-white px-1 transition-all duration-150 pointer-events-none text-gray-400 peer-focus:-top-3 peer-focus:left-8 peer-focus:text-xs peer-focus:text-yellow-600">Email</label>
      </div>
      <div className="relative mb-6">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          id="password"
          type={showPassword ? 'text' : 'password'}
          className="input-field w-full pl-10 pr-10 py-3 rounded-lg border border-gray-200 bg-white text-gray-900 focus:ring-2 focus:ring-yellow-300 focus:border-yellow-400 transition-all duration-150 peer"
          placeholder=" "
        />
        <label htmlFor="password" className="label absolute left-10 top-1/2 -translate-y-1/2 bg-white px-1 transition-all duration-150 pointer-events-none text-gray-400 peer-focus:-top-3 peer-focus:left-8 peer-focus:text-xs peer-focus:text-yellow-600">Password</label>
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
          onClick={() => setShowPassword((v) => !v)}
          tabIndex={-1}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
      <button className="btn-primary w-full mt-2 py-3 rounded-lg shadow hover:scale-105 transition-transform" type="submit">Sign In</button>
    </form>
  );
};

export default {
  title: 'Components/PremiumAuthForm',
  component: PremiumAuthForm,
} as Meta<typeof PremiumAuthForm>;

export const Default: StoryObj<typeof PremiumAuthForm> = {}; 