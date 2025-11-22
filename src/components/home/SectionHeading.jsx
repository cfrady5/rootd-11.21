import React from 'react';

export default function SectionHeading({ eyebrow, title, description, align = 'center', className = '' }) {
  const alignment = align === 'left' ? 'text-left items-start' : 'text-center items-center';
  return (
    <div className={`flex flex-col gap-3 ${alignment} ${className}`}>
      {eyebrow && <p className="text-xs uppercase tracking-[0.4em] text-neutral-600">{eyebrow}</p>}
      {title && <h2 className="text-3xl sm:text-4xl font-semibold text-rootd-charcoal tracking-tight">{title}</h2>}
      {description && <p className={`text-base text-neutral-600 max-w-2xl ${align === 'center' ? 'mx-auto' : ''}`}>{description}</p>}
    </div>
  );
}
