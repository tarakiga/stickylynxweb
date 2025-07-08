'use client';
import React, { useState } from 'react';
import RestaurantList from "./RestaurantList";
import PremiumAnalyticsWidget from '../../../components/PremiumAnalyticsWidget';
import PremiumUserAvatar from '../../../components/PremiumUserAvatar';

export default function DashboardTabs({ user }: { user: { image?: string | null; name?: string | null; email?: string | null } }) {
  const [tab, setTab] = useState<'lynx' | 'stats' | 'profile'>('lynx');
  return (
    <section>
      <div className="flex gap-2 mb-8 border-b border-gray-200">
        <button
          className={`px-4 py-2 font-semibold rounded-t-lg focus:outline-none transition-colors duration-150 ${tab === 'lynx' ? 'bg-white border-x border-t border-gray-200 text-blue-700' : 'text-gray-500 hover:text-blue-700'}`}
          onClick={() => setTab('lynx')}
          aria-selected={tab === 'lynx'}
          role="tab"
        >
          Lynx
        </button>
        <button
          className={`px-4 py-2 font-semibold rounded-t-lg focus:outline-none transition-colors duration-150 ${tab === 'stats' ? 'bg-white border-x border-t border-gray-200 text-blue-700' : 'text-gray-500 hover:text-blue-700'}`}
          onClick={() => setTab('stats')}
          aria-selected={tab === 'stats'}
          role="tab"
        >
          Stats
        </button>
        <button
          className={`px-4 py-2 font-semibold rounded-t-lg focus:outline-none transition-colors duration-150 ${tab === 'profile' ? 'bg-white border-x border-t border-gray-200 text-blue-700' : 'text-gray-500 hover:text-blue-700'}`}
          onClick={() => setTab('profile')}
          aria-selected={tab === 'profile'}
          role="tab"
        >
          Profile
        </button>
      </div>
      <div>
        {tab === 'lynx' && <RestaurantList />}
        {tab === 'stats' && (
          <div className="max-w-md mx-auto">
            <PremiumAnalyticsWidget clicks={123} views={456} />
          </div>
        )}
        {tab === 'profile' && (
          <div className="flex flex-col items-center gap-4 mt-8">
            <PremiumUserAvatar src={user?.image ?? undefined} name={user?.name ?? 'User'} online={true} />
            <div className="text-lg font-semibold">{user?.name || 'User'}</div>
            <div className="text-gray-500">{user?.email}</div>
            {/* Add more profile info or edit form here if needed */}
          </div>
        )}
      </div>
    </section>
  );
} 