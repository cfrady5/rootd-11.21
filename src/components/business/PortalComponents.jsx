import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Kanban,
  Compass,
  Users,
  Target,
  Share2,
  FileText,
  CheckCircle2,
  Clock3,
  AlertTriangle,
  Download,
  Eye,
  ShieldCheck,
  PenSquare,
  CreditCard,
  MessageSquare,
  Paperclip,
  FileSpreadsheet,
  SendHorizontal
} from 'lucide-react';
import { Button, StatusBadge } from '../director/PremiumComponents.jsx';
import { brandPalette } from '../../lib/designSystem.js';

const cardBaseClass = 'rounded-[26px] bg-white shadow-[0_24px_60px_rgba(15,23,42,0.08)] border border-[rgba(15,23,42,0.08)] flex flex-col';
const eyebrowClass = 'text-[11px] uppercase tracking-[0.26em] text-slate-500';
const titleClass = 'text-[1.35rem] font-semibold text-[rgba(15,23,42,0.95)]';
const bodyTextClass = 'text-[0.95rem] text-slate-600';

function CardShell({ eyebrow, title, description, actions, footer, children }) {
  return (
    <div className={`${cardBaseClass} p-6 space-y-4`}> 
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          {eyebrow && <p className={eyebrowClass}>{eyebrow}</p>}
          {title && <h3 className={titleClass}>{title}</h3>}
          {description && <p className={bodyTextClass}>{description}</p>}
        </div>
        {actions && <div className="flex-shrink-0">{actions}</div>}
      </div>
      <div className="space-y-3">
        {children}
      </div>
      {footer && (
        <div className="pt-3 border-t border-[rgba(15,23,42,0.06)]">
          {footer}
        </div>
      )}
    </div>
  );
}

function ColumnShell({ title, count, children }) {
  return (
    <div className="flex flex-col gap-3 bg-[rgba(247,248,242,0.8)] border border-[rgba(15,23,42,0.1)] rounded-[24px] p-3 min-w-[240px]">
      <div className="flex items-center justify-between">
        <p className="text-[0.85rem] font-semibold text-slate-700">{title}</p>
        <span className="text-[0.8rem] text-slate-500">{count}</span>
      </div>
      <div className="flex flex-col gap-3">
        {children}
      </div>
    </div>
  );
}

function ModalOverlay({ open, onClose, title, children }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(15,23,42,0.55)] backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-[min(640px,90vw)] bg-white rounded-[28px] shadow-2xl p-8 space-y-5"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-2xl font-semibold text-[rgba(15,23,42,0.95)]">{title}</h4>
              <button onClick={onClose} className="text-sm font-semibold text-rootd-pine hover:opacity-70">Close</button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const pipelineColumns = [
  {
    id: 'new',
    title: 'New',
    cards: [
      { athlete: 'Avery Carter', confidence: 94, deliverables: '2 reels • 1 hero shoot' },
      { athlete: 'Luka Ramos', confidence: 88, deliverables: 'Podcast spot • Meet and greet' }
    ]
  },
  {
    id: 'review',
    title: 'Reviewing',
    cards: [
      { athlete: 'Nia Jennings', confidence: 82, deliverables: '3 posts • TikTok story' }
    ]
  },
  {
    id: 'contract',
    title: 'Contracting',
    cards: [
      { athlete: 'Andre Lin', confidence: 79, deliverables: 'Appearance • Content kit' },
      { athlete: 'Mara Voss', confidence: 76, deliverables: 'Mini doc • Clinic session' }
    ]
  },
  {
    id: 'complete',
    title: 'Complete',
    cards: [
      { athlete: 'Cam Rhodes', confidence: 90, deliverables: 'Live stream • Store drop' }
    ]
  }
];

export function OpportunitiesPipeline({ columns = pipelineColumns }) {
  return (
    <CardShell
      eyebrow="Opportunities"
      title="Pipeline"
      description="Kanban view of every business-led activation in flight."
      actions={<Button variant="secondary" size="sm" icon={Kanban}>Sync to CRM</Button>}
    >
      <div className="flex flex-col gap-3">
        <div className="flex gap-4 overflow-x-auto pb-2">
          {columns.map((column) => (
            <ColumnShell key={column.id} title={column.title} count={`${column.cards.length} deals`}>
              {column.cards.map((card, index) => (
                <motion.div
                  key={`${column.id}-${card.athlete}-${index}`}
                  drag
                  dragMomentum={false}
                  whileDrag={{ scale: 1.02 }}
                  className="bg-white rounded-[20px] border border-[rgba(15,23,42,0.08)] p-4 shadow-[0_12px_25px_rgba(15,23,42,0.08)] cursor-grab"
                >
                  <p className="text-[1rem] font-semibold text-slate-900">{card.athlete}</p>
                  <p className="text-[0.85rem] text-slate-500 mt-1">{card.deliverables}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-[0.8rem] uppercase tracking-[0.2em] text-slate-400">Confidence</span>
                    <span className="text-lg font-semibold text-rootd-pine">{card.confidence}%</span>
                  </div>
                </motion.div>
              ))}
            </ColumnShell>
          ))}
        </div>
      </div>
    </CardShell>
  );
}

const matchMetrics = [
  { label: 'Audience overlap', value: 92 },
  { label: 'Interests alignment', value: 87 },
  { label: 'Persona fit', value: 90 },
  { label: 'Risk score', value: 12 }
];

const personaTags = ['Rising Creator', 'Community-first', 'High engagement', 'Finance-friendly'];

function RadarChart({ values }) {
  const points = values.map((metric, idx) => {
    const angle = (Math.PI * 2 * idx) / values.length;
    const radius = 80 * (metric.value / 100);
    const x = 100 + radius * Math.sin(angle);
    const y = 100 - radius * Math.cos(angle);
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg viewBox="0 0 200 200" className="w-full max-w-[260px]">
      <polygon points="50,100 100,50 150,100 100,150" fill="none" stroke="rgba(15,23,42,0.1)" />
      <polygon points={points} fill="rgba(76,89,55,0.15)" stroke={brandPalette.sage} strokeWidth="2" />
    </svg>
  );
}

export function MatchIntelligence({ metrics = matchMetrics, tags = personaTags }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <CardShell
        eyebrow="Intelligence"
        title="Match signals"
        description="Audience, interest, and persona telemetry modeled for brands."
        actions={<Button variant="secondary" size="sm" icon={Compass} onClick={() => setOpen(true)}>Open summary</Button>}
      >
        <div className="flex flex-col lg:flex-row gap-6 items-center">
          <RadarChart values={metrics} />
          <div className="flex-1 space-y-4 w-full">
            {metrics.map((metric) => (
              <div key={metric.label}>
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>{metric.label}</span>
                  <span className="font-semibold text-slate-900">{metric.value}%</span>
                </div>
                <div className="h-2 mt-2 rounded-full bg-[rgba(15,23,42,0.08)]">
                  <div
                    className="h-full rounded-full bg-[rgba(76,89,55,0.9)] transition-all"
                    style={{ width: `${metric.value}%` }}
                  />
                </div>
              </div>
            ))}
            <div className="flex flex-wrap gap-2 pt-2">
              {tags.map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full text-xs font-semibold bg-[rgba(76,89,55,0.12)] text-rootd-pine">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </CardShell>

      <ModalOverlay open={open} onClose={() => setOpen(false)} title="Match intelligence summary">
        <div className="grid gap-4">
          {metrics.map((metric) => (
            <div key={`modal-${metric.label}`} className="space-y-1">
              <p className="text-sm text-slate-500 uppercase tracking-[0.18em]">{metric.label}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-slate-900">{metric.value}%</span>
                <StatusBadge status={metric.value >= 80 ? 'active' : 'pending'} />
              </div>
            </div>
          ))}
          <div>
            <p className="text-sm text-slate-500 uppercase tracking-[0.18em]">Persona signals</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <span key={`modal-tag-${tag}`} className="px-3 py-1 rounded-full bg-[rgba(76,89,55,0.12)] text-rootd-pine text-xs font-semibold">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </ModalOverlay>
    </>
  );
}

const complianceSteps = [
  { id: 'step-1', title: 'Brand safety questionnaire', status: 'active', detail: 'Rootd autopilot pre-fills based on intake' },
  { id: 'step-2', title: 'NCAA disclosure packet', status: 'pending', detail: 'Awaiting AD sign-off' },
  { id: 'step-3', title: 'Finance review + ACH', status: 'pending', detail: 'Finance automation staging payout' }
];

export function ComplianceWorkflow({ steps = complianceSteps }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <CardShell
        eyebrow="Compliance"
        title="Workflow"
        description="Every required step stays visible to brands, athletes, and directors."
        actions={<Button variant="secondary" size="sm" icon={ShieldCheck} onClick={() => setOpen(true)}>View details</Button>}
      >
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex gap-3">
              <div className="mt-1">
                <div className="w-3 h-3 rounded-full bg-rootd-pine" />
                {index !== steps.length - 1 && <div className="w-px h-full mx-auto bg-[rgba(15,23,42,0.1)]" />}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-slate-900">{step.title}</p>
                  <StatusBadge status={step.status === 'active' ? 'in_progress' : step.status === 'done' ? 'done' : 'pending'} />
                </div>
                <p className="text-sm text-slate-600">{step.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </CardShell>

      <ModalOverlay open={open} onClose={() => setOpen(false)} title="Compliance workflow details">
        <ul className="space-y-4">
          {steps.map((step) => (
            <li key={`modal-${step.id}`} className="space-y-1">
              <p className="text-sm text-slate-500 uppercase tracking-[0.18em]">{step.title}</p>
              <p className="text-base text-slate-700">{step.detail}</p>
            </li>
          ))}
        </ul>
      </ModalOverlay>
    </>
  );
}

const contractTemplates = [
  { id: 'tmpl-1', title: 'Standard deliverable', desc: 'Baseline NIL agreement with compliance guardrails.' },
  { id: 'tmpl-2', title: 'Boosted social', desc: 'Paid social amplification with performance multipliers.' },
  { id: 'tmpl-3', title: 'Live appearance', desc: 'On-site event coverage with travel logistics baked in.' },
  { id: 'tmpl-4', title: 'Content studio', desc: 'Evergreen content bundles with IP language.' }
];

export function ContractTemplates({ templates = contractTemplates }) {
  return (
    <CardShell
      eyebrow="Contracts"
      title="Templates"
      description="Brand-safe templates versioned by Rootd legal and finance."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {templates.map((template) => (
          <div key={template.id} className="rounded-[20px] border border-[rgba(15,23,42,0.08)] p-4 space-y-3 bg-[rgba(247,248,242,0.7)]">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
              <FileText size={18} className="text-rootd-pine" />
              {template.title}
            </div>
            <p className="text-sm text-slate-600">{template.desc}</p>
            <div className="flex gap-3">
              <Button variant="secondary" size="sm" icon={Download}>Download</Button>
              <Button variant="ghost" size="sm" icon={Eye}>Preview</Button>
            </div>
          </div>
        ))}
      </div>
    </CardShell>
  );
}

const auditEvents = [
  { id: 'audit-1', type: 'approval', actor: 'Director', role: 'Director', time: '08:12', detail: 'Priya Singh approved Nike NIL Labs contract block 3.' },
  { id: 'audit-2', type: 'edit', actor: 'Brand legal', role: 'Legal', time: '09:02', detail: 'Redlined exclusivity clause for social content rights (Section 5).' },
  { id: 'audit-3', type: 'payment', actor: 'Finance automation', role: 'Finance bot', time: '09:45', detail: 'Triggered $45K ACH payout milestone 2.' }
];

function eventIcon(type) {
  switch (type) {
    case 'approval':
      return <CheckCircle2 className="text-rootd-pine" size={18} />;
    case 'edit':
      return <PenSquare className="text-yellow-600" size={18} />;
    case 'payment':
      return <CreditCard className="text-emerald-600" size={18} />;
    default:
      return <Clock3 className="text-slate-500" size={18} />;
  }
}

export function AuditTrail({ events = auditEvents }) {
  const [expanded, setExpanded] = useState(null);

  return (
    <CardShell
      eyebrow="Audit"
      title="Trail"
      description="Comprehensive log of approvals, edits, and payouts."
    >
      <div className="space-y-3">
        {events.map((event) => (
          <div key={event.id} className="rounded-[18px] border border-[rgba(15,23,42,0.08)] p-4 bg-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[rgba(76,89,55,0.1)] flex items-center justify-center">
                {eventIcon(event.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-slate-900">{event.actor}</p>
                  <span className="text-xs text-slate-500">{event.time}</span>
                </div>
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-[rgba(15,23,42,0.06)] text-slate-700">{event.role}</span>
              </div>
              <button
                className="text-xs font-semibold text-rootd-pine"
                onClick={() => setExpanded((prev) => (prev === event.id ? null : event.id))}
              >
                {expanded === event.id ? 'Hide' : 'Expand'}
              </button>
            </div>
            <AnimatePresence initial={false}>
              {expanded === event.id && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-sm text-slate-600 mt-3"
                >
                  {event.detail}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </CardShell>
  );
}

const collabComments = [
  { id: 'comment-1', name: 'Morgan T. (Director)', text: 'Looping finance on Chip City renewal so payouts speed up.', time: 'Today, 8:44 AM' },
  { id: 'comment-2', name: 'Priya S. (Legal)', text: 'Updated exclusivity clause to align with NCAA change memo.', time: 'Today, 9:03 AM' }
];

const attachments = [
  { id: 'attach-1', name: 'ChipCity_Concept_v3.pdf', size: '1.2 MB' },
  { id: 'attach-2', name: 'HydrationShoot_CallSheet.docx', size: '420 KB' }
];

export function StakeholderCollaboration({ comments = collabComments, files = attachments }) {
  return (
    <CardShell
      eyebrow="Collaboration"
      title="Workspace"
      description="Comments, attachments, and internal notes routed in one surface."
      footer={(
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Add comment"
            className="flex-1 rounded-full border border-[rgba(15,23,42,0.12)] px-4 py-2"
          />
          <Button variant="primary" size="sm" icon={SendHorizontal}>Post</Button>
        </div>
      )}
    >
      <div className="space-y-5">
        <section className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Comments</p>
          <div className="space-y-3">
            {comments.map((comment) => (
              <div key={comment.id} className="rounded-[18px] border border-[rgba(15,23,42,0.08)] p-3 bg-[rgba(247,248,242,0.7)]">
                <p className="text-sm font-semibold text-slate-900">{comment.name}</p>
                <p className="text-sm text-slate-600 mt-1">{comment.text}</p>
                <p className="text-xs text-slate-400 mt-1">{comment.time}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Files</p>
          <div className="space-y-2">
            {files.map((file) => (
              <div key={file.id} className="flex items-center justify-between rounded-[16px] border border-[rgba(15,23,42,0.08)] px-4 py-2">
                <div className="flex items-center gap-3">
                  <Paperclip size={16} className="text-rootd-pine" />
                  <span className="text-sm font-semibold text-slate-900">{file.name}</span>
                </div>
                <span className="text-xs text-slate-500">{file.size}</span>
              </div>
            ))}
          </div>
        </section>
        <section className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Internal notes</p>
          <div className="rounded-[18px] border border-[rgba(15,23,42,0.08)] p-4 text-sm text-slate-600">
            Brand prefers SMS recaps before campus activations. Finance requests ACH batching each Friday.
          </div>
        </section>
      </div>
    </CardShell>
  );
}
