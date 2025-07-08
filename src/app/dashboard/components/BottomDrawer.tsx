import { useEffect, useRef } from "react";

interface BottomDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: React.ReactNode;
}

export default function BottomDrawer({
  isOpen,
  onClose,
  children,
  title,
}: BottomDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  // Trap focus and close on ESC
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      // Trap focus
      if (e.key === "Tab" && drawerRef.current) {
        const focusableEls = drawerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusableEls[0];
        const last = focusableEls[focusableEls.length - 1];
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    // Focus the drawer on open
    setTimeout(() => {
      drawerRef.current?.focus();
    }, 0);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scroll when open
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
    >
      {/* Backdrop with fade-in */}
      <div
        className="absolute inset-0 bg-black/40 transition-opacity duration-300 opacity-100 animate-fadeIn"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Drawer with slide-up animation and premium design */}
      <div
        ref={drawerRef}
        className="relative w-full max-w-2xl bg-white rounded-t-3xl shadow-2xl border border-neutral-200 transition-transform duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] focus:outline-none translate-y-0 animate-slideUp"
        style={{
          minHeight: "60vh",
          maxHeight: "90vh",
          outline: "none",
        }}
        tabIndex={0}
      >
        {/* Handle */}
        <div className="absolute left-1/2 -top-4 -translate-x-1/2 flex justify-center w-full pointer-events-none">
          <div className="h-1.5 w-16 rounded-full bg-neutral-300 shadow-md pointer-events-auto" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
        </div>
        {title && (
          <div className="sticky top-0 z-10 bg-white px-6 py-4 border-b font-semibold text-lg flex items-center justify-between rounded-t-3xl">
            <span>{title}</span>
            <button
              onClick={onClose}
              aria-label="Close drawer"
              className="text-gray-500 hover:text-gray-900 focus:outline-none"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        )}
        <div className="overflow-y-auto px-6 py-4" style={{ maxHeight: "calc(90vh - 64px)" }}>
          {children}
        </div>
      </div>
      {/* Animations */}
      <style jsx global>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slideUp {
          animation: slideUp 0.4s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease;
        }
      `}</style>
    </div>
  );
} 