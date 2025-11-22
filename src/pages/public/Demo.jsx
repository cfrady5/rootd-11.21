import React, { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  MonitorDot,
  Sparkles,
  Workflow,
  BriefcaseBusiness,
  ShieldCheck,
  Users2,
  Radio,
  ClipboardCheck,
  Gauge,
  ToggleLeft,
  ToggleRight,
  Share2,
  UploadCloud,
  UserRound,
  RotateCcw,
  FileCheck2
} from 'lucide-react';
import { SectionCard, Button, StatusBadge } from '../../components/director/PremiumComponents.jsx';
import {
  MatchFeedCard,
  ComplianceTimelineCard,
  PayoutTrackingCard
} from '../../components/athlete/PremiumCards.jsx';
import {
  OpportunitiesPipeline,
  MatchIntelligence,
  ComplianceWorkflow,
  StakeholderCollaboration
} from '../../components/business/PortalComponents.jsx';
import {
  UnifiedCockpitDashboard,
  ProgramRiskScoring,
  DealStageTelemetry,
  PlaybookBuilder
} from '../../components/director/CockpitComponents.jsx';

const personaContent = {
  athlete: {
    label: 'Athlete portal',
    status: 'active',
    description: 'Roster-first workspace that keeps every athlete on pace with deals, deliverables, and compliance reminders.',
    metrics: [
      { label: 'Opportunities live', value: '12 matches', icon: MonitorDot },
      { label: 'Compliance tasks', value: '0 overdue', icon: ClipboardCheck },
      { label: 'Payout tracking', value: 'Real-time', icon: Gauge }
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
      { label: 'Briefs submitted', value: '6 active', icon: BriefcaseBusiness },
      { label: 'Average approval', value: '48 mins', icon: Sparkles },
      { label: 'Budget guardrails', value: 'Pre-set', icon: ShieldCheck }
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
      { label: 'Deal pipeline', value: '$3.2M', icon: MonitorDot },
      { label: 'Signals monitored', value: '2.7M events', icon: Radio },
      { label: 'Automation coverage', value: '94%', icon: Workflow }
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
    { title: 'Compliance timeline', description: 'Auto-created steps for forms, W9 uploads, and disclosures with SMS nudges.', icon: ClipboardCheck },
    { title: 'Director notes', description: 'Directors drop context, pricing guardrails, and redlines before athletes ever negotiate.', icon: ShieldCheck }
  ],
  business: [
    { title: 'Offer composer', description: 'Guardrail templates keep tone, spend, and categories safe while brands build offers.', icon: BriefcaseBusiness },
    { title: 'Asset locker', description: 'Creative uploads sync with approvals, so directors never chase files.', icon: UploadCloud },
    { title: 'Live status board', description: 'Brand teams see procurement, finance, and legal approvals in a single tracker.', icon: Radio }
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

const sampleDeals = {
  athlete: [
    { brand: 'H2O+ Hydration', value: '$45K retainer', status: 'Creative upload complete' },
    { brand: 'New Balance NIL Tour', value: '$28K sprint', status: 'Awaiting finance sign-off' }
  ],
  business: [
    { brand: 'FirstLight Energy', value: '$62K', status: 'Offer accepted' },
    { brand: 'Chip City Collective', value: '$18K', status: 'Intake in review' }
  ],
  director: [
    { brand: 'CapitalOne Renewal', value: '$120K', status: 'Board deck exported' },
    { brand: 'Local Hospital PSA', value: '$32K', status: 'Compliance pass' }
  ]
};

const automationOverlays = {
  athlete: [
    { label: 'Compliance autopilot', description: 'Auto-builds disclosure, W9, and educational touchpoints per conference rules.', status: 'active', metric: '10 tasks templated', defaultActive: true, tooltip: 'Rootd updates checklists when NCAA guidance shifts.' },
    { label: 'Payout sync', description: 'Routes approved payouts to finance with ledger attachments and bank validation.', status: 'active', metric: '3 systems connected', defaultActive: false, tooltip: 'Connects to Workday, NetSuite, or QuickBooks.' }
  ],
  business: [
    { label: 'Brand safety scans', description: 'Uploads are scanned for NCAA compliance and brand guidelines before routing.', status: 'monitoring', metric: '5 policies enforced', defaultActive: true, tooltip: 'Checks for banned categories and language.' },
    { label: 'Procurement bridge', description: 'Purchase order data syncs back to the portal so marketing and finance stay aligned.', status: 'active', metric: '2 ERPs synced', defaultActive: false, tooltip: 'Bi-directional sync with procurement teams.' }
  ],
  director: [
    { label: 'Escalation ladder', description: 'Auto-notifies legal, compliance, and ADs based on risk scoring thresholds.', status: 'active', metric: '4 tiers configured', defaultActive: true, tooltip: 'Escalations fire when risk score > 70.' },
    { label: 'Renewal radar', description: 'Surfaces expiring deals and creates workflows for renegotiation and upsell.', status: 'in_progress', metric: '7 renewals tracked', defaultActive: false, tooltip: 'Looks 90 days ahead for renewals + upsell cues.' }
  ]
};

const prepChecklist = [
  { icon: Share2, label: 'Share recent deals' },
  { icon: FileCheck2, label: 'Upload compliance checklist' },
  { icon: UserRound, label: 'Invite your stakeholders' }
];

const buildAutomationState = (personaKey) => automationOverlays[personaKey].reduce((state, automation) => {
  state[automation.label] = automation.defaultActive;
  return state;
}, {});

const portalComponentMap = {
  athlete: [MatchFeedCard, ComplianceTimelineCard, PayoutTrackingCard],
  business: [OpportunitiesPipeline, MatchIntelligence, ComplianceWorkflow, StakeholderCollaboration],
  director: [UnifiedCockpitDashboard, ProgramRiskScoring, DealStageTelemetry, PlaybookBuilder]
};

export default function Demo() {
  const [activePersona, setActivePersona] = useState('athlete');
  const [automationStates, setAutomationStates] = useState(() => buildAutomationState('athlete'));
  const selectedPersona = useMemo(() => personaContent[activePersona], [activePersona]);
  const cards = previewCards[activePersona];
  const workflowSteps = workflowSnapshots[activePersona];
  const automations = automationOverlays[activePersona];
  const summaryMetrics = selectedPersona.metrics;
  const deals = sampleDeals[activePersona];
  const personaPortalComponents = portalComponentMap[activePersona] || [];
  const portalGridTemplateColumns = activePersona === 'athlete'
    ? 'repeat(auto-fit, minmax(320px, 1fr))'
    : 'repeat(auto-fit, minmax(360px, 1fr))';

  useEffect(() => {
    setAutomationStates(buildAutomationState(activePersona));
  }, [activePersona]);

  const handleAutomationToggle = (label) => {
    setAutomationStates((prev) => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  const handleReset = () => setActivePersona('athlete');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <SectionCard
        title="Demo workspaces"
        description="Toggle between fully-loaded portals to see exactly what athletes, business partners, and directors experience."
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'stretch' }}>
            <div style={{ flex: '1 1 520px', minWidth: '280px' }}>
              <div
                style={{
                  position: 'relative',
                  display: 'grid',
                  gridTemplateColumns: `repeat(${personaOrder.length}, minmax(0, 1fr))`,
                  gap: '6px',
                  padding: '6px',
                  borderRadius: '999px',
                  background: 'rgba(76,89,55,0.1)',
                  border: '1px solid rgba(76,89,55,0.2)'
                }}
              >
                {personaOrder.map((key) => {
                  const persona = personaContent[key];
                  const isActive = key === activePersona;
                  return (
                    <button
                      key={key}
                      onClick={() => setActivePersona(key)}
                      style={{
                        position: 'relative',
                        border: 'none',
                        background: 'transparent',
                        borderRadius: '999px',
                        padding: '16px 18px',
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: isActive ? '#1f2a1b' : '#4b5563',
                        fontWeight: 600,
                        minHeight: '60px',
                        overflow: 'hidden'
                      }}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="persona-toggle-pill"
                          transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                          style={{
                            position: 'absolute',
                            inset: 0,
                            borderRadius: '999px',
                            background: 'rgba(255,255,255,0.98)',
                            boxShadow: '0 18px 30px rgba(15,23,42,0.12)'
                          }}
                        />
                      )}
                      <span style={{ position: 'relative', fontSize: '0.95rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                        {persona.label.replace(' portal', '')}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
            <motion.button
              onClick={handleReset}
              whileHover={{ rotate: 10 }}
              style={{
                border: 'none',
                background: 'rgba(76,89,55,0.08)',
                borderRadius: '999px',
                padding: '10px 18px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                fontWeight: 600,
                color: '#4c5937',
                alignSelf: 'center'
              }}
            >
              <RotateCcw size={16} /> Reset
            </motion.button>
          </div>
        </div>
        <div style={{
          marginTop: '24px',
          borderRadius: '24px',
          border: '1px solid rgba(76,89,55,0.12)',
          backgroundColor: 'rgba(255,255,255,0.95)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: '1 1 240px', minWidth: '220px' }}>
              <selectedPersona.icon size={40} color="#4c5937" />
              <div>
                <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>{selectedPersona.label}</p>
                <StatusBadge status={selectedPersona.status} />
              </div>
            </div>
            <p style={{ margin: 0, color: '#475467', flex: '2 1 320px' }}>{selectedPersona.description}</p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '18px' }}>
            {summaryMetrics.map((metric) => (
              <div key={metric.label} style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: '1 1 220px', minWidth: '200px' }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '14px',
                  backgroundColor: 'rgba(76,89,55,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <metric.icon size={22} color="#4c5937" />
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.16em', color: '#7a8375' }}>{metric.label}</p>
                  <p style={{ margin: '4px 0 0', fontSize: '1.3rem', fontWeight: 600 }}>{metric.value}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid rgba(76,89,55,0.1)', paddingTop: '18px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            {deals.map((deal) => (
              <motion.div
                key={deal.brand}
                whileHover={{ y: -4, boxShadow: '0 16px 32px rgba(15,23,42,0.12)' }}
                style={{
                  padding: '16px',
                  borderRadius: '16px',
                  border: '1px solid rgba(76,89,55,0.12)',
                  backgroundColor: 'rgba(255,255,255,0.9)'
                }}
              >
                <p style={{ margin: 0, fontWeight: 600 }}>{deal.brand}</p>
                <p style={{ margin: '4px 0', color: '#111827' }}>{deal.value}</p>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#556072' }}>{deal.status}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionCard>

      <SectionCard
        title="Live portal preview"
        description={`Pulled directly from the ${selectedPersona.label.toLowerCase()} experience so prospects can click through real surfaces.`}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: portalGridTemplateColumns,
            gap: '20px'
          }}
        >
          {personaPortalComponents.map((Component, index) => (
            <div key={`${activePersona}-portal-${index}`} style={{ minWidth: 0 }}>
              <Component />
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
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              style={{
                padding: '22px',
                borderRadius: '20px',
                border: '1px solid rgba(76,89,55,0.16)',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(243,246,238,0.9))',
                minHeight: '200px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '14px',
                  backgroundColor: 'rgba(76,89,55,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <card.icon size={22} color="#4c5937" />
                </div>
                <span style={{ fontSize: '0.75rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#7f8b73' }}>
                  {index + 1} / 3
                </span>
              </div>
              <h4 style={{ margin: 0, fontSize: '18px' }}>{card.title}</h4>
              <p style={{ margin: 0, color: '#475467', lineHeight: 1.6 }}>{card.description}</p>
              <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '8px', color: '#111827', fontWeight: 600 }}>
                <Sparkles size={16} color="#4c5937" />
                Built in the live demo
              </div>
            </motion.div>
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
          {automations.map((automation) => {
            const isActive = automationStates[automation.label];
            return (
              <motion.div
                key={automation.label}
                whileHover={{ y: -4 }}
                style={{
                  padding: '22px',
                  borderRadius: '20px',
                  border: '1px solid rgba(76,89,55,0.2)',
                  backgroundColor: 'rgba(255,255,255,0.96)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                  <div>
                    <p style={{ margin: 0, fontSize: '17px', fontWeight: 600 }}>{automation.label}</p>
                    <StatusBadge status={automation.status} />
                  </div>
                  <button
                    onClick={() => handleAutomationToggle(automation.label)}
                    style={{
                      border: 'none',
                      background: 'rgba(76,89,55,0.08)',
                      borderRadius: '999px',
                      padding: '6px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      cursor: 'pointer',
                      fontWeight: 600,
                      color: isActive ? '#1f2a1b' : '#6b7280'
                    }}
                  >
                    {isActive ? <ToggleRight size={18} color="#4c5937" /> : <ToggleLeft size={18} color="#6b7280" />}
                    {isActive ? 'Enabled' : 'Paused'}
                  </button>
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
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#6b7280' }}>{automation.tooltip}</p>
              </motion.div>
            );
          })}
        </div>
      </SectionCard>

      <SectionCard
        title="Demo prep"
        description="Send us a few details and we load your actual data before the call."
        tone="sage"
        variant="tinted"
        action={<Button variant="secondary">Download prep kit</Button>}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          {prepChecklist.map((item) => (
            <div
              key={item.label}
              style={{
                padding: '16px',
                borderRadius: '16px',
                border: '1px dashed rgba(76,89,55,0.3)',
                backgroundColor: 'rgba(255,255,255,0.94)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '14px',
                backgroundColor: 'rgba(76,89,55,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <item.icon size={22} color="#4c5937" />
              </div>
              <p style={{ margin: 0, fontWeight: 600, color: '#1f2a1b' }}>{item.label}</p>
            </div>
          ))}
        </div>
        <div style={{
          marginTop: '20px',
          padding: '16px',
          borderRadius: '16px',
          backgroundColor: 'rgba(76,89,55,0.08)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          alignItems: 'center'
        }}>
          <p style={{ margin: 0, color: '#1f2a1b', fontWeight: 600 }}>Prefer a white-glove intake?</p>
          <Button variant="primary">Send files securely</Button>
        </div>
      </SectionCard>
    </div>
  );
}
