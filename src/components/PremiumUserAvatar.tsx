import React from 'react';
import Image from 'next/image';

export type PremiumUserAvatarProps = {
  src?: string;
  name: string;
  online?: boolean;
};

export const PremiumUserAvatar: React.FC<PremiumUserAvatarProps> = ({ src, name, online }) => {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  return (
    <div className="relative inline-block font-[Asap]">
      {src ? (
        <Image src={src} alt={name} width={56} height={56} className="w-14 h-14 rounded-full object-cover shadow border-2 border-white" />
      ) : (
        <span className="w-14 h-14 flex items-center justify-center rounded-full bg-yellow-200 text-yellow-800 text-xl font-bold shadow border-2 border-white">
          {initials}
        </span>
      )}
      <span className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white ${online ? 'bg-green-400' : 'bg-gray-300'}`} title={online ? 'Online' : 'Offline'} />
    </div>
  );
};

export default PremiumUserAvatar; 