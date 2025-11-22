import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Minus,
  LayoutGrid,
  TrendingUp,
  ShieldCheck,
  FileBadge2,
  DollarSign,
  Users2,
  ListChecks,
  GitBranchPlus,
  Binary,
  PenSquare,
  ToggleLeft,
  ToggleRight,
  BarChart2,
  PieChart,
  Filter,
  Target,
  MessageSquare,
  Building,
  Briefcase,
  Scale
} from 'lucide-react';
import { brandPalette, typeScale, rhythm, shadows } from '../../lib/designSystem.js';
import { Button, StatusBadge } from './PremiumComponents.jsx';

const fontStack = '"Inter", "Satoshi", "Space Grotesk", sans-serif';

const baseCardStyle = {
  borderRadius: '28px',
  backgroundColor: 'white',
  border: '1px solid rgba(15,23,42,0.08)',
  boxShadow: shadows.card,
  padding: rhythm.cardPadding,
  display: 'flex',
  flexDirection: 'column',
  gap: '18px',
  fontFamily: fontStack
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '16px'
};

const eyebrowStyle = {
  margin: 0,
  fontSize: typeScale.micro,
  letterSpacing: '0.24em',
  textTransform: 'uppercase',
  color: 'rgba(15,23,42,0.55)'
};

const titleStyle = {
  margin: '6px 0 0',
  fontSize: '1.4rem',
  fontWeight: 700,
  color: brandPalette.deep
};

const descriptionStyle = {
  margin: '4px 0 0',
  color: 'rgba(15,23,42,0.7)',
  lineHeight: 1.5
};

export function CardSection({ eyebrow, title, description, actions, footer, children }) {
  return (
    <div style={baseCardStyle}>
      {(eyebrow || title || description || actions) && (
        <div style={headerStyle}>
          <div style={{ flex: 1 }}>
            {eyebrow && <p style={eyebrowStyle}>{eyebrow}</p>}
            {title && <h3 style={titleStyle}>{title}</h3>}
            {description && <p style={descriptionStyle}>{description}</p>}
          </div>
          {actions && (
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              {actions}
            </div>
          )}
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {children}
      </div>
      {footer && (
        <div style={{ borderTop: '1px solid rgba(15,23,42,0.08)', paddingTop: '16px' }}>
          {footer}
        </div>
      )}
    </div>
  );
}

export function TogglePill({ label, enabled, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      style={{
        borderRadius: '999px',
        border: '1px solid ' + (enabled ? 'rgba(76,89,55,0.35)' : 'rgba(15,23,42,0.15)'),
        background: enabled ? 'rgba(76,89,55,0.16)' : 'transparent',
        color: enabled ? brandPalette.sage : 'rgba(15,23,42,0.65)',
        padding: '8px 14px',
        fontWeight: 600,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer'
      }}
    >
      {enabled ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
      {label}
    </button>
  );
}

export function ModalSurface({ open, onClose, title, children }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15,23,42,0.55)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 40
          }}
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            style={{
              width: 'min(720px, 92vw)',
              background: 'white',
              borderRadius: '32px',
              padding: '32px',
              boxShadow: '0 40px 80px rgba(15,23,42,0.25)',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h4 style={{ margin: 0, fontSize: '1.6rem', color: brandPalette.deep }}>{title}</h4>
              <button
                onClick={onClose}
                style={{ border: 'none', background: 'transparent', fontWeight: 600, color: brandPalette.sage, cursor: 'pointer' }}
              >
                Close
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const riskData = [
  { id: 'risk-1', sport: 'Women’s Soccer', program: 'Coastal U', risk: 'low', trend: 'down' },
  { id: 'risk-2', sport: 'Football', program: 'St. Jude', risk: 'medium', trend: 'flat' },
  { id: 'risk-3', sport: 'Men’s Basketball', program: 'Kingston', risk: 'high', trend: 'up' },
  { id: 'risk-4', sport: 'Track & Field', program: 'Northwind', risk: 'low', trend: 'flat' },
  { id: 'risk-5', sport: 'Softball', program: 'Mariner', risk: 'medium', trend: 'down' }
];

const riskPalette = {
  low: { bg: 'rgba(76,89,55,0.15)', color: brandPalette.sage, label: 'Low' },
  medium: { bg: 'rgba(247,190,90,0.25)', color: '#92400e', label: 'Medium' },
  high: { bg: 'rgba(239,68,68,0.18)', color: '#b91c1c', label: 'High' }
};

function trendIcon(trend) {
  if (trend === 'up') return <ArrowUpRight size={18} color="#b91c1c" />;
  if (trend === 'down') return <ArrowDownRight size={18} color={brandPalette.sage} />;
  return <Minus size={18} color="rgba(15,23,42,0.45)" />;
}

export function ProgramRiskScoring({ data = riskData }) {
  return (
    <CardSection
      eyebrow="Programs"
      title="Risk scoring"
      description="Live telemetry across every sport, color-coded for directors."
      actions={<Button variant="secondary" size="sm" icon={LayoutGrid}>Export grid</Button>}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        {data.map((item) => {
          const badge = riskPalette[item.risk];
          return (
            <motion.div
              key={item.id}
              whileHover={{ y: -4, boxShadow: '0 22px 40px rgba(15,23,42,0.12)' }}
              style={{
                borderRadius: '20px',
                border: '1px solid rgba(15,23,42,0.08)',
                padding: '16px',
                background: 'rgba(255,255,255,0.95)',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px'
              }}
            >
              <p style={{ margin: 0, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(15,23,42,0.55)' }}>{item.program}</p>
              <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>{item.sport}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                <span style={{ padding: '4px 12px', borderRadius: '999px', background: badge.bg, color: badge.color, fontWeight: 600, fontSize: '0.85rem' }}>{badge.label} risk</span>
                {trendIcon(item.trend)}
              </div>
            </motion.div>
          );
        })}
      </div>
    </CardSection>
  );
}

const stageMetrics = [
  { stage: 'Signals detected', count: 128, color: '#cde3c4' },
  { stage: 'Briefing', count: 74, color: '#a8c79f' },
  { stage: 'Contracting', count: 42, color: '#7ba475' },
  { stage: 'Compliance', count: 28, color: '#4c5937' }
];

export function DealStageTelemetry({ metrics = stageMetrics }) {
  return (
    <CardSection
      eyebrow="Deals"
      title="Stage telemetry"
      description="Funnel view of every activation step with live counts."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.stage}
            whileHover={{ scale: 1.01 }}
            style={{
              borderRadius: '18px',
              border: '1px solid rgba(15,23,42,0.06)',
              padding: '12px 16px',
              background: 'linear-gradient(120deg, rgba(255,255,255,0.95), rgba(247,248,242,0.85))'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ margin: 0, fontWeight: 600 }}>{metric.stage}</p>
              <p style={{ margin: 0, fontWeight: 600 }}>{metric.count}</p>
            </div>
            <svg width="100%" height="48" style={{ marginTop: '6px' }}>
              <rect x="0" y="18" rx="12" ry="12" width="100%" height="12" fill="rgba(15,23,42,0.08)" />
              <motion.rect
                initial={{ width: 0 }}
                animate={{ width: `${(metric.count / metrics[0].count) * 100}%` }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                x="0"
                y="18"
                rx="12"
                ry="12"
                height="12"
                fill={metric.color}
              />
            </svg>
          </motion.div>
        ))}
      </div>
    </CardSection>
  );
}

const cockpitCards = [
  { id: 'matches', label: 'Matches', value: '42', delta: '+8%', icon: Users2 },
  { id: 'contracts', label: 'Contracts', value: '18 active', delta: '3 pending', icon: FileBadge2 },
  { id: 'compliance', label: 'Compliance', value: '97%', delta: '2 reviews', icon: ShieldCheck },
  { id: 'payouts', label: 'Payouts', value: '$540K', delta: 'This quarter', icon: DollarSign }
];

export function UnifiedCockpitDashboard({ cards = cockpitCards }) {
  return (
    <CardSection
      eyebrow="Cockpit"
      title="Unified dashboard"
      description="Matches, contracts, compliance, and payouts in one snapshot."
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '16px' }}>
        {cards.map((card) => (
          <motion.div
            key={card.id}
            whileHover={{ y: -3, boxShadow: '0 18px 32px rgba(15,23,42,0.12)' }}
            style={{
              borderRadius: '20px',
              border: '1px solid rgba(15,23,42,0.05)',
              padding: '16px',
              background: 'rgba(255,255,255,0.96)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}
          >
            <card.icon size={24} color={brandPalette.sage} />
            <p style={{ margin: 0, fontSize: '0.85rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(15,23,42,0.55)' }}>{card.label}</p>
            <p style={{ margin: 0, fontSize: '1.8rem', fontWeight: 700 }}>{card.value}</p>
            <p style={{ margin: 0, color: 'rgba(15,23,42,0.6)' }}>{card.delta}</p>
          </motion.div>
        ))}
      </div>
    </CardSection>
  );
}

const playbookSteps = [
  { id: 'pb-1', title: 'Intake brief', icon: MessageSquare, desc: 'Capture persona + guardrails.' },
  { id: 'pb-2', title: 'Compliance check', icon: ShieldCheck, desc: 'Auto-run NCAA policy library.' },
  { id: 'pb-3', title: 'Finance sync', icon: DollarSign, desc: 'Stage ACH + ledger entries.' },
  { id: 'pb-4', title: 'Content kit', icon: PenSquare, desc: 'Generate deliverable outlines.' }
];

export function PlaybookBuilder({ steps = playbookSteps }) {
  const [nodes, setNodes] = useState(steps);

  const shuffleStep = (id) => {
    setNodes((prev) => {
      const index = prev.findIndex((node) => node.id === id);
      if (index < 0 || index === prev.length - 1) return prev;
      const clone = [...prev];
      const temp = clone[index];
      clone[index] = clone[index + 1];
      clone[index + 1] = temp;
      return clone;
    });
  };

  return (
    <CardSection
      eyebrow="Playbooks"
      title="Builder"
      description="Drag cards to reorder automations or branch logic."
      actions={<Button variant="secondary" size="sm" icon={GitBranchPlus}>Add branch</Button>}
      footer={<p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(15,23,42,0.6)' }}>Branching logic preview is mocked for this prototype.</p>}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {nodes.map((step, index) => (
          <motion.div
            key={step.id}
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            onDragEnd={() => shuffleStep(step.id)}
            whileDrag={{ scale: 1.02 }}
            style={{
              borderRadius: '20px',
              border: '1px solid rgba(15,23,42,0.08)',
              padding: '16px',
              background: 'rgba(255,255,255,0.95)',
              display: 'flex',
              gap: '12px',
              alignItems: 'center'
            }}
          >
            <step.icon size={28} color={brandPalette.sage} />
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontWeight: 600 }}>{step.title}</p>
              <p style={{ margin: '4px 0 0', color: 'rgba(15,23,42,0.65)' }}>{step.desc}</p>
              <p style={{ margin: '6px 0 0', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.16em', color: 'rgba(15,23,42,0.4)' }}>Step {index + 1}</p>
            </div>
            <StatusBadge status={index % 2 === 0 ? 'active' : 'pending'} />
          </motion.div>
        ))}
      </div>
    </CardSection>
  );
}

const policyViolations = [
  { id: 'viol-1', type: 'Eligibility', detail: 'Athlete GPA below 2.8 threshold.' },
  { id: 'viol-2', type: 'Spend cap', detail: 'Offer exceeds category limit by $8K.' }
];

export function PolicyEngine({ violations = policyViolations }) {
  const [eligibility, setEligibility] = useState('3.0 GPA');
  const [spendCap, setSpendCap] = useState(50000);
  const [deliverableCap, setDeliverableCap] = useState(5);

  return (
    <CardSection
      eyebrow="Policies"
      title="Rule engine"
      description="Directors set eligibility, spend, and deliverable logic without code."
      actions={<Button variant="secondary" size="sm" icon={Binary}>Sync rules</Button>}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '16px' }}>
        <div>
          <label style={eyebrowStyle}>Eligibility</label>
          <select value={eligibility} onChange={(e) => setEligibility(e.target.value)} style={selectStyle}>
            {['3.0 GPA', '2.8 GPA', 'No limit'].map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
        <div>
          <label style={eyebrowStyle}>Spend cap</label>
          <input
            type="number"
            value={spendCap}
            onChange={(e) => setSpendCap(Number(e.target.value))}
            style={selectStyle}
            min={0}
          />
        </div>
        <div>
          <label style={eyebrowStyle}>Deliverable limit</label>
          <input
            type="number"
            value={deliverableCap}
            onChange={(e) => setDeliverableCap(Number(e.target.value))}
            style={selectStyle}
            min={1}
          />
        </div>
      </div>
      <div>
        <p style={{ margin: '12px 0 4px', fontWeight: 600 }}>Example violations</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {violations.map((violation) => (
            <div key={violation.id} style={{ borderRadius: '16px', border: '1px solid rgba(15,23,42,0.08)', padding: '12px', background: 'rgba(247,248,242,0.9)' }}>
              <p style={{ margin: 0, fontWeight: 600 }}>{violation.type}</p>
              <p style={{ margin: '4px 0 0', color: 'rgba(15,23,42,0.65)' }}>{violation.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </CardSection>
  );
}

const selectStyle = {
  width: '100%',
  marginTop: '8px',
  borderRadius: '18px',
  border: '1px solid rgba(15,23,42,0.12)',
  padding: '12px',
  fontFamily: fontStack,
  fontSize: '1rem'
};

const routingRules = [
  { id: 'route-1', owner: 'Creative', criteria: 'Content > $25K', auto: true },
  { id: 'route-2', owner: 'Legal', criteria: 'Exclusivity clauses', auto: false },
  { id: 'route-3', owner: 'Finance', criteria: 'Payout net 15', auto: true }
];

export function RoutingRules({ rules = routingRules }) {
  const [openRule, setOpenRule] = useState(null);
  const [rows, setRows] = useState(rules);

  const toggleAuto = (id) => {
    setRows((prev) => prev.map((row) => (row.id === id ? { ...row, auto: !row.auto } : row)));
  };

  return (
    <>
      <CardSection
        eyebrow="Routing"
        title="Rules"
        description="Directors decide who reviews which deal segments."
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 160px', gap: '12px', fontWeight: 600, color: 'rgba(15,23,42,0.5)' }}>
          <span>Owner</span>
          <span>Criteria</span>
          <span>Auto-route</span>
        </div>
        {rows.map((row) => (
          <div key={row.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 160px', gap: '12px', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid rgba(15,23,42,0.06)' }}>
            <span style={{ fontWeight: 600 }}>{row.owner}</span>
            <span>{row.criteria}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TogglePill label={row.auto ? 'Enabled' : 'Disabled'} enabled={row.auto} onToggle={() => toggleAuto(row.id)} />
              <Button variant="ghost" size="sm" onClick={() => setOpenRule(row)} icon={PenSquare}>
                Edit
              </Button>
            </div>
          </div>
        ))}
      </CardSection>

      <ModalSurface open={Boolean(openRule)} onClose={() => setOpenRule(null)} title="Edit routing rule">
        {openRule && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <label>
              Owner
              <input type="text" value={openRule.owner} readOnly style={selectStyle} />
            </label>
            <label>
              Criteria
              <textarea value={openRule.criteria} readOnly rows={3} style={{ ...selectStyle, resize: 'vertical' }} />
            </label>
            <TogglePill label="Auto route" enabled={openRule.auto} onToggle={() => toggleAuto(openRule.id)} />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <Button variant="secondary" onClick={() => setOpenRule(null)}>Close</Button>
              <Button variant="primary">Save</Button>
            </div>
          </div>
        )}
      </ModalSurface>
    </>
  );
}

const chartFilters = {
  sport: ['All sports', 'Football', 'Basketball', 'Soccer'],
  program: ['All programs', 'Saint Jude', 'Kingston', 'Northwind'],
  timeframe: ['30 days', 'Quarter', 'Year']
};

const analyticsSeries = {
  volume: [32, 44, 51, 48, 62, 70],
  approval: [78, 82, 80, 85, 88, 90],
  compliance: [65, 72, 74, 79, 83, 89]
};

function ChartCard({ title, data, color = brandPalette.sage }) {
  const points = data.map((value, idx) => {
    const x = (idx / (data.length - 1)) * 200;
    const y = 120 - (value / 100) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div style={{ borderRadius: '20px', border: '1px solid rgba(15,23,42,0.08)', padding: '16px', background: 'rgba(255,255,255,0.95)' }}>
      <p style={{ margin: 0, fontWeight: 600 }}>{title}</p>
      <svg viewBox="0 0 200 120" style={{ width: '100%', marginTop: '8px' }}>
        <polyline fill="none" stroke="rgba(15,23,42,0.1)" strokeWidth="1" points="0,100 200,100" />
        <motion.polyline
          fill="none"
          stroke={color}
          strokeWidth="3"
          points={points}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2 }}
        />
        {data.map((value, idx) => (
          <motion.circle
            key={`${title}-${idx}`}
            cx={(idx / (data.length - 1)) * 200}
            cy={120 - (value / 100) * 100}
            r={4}
            fill="white"
            stroke={color}
            strokeWidth="2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: idx * 0.05 }}
          />
        ))}
      </svg>
    </div>
  );
}

export function AnalyticsDashboard() {
  const [filters, setFilters] = useState({ sport: 'All sports', program: 'All programs', timeframe: 'Quarter' });

  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <CardSection
      eyebrow="Analytics"
      title="Dashboard"
      description="Deal volume, approval speed, and compliance completion with flexible filters."
      actions={<Button variant="secondary" size="sm" icon={Filter}>Filters</Button>}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '12px' }}>
        {Object.keys(chartFilters).map((key) => (
          <div key={key}>
            <label style={eyebrowStyle}>{key}</label>
            <select value={filters[key]} onChange={(e) => handleChange(key, e.target.value)} style={selectStyle}>
              {chartFilters[key].map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '18px' }}>
        <ChartCard title="Deal volume" data={analyticsSeries.volume} color="rgba(76,89,55,0.9)" />
        <ChartCard title="Approval speed" data={analyticsSeries.approval} color="#9fb45d" />
        <ChartCard title="Compliance completion" data={analyticsSeries.compliance} color="#4c5937" />
      </div>
    </CardSection>
  );
}

const leadershipData = [
  { id: 'directors', label: 'Directors', icon: Activity, detail: 'Priorities: Pipeline health, compliance risk, AD briefings.', notes: 'Prep board-ready deck weekly.' },
  { id: 'athletes', label: 'Athletes', icon: Target, detail: 'Priorities: Transparent deals, on-time payouts, guidance.', notes: 'Ensure autopilot nudges stay human.' },
  { id: 'partners', label: 'Partners', icon: Briefcase, detail: 'Priorities: Brand safety, fast approvals, shareable telemetry.', notes: 'Provide templates per category.' },
  { id: 'legal', label: 'Legal', icon: Scale, detail: 'Priorities: Policy shifts, redline visibility, audit logs.', notes: 'Route NCAA updates instantly.' }
];

export function LeadershipCirclePanel({ stakeholders = leadershipData }) {
  const [expanded, setExpanded] = useState(null);

  return (
    <CardSection
      eyebrow="Leadership"
      title="Circle"
      description="Understand what each stakeholder needs at a glance."
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '16px' }}>
        {stakeholders.map((stakeholder) => (
          <motion.button
            key={stakeholder.id}
            onClick={() => setExpanded((prev) => (prev === stakeholder.id ? null : stakeholder.id))}
            whileHover={{ y: -3 }}
            style={{
              borderRadius: '20px',
              border: '1px solid rgba(15,23,42,0.08)',
              padding: '16px',
              textAlign: 'left',
              background: 'rgba(255,255,255,0.9)',
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <stakeholder.icon size={22} color={brandPalette.sage} />
              <p style={{ margin: 0, fontWeight: 600 }}>{stakeholder.label}</p>
            </div>
            <AnimatePresence>
              {expanded === stakeholder.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{ marginTop: '10px', color: 'rgba(15,23,42,0.7)', lineHeight: 1.5 }}
                >
                  <p style={{ margin: 0 }}>{stakeholder.detail}</p>
                  <p style={{ margin: '6px 0 0', fontSize: '0.85rem', color: 'rgba(15,23,42,0.6)' }}>{stakeholder.notes}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>
    </CardSection>
  );
}
