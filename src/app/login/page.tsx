'use client';
import Image from 'next/image';
import PremiumAuthForm from '../../components/PremiumAuthForm';
import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
        <Image src="/stickylynx.png" alt="StickyLynx Logo" width={80} height={80} className="mb-4" />
        <h1 className="text-2xl font-bold mb-2">Sign in to StickyLynx</h1>
        <p className="text-gray-500 mb-6">Welcome back! Please enter your details.</p>
        <PremiumAuthForm
          loading={loading}
          error={error}
          onSubmit={async (email, password) => {
            setLoading(true);
            setError('');
            const res = await signIn('credentials', {
              redirect: false,
              email,
              password,
              callbackUrl: '/dashboard',
            });
            setLoading(false);
            if (res?.error) {
              setError('Invalid email or password.');
            } else if (res?.ok) {
              window.location.href = '/dashboard';
            }
          }}
        />
        <button
          className="w-full mt-4 py-3 rounded-lg shadow bg-white border border-gray-300 flex items-center justify-center gap-2 text-gray-700 font-medium hover:bg-gray-50 cursor-pointer"
          onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
          type="button"
        >
          <svg className="w-5 h-5" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.22 9.19 3.22l6.86-6.86C36.68 2.7 30.74 0 24 0 14.82 0 6.71 5.82 2.69 14.09l7.99 6.2C12.13 13.13 17.62 9.5 24 9.5z"/><path fill="#34A853" d="M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.64 7.01l7.19 5.59C43.99 37.36 46.1 31.36 46.1 24.55z"/><path fill="#FBBC05" d="M10.68 28.29c-1.13-3.36-1.13-6.93 0-10.29l-7.99-6.2C.86 16.18 0 19.99 0 24c0 4.01.86 7.82 2.69 12.2l7.99-6.2z"/><path fill="#EA4335" d="M24 48c6.74 0 12.68-2.22 17.05-6.05l-7.19-5.59c-2.01 1.35-4.59 2.14-7.86 2.14-6.38 0-11.87-3.63-14.32-8.79l-7.99 6.2C6.71 42.18 14.82 48 24 48z"/></g></svg>
          Sign in with Google
        </button>
        <div className="w-full flex justify-end mt-2">
          <a href="/forgot-password" className="text-blue-600 hover:underline text-sm font-medium">Forgot password?</a>
        </div>
        <div className="mt-6 text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <a href="/signup" className="text-blue-600 hover:underline font-medium">Sign up</a>
        </div>
      </div>
    </main>
  );
} 