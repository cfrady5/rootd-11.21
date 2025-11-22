import React from 'react';

export default function StepCard({ step, title, description, icon }) {
  return (
    <div className="rounded-3xl bg-white border border-black/5 p-6 shadow-rootd-soft flex flex-col gap-4 text-center">
      <div className="mx-auto w-14 h-14 rounded-2xl bg-rootd-green/15 text-rootd-green flex items-center justify-center text-2xl font-semibold">
        {icon || step}
      </div>
      <p className="text-xs uppercase tracking-[0.3em] text-neutral-600">Step {step}</p>
      <h3 className="text-xl font-semibold text-rootd-charcoal">{title}</h3>
      <p className="text-sm text-neutral-600">{description}</p>
    </div>
  );
}
