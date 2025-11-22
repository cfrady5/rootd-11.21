import React from 'react';

export default function Card({ title, subtitle, actions, children, className = '' }) {
  return (
    <section
      className={`rounded-3xl bg-white text-[#1b1b1b] shadow-[0_30px_70px_rgba(0,0,0,0.08)] border border-black/5 p-6 sm:p-8 ${
        className || ''
      }`}
    >
      {(title || subtitle || actions) && (
        <header className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            {subtitle && <p className="text-xs tracking-[0.4em] uppercase text-[#8a8a8a]">{subtitle}</p>}
            {title && <h2 className="text-2xl font-semibold tracking-tight text-[#111]">{title}</h2>}
          </div>
          {actions && <div className="flex items-center gap-3">{actions}</div>}
        </header>
      )}
      {children}
    </section>
  );
}
