import React from 'react';
import { BarChart2 } from 'lucide-react';

export type PremiumAnalyticsWidgetProps = {
  clicks: number;
  views: number;
};

export const PremiumAnalyticsWidget: React.FC<PremiumAnalyticsWidgetProps> = ({ clicks, views }) => (
  <div className="card rounded-2xl shadow-lg border border-gray-100 bg-white p-6 font-[Asap]">
    <div className="flex items-center gap-2 mb-4 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 rounded-t-xl p-3">
      <BarChart2 size={20} className="text-gray-900" />
      <h4 className="font-semibold text-gray-900">Analytics</h4>
    </div>
    <div className="flex gap-6 items-center justify-between">
      <div className="flex flex-col items-center">
        <span className="text-2xl font-bold text-yellow-700 animate-pulse">{clicks}</span>
        <span className="text-xs text-gray-500 mt-1 bg-yellow-100 px-2 py-1 rounded-full">Clicks</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-2xl font-bold text-blue-700 animate-pulse">{views}</span>
        <span className="text-xs text-gray-500 mt-1 bg-blue-100 px-2 py-1 rounded-full">Views</span>
      </div>
    </div>
  </div>
);

export default PremiumAnalyticsWidget; 