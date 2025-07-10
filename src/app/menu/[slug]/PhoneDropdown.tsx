"use client";
import { useState } from "react";
import { Phone } from "lucide-react";

export default function PhoneDropdown({ phones, iconClassName = "" }: { phones: string[]; iconClassName?: string }) {
  const [open, setOpen] = useState(false);
  if (!phones.length) return null;
  if (phones.length === 1) {
    return (
      <a href={`tel:${phones[0]}`} className="text-blue-600 hover:text-blue-800" title="Call">
        <Phone size={24} className={iconClassName} />
      </a>
    );
  }
  return (
    <div className="relative">
      <button onClick={() => setOpen(v => !v)} className="text-blue-600 hover:text-blue-800" title="Call">
        <Phone size={24} className={iconClassName} />
      </button>
      {open && (
        <div className="absolute left-1/2 -translate-x-1/2 mt-2 bg-white border rounded shadow-lg z-10 min-w-[140px]">
          {phones.map((num, i) => (
            <a
              key={num + i}
              href={`tel:${num}`}
              className="block px-4 py-2 text-gray-800 hover:bg-blue-50 hover:text-blue-700 text-sm text-center"
              onClick={() => setOpen(false)}
            >
              {num}
            </a>
          ))}
        </div>
      )}
    </div>
  );
} 