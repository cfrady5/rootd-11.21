import React, { useEffect, useState } from 'react';
import { DrawerContainer, Tabs, Button, StatusBadge, EmptyState } from './director/PremiumComponents.jsx';

const TABS = [
  { key: 'overview', label: 'Overview' },
  { key: 'messages', label: 'Messages' },
  { key: 'documents', label: 'Documents' }
];

const labelStyle = {
  fontSize: '12px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: '#94a3b8',
  margin: 0
};

const valueStyle = {
  margin: '8px 0 0',
  fontSize: '18px',
  fontWeight: 600,
  color: '#0f172a'
};

export default function DealDetailDrawer({ deal, isOpen, onClose, onAdvance, saving }) {
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (isOpen) {
      setActiveTab('overview');
    }
  }, [isOpen, deal?.id]);

  return (
    <DrawerContainer isOpen={isOpen} onClose={onClose} title={deal?.business?.name ?? deal?.brand ?? 'Deal detail'} size="lg">
      {deal && (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Tabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {activeTab === 'overview' && (
              <OverviewTab deal={deal} />
            )}
            {activeTab === 'messages' && (
              <EmptyState title="No messages yet" description="Keep conversations flowing with compliance and brand partners." />
            )}
            {activeTab === 'documents' && (
              <DocumentsTab documents={deal.documents} />
            )}
          </div>
          <div style={{ padding: '24px', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
            <Button variant="primary" disabled={saving} onClick={onAdvance}>
              {saving ? 'Advancing…' : 'Advance to next stage'}
            </Button>
          </div>
        </div>
      )}
    </DrawerContainer>
  );
}

function OverviewTab({ deal }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <p style={{ margin: 0, fontSize: '14px', color: '#94a3b8' }}>Brand</p>
        <h3 style={{ margin: '4px 0 0', fontSize: '28px', color: '#0f172a' }}>{deal.business?.name ?? deal.brand}</h3>
        <p style={{ margin: '6px 0 0', color: '#475569' }}>{deal.summary ?? 'Rootd surfaces deal notes, approvals, and payout history in one place.'}</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '16px' }}>
        <InfoTile label="Status" value={<StatusBadge status={normalizeStatus(deal.deal_status ?? deal.status)} />} />
        <InfoTile label="Value" value={formatCurrency(deal.compensation_cash)} />
        <InfoTile label="Start" value={deal.start_date ?? 'TBD'} />
        <InfoTile label="End" value={deal.end_date ?? 'TBD'} />
      </div>
      <div>
        <p style={labelStyle}>Deliverables</p>
        <ul style={{ margin: '12px 0 0', paddingLeft: '20px', color: '#0f172a' }}>
          {(deal.deliverables ?? ['Scope will appear here.']).map((item, idx) => (
            <li key={idx} style={{ marginBottom: '6px' }}>
              {typeof item === 'string' ? item : item?.label ?? item?.title ?? 'Deliverable'}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function DocumentsTab({ documents }) {
  if (!documents || documents.length === 0) {
    return <EmptyState title="No documents uploaded" description="Signed agreements and briefs will sync automatically." />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {documents.map((doc) => (
        <div key={doc.id ?? doc.file_url} style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ margin: 0, fontWeight: 600 }}>{doc.document_type ?? 'Document'}</p>
            <p style={{ margin: '4px 0 0', color: '#94a3b8', fontSize: '13px' }}>{doc.file_url ?? 'Link pending'}</p>
          </div>
          <span style={{ fontSize: '12px', color: '#475569' }}>{doc.uploaded_at ? new Date(doc.uploaded_at).toLocaleDateString() : 'Draft'}</span>
        </div>
      ))}
    </div>
  );
}

function InfoTile({ label, value }) {
  return (
    <div style={{ backgroundColor: '#f8fafc', borderRadius: '12px', padding: '16px' }}>
      <p style={labelStyle}>{label}</p>
      <div style={valueStyle}>{value}</div>
    </div>
  );
}

function normalizeStatus(status) {
  if (!status) return 'pending';
  return status.toString().toLowerCase().replace(/\s+/g, '_');
}

function formatCurrency(value) {
  if (value === null || value === undefined) return '—';
  const number = Number(value);
  if (Number.isNaN(number)) return value;
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(number);
}
