import React from 'react';
import { ArrowUpRight, BarChart3, ShieldCheck, Workflow } from 'lucide-react';
import { SectionCard, StatCard, Button } from '../../components/director/PremiumComponents.jsx';

const statHighlights = [
  { label: 'Athletes onboarded', value: '612', change: '+38% vs last season' },
  { label: 'Approved NIL deals', value: '1,842', change: '+19% QoQ' },
  { label: 'Average compliance SLA', value: '2.1 hrs', change: 'Auto-routed 94% of tasks' }
];

const pillars = [
  {
    title: 'Director-grade visibility',
    description: 'Unified cockpit for matches, contracts, disclosures, and approvals with zero spreadsheets.',
    icon: BarChart3,
    bullets: ['Portfolio-level risk scoring', 'Deal stage telemetry', 'Realtime alerts']
  },
  {
    title: 'Workflow automation',
    description: 'Drag-and-drop playbooks that mirror your department&apos;s governance cadence.',
    icon: Workflow,
    bullets: ['Smart routing', 'Audit trails', 'Reminders + SMS nudges']
  },
  {
    title: 'Compliance guardrails',
    description: 'Automated document requests, eligibility checks, and approvals tied to NCAA changes.',
    icon: ShieldCheck,
    bullets: ['Policy engine', 'Document vault', 'Legal-reviewed templates']
  }
];

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        {statHighlights.map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} helper={stat.change} trend="up" />
        ))}
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '18px' }}>
        {pillars.map((pillar) => (
          <SectionCard
            key={pillar.title}
            title={pillar.title}
            description={pillar.description}
            action={<Button variant="secondary" size="sm">Explore</Button>}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {pillar.bullets.map((bullet) => (
                <div key={bullet} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <pillar.icon size={18} color="#4c5937" />
                  <span style={{ fontSize: '14px', color: '#475467' }}>{bullet}</span>
                </div>
              ))}
            </div>
          </SectionCard>
        ))}
      </section>

      <SectionCard
        title="White-glove onboarding in 14 days"
        description="Rootd pairs your team with an embedded operator who migrates data, recreates approvals, and co-facilitates training so you launch with confidence."
        variant="tinted"
        tone="mint"
        action={(
          <Button variant="primary" size="lg">
            Start my roll-out
            <ArrowUpRight size={16} />
          </Button>
        )}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
          {["Week 1", "Week 2", "Week 3", "Week 4"].map((week, index) => (
            <div key={week} style={{ padding: '16px', borderRadius: '14px', backgroundColor: 'rgba(255,255,255,0.8)', border: '1px solid rgba(76,89,55,0.1)' }}>
              <p style={{ margin: 0, fontSize: '12px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#94a3b8' }}>{week}</p>
              <p style={{ margin: '10px 0 0', fontSize: '16px', fontWeight: 600, color: '#111827' }}>
                {['Blueprint + data audit', 'Workflow recreation', 'Training + dry runs', 'Live launch + success desk'][index]}
              </p>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
