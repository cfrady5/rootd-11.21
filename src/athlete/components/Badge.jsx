import React from 'react';

const backgroundMap = {
  default: 'bg-[#f4f4f2] text-[#5a5a5a]',
  success: 'bg-rootd-green/15 text-rootd-green font-semibold'
};

export default function Badge({ children, tone = 'default' }) {
  return (
    <span className={`px-3 py-1 rounded-full text-xs tracking-wide ${backgroundMap[tone] || backgroundMap.default}`}>
      {children}
    </span>
  );
}
