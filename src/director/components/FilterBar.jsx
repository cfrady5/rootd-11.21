import React from 'react';
import { Search } from 'lucide-react';

export default function FilterBar({ searchPlaceholder, onSearchChange, children }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-4 flex flex-wrap gap-4 items-center">
      {searchPlaceholder && (
        <label className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-2xl border border-white/10 text-white/70 text-sm flex-1 min-w-[220px]">
          <Search size={18} className="text-white/40" />
          <input
            type="text"
            onChange={(event) => onSearchChange?.(event.target.value)}
            placeholder={searchPlaceholder}
            className="bg-transparent border-none flex-1 focus:outline-none placeholder:text-white/40 text-white"
          />
        </label>
      )}
      <div className="flex flex-wrap gap-3 text-sm text-white/80">{children}</div>
    </div>
  );
}
