import React from 'react';

export default function MatchScoreBadge({ score }) {
  const numericScore = typeof score === 'number' ? score : Number(score ?? 0);
  let backgroundColor = '#64748b';

  if (numericScore >= 90) {
    backgroundColor = '#4c5937';
  } else if (numericScore >= 80) {
    backgroundColor = '#f59e0b';
  }

  const displayScore = Number.isNaN(numericScore) ? '—' : Math.round(numericScore);

  return (
    <span
      className="inline-flex h-11 w-11 items-center justify-center rounded-full font-semibold text-white shadow-md"
      style={{ backgroundColor }}
    >
      {displayScore}
    </span>
  );
}
