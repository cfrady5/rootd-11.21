import React from 'react';
import MatchScoreBadge from './MatchScoreBadge.jsx';
import { Button } from './director/PremiumComponents.jsx';

export default function SlideOverReasoning({ isOpen, match, onClose, onAdvance, saving }) {
  return (
    <div className={`pointer-events-none ${isOpen ? 'pointer-events-auto' : ''}`}>
      <div
        className={`fixed inset-0 z-40 bg-slate-900/30 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        aria-hidden="true"
        onClick={onClose}
      />
      <aside
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-md transform bg-white shadow-2xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Rootd AI reasoning</p>
            <h3 className="text-xl font-semibold text-slate-900">{match?.business ?? 'Partner'}</h3>
          </div>
          <button
            type="button"
            className="rounded-full border border-slate-200 p-2 text-slate-500 hover:text-slate-900"
            onClick={onClose}
            aria-label="Close reasoning panel"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col gap-6 px-6 py-6">
          <div className="flex items-center gap-4">
            <MatchScoreBadge score={match?.score} />
            <div>
              <p className="text-sm text-slate-500">Match score</p>
              <p className="text-lg font-semibold text-slate-900">{match?.score ?? '—'} / 100</p>
            </div>
          </div>
          <div className="space-y-3 rounded-2xl bg-slate-50 p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Why Rootd loves this fit</p>
            <ul className="list-disc space-y-2 pl-5 text-sm text-slate-600">
              {(match?.highlights ?? [
                'Audience overlap with downtown pop-up activations',
                'Strong compliance score with fast approvals',
                'Budget aligned with requested deliverables'
              ]).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-2 text-sm text-slate-600">
            <p className="font-semibold text-slate-900">Deliverables</p>
            <p>{Array.isArray(match?.deliverables) ? match.deliverables.join(', ') : 'To be defined in deal room'}</p>
          </div>
          <Button onClick={onAdvance} disabled={saving}>
            {saving ? 'Syncing…' : 'Advance to Deal Room'}
          </Button>
        </div>
      </aside>
    </div>
  );
}
