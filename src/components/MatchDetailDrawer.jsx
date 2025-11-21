import React, { useEffect, useMemo, useState } from 'react';
import {
  Tabs,
  DrawerContainer,
  Button,
  StatusBadge
} from './director/PremiumComponents.jsx';

const tabs = [
  { key: 'overview', label: 'Overview' },
  { key: 'reasoning', label: 'Reasoning' },
  { key: 'deliverables', label: 'Deliverables' }
];

export default function MatchDetailDrawer({ match, isOpen, onClose, onAdvance, saving }) {
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (isOpen) {
      setActiveTab('overview');
    }
  }, [isOpen, match?.id]);

  const summaryItems = useMemo(() => ([
    { label: 'Match score', value: match?.match_score ?? match?.score ?? '—' },
    { label: 'Confidence', value: match?.match_confidence ?? match?.confidence ?? '—' },
    { label: 'Status', value: <StatusBadge status={mapMatchStatus(match?.status)} /> }
  ]), [match]);

  return (
    <DrawerContainer isOpen={isOpen} onClose={onClose} title={match?.business?.name ?? match?.name ?? 'Match detail'} size="lg">
      {match && (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {activeTab === 'overview' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>{match?.industry ?? 'Preferred partner'}</p>
                <h3 style={{ margin: 0, fontSize: '28px', color: '#0f172a' }}>{match?.business?.name ?? match?.name}</h3>
                <p style={{ margin: 0, color: '#475569' }}>{match?.summary ?? 'AI surfaced this partnership based on overlapping audience segments and campaign history.'}</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '16px' }}>
                  {summaryItems.map((item) => (
                    <div key={item.label} style={{ backgroundColor: '#f8fafc', borderRadius: '12px', padding: '16px' }}>
                      <p style={{ margin: 0, fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#94a3b8' }}>{item.label}</p>
                      <div style={{ marginTop: '8px', fontSize: '18px', fontWeight: 600 }}>
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reasoning' && (
              <div>
                <p style={{ margin: 0, fontSize: '15px', lineHeight: '1.6', color: '#0f172a' }}>
                  {match?.reasoning ?? 'Rootd AI reasoning will appear here once this match syncs its full briefing notes.'}
                </p>
              </div>
            )}

            {activeTab === 'deliverables' && (
              <div>
                <ul style={{ margin: 0, paddingLeft: '20px', color: '#0f172a' }}>
                  {(match?.deliverables ?? ['Instagram carousel', 'TikTok mini-series']).map((deliverable, idx) => (
                    <li key={`${deliverable}-${idx}`} style={{ marginBottom: '8px' }}>
                      {typeof deliverable === 'string' ? deliverable : deliverable?.title ?? 'Deliverable'}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div style={{ padding: '24px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <Button variant="secondary" onClick={onClose}>Dismiss</Button>
            <Button variant="primary" disabled={saving} onClick={onAdvance}>
              {saving ? 'Moving…' : 'Move to deal room'}
            </Button>
          </div>
        </div>
      )}
    </DrawerContainer>
  );
}

function mapMatchStatus(status) {
  if (!status) return 'pending';
  const normalized = status.toString().toLowerCase().replace(/\s+/g, '_');
  const allowed = ['pending', 'negotiation', 'approved', 'completed', 'cancelled'];
  return allowed.includes(normalized) ? normalized : 'pending';
}
