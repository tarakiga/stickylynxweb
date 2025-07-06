'use client';
import Image from 'next/image';
import SignupForm from '../dashboard/components/SignupForm';

export default function SignupPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
        <Image src="/stickylynx.png" alt="StickyLynx Logo" width={80} height={80} className="mb-4" />
        <h1 className="text-2xl font-bold mb-2">Create your StickyLynx account</h1>
        <p className="text-gray-500 mb-6">Sign up to get started with powerful, shareable pages.</p>
        <SignupForm />
        <div className="mt-6 text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline font-medium">Sign in</a>
        </div>
      </div>
    </main>
  );
} 