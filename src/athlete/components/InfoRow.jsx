import React from 'react';

export default function InfoRow({ label, value }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs uppercase tracking-[0.4em] text-[#9a9a9a]">{label}</span>
      <span className="text-base text-[#181818] font-medium">{value}</span>
    </div>
  );
}
