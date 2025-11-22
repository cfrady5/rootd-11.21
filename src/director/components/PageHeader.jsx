import React from 'react';

export default function PageHeader({ eyebrow, title, description, actions }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-6 py-6">
      <div>
        {eyebrow && <p className="text-xs uppercase tracking-[0.4em] text-rootd-green/70 mb-2">{eyebrow}</p>}
        <h1 className="text-3xl font-semibold text-white tracking-tight">{title}</h1>
        {description && <p className="text-white/60 text-base mt-2 max-w-2xl">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </div>
  );
}
