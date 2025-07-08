import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import PremiumInput from './PremiumInput';
import PremiumButton from './PremiumButton';

export interface PremiumAuthFormProps {
  onSubmit?: (email: string, password: string) => void;
  loading?: boolean;
  error?: string;
}

export const PremiumAuthForm: React.FC<PremiumAuthFormProps> = ({ onSubmit, loading = false, error }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) onSubmit(email, password);
  };

  return (
    <form className="p-6 border rounded-2xl shadow-lg bg-white w-full max-w-xs mx-auto font-[Asap]" onSubmit={handleSubmit}>
      <PremiumInput
        label="Email"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        disabled={loading}
        required
      />
      <div className="relative mb-6">
        <PremiumInput
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={e => setPassword(e.target.value)}
          disabled={loading}
          required
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 cursor-pointer"
          onClick={() => setShowPassword((v) => !v)}
          tabIndex={-1}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
      <PremiumButton className="w-full mt-2 py-3 rounded-lg shadow" type="submit" loading={loading}>
        Sign In
      </PremiumButton>
    </form>
  );
};

export default PremiumAuthForm; 