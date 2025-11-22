import React from 'react';

export default function Tabs({ items, activeKey, onChange }) {
  return (
    <div className="inline-flex rounded-2xl border border-black/10 bg-white/70 backdrop-blur px-1 py-1 text-sm font-medium shadow-[0_20px_45px_rgba(0,0,0,0.08)]">
      {items.map((item) => {
        const isActive = item.key === activeKey;
        return (
          <button
            key={item.key}
            onClick={() => onChange?.(item.key)}
            className={`px-4 sm:px-6 py-2 rounded-xl transition-all ${
              isActive
                ? 'bg-rootd-green/15 text-[#0f0f0f] border border-rootd-green/40 shadow-inner'
                : 'text-[#5b5b5b] hover:text-[#111]' }
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
