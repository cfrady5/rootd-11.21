import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  X,
  ArrowRight,
  ShieldCheck,
  Clock,
  Zap,
  DollarSign,
  CalendarDays,
  FileText,
  UploadCloud,
  MessageCircle,
  SendHorizontal,
  Bell,
  BellRing,
  Shield,
  BriefcaseBusiness,
  PiggyBank
} from 'lucide-react';
import { brandPalette, shadows, typeScale, rhythm } from '../../lib/designSystem.js';
import { Button, StatusBadge } from '../director/PremiumComponents.jsx';

const fontStack = '"Inter", "Satoshi", "Space Grotesk", sans-serif';

const cardBaseStyle = {
  borderRadius: '24px',
  padding: rhythm.cardPadding,
  backgroundColor: 'white',
  boxShadow: shadows.subtle,
  border: '1px solid rgba(17,19,23,0.05)',
  display: 'flex',
  flexDirection: 'column',
  gap: '18px',
  fontFamily: fontStack,
  color: brandPalette.charcoal
};

const eyebrowStyle = {
  margin: 0,
  fontSize: typeScale.micro,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'rgba(15,23,42,0.55)'
};

const titleStyle = {
  margin: '4px 0 0',
  fontSize: typeScale.subhead,
  fontWeight: 700,
  color: brandPalette.deep
};

const subheadStyle = {
  margin: '6px 0 0',
  fontSize: typeScale.small,
  color: 'rgba(15,23,42,0.78)'
};

const timelineStatusStyles = {
  pending: { bg: 'rgba(76,89,55,0.1)', color: brandPalette.sage, label: 'Pending' },
  due: { bg: 'rgba(249,222,201,0.8)', color: '#92400e', label: 'Due' },
  completed: { bg: 'rgba(206,231,208,0.9)', color: '#1f4522', label: 'Completed' }
};

const defaultMatches = [
  {
    id: 'match-1',
    brand: 'H2O+ Hydration',
    description: 'Campus hydration takeover with paid social + NIL clinic.',
    confidence: 92,
    payout: '$45K retainer'
  },
  {
    id: 'match-2',
    brand: 'Atlas Outdoors',
    description: 'Evergreen creator residency focused on sustainability.',
    confidence: 84,
    payout: '$22K sprint'
  },
  {
    id: 'match-3',
    brand: 'Spotify Collegiate',
    description: 'Weekly live sessions featuring student-athlete playlists.',
    confidence: 77,
    payout: '$18K + rev share'
  }
];

const defaultTimeline = [
  { id: 'cmp-1', label: 'Renew W9 + tax forms', status: 'pending', due: 'Today', owner: 'You' },
  { id: 'cmp-2', label: 'Submit deliverable proof', status: 'due', due: 'Tomorrow', owner: 'Rootd finance' },
  { id: 'cmp-3', label: 'NCAA attestation', status: 'completed', due: 'Cleared', owner: 'Compliance automation' }
];

const defaultPayouts = [
  { id: 'pay-1', brand: 'Nike NIL Labs', amount: 45000, status: 'pending_payment', progress: 60 },
  { id: 'pay-2', brand: 'Chip City Collective', amount: 18000, status: 'approved', progress: 100 },
  { id: 'pay-3', brand: 'FirstLight Energy', amount: 32000, status: 'in_progress', progress: 45 }
];

const defaultDeliverables = [
  {
    id: 'delv-1',
    title: 'Shoot hero photo set',
    deadline: 'Nov 24',
    status: 'in_progress',
    description: 'Deliver RAW + edited selects to brand portal with caption variations.',
    location: 'Creative studio • 2 hrs'
  },
  {
    id: 'delv-2',
    title: 'Post TikTok story series',
    deadline: 'Nov 26',
    status: 'pending',
    description: 'Three-part story highlighting hydration rituals. Include link sticker.',
    location: 'TikTok • @rootd-athlete'
  },
  {
    id: 'delv-3',
    title: 'NCAA compliance recap',
    deadline: 'Dec 01',
    status: 'completed',
    description: 'Upload signed disclosure & screenshot of final creative.',
    location: 'Rootd portal upload'
  }
];

const defaultDocuments = [
  { id: 'doc-1', name: 'Nike NIL Labs Contract.pdf', type: 'Contract', size: '1.8 MB', updated: 'Nov 12, 2025' },
  { id: 'doc-2', name: 'W-9 FY25.pdf', type: 'Compliance', size: '310 KB', updated: 'Nov 02, 2025' },
  { id: 'doc-3', name: 'ACH Authorization.pdf', type: 'Finance', size: '520 KB', updated: 'Oct 28, 2025' },
  { id: 'doc-4', name: 'Creative Guidelines.pdf', type: 'Reference', size: '2.1 MB', updated: 'Oct 24, 2025' }
];

const defaultMessages = [
  { id: 'msg-1', sender: 'director', text: 'Quick reminder to approve the hydration creative before noon.', timestamp: '09:12 AM' },
  { id: 'msg-2', sender: 'athlete', text: 'On it—uploading now and tagging finance for payout release.', timestamp: '09:14 AM' },
  { id: 'msg-3', sender: 'director', text: 'Perfect. Added Chip City deliverable to your checklist.', timestamp: '09:16 AM' }
];

const defaultNotifications = [
  { id: 'note-1', category: 'compliance', title: 'Disclosure ready for review', detail: 'Rootd autopilot drafted W9 update.', time: '2m ago', read: false },
  { id: 'note-2', category: 'deals', title: 'New match accepted', detail: 'Atlas Outdoors approved your rate card.', time: '15m ago', read: false },
  { id: 'note-3', category: 'payouts', title: 'ACH initiated', detail: 'Nike NIL Labs wired $45K retainer.', time: '1h ago', read: true }
];

function formatCurrency(value) {
  if (value === null || value === undefined) return '—';
  const number = Number(value);
  if (Number.isNaN(number)) return value;
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(number);
}

function PremiumCardShell({ eyebrow, title, description, actionSlot, footer, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      style={cardBaseStyle}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
        <div>
          {eyebrow && <p style={eyebrowStyle}>{eyebrow}</p>}
          <h3 style={titleStyle}>{title}</h3>
          {description && <p style={subheadStyle}>{description}</p>}
        </div>
        {actionSlot && <div style={{ display: 'flex', alignItems: 'flex-start' }}>{actionSlot}</div>}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {children}
      </div>
      {footer && (
        <div style={{ marginTop: '4px' }}>
          {footer}
        </div>
      )}
    </motion.div>
  );
}

export function CardSection({ eyebrow, title, description, actions, footer, children }) {
  return (
    <PremiumCardShell
      eyebrow={eyebrow}
      title={title}
      description={description}
      actionSlot={actions}
      footer={footer}
    >
      {children}
    </PremiumCardShell>
  );
}

export function MatchFeedCard({ matches = [] }) {
  const items = matches.length ? matches.slice(0, 4) : defaultMatches;

  return (
    <PremiumCardShell
      eyebrow="Matches"
      title="Match feed"
      description="Swipe-ready briefs curated for your persona and guardrails."
      footer={<Button variant="primary" size="sm">Open match feed</Button>}
    >
      {items.map((match) => (
        <div
          key={match.id}
          style={{
            borderRadius: '16px',
            border: '1px solid rgba(17,19,23,0.06)',
            padding: '16px',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.98), rgba(247,248,242,0.92))',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
            <div>
              <p style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: brandPalette.deep }}>{match.brand}</p>
              <p style={{ margin: '4px 0 0', fontSize: '0.9rem', color: 'rgba(15,23,42,0.7)' }}>{match.description}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ margin: 0, fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(15,23,42,0.5)' }}>Confidence</p>
              <p style={{ margin: '4px 0 0', fontSize: '1.25rem', fontWeight: 700, color: brandPalette.sage }}>{match.confidence ?? '—'}%</p>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ margin: 0, fontWeight: 600 }}>{match.payout ?? formatCurrency(match.amount)}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ActionPill label="Pass" icon={X} tone="neutral" />
              <ActionPill label="Accept" icon={Check} tone="primary" />
            </div>
          </div>
        </div>
      ))}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: brandPalette.sage, fontSize: '0.9rem', fontWeight: 600 }}>
        <Zap size={16} /> Swipe left/right to triage
      </div>
    </PremiumCardShell>
  );
}

export function ComplianceTimelineCard({ tasks = [] }) {
  const [autopilot, setAutopilot] = useState(true);
  const items = tasks.length ? tasks : defaultTimeline;

  return (
    <PremiumCardShell
      eyebrow="Compliance"
      title="Timeline"
      description="Tasks autopopulated from your conference and Rootd guardrails."
      actionSlot={<ToggleButton label="Autopilot" isOn={autopilot} onToggle={() => setAutopilot((prev) => !prev)} />}
      footer={<Button variant="secondary" size="sm" icon={ShieldCheck}>Review checklist</Button>}
    >
      <div style={{ position: 'relative', paddingLeft: '18px' }}>
        <div style={{ position: 'absolute', top: '6px', bottom: '6px', left: '8px', width: '2px', background: 'rgba(76,89,55,0.2)' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {items.map((item) => {
            const status = timelineStatusStyles[item.status] ?? timelineStatusStyles.pending;
            return (
              <div key={item.id} style={{ display: 'flex', gap: '12px' }}>
                <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: brandPalette.sage }} />
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontWeight: 600, color: brandPalette.deep }}>{item.label}</p>
                  <p style={{ margin: '4px 0 0', color: 'rgba(15,23,42,0.65)' }}>{item.owner}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '6px' }}>
                    <span style={{ fontSize: '0.85rem', color: 'rgba(15,23,42,0.6)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <Clock size={14} /> {item.due}
                    </span>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: '999px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      backgroundColor: status.bg,
                      color: status.color
                    }}>
                      {status.label}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PremiumCardShell>
  );
}

export function PayoutTrackingCard({ payouts = [] }) {
  const items = payouts.length ? payouts : defaultPayouts;

  return (
    <PremiumCardShell
      eyebrow="Payouts"
      title="Tracking"
      description="Track every ACH and deliverable milestone in a single view."
      footer={<Button variant="secondary" size="sm" icon={ArrowRight}>View payout ledger</Button>}
    >
      {items.map((payout) => (
        <div key={payout.id} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ margin: 0, fontWeight: 600, color: brandPalette.deep }}>{payout.brand}</p>
              <p style={{ margin: '4px 0 0', fontSize: '0.9rem', color: 'rgba(15,23,42,0.65)' }}>{payout.notes ?? 'ACH queued via Rootd Finance'}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ margin: 0, fontWeight: 700 }}>{formatCurrency(payout.amount)}</p>
              {payout.status && <StatusBadge status={payout.status} />}
            </div>
          </div>
          <ProgressBar value={Math.min(Math.max(payout.progress ?? 0, 0), 100)} />
        </div>
      ))}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(15,23,42,0.75)', fontSize: '0.9rem', fontWeight: 600 }}>
        <DollarSign size={16} color={brandPalette.sage} /> Rootd reconciles payouts nightly
      </div>
    </PremiumCardShell>
  );
}

export function DeliverablesList({ deliverables = [] }) {
  const [expandedId, setExpandedId] = useState(null);
  const items = deliverables.length ? deliverables : defaultDeliverables;

  const toggle = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <CardSection
      eyebrow="Deliverables"
      title="Next up"
      description="Stay ahead of every creative, compliance, and finance milestone."
      footer={<Button variant="secondary" size="sm">View full schedule</Button>}
    >
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: index * 0.05 }}
          style={{
            padding: '12px 0',
            borderBottom: index === items.length - 1 ? 'none' : '1px solid rgba(17,19,23,0.06)'
          }}
        >
          <button
            onClick={() => toggle(item.id)}
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
              gap: '16px',
              background: 'none',
              border: 'none',
              padding: 0,
              textAlign: 'left',
              cursor: 'pointer'
            }}
          >
            <div>
              <p style={{ margin: 0, fontWeight: 600, color: brandPalette.deep }}>{item.title}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '6px', color: 'rgba(15,23,42,0.65)', fontSize: '0.9rem' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><CalendarDays size={14} /> Due {item.deadline}</span>
                <span style={{ color: 'rgba(15,23,42,0.45)' }}>•</span>
                <span>{item.location}</span>
              </div>
            </div>
            <StatusBadge status={mapDeliverableStatus(item.status)} />
          </button>
          <AnimatePresence>
            {expandedId === item.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                style={{ marginTop: '10px', color: 'rgba(15,23,42,0.7)', lineHeight: 1.5 }}
              >
                {item.description}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </CardSection>
  );
}

export function DocumentVault({ documents = [] }) {
  const items = documents.length ? documents : defaultDocuments;

  return (
    <CardSection
      eyebrow="Documents"
      title="Vault"
      description="Secure uploads stay synced across deals, compliance, and payouts."
      actions={<Button variant="ghost" size="sm" icon={UploadCloud}>Upload</Button>}
    >
      <div style={{
        border: '1px dashed rgba(17,19,23,0.12)',
        borderRadius: '16px',
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        backgroundColor: 'rgba(247,248,242,0.6)'
      }}>
        <div>
          <p style={{ margin: 0, fontWeight: 600, color: brandPalette.deep }}>Secure upload</p>
          <p style={{ margin: '4px 0 0', color: 'rgba(15,23,42,0.65)', fontSize: '0.9rem' }}>Drag & drop PDFs up to 50 MB—Rootd encrypts at rest.</p>
        </div>
        <Button variant="primary" size="sm">Choose file</Button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        {items.map((doc) => (
          <div
            key={doc.id}
            style={{
              borderRadius: '18px',
              border: '1px solid rgba(17,19,23,0.08)',
              padding: '16px',
              backgroundColor: 'rgba(255,255,255,0.95)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: 'rgba(76,89,55,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FileText size={18} color={brandPalette.sage} />
              </div>
              <div>
                <p style={{ margin: 0, fontWeight: 600 }}>{doc.name}</p>
                <p style={{ margin: '4px 0 0', color: 'rgba(15,23,42,0.6)', fontSize: '0.85rem' }}>{doc.type}</p>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'rgba(15,23,42,0.65)' }}>
              <span>{doc.size}</span>
              <span>{doc.updated}</span>
            </div>
          </div>
        ))}
      </div>
    </CardSection>
  );
}

export function InAppMessaging({ initialMessages = [] }) {
  const [messages, setMessages] = useState(initialMessages.length ? initialMessages : defaultMessages);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (initialMessages.length) {
      setMessages(initialMessages);
    }
  }, [initialMessages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const next = {
      id: `msg-${Date.now()}`,
      sender: 'athlete',
      text: input.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((prev) => [...prev, next]);
    setInput('');
  };

  return (
    <CardSection
      eyebrow="Messaging"
      title="In-app"
      description="Keep directors, finance, and creative aligned without switching tools."
      actions={<Button variant="ghost" size="sm" icon={MessageCircle}>New thread</Button>}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '360px' }}>
        <div style={{ flex: 1, overflowY: 'auto', paddingRight: '4px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                alignSelf: message.sender === 'athlete' ? 'flex-end' : 'flex-start',
                maxWidth: '80%'
              }}
            >
              <div style={{
                backgroundColor: message.sender === 'athlete' ? 'rgba(76,89,55,0.12)' : 'rgba(17,19,23,0.06)',
                borderRadius: message.sender === 'athlete' ? '18px 18px 2px 18px' : '18px 18px 18px 2px',
                padding: '12px 16px',
                fontSize: '0.95rem',
                color: brandPalette.deep
              }}>
                {message.text}
              </div>
              <p style={{ margin: '6px 0 0', fontSize: '0.75rem', color: 'rgba(15,23,42,0.55)', textAlign: message.sender === 'athlete' ? 'right' : 'left' }}>{message.timestamp}</p>
            </motion.div>
          ))}
        </div>
        <div style={{
          position: 'sticky',
          bottom: 0,
          backgroundColor: 'white',
          paddingTop: '8px',
          borderTop: '1px solid rgba(17,19,23,0.06)',
          display: 'flex',
          gap: '12px'
        }}>
          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Send a secure message"
            style={{
              flex: 1,
              borderRadius: '999px',
              border: '1px solid rgba(17,19,23,0.12)',
              padding: '10px 16px',
              fontFamily: fontStack
            }}
          />
          <Button variant="primary" size="sm" onClick={handleSend} icon={SendHorizontal}>
            Send
          </Button>
        </div>
      </div>
    </CardSection>
  );
}

export function SmartNotifications({ notifications = [] }) {
  const [items, setItems] = useState(notifications.length ? notifications : defaultNotifications);

  useEffect(() => {
    if (notifications.length) {
      setItems(notifications);
    }
  }, [notifications]);

  const markAllRead = () => {
    setItems((prev) => prev.map((note) => ({ ...note, read: true })));
  };

  const toggleRead = (id) => {
    setItems((prev) => prev.map((note) => (note.id === id ? { ...note, read: true } : note)));
  };

  const categoryMeta = {
    compliance: { icon: Shield, color: 'rgba(76,89,55,0.12)' },
    deals: { icon: BriefcaseBusiness, color: 'rgba(249,215,196,0.8)' },
    payouts: { icon: PiggyBank, color: 'rgba(214,231,214,0.8)' }
  };

  return (
    <CardSection
      eyebrow="Signals"
      title="Smart notifications"
      description="Rootd routes compliance, deal, and payout updates in one stream."
      actions={<Button variant="ghost" size="sm" icon={BellRing} onClick={markAllRead}>Mark all read</Button>}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {items.map((note) => {
          const meta = categoryMeta[note.category] ?? categoryMeta.compliance;
          const Icon = meta.icon;
          return (
            <button
              key={note.id}
              onClick={() => toggleRead(note.id)}
              style={{
                border: '1px solid rgba(17,19,23,0.08)',
                borderRadius: '18px',
                padding: '12px 16px',
                backgroundColor: note.read ? 'rgba(247,248,242,0.6)' : 'white',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                textAlign: 'left',
                cursor: 'pointer'
              }}
            >
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: meta.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={18} color={brandPalette.deep} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontWeight: 600, color: brandPalette.deep }}>{note.title}</p>
                <p style={{ margin: '4px 0 0', color: 'rgba(15,23,42,0.65)', fontSize: '0.9rem' }}>{note.detail}</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                <span style={{ fontSize: '0.8rem', color: 'rgba(15,23,42,0.55)' }}>{note.time}</span>
                {note.read ? (
                  <span style={{ fontSize: '0.75rem', color: 'rgba(15,23,42,0.45)' }}>Read</span>
                ) : (
                  <Bell size={16} color={brandPalette.sage} />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </CardSection>
  );
}

function ActionPill({ label, icon: Icon, tone = 'primary' }) {
  const palette = tone === 'primary'
    ? { bg: 'rgba(76,89,55,0.12)', color: brandPalette.sage }
    : { bg: 'rgba(17,19,23,0.05)', color: 'rgba(17,19,23,0.75)' };

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      style={{
        border: 'none',
        borderRadius: '999px',
        padding: '8px 14px',
        backgroundColor: palette.bg,
        color: palette.color,
        fontWeight: 600,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        cursor: 'pointer'
      }}
    >
      <Icon size={16} />
      {label}
    </motion.button>
  );
}

function ToggleButton({ label, isOn, onToggle }) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      whileTap={{ scale: 0.96 }}
      style={{
        borderRadius: '999px',
        border: '1px solid rgba(17,19,23,0.08)',
        padding: '6px 12px',
        backgroundColor: isOn ? 'rgba(76,89,55,0.12)' : 'rgba(17,19,23,0.04)',
        color: isOn ? brandPalette.sage : 'rgba(15,23,42,0.65)',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        fontWeight: 600,
        cursor: 'pointer'
      }}
    >
      <ShieldCheck size={16} /> {label}: {isOn ? 'On' : 'Off'}
    </motion.button>
  );
}

function ProgressBar({ value }) {
  return (
    <div style={{ width: '100%', height: '8px', borderRadius: '999px', backgroundColor: 'rgba(17,19,23,0.08)' }}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.6 }}
        style={{
          height: '100%',
          borderRadius: '999px',
          background: 'linear-gradient(90deg, #6a784a, #4c5937)'
        }}
      />
    </div>
  );
}

function mapDeliverableStatus(status) {
  const normalized = status?.toString().toLowerCase();
  if (normalized === 'completed' || normalized === 'done') return 'done';
  if (normalized === 'in_progress') return 'in_progress';
  if (normalized === 'pending') return 'pending';
  return 'todo';
}
