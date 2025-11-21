import React from 'react';
import { Activity, ArrowRight, BellRing, Target } from 'lucide-react';
import { PageHeader, StatCard, SectionCard, DataTable, Button, StatusBadge } from '../../components/director/PremiumComponents.jsx';

const topMetrics = [
  { label: 'Open matches', value: '42', change: +12, trend: 'up', helper: '13 ready for review' },
  { label: 'Deals in flight', value: '18', change: +4, trend: 'up', helper: '$3.2M pipeline' },
  { label: 'Compliance queue', value: '6 tasks', change: -28, trend: 'down', helper: 'Auto-cleared overnight' },
  { label: 'Athlete health score', value: '97', change: +3, trend: 'up', helper: 'High trust' }
];

const spotlightDeals = [
  { id: 1, partner: 'Nike NIL Labs', stage: 'Negotiation', amount: '$180K', owner: 'Morgan T.' },
  { id: 2, partner: 'Delta', stage: 'Legal review', amount: '$90K', owner: 'Priya S.' },
  { id: 3, partner: 'Spotify', stage: 'Ready to sign', amount: '$40K', owner: 'Cam R.' }
];

const complianceFeed = [
  { id: 'cmp-1', title: 'Disclose payment milestone', status: 'in_progress', owner: 'Finance automation', due: 'Today' },
  { id: 'cmp-2', title: 'Upload revised W9', status: 'todo', owner: 'Avery C.', due: 'Tomorrow' },
  { id: 'cmp-3', title: 'Policy attestation', status: 'done', owner: 'Team', due: 'Cleared' }
];

export default function Overview() {
  return (
    <div>
      <PageHeader
        title="Director overview"
        description="Live telemetry for matches, deals, and compliance performance. Updated every 60 seconds."
        actions={(<>
          <Button variant="secondary" icon={BellRing}>
            Pause alerts
          </Button>
          <Button variant="primary" icon={ArrowRight}>
            Export daily brief
          </Button>
        </>)}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginTop: '24px' }}>
        {topMetrics.map((metric) => (
          <StatCard key={metric.label} {...metric} />
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px', marginTop: '32px' }}>
        <SectionCard
          title="Deal spotlight"
          description="Rootd monitors every approval, document, and payment so you see friction instantly."
          action={<Button variant="secondary" size="sm">View pipeline</Button>}
        >
          <DataTable
            columns={[
              { key: 'partner', label: 'Partner' },
              { key: 'stage', label: 'Stage' },
              { key: 'amount', label: 'Value' },
              { key: 'owner', label: 'Owner' }
            ]}
            data={spotlightDeals.map((deal) => ({
              ...deal,
              stage: <StatusBadge status={deal.stage === 'Ready to sign' ? 'approved' : deal.stage === 'Legal review' ? 'pending' : 'in_progress'} />
            }))}
          />
        </SectionCard>
        <SectionCard
          title="Compliance control tower"
          description="Tasks auto-routed by persona. Rootd resolves 72% of issues before staff intervention."
          action={<Button variant="secondary" size="sm" icon={Activity}>View all signals</Button>}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {complianceFeed.map((item) => (
              <div key={item.id} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 0',
                borderBottom: '1px solid rgba(15,23,42,0.06)'
              }}>
                <div>
                  <p style={{ margin: 0, fontWeight: 600 }}>{item.title}</p>
                  <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#6b7280' }}>{item.owner}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8' }}>{item.due}</p>
                  <StatusBadge status={item.status} />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div style={{ marginTop: '32px' }}>
        <SectionCard
          title="Focus for today"
          description="Targeted plays Rootd recommends to keep velocity high."
          tone="blush"
          variant="tinted"
          action={<Button variant="primary" icon={Target}>Run playbook</Button>}
        >
          <ul style={{ margin: 0, paddingLeft: '18px', color: '#475467', lineHeight: 1.6 }}>
            <li>Host 15-minute sync with creative to unblock Nike NIL Labs revisions.</li>
            <li>Invite finance to new revenue share automation to reduce ACH delays.</li>
            <li>Share compliance digest with AD before tonight&apos;s board call.</li>
          </ul>
        </SectionCard>
      </div>
    </div>
  );
}
