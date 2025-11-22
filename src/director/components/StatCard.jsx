import React from 'react';

export default function StatCard({ label, value, delta }) {
  return (
    <article className="rounded-3xl bg-white/5 border border-white/10 p-6 shadow-rootd-card hover:border-white/30 transition-colors duration-300">
      <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-3">{label}</p>
      <div className="flex items-end justify-between">
        <p className="text-3xl font-semibold text-white">{value}</p>
        {delta && <span className="text-sm text-rootd-green">{delta}</span>}
      </div>
    </article>
  );
}
