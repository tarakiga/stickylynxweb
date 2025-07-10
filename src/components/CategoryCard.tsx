import React from 'react';
import Image from 'next/image';

interface CategoryCardProps {
  logo: string;
  title: string;
  description: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ logo, title, description }) => (
  <div className="flex items-center gap-4 rounded-2xl shadow-lg border border-gray-100 bg-white p-4 min-h-[96px] max-w-md">
    <Image
      src={logo}
      alt={title + ' logo'}
      width={56}
      height={56}
      className="w-14 h-14 rounded-xl object-cover shadow-sm bg-gray-100 flex-shrink-0"
    />
    <div className="flex flex-col justify-center">
      <span className="font-semibold text-lg mb-1" style={{ color: 'var(--penn-red)' }}>{title}</span>
      <span className="text-gray-600 text-sm line-clamp-2">{description}</span>
    </div>
  </div>
);

export default CategoryCard; 