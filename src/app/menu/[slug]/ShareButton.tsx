"use client";
import { useState } from "react";
import { Share2, Copy, Facebook, Twitter, Globe, MessageCircle, Link } from "lucide-react";
import type { ComponentType } from "react";

type ShareAction = ((url: string, setCopied: (v: boolean) => void) => void) | ((url: string) => void);

type IconType = ComponentType<{ size?: number; className?: string }>;
const shareOptions: Array<{
  label: string;
  icon: IconType;
  action: ShareAction;
}> = [
  {
    label: "Copy link",
    icon: Copy,
    action: async (url: string, setCopied: (v: boolean) => void) => {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    },
  },
  {
    label: "Share on X",
    icon: Twitter,
    action: (url: string) => {
      window.open(`https://x.com/intent/tweet?url=${encodeURIComponent(url)}`, "_blank");
    },
  },
  {
    label: "Share on Facebook",
    icon: Facebook,
    action: (url: string) => {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank");
    },
  },
  {
    label: "Share on Reddit",
    icon: Globe, // fallback icon
    action: (url: string) => {
      window.open(`https://www.reddit.com/submit?url=${encodeURIComponent(url)}`, "_blank");
    },
  },
  {
    label: "Share on WhatsApp",
    icon: MessageCircle,
    action: (url: string) => {
      window.open(`https://wa.me/?text=${encodeURIComponent(url)}`, "_blank");
    },
  },
];

export default function ShareButton({ iconClassName = '', iconType = 'share' }: { iconClassName?: string; iconType?: 'share' | 'link' }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "";
  const Icon = iconType === 'link' ? Link : Share2;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="focus:outline-none"
        title="Share menu link"
        aria-label="Share menu link"
        type="button"
      >
        <Icon size={24} className={iconClassName} />
      </button>
      {open && (
        <div className="absolute left-1/2 -translate-x-1/2 mt-2 bg-white border rounded shadow-lg z-20 min-w-[180px] flex flex-col py-2">
          {shareOptions.map((opt) => (
            <button
              key={opt.label}
              className="flex items-center gap-2 px-4 py-2 text-gray-800 hover:bg-blue-50 hover:text-blue-700 text-sm text-left"
              onClick={async () => {
                setOpen(false);
                if (opt.label === "Copy link") {
                  await (opt.action as (url: string, setCopied: (v: boolean) => void) => void)(url, setCopied);
                } else {
                  (opt.action as (url: string) => void)(url);
                }
              }}
              type="button"
            >
              <opt.icon size={18} /> {opt.label}
            </button>
          ))}
        </div>
      )}
      {copied && (
        <div className="absolute left-1/2 -translate-x-1/2 mt-2 px-3 py-1 rounded bg-gray-900 text-white text-xs shadow z-20 whitespace-nowrap" style={{ top: '100%' }}>
          Link copied!
        </div>
      )}
    </div>
  );
} 