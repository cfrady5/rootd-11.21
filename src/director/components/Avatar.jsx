import React from 'react';

export default function Avatar({ name, email, src, size = 'md' }) {
  const dimension = size === 'lg' ? 'w-14 h-14' : size === 'sm' ? 'w-8 h-8' : 'w-11 h-11';
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('');

  return (
    <div className="flex items-center gap-3">
      <div
        className={`${dimension} rounded-full bg-rootd-slate/60 border border-white/10 overflow-hidden flex items-center justify-center text-white/70 text-sm uppercase tracking-wide`}
      >
        {src ? <img src={src} alt={name} className="w-full h-full object-cover" /> : initials}
      </div>
      <div className="text-sm">
        <p className="font-medium text-white leading-tight">{name}</p>
        {email && <p className="text-white/60 text-[13px] leading-tight">{email}</p>}
      </div>
    </div>
  );
}
