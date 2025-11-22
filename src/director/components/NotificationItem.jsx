import React from 'react';

export default function NotificationItem({ title, detail, timestamp, actionLabel }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur flex flex-col gap-2 p-4">
      <div className="flex items-center justify-between">
        <p className="text-white font-medium">{title}</p>
        <span className="text-xs text-white/50">{timestamp}</span>
      </div>
      <p className="text-sm text-white/70">{detail}</p>
      {actionLabel && (
        <button className="self-start text-xs font-semibold uppercase tracking-wide text-rootd-green hover:text-white transition-colors">
          {actionLabel}
        </button>
      )}
    </div>
  );
}
