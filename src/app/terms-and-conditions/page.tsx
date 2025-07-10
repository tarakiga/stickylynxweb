import React from "react";

export default function TermsAndConditions() {
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
        <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>
        <p className="mb-4">Last updated: June 2024</p>
        <p className="mb-4">Welcome to StickyLynx. By accessing or using our website and services, you agree to these Terms & Conditions.</p>
        <h2 className="text-xl font-semibold mt-8 mb-2">Use of Service</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>You must be at least 13 years old to use StickyLynx.</li>
          <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
          <li>You agree not to misuse the platform or engage in prohibited activities.</li>
        </ul>
        <h2 className="text-xl font-semibold mt-8 mb-2">Intellectual Property</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>All content, trademarks, and software on StickyLynx are owned by us or our licensors.</li>
          <li>You may not copy, modify, or distribute any part of the site without permission.</li>
        </ul>
        <h2 className="text-xl font-semibold mt-8 mb-2">User Content</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>You retain ownership of content you create but grant us a license to display and share it as part of the service.</li>
          <li>You are responsible for ensuring your content does not violate any laws or third-party rights.</li>
        </ul>
        <h2 className="text-xl font-semibold mt-8 mb-2">Limitation of Liability</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>StickyLynx is provided &quot;as is&quot; without warranties of any kind.</li>
          <li>We are not liable for any damages arising from your use of the platform.</li>
        </ul>
        <h2 className="text-xl font-semibold mt-8 mb-2">Changes to Terms</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>We may update these Terms from time to time. Continued use of the service constitutes acceptance of the new terms.</li>
        </ul>
        <h2 className="text-xl font-semibold mt-8 mb-2">Contact</h2>
        <p>For questions about these Terms, contact us at <a href="mailto:support@stickylynx.online" className="text-blue-600 underline">support@stickylynx.online</a>.</p>
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