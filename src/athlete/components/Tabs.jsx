import React from 'react';

export default function Tabs({ items, activeKey, onChange, variant = 'pill' }) {
  const isSegmented = variant === 'segmented';

  return (
    <div
      className={
        isSegmented
          ? 'inline-flex items-center rounded-full bg-black/5 p-0.5 text-sm font-medium'
          : 'inline-flex rounded-2xl border border-black/10 bg-white/70 backdrop-blur px-1 py-1 text-sm font-medium shadow-[0_20px_45px_rgba(0,0,0,0.08)]'
      }
    >
      {items.map((item) => {
        const isActive = item.key === activeKey;
        return (
          <button
            key={item.key}
            type="button"
            onClick={() => onChange?.(item.key)}
            className={
              isSegmented
                ? `relative min-w-[88px] rounded-full px-4 py-1.5 text-xs sm:text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rootd-green focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${
                    isActive
                      ? 'bg-white text-[#111827] shadow-sm'
                      : 'text-[#6b7280] hover:text-[#111827]'
                  }`
                : `px-4 sm:px-6 py-2 rounded-xl transition-all ${
                    isActive
                      ? 'bg-rootd-green/15 text-[#0f0f0f] border border-rootd-green/40 shadow-inner'
                      : 'text-[#5b5b5b] hover:text-[#111]'
                  }`
            }
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
