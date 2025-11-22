import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  BriefcaseBusiness,
  MessageSquare,
  Radio,
  ShieldCheck,
  Sparkles,
  Workflow,
  Users2
} from 'lucide-react';
import { Button, SectionCard } from '../../components/director/PremiumComponents.jsx';
import { brandPalette, shadows, rhythm } from '../../lib/designSystem.js';

const highlightStats = [
  { label: 'Programs orchestrated', value: '38', helper: 'Power & mid-major partners' },
  { label: 'Deals routed', value: '$112M', helper: 'with finance telemetry' },
  { label: 'Compliance automation', value: '92%', helper: 'average manual reduction' }
];

const personaPanels = [
  {
    label: 'Director cockpit',
    icon: ShieldCheck,
    description: 'Approvals, escalations, and finance handoffs live in one command center.',
    bullets: ['Automation studio', 'Compliance queue', 'Board-ready exports']
  },
  {
    label: 'Athlete portal',
    icon: Users2,
    description: 'Roster-first workspace with proactive nudges, deliverables, and payouts.',
    bullets: ['Smart nudges', 'In-app messaging', 'Document vault']
  },
  {
    label: 'Partner telemetry',
    icon: BriefcaseBusiness,
    description: 'Transparent KPI stream so local partners can co-build with confidence.',
    bullets: ['Live activation status', 'Brand-safe briefings', 'Collaboration log']
  }
];

const workflowSteps = [
  { title: 'Signal detected', detail: 'Rootd intelligence surfaces matches + compliance risk in one feed.', icon: Radio },
  { title: 'Director review', detail: 'Drag-and-drop automations route approvals, finance, and creative.', icon: Workflow },
  { title: 'Athlete execution', detail: 'Portal nudges, deliverables, and payouts stay synced automatically.', icon: MessageSquare },
  { title: 'Partner telemetry', detail: 'Dashboards stream impact + budget back to every stakeholder.', icon: ArrowRight }
];

const references = [
  {
    quote: 'Rootd feels like the first enterprise system built for NIL realities—live telemetry, obsessively human UI, and the rigor compliance demands.',
    author: 'Morgan T.',
    role: 'Senior Associate AD, Saint Jude University'
  },
  {
    quote: 'Our athletes stopped screenshotting spreadsheets. Everything they need is in one calm place with nudges that actually feel personal.',
    author: 'Chelsea R.',
    role: 'Director of Athlete Experience'
  }
];

function StatTile({ label, value, helper }) {
  return (
    <div style={{
      padding: '20px',
      borderRadius: '24px',
      border: '1px solid rgba(76,89,55,0.12)',
      backgroundColor: 'white',
      boxShadow: shadows.subtle
    }}
    >
      <p style={{ margin: 0, letterSpacing: '0.12em', textTransform: 'uppercase', fontSize: '12px', color: '#94a3b8' }}>{label}</p>
      <p style={{ margin: '10px 0 4px', fontSize: '2rem', fontWeight: 600 }}>{value}</p>
      <p style={{ margin: 0, color: '#475467' }}>{helper}</p>
    </div>
  );
}

function PersonaCard({ label, description, icon: Icon, bullets }) {
  return (
    <div style={{
      padding: '24px',
      borderRadius: '24px',
      border: '1px solid rgba(76,89,55,0.12)',
      background: 'linear-gradient(135deg, rgba(255,255,255,0.96), rgba(247,248,242,0.96))',
      boxShadow: '0 18px 45px rgba(15,23,42,0.08)'
    }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
        <Icon size={28} color={brandPalette.sage} />
        <p style={{ margin: 0, fontWeight: 600 }}>{label}</p>
      </div>
      <p style={{ margin: '0 0 16px', color: '#475467' }}>{description}</p>
      <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {bullets.map((item) => (
          <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#111827' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: brandPalette.sage }} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function WorkflowStep({ icon: Icon, title, detail, index }) {
  return (
    <div style={{
      display: 'flex',
      gap: '16px',
      padding: '16px',
      borderRadius: '18px',
      border: '1px solid rgba(76,89,55,0.12)',
      backgroundColor: 'white'
    }}
    >
      <div style={{
        width: '48px',
        height: '48px',
        borderRadius: '16px',
        backgroundColor: 'rgba(76,89,55,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 600,
        color: brandPalette.sageDark
      }}
      >
        {index + 1}
      </div>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Icon size={20} color={brandPalette.sage} />
          <h4 style={{ margin: 0 }}>{title}</h4>
        </div>
        <p style={{ margin: '6px 0 0', color: '#475467' }}>{detail}</p>
      </div>
    </div>
  );
}

function QuoteCard({ quote, author, role }) {
  return (
    <div style={{
      padding: '24px',
      borderRadius: '24px',
      border: '1px solid rgba(76,89,55,0.12)',
      backgroundColor: 'rgba(255,255,255,0.9)'
    }}
    >
      <p style={{ margin: 0, fontSize: '1.05rem', fontStyle: 'italic', color: '#0f172a' }}>
        “{quote}”
      </p>
      <p style={{ margin: '18px 0 0', fontWeight: 600 }}>{author}</p>
      <p style={{ margin: 0, color: '#475467' }}>{role}</p>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: rhythm.sectionGap, paddingTop: '16px' }}>
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '32px',
        padding: '32px',
        borderRadius: '32px',
        background: 'linear-gradient(135deg, #f9faf5, #eef1e7)',
        border: '1px solid rgba(76,89,55,0.12)',
        boxShadow: '0 40px 80px rgba(15,23,42,0.12)'
      }}
      >
        <div>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: '999px',
            backgroundColor: 'rgba(76,89,55,0.12)',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            fontSize: '12px',
            fontWeight: 600,
            color: brandPalette.sageDark
          }}
          >
            <Sparkles size={14} />
            Rootd OS
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.1rem)', margin: '20px 0 16px' }}>
            Live NIL telemetry, automations, and premium experiences in one calm surface.
          </h2>
          <p style={{ color: '#475467', marginBottom: '24px', maxWidth: '520px' }}>
            Directors, athletes, counsel, and partners stay on the same board-ready rhythm. Compliance events, deal stages, and activations update themselves.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <Button variant="primary" size="lg" onClick={() => navigate('/demo')} icon={ArrowRight}>
              Launch interactive demo
            </Button>
            <Button variant="secondary" size="lg" onClick={() => navigate('/about')}>
              Meet the team
            </Button>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {highlightStats.map((stat) => (
            <StatTile key={stat.label} {...stat} />
          ))}
        </div>
      </section>

      <SectionCard
        title="Every persona in the same premium space"
        description="Rootd keeps the operations heartbeat aligned without adding noise."
        tone="mint"
        variant="tinted"
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px, 1fr))', gap: '20px' }}>
          {personaPanels.map((panel) => (
            <PersonaCard key={panel.label} {...panel} />
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title="Operational rhythm"
        description="Signals, approvals, and deliverables move through the same automation spine."
        action={<Button variant="secondary" onClick={() => navigate('/dashboard/overview')}>See director view</Button>}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px, 1fr))', gap: '16px' }}>
          {workflowSteps.map((step, index) => (
            <WorkflowStep key={step.title} {...step} index={index} />
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title="What partners feel"
        description="We sit inside athletic departments so Rootd reflects real-world stakes."
        tone="amber"
        variant="tinted"
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px, 1fr))', gap: '20px' }}>
          {references.map((reference) => (
            <QuoteCard key={reference.author} {...reference} />
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title="Ready for a calm command center?"
        description="We onboard programs in weeks—not quarters—while keeping every stakeholder looped in."
        action={(
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <Button variant="primary" size="md" onClick={() => navigate('/demo')}>
              Schedule walkthrough
            </Button>
            <Button variant="secondary" size="md" onClick={() => navigate('/signup')}>
              Start free workspace
            </Button>
          </div>
        )}
      >
        <p style={{ margin: 0, color: '#475467', maxWidth: '720px' }}>
          Drop in your roster, attach current workflows, and we will mirror your approvals, finance routing, and creative briefs before we hand you the keys.
        </p>
      </SectionCard>
    </div>
  );
}
