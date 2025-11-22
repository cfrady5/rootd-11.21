import React from 'react';

const severityMap = {
  clear: 'bg-emerald-500/10 text-emerald-300 border border-emerald-400/30',
  review: 'bg-amber-500/10 text-amber-300 border border-amber-400/30',
  pending: 'bg-orange-500/10 text-orange-200 border border-orange-400/40',
  danger: 'bg-red-500/10 text-red-300 border border-red-400/30'
};

export default function Badge({ tone = 'clear', children }) {
  const palette = severityMap[tone?.toLowerCase?.()] || severityMap.clear;
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide ${palette}`}>
      {children}
    </span>
  );
}
