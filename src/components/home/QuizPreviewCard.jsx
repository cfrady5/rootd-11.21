import React from 'react';

const answers = ['Youth Sports', 'Animal Welfare', 'Environmental', 'Local Community'];

export default function QuizPreviewCard() {
  return (
    <div className="rounded-3xl bg-white shadow-rootd-card border border-black/5 p-6 flex flex-col gap-4 max-w-xl mx-auto">
      <p className="text-sm uppercase tracking-[0.3em] text-neutral-600">Quiz preview</p>
      <h3 className="text-2xl font-semibold text-rootd-charcoal">Which cause are you most passionate about?</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {answers.map((answer) => (
          <button
            key={answer}
            className="rounded-2xl border border-black/5 bg-neutral-50 px-4 py-3 text-left font-medium text-neutral-700 hover:border-rootd-green hover:text-rootd-charcoal transition"
            type="button"
          >
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
}
