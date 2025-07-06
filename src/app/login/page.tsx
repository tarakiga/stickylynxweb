'use client';
import Image from 'next/image';
import LoginForm from '../dashboard/components/LoginForm';

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
        <Image src="/stickylynx.png" alt="StickyLynx Logo" width={80} height={80} className="mb-4" />
        <h1 className="text-2xl font-bold mb-2">Sign in to StickyLynx</h1>
        <p className="text-gray-500 mb-6">Welcome back! Please enter your details.</p>
        <LoginForm />
        <div className="mt-6 text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <a href="/signup" className="text-blue-600 hover:underline font-medium">Sign up</a>
        </div>
      </div>
    </main>
  );
} 