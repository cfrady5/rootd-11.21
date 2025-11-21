import React, { useMemo, useState } from 'react';
import { MonitorDot, Sparkles, Workflow, BriefcaseBusiness, ShieldCheck, Users2 } from 'lucide-react';
import { SectionCard, Button, StatusBadge } from '../../components/director/PremiumComponents.jsx';

const personaContent = {
  athlete: {
    label: 'Athlete portal',
    status: 'active',
    description: 'Roster-first workspace that keeps every athlete on pace with deals, deliverables, and compliance reminders.',
    metrics: [
      { label: 'Opportunities live', value: '12 matches' },
      { label: 'Compliance tasks', value: '0 overdue' },
      { label: 'Payout tracking', value: 'Real-time' }
    ],
    highlights: [
      'Personalized compliance roadmap and document vault',
      'Deal chat with creative, finance, and director in one place',
      'Mobile nudges + SMS reminders baked in'
    ],
    icon: Users2
  },
  business: {
    label: 'Business portal',
    status: 'in_progress',
    description: 'Brand-safe control room where partners submit offers, upload assets, and track approvals without email chains.',
    metrics: [
      { label: 'Briefs submitted', value: '6 active' },
      { label: 'Average approval', value: '48 mins' },
      { label: 'Budget guardrails', value: 'Pre-set' }
    ],
    highlights: [
      'Dynamic intake forms self-route to the right director',
      'Contract redlines tracked with audit-friendly snapshots',
      'Auto-generated recap deck after every activation'
    ],
    icon: BriefcaseBusiness
  },
  director: {
    label: 'Director portal',
    status: 'active',
    description: 'Full telemetry on matches, deals, and compliance in a single premium experience built for board meetings.',
    metrics: [
      { label: 'Deal pipeline', value: '$3.2M' },
      { label: 'Signals monitored', value: '2.7M events' },
      { label: 'Automation coverage', value: '94%' }
    ],
    highlights: [
      'Command center for approvals, escalations, and tasks',
      'Automation studio to drag, drop, and deploy workflows',
      'Instant board-ready exports for ADs and compliance'
    ],
    icon: ShieldCheck
  }
};

const personaOrder = ['athlete', 'business', 'director'];

const previewCards = {
  athlete: [
    { title: 'Match feed', description: 'Swipeable brief that surfaces alignment, deliverables, and match confidence instantly.', icon: MonitorDot },
    { title: 'Compliance timeline', description: 'Auto-created steps for forms, W9 uploads, and disclosures with SMS nudges.', icon: Sparkles },
    { title: 'Director notes', description: 'Directors drop context, pricing guardrails, and redlines before athletes ever negotiate.', icon: ShieldCheck }
  ],
  business: [
    { title: 'Offer composer', description: 'Guardrail templates keep tone, spend, and categories safe while brands build offers.', icon: BriefcaseBusiness },
    { title: 'Asset locker', description: 'Creative uploads sync with approvals, so directors never chase files.', icon: Workflow },
    { title: 'Live status board', description: 'Brand teams see procurement, finance, and legal approvals in a single tracker.', icon: MonitorDot }
  ],
  director: [
    { title: 'Deal telemetry', description: 'Live kanban plus finance view to see bottlenecks before they stall revenue.', icon: MonitorDot },
    { title: 'Automation studio', description: 'Trigger finance, legal, and content workflows through drag-and-drop logic.', icon: Workflow },
    { title: 'Stakeholder brief', description: 'Instant recap deck with compliance, revenue, and NIL insight for ADs.', icon: Sparkles }
  ]
};

const workflowSnapshots = {
  athlete: [
    { stage: 'Match lands', detail: 'Brand intake form hits the athlete workspace with pre-cleared categories and sample deliverables.', owner: 'Brand partner', duration: 'Instant' },
    { stage: 'Director review', detail: 'Director confirms compliance, leaves pricing notes, and tees up a ready-to-sign draft.', owner: 'Director', duration: '6 mins' },
    { stage: 'Athlete go-live', detail: 'Athlete approves, mobile nudges fire, and reporting dashboards spin up automatically.', owner: 'Athlete', duration: 'Same day' }
  ],
  business: [
    { stage: 'Brief submitted', detail: 'Offer composer enforces tone, category, and budget guardrails before the brief routes.', owner: 'Brand lead', duration: '4 mins' },
    { stage: 'Asset review', detail: 'Creative uploads sync to the director portal where approvals and redlines are tracked.', owner: 'Director', duration: '31 mins' },
    { stage: 'Activation recap', detail: 'Automation suite exports a recap deck with spend, reach, and deliverable proof.', owner: 'Platform', duration: 'Automatic' }
  ],
  director: [
    { stage: 'Signal detected', detail: 'Telemetry flags high-likelihood matches and compliance items inside the director board.', owner: 'Platform', duration: 'Continuous' },
    { stage: 'Workflow orchestration', detail: 'Director drags automation blocks to route legal, finance, and creative approvals.', owner: 'Director', duration: '8 mins' },
    { stage: 'Executive brief', detail: 'Board-ready export packages performance, risk, and upcoming renewals for leadership.', owner: 'Platform', duration: 'Automatic' }
  ]
};

const automationOverlays = {
  athlete: [
    { label: 'Compliance autopilot', description: 'Auto-builds disclosure, W9, and educational touchpoints per conference rules.', status: 'active', metric: '10 tasks templated' },
    { label: 'Payout sync', description: 'Routes approved payouts to finance with ledger attachments and bank validation.', status: 'active', metric: '3 systems connected' }
  ],
  business: [
    { label: 'Brand safety scans', description: 'Uploads are scanned for NCAA compliance and brand guidelines before routing.', status: 'monitoring', metric: '5 policies enforced' },
    { label: 'Procurement bridge', description: 'Purchase order data syncs back to the portal so marketing and finance stay aligned.', status: 'active', metric: '2 ERPs synced' }
  ],
  director: [
    { label: 'Escalation ladder', description: 'Auto-notifies legal, compliance, and ADs based on risk scoring thresholds.', status: 'active', metric: '4 tiers configured' },
    { label: 'Renewal radar', description: 'Surfaces expiring deals and creates workflows for renegotiation and upsell.', status: 'in_progress', metric: '7 renewals tracked' }
  ]
};

export default function Demo() {
  const [activePersona, setActivePersona] = useState('athlete');
  const selectedPersona = useMemo(() => personaContent[activePersona], [activePersona]);
  const cards = previewCards[activePersona];
  const workflowSteps = workflowSnapshots[activePersona];
  const automations = automationOverlays[activePersona];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <SectionCard
        title="Demo workspaces"
        description="Toggle between fully-loaded portals to see exactly what athletes, business partners, and directors experience."
        action={(
          <Button variant="primary" onClick={() => setActivePersona('athlete')}>
            Reset to athlete view
          </Button>
        )}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          {personaOrder.map((key) => {
            const persona = personaContent[key];
            const isActive = key === activePersona;
            return (
              <Button
                key={key}
                variant={isActive ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setActivePersona(key)}
                style={{ flex: '1 1 160px' }}
              >
                {persona.label}
              </Button>
            );
          })}
        </div>
        <div style={{
          marginTop: '24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '18px'
        }}>
          <div style={{
            padding: '20px',
            borderRadius: '16px',
            border: '1px solid rgba(76,89,55,0.15)',
            backgroundColor: 'rgba(255,255,255,0.9)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <selectedPersona.icon size={28} color="#4c5937" />
              <StatusBadge status={selectedPersona.status} />
            </div>
            <p style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>{selectedPersona.label}</p>
            <p style={{ margin: 0, color: '#475467', lineHeight: 1.5 }}>{selectedPersona.description}</p>
          </div>
          {selectedPersona.metrics.map((metric) => (
            <div
              key={metric.label}
              style={{
                padding: '20px',
                borderRadius: '16px',
                border: '1px solid rgba(76,89,55,0.12)',
                backgroundColor: 'white'
              }}
            >
              <p style={{ margin: 0, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#94a3b8' }}>{metric.label}</p>
              <p style={{ margin: '8px 0 0', fontSize: '24px', fontWeight: 600, color: '#111827' }}>{metric.value}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title="Workflow snapshot"
        description="See the exact handoffs, timelines, and owners for the selected workspace."
      >
        <div style={{ display: 'grid', gap: '14px' }}>
          {workflowSteps.map((step, index) => (
            <div
              key={step.stage}
              style={{
                display: 'flex',
                gap: '16px',
                padding: '18px',
                borderRadius: '18px',
                backgroundColor: 'rgba(255,255,255,0.9)',
                border: '1px solid rgba(76,89,55,0.12)'
              }}
            >
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: 'rgba(76,89,55,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 600,
                color: '#4c5937'
              }}>
                {index + 1}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                  <p style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>{step.stage}</p>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center', color: '#475467', fontSize: '14px' }}>
                    <span style={{ fontWeight: 600 }}>{step.owner}</span>
                    <span style={{ opacity: 0.6 }}>•</span>
                    <span>{step.duration}</span>
                  </div>
                </div>
                <p style={{ margin: '6px 0 0', color: '#475467', lineHeight: 1.6 }}>{step.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title="Portal highlights"
        description="Each workspace mirrors the exact workflows you run today—no theatrical demo mode."
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px' }}>
          {cards.map((card) => (
            <div key={card.title} style={{ padding: '20px', borderRadius: '16px', border: '1px solid rgba(76,89,55,0.12)', backgroundColor: 'rgba(255,255,255,0.85)' }}>
              <card.icon size={26} color="#4c5937" />
              <h4 style={{ margin: '12px 0 6px', fontSize: '18px' }}>{card.title}</h4>
              <p style={{ margin: 0, color: '#475467', lineHeight: 1.6 }}>{card.description}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title="Automation overlays"
        description="Every portal ships with pre-built automations you can turn on or edit during the demo."
        tone="sage"
        variant="tinted"
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px' }}>
          {automations.map((automation) => (
            <div
              key={automation.label}
              style={{
                padding: '20px',
                borderRadius: '16px',
                border: '1px solid rgba(76,89,55,0.18)',
                backgroundColor: 'rgba(255,255,255,0.92)',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <p style={{ margin: 0, fontSize: '17px', fontWeight: 600 }}>{automation.label}</p>
                <StatusBadge status={automation.status} />
              </div>
              <p style={{ margin: 0, color: '#475467', lineHeight: 1.5 }}>{automation.description}</p>
              <div style={{
                marginTop: '6px',
                padding: '10px 12px',
                borderRadius: '12px',
                backgroundColor: 'rgba(76,89,55,0.08)',
                color: '#1f2937',
                fontSize: '14px',
                fontWeight: 600
              }}>
                {automation.metric}
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title="Demo prep"
        description="Send us a few details and we load your actual data before the call."
        tone="sage"
        variant="tinted"
        action={<Button variant="secondary">Download prep kit</Button>}
      >
        <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: 1.7, color: '#475467' }}>
          <li>Deal log export or spreadsheet with the last 5 activations.</li>
          <li>Existing compliance checklist or policy PDF.</li>
          <li>Marketing + finance stakeholders who should join.</li>
        </ul>
      </SectionCard>
    </div>
  );
}
