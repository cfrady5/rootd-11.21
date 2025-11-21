import React from 'react';
import MatchScoreBadge from './MatchScoreBadge.jsx';

const CONFIDENCE_MAP = {
  high: {
    label: 'Approved',
    style: {
      backgroundColor: '#eef2e4',
      color: '#4c5937',
      border: '1px solid #dfe5cc'
    }
  },
  medium: { label: 'Pending', style: { backgroundColor: '#f1f5f9', color: '#475569', border: '1px solid #e2e8f0' } },
  low: { label: 'Declined', style: { backgroundColor: '#fef2f2', color: '#b91c1c', border: '1px solid #fecaca' } }
};

export default function MatchRow({ match, index, onSelect }) {
  const zebra = index % 2 === 0 ? 'bg-white' : 'bg-slate-50';
  const confidenceKey = (match?.confidence ?? 'high').toString().toLowerCase();
  const confidence = CONFIDENCE_MAP[confidenceKey] || CONFIDENCE_MAP.medium;
  const deliverables = Array.isArray(match?.deliverables) ? match.deliverables.slice(0, 3).join(', ') : '—';

  return (
    <tr
      onClick={() => onSelect(match)}
      className={`${zebra} group cursor-pointer transition-colors hover:bg-rootd-cream/80`}
    >
      <td className="whitespace-nowrap px-6 py-4">
        <div className="flex items-center gap-4">
          <MatchScoreBadge score={match?.score} />
          <div>
            <p className="font-semibold text-slate-900">{match?.business ?? match?.business_name ?? 'Partner'}</p>
            <p className="text-xs uppercase tracking-wide text-slate-500">Match score {match?.score ?? '—'}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-slate-600">{deliverables}</td>
      <td className="px-6 py-4 text-sm">
        <span
          className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
          style={confidence.style}
        >
          {confidence.label}
        </span>
      </td>
      <td className="px-6 py-4 text-right text-sm text-slate-500">Updated {match?.updated_at ? formatDate(match.updated_at) : 'Just now'}</td>
    </tr>
  );
}

function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return 'Recently';
  }
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}
