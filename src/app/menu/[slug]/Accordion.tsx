"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface MenuItem {
  id: number;
  name: string;
  description?: string;
  prices: { label: string; price: string | number }[];
}
interface MenuCategory {
  id: number;
  name: string;
  description?: string;
  items: MenuItem[];
}

export default function Accordion({ categories }: { categories: MenuCategory[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <div className="space-y-4">
      {categories.map((cat, idx) => (
        <div key={cat.id} className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <button
            className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-lg text-primary-900 hover:bg-gray-50 transition group"
            onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            aria-expanded={openIdx === idx}
            style={{ fontFamily: 'var(--font-primary)' }}
          >
            <span>{cat.name}</span>
            <motion.span
              animate={{ rotate: openIdx === idx ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="ml-2"
            >
              <ChevronDown size={22} />
            </motion.span>
          </button>
          <AnimatePresence initial={false}>
            {openIdx === idx && (
              <motion.div
                key="content"
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: { height: 'auto', opacity: 1 },
                  collapsed: { height: 0, opacity: 0 },
                }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-4 pt-2">
                  {cat.description && <div className="text-gray-500 text-sm mb-2">{cat.description}</div>}
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: {},
                      visible: { transition: { staggerChildren: 0.08 } },
                    }}
                  >
                    {cat.items.map((item) => (
                      <motion.div
                        key={item.id}
                        variants={{
                          hidden: { opacity: 0, y: 10 },
                          visible: { opacity: 1, y: 0 },
                        }}
                        className="mb-4 last:mb-0 bg-gray-50 rounded p-4"
                      >
                        <div className="font-semibold text-primary-900 text-base" style={{ fontFamily: 'var(--font-primary)' }}>{item.name}</div>
                        {item.description && <div className="text-xs text-gray-500 whitespace-normal break-words w-full min-w-0 mb-1">{item.description}</div>}
                        {item.prices && item.prices.length > 0 && (
                          <div className="flex gap-2 mt-1 flex-wrap">
                            {item.prices.map((p, idx) => (
                              <span key={idx} className="bg-black text-white rounded px-2 py-0.5 text-xs font-medium" style={{ fontFamily: 'var(--font-primary)' }}>{p.label}: ${p.price}</span>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
} 