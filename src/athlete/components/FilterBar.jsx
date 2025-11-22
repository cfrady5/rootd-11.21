import React from 'react';

export default function FilterBar({ children }) {
  return (
    <div className="rounded-3xl border border-black/5 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-4 flex flex-wrap gap-4 items-center">
      {children}
    </div>
  );
}
