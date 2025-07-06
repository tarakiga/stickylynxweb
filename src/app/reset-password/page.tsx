'use client';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');
    try {
      const res = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to reset password');
      }
      setSuccess('Your password has been reset. You can now log in.');
      setPassword('');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return <div className="max-w-md mx-auto mt-20 text-red-600">Invalid or missing token.</div>;
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
      <form onSubmit={handleSubmit} className="max-w-md w-full bg-white p-6 rounded-lg shadow flex flex-col gap-4" aria-label="Reset password form">
        <h1 className="text-3xl font-bold mb-2">Reset Password</h1>
        <input
          className="border rounded px-3 py-2"
          name="password"
          type="password"
          placeholder="New Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          aria-label="New Password"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
        {success && <div className="text-green-600 text-sm">{success}</div>}
        {error && <div className="text-red-600 text-sm">{error}</div>}
      </form>
    </main>
  );
} 