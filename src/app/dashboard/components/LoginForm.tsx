"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    // const res = await signIn("credentials", {
    //   email: form.email,
    //   password: form.password,
    //   callbackUrl: "/dashboard",
    // });
    setLoading(false);
  };

  const handleGoogle = () => {
    signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold">Sign In</h2>
      {error && <div className="text-red-600" role="alert">{error}</div>}
      <div>
        <label htmlFor="email" className="block text-sm font-medium">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={form.email}
          onChange={handleChange}
          className="mt-1 block w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={form.password}
          onChange={handleChange}
          className="mt-1 block w-full border rounded px-3 py-2"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>
      <div className="flex items-center justify-center mt-4">
        <button
          type="button"
          onClick={handleGoogle}
          className="flex items-center gap-2 bg-white border border-gray-300 rounded px-4 py-2 shadow hover:bg-gray-50"
        >
          <svg className="w-5 h-5" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.22 9.19 3.22l6.86-6.86C36.68 2.7 30.74 0 24 0 14.82 0 6.71 5.82 2.69 14.09l7.99 6.2C12.13 13.13 17.62 9.5 24 9.5z"/><path fill="#34A853" d="M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.64 7.01l7.19 5.59C43.99 37.36 46.1 31.36 46.1 24.55z"/><path fill="#FBBC05" d="M10.68 28.29c-1.13-3.36-1.13-6.93 0-10.29l-7.99-6.2C.86 16.18 0 19.99 0 24c0 4.01.86 7.82 2.69 12.2l7.99-6.2z"/><path fill="#EA4335" d="M24 48c6.74 0 12.68-2.22 17.05-6.05l-7.19-5.59c-2.01 1.35-4.59 2.14-7.86 2.14-6.38 0-11.87-3.63-14.32-8.79l-7.99 6.2C6.71 42.18 14.82 48 24 48z"/></g></svg>
          Sign in with Google
        </button>
      </div>
    </form>
  );
} 