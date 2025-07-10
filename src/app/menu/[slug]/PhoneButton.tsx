"use client";
import { useState } from "react";
import { Phone } from "lucide-react";

export default function PhoneButton({ phones }: { phones: string[] }) {
  const [open, setOpen] = useState(false);
  if (!phones.length) return null;
  if (phones.length === 1) {
    return (
      <a
        href={`tel:${phones[0]}`}
        className="flex items-center bg-gray-900 rounded-full shadow px-3 py-1 mb-2 cursor-pointer hover:shadow-md transition"
        aria-label="Call us"
      >
        <span className="w-12 h-12 flex items-center justify-center rounded-full bg-green-600 -ml-3">
          <Phone size={22} className="text-white" />
        </span>
        <span className="text-gray-200 font-medium ml-2">Call us</span>
      </a>
    );
  }
  return (
    <div className="relative">
      <button
        type="button"
        className="flex items-center bg-gray-900 rounded-full shadow px-3 py-1 mb-2 cursor-pointer hover:shadow-md transition focus:outline-none"
        aria-label="Call us"
        onClick={() => setOpen(v => !v)}
        onBlur={() => setOpen(false)}
      >
        <span className="w-12 h-12 flex items-center justify-center rounded-full bg-green-600 -ml-3">
          <Phone size={22} className="text-white" />
        </span>
        <span className="text-gray-200 font-medium ml-2">Call us</span>
      </button>
      {open && (
        <div className="absolute left-1/2 -translate-x-1/2 mt-2 bg-white border rounded shadow-lg z-10 min-w-[140px]">
          {phones.map((num, i) => (
            <a
              key={num + i}
              href={`tel:${num}`}
              className="block px-4 py-2 text-gray-800 hover:bg-blue-50 hover:text-blue-700 text-sm text-center cursor-pointer"
              onMouseDown={() => setOpen(false)}
            >
              {num}
            </a>
          ))}
        </div>
      )}
    </div>
  );
} 