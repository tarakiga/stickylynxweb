"use client";
import { useState, useRef } from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";

export default function UserMenu({ user }: { user: { image?: string | null; name?: string | null; email?: string | null } }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  // (simple version, can be improved with useEffect for event listeners)
  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setOpen(false);
    }
  };

  return (
    <div className="relative" tabIndex={0} onBlur={handleBlur} ref={menuRef}>
      <button
        className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        tabIndex={0}
      >
        {user?.image ? (
          <Image src={user.image} alt="User avatar" width={40} height={40} className="rounded-full" />
        ) : (
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-300 text-gray-700 font-bold text-lg">
            {user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || "U"}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50 py-2" role="menu" aria-label="User menu">
          <div className="px-4 py-2 border-b text-sm text-gray-700">
            <div className="font-semibold">{user?.name || user?.email || "User"}</div>
            <div className="text-xs text-gray-500 truncate">{user?.email}</div>
          </div>
          <a
            href="/dashboard"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
            role="menuitem"
            tabIndex={0}
            onClick={() => setOpen(false)}
          >
            Dashboard
          </a>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
            role="menuitem"
            tabIndex={0}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
} 