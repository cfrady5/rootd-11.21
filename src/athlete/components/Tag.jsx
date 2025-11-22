import React from 'react';

export default function Tag({ children }) {
  return (
    <span className="px-4 py-1.5 rounded-full bg-rootd-green/10 text-sm text-[#1d1d1d]">
      {children}
    </span>
  );
}
