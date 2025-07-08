import Image from "next/image";
import HomeButtons from "../components/HomeButtons.client";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="w-full flex items-center justify-between px-8 py-4 bg-white">
        <div className="flex items-center gap-2">
          <Image src="/assets/icons/chain-logo.png" alt="StickyLynx Logo" width={36} height={36} className="mr-2" />
          <span className="font-bold text-xl">StickyLynx</span>
        </div>
        <nav className="flex gap-6 items-center">
          <a href="#features" className="text-gray-700 font-medium hover:underline">Features</a>
          <a href="#pricing" className="text-gray-700 font-medium hover:underline">Pricing</a>
          <a href="/contact" className="text-gray-700 font-medium hover:underline">Contact</a>
          {/* CTA Button */}
          <HomeButtons variant="header" />
        </nav>
      </header>

      {/* Hero Section */}
      <section className="w-full flex justify-center mt-8">
        <div className="w-full max-w-4xl relative rounded-xl overflow-hidden shadow-lg">
          <Image
            src="/hero-placeholder.jpg"
            alt="Abstract hero background"
            width={1200}
            height={400}
            className="w-full h-72 object-cover"
            priority
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 text-white text-center px-4">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 drop-shadow-lg">Create Shareable List-Based Page Profiles</h1>
            <p className="mb-6 text-lg max-w-xl mx-auto drop-shadow">StickyLynx empowers you to craft versatile, shareable pages and profiles, perfect for restaurant menus, showcases, and more.</p>
            {/* Hero CTA Button */}
            <HomeButtons variant="hero" />
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="max-w-5xl mx-auto mt-16 px-4">
        <h2 className="text-2xl font-bold mb-6">Versatile Use Cases</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div className="flex flex-col items-center">
            <Image src="/assets/images/foodMenu.png" alt="Restaurant Menus" width={160} height={120} className="rounded-lg mb-2 object-cover" />
            <span className="font-medium">Restaurant Menus</span>
          </div>
          <div className="flex flex-col items-center">
            <Image src="/assets/images/musician.png" alt="Electronic Press Kits" width={160} height={120} className="rounded-lg mb-2 object-cover" />
            <span className="font-medium">Electronic Press Kits</span>
          </div>
          <div className="flex flex-col items-center">
            <Image src="/assets/images/influencer.png" alt="Personal Profiles" width={160} height={120} className="rounded-lg mb-2 object-cover" />
            <span className="font-medium">Personal Profiles</span>
          </div>
          <div className="flex flex-col items-center">
            <Image src="/assets/images/startup.png" alt="Event Programs" width={160} height={120} className="rounded-lg mb-2 object-cover" />
            <span className="font-medium">Event Programs</span>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section id="features" className="max-w-5xl mx-auto mt-20 px-4">
        <h2 className="text-2xl font-bold mb-2">Key Features</h2>
        <h3 className="text-xl font-bold mb-4">Powerful Features to Elevate Your Pages</h3>
        <p className="mb-8 text-gray-600 max-w-2xl">StickyLynx offers a suite of tools designed for ease of use and maximum impact.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-gray-50 rounded-lg p-6 border flex flex-col items-start">
            <div className="mb-3 text-blue-600">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path d="M5 12h14M12 5v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </div>
            <h4 className="font-semibold mb-2">Easy Editing</h4>
            <p className="text-gray-600 text-sm">Intuitive interface for quick updates and changes.</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-6 border flex flex-col items-start">
            <div className="mb-3 text-blue-600">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path d="M4 12h16M12 4v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </div>
            <h4 className="font-semibold mb-2">Seamless Sharing</h4>
            <p className="text-gray-600 text-sm">Share your pages effortlessly across all platforms.</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-6 border flex flex-col items-start">
            <div className="mb-3 text-blue-600">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path d="M6 6h12v12H6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </div>
            <h4 className="font-semibold mb-2">Customizable Templates</h4>
            <p className="text-gray-600 text-sm">Choose from a variety of templates to match your style.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-2xl mx-auto mt-20 mb-16 px-4 text-center">
        <h2 className="text-2xl font-bold mb-6">Ready to Transform Your Online Presence?</h2>
        {/* CTA Button */}
        <HomeButtons variant="cta" />
      </section>

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
