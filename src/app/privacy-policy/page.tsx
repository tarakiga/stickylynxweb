import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="w-full flex items-center justify-between px-8 py-4 border-b bg-white">
        <div className="flex items-center gap-2">
          <span className="font-bold text-xl">StickyLynx</span>
        </div>
        <nav className="flex gap-6 items-center">
          <a href="/page#features" className="text-gray-700 font-medium hover:underline">Features</a>
          <a href="/page#pricing" className="text-gray-700 font-medium hover:underline">Pricing</a>
          <a href="/contact" className="text-gray-700 font-medium hover:underline">Contact</a>
          <a href="/dashboard" className="ml-4 bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700 transition">Get Started</a>
        </nav>
      </header>
      <main className="max-w-2xl mx-auto py-16 px-4 text-gray-800 flex-1 w-full">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="mb-4">Last updated: June 2024</p>
        <p className="mb-4">StickyLynx (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website and services.</p>
        <h2 className="text-xl font-semibold mt-8 mb-2">Information We Collect</h2>
        <ul className="list-disc pl-6 mb-4">
          <li><b>Personal Information:</b> When you sign up or contact us, we may collect your name, email address, and other relevant details.</li>
          <li><b>Usage Data:</b> We collect information about how you interact with our platform, such as page views, features used, and device/browser information.</li>
          <li><b>Cookies:</b> We use cookies and similar technologies to enhance your experience and analyze site usage.</li>
        </ul>
        <h2 className="text-xl font-semibold mt-8 mb-2">How We Use Your Information</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>To provide and improve our services.</li>
          <li>To communicate with you about updates, features, or support.</li>
          <li>To analyze usage and optimize our platform.</li>
        </ul>
        <h2 className="text-xl font-semibold mt-8 mb-2">Data Sharing & Security</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>We do not sell your personal information.</li>
          <li>We may share data with trusted third-party service providers for analytics, hosting, or support, under strict confidentiality.</li>
          <li>We implement industry-standard security measures to protect your data.</li>
        </ul>
        <h2 className="text-xl font-semibold mt-8 mb-2">Your Rights</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>You may request access, correction, or deletion of your personal data.</li>
          <li>You can opt out of marketing communications at any time.</li>
        </ul>
        <h2 className="text-xl font-semibold mt-8 mb-2">Contact Us</h2>
        <p>For privacy-related questions, contact us at <a href="mailto:support@stickylynx.online" className="text-blue-600 underline">support@stickylynx.online</a>.</p>
      </main>
      {/* Footer */}
      <footer className="w-full py-8 bg-white mt-auto">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 px-4">
          <div className="flex gap-6 text-gray-500 text-sm">
            <a href="#about" className="hover:underline">About</a>
            <a href="/terms-and-conditions" className="hover:underline">Terms & Conditions</a>
            <a href="/privacy-policy" className="hover:underline">Privacy Policy</a>
            <a href="/contact" className="hover:underline">Contact Us</a>
          </div>
          <div className="flex gap-4 text-gray-400">
            <a href="#" aria-label="Twitter"><svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M22 5.92a8.38 8.38 0 01-2.36.65A4.13 4.13 0 0021.4 4.1a8.19 8.19 0 01-2.6.99A4.1 4.1 0 0012 8.09c0 .32.04.64.1.94A11.65 11.65 0 013 4.8a4.07 4.07 0 00-.55 2.06c0 1.42.72 2.68 1.82 3.42a4.07 4.07 0 01-1.86-.51v.05c0 1.98 1.41 3.63 3.28 4a4.1 4.1 0 01-1.85.07c.52 1.62 2.03 2.8 3.82 2.83A8.23 8.23 0 012 19.54a11.62 11.62 0 006.29 1.84c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0022 5.92z" fill="currentColor"/></svg></a>
            <a href="#" aria-label="Instagram"><svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" rx="5" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/></svg></a>
          </div>
        </div>
        <div className="text-center text-gray-400 text-xs mt-4">© 2024 StickyLynx. All rights reserved.</div>
      </footer>
    </div>
  );
} 