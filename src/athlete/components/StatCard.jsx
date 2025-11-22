import React from 'react';

export default function StatCard({ label, value, delta, accent = '#788d57' }) {
  return (
    <article className="rounded-3xl bg-white border border-black/5 p-5 shadow-[0_25px_60px_rgba(0,0,0,0.08)]">
      <p className="text-xs uppercase tracking-[0.4em] text-[#8f8f8f] mb-2">{label}</p>
      <div className="flex items-end justify-between">
        <p className="text-3xl font-semibold text-[#111]">{value}</p>
        {delta && <span className="text-sm font-medium" style={{ color: accent }}>{delta}</span>}
      </div>
    </article>
  );
}
