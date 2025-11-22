import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Handshake, BriefcaseBusiness, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { fetchDeals, fetchMatches } from '../lib/api/index.js';
import {
  PageHeader,
  StatCard,
  DataTable,
  StatusBadge,
  Button,
  DrawerContainer,
  EmptyState
} from '../components/director/PremiumComponents.jsx';
import {
  MatchFeedCard,
  ComplianceTimelineCard,
  PayoutTrackingCard,
  DeliverablesList,
  DocumentVault,
  InAppMessaging,
  SmartNotifications
} from '../components/athlete/PremiumCards.jsx';

const gray = {
  background: '#f5f7fb',
  border: '#e2e8f0',
  secondary: '#64748b'
};

const cardStyle = {
  backgroundColor: 'white',
  borderRadius: '16px',
  padding: '24px',
  boxShadow: '0 24px 60px rgba(15, 23, 42, 0.08)'
};

export default function MyDashboard() {
  const { profile, readiness, persona } = useProfile();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [deals, setDeals] = useState([]);
  const [matches, setMatches] = useState([]);
  const [selectedDeal, setSelectedDeal] = useState(null);

  useEffect(() => {
    let mounted = true;
    Promise.all([fetchDeals(persona, user?.id), fetchMatches(user?.id)])
      .then(([dealRes, matchRes]) => {
        if (!mounted) return;
        setDeals(dealRes.data ?? []);
        setMatches(matchRes.data ?? []);
      });
    return () => {
      mounted = false;
    };
  }, [persona, user?.id]);

  const sentiment = useMemo(() => {
    if (!profile) return [];
    return [
      { label: 'Deliverables on time', detail: '0 late submissions in 90 days' },
      { label: 'Community resonance', detail: '+38% campus engagement' },
      { label: 'Compliance speed', detail: 'Avg approval 2.1 days' },
      { label: 'Audience segmentation', detail: 'Launch newsletter for top superfans' }
    ];
  }, [profile]);

  const statCards = [
    {
      key: 'rootd',
      label: 'Rootd Score',
      value: formatPercent(readiness?.compliance),
      change: 6,
      trend: 'up',
      icon: TrendingUp
    },
    {
      key: 'matches',
      label: 'Matches Accepted',
      value: matches.length,
      helper: 'AI curated',
      icon: Handshake
    },
    {
      key: 'deals',
      label: 'Deals in Flight',
      value: deals.length,
      helper: 'Deal room',
      icon: BriefcaseBusiness
    },
    {
      key: 'tax',
      label: 'Tax Readiness',
      value: formatPercent(readiness?.tax),
      helper: 'Rootd finance',
      icon: ShieldCheck
    }
  ];

  const accountRows = (profile?.content_channels ?? []).map((channel) => ({
    id: channel.platform,
    channel,
    handle: channel.handle,
    followers: channel.followers,
    status: mapChannelTone(channel.health)
  }));

  const payoutRows = deals.slice(0, 5).map((deal) => ({
    id: deal.id ?? deal.business,
    partner: deal,
    status: mapDealStatus(deal.status),
    amount: deal.compensation_cash,
    raw: deal
  }));

  const matchFeedData = useMemo(() => {
    if (!Array.isArray(matches) || matches.length === 0) return [];
    return matches.slice(0, 4).map((match, index) => ({
      id: match.id ?? `match-${index}`,
      brand: match.business?.name ?? match.business ?? match.partner ?? 'New match',
      description: match.pitch ?? match.summary ?? match.description ?? 'New opportunity curated by Rootd.',
      confidence: Math.round(match.match_confidence ?? match.matchConfidence ?? match.score ?? 82),
      payout: formatCurrency(match.compensation_cash ?? match.offer ?? match.value ?? 0)
    }));
  }, [matches]);

  const complianceTimeline = useMemo(() => {
    return [
      {
        id: 'timeline-1',
        label: 'Submit updated W9 + NIL disclosure',
        status: readiness?.compliance >= 95 ? 'completed' : 'pending',
        due: 'Today',
        owner: 'You'
      },
      {
        id: 'timeline-2',
        label: 'Upload proof for latest deliverable',
        status: 'due',
        due: 'Tomorrow',
        owner: 'Rootd finance'
      },
      {
        id: 'timeline-3',
        label: 'Policy attestation + training module',
        status: 'pending',
        due: 'Friday',
        owner: 'Compliance automation'
      },
      {
        id: 'timeline-4',
        label: 'Archive ACH confirmation',
        status: 'completed',
        due: 'Cleared',
        owner: 'Rootd autopilot'
      }
    ];
  }, [readiness]);

  const payoutTracking = useMemo(() => {
    if (!Array.isArray(deals) || deals.length === 0) return [];
    const stageToProgress = {
      pending: 20,
      negotiation: 35,
      pending_payment: 55,
      approved: 70,
      executed: 95,
      completed: 100
    };
    return deals.slice(0, 4).map((deal, index) => {
      const status = mapDealStatus(deal.status);
      return {
        id: deal.id ?? `payout-${index}`,
        brand: deal.business?.name ?? deal.business ?? 'Deal partner',
        amount: deal.compensation_cash ?? deal.offer_value ?? 0,
        status,
        notes: `${deal.deliverables?.length ?? 0} deliverables • ${deal.match_confidence ?? deal.matchConfidence ?? '82'} match score`,
        progress: stageToProgress[status] ?? 40
      };
    });
  }, [deals]);

  const deliverablesData = useMemo(() => {
    if (!Array.isArray(deals) || deals.length === 0) return [];
    const rows = [];
    deals.forEach((deal, dealIndex) => {
      (deal.deliverables ?? []).forEach((deliverable, idx) => {
        rows.push({
          id: deliverable.id ?? `deliverable-${dealIndex}-${idx}`,
          title: deliverable.title ?? deliverable.name ?? 'Deliverable',
          deadline: formatDeadlineLabel(deliverable.due_date ?? deliverable.deadline),
          status: deliverable.status ?? 'pending',
          description: deliverable.notes ?? deliverable.description ?? `Upload proof for ${deal.business?.name ?? 'deal room entry'}.`,
          location: deal.business?.name ?? 'Deal room'
        });
      });
    });
    return rows.slice(0, 4);
  }, [deals]);

  const documentVaultData = useMemo(() => {
    const docs = profile?.documents;
    if (!Array.isArray(docs) || docs.length === 0) return [];
    return docs.slice(0, 4).map((doc, index) => ({
      id: doc.id ?? `doc-${index}`,
      name: doc.name ?? doc.title ?? `Document ${index + 1}`,
      type: doc.type ?? doc.category ?? 'Upload',
      size: doc.size ?? doc.filesize ?? formatReadableBytes(doc.bytes),
      updated: doc.updated_at ? formatDeadlineLabel(doc.updated_at) : 'Recently'
    }));
  }, [profile]);

  const notificationsData = useMemo(() => {
    const list = [];
    if (matches.length) {
      list.push({
        id: 'note-match',
        category: 'deals',
        title: `${matches[0].business?.name ?? 'New match'} is ready`,
        detail: 'Review the match brief and leave pricing guidance.',
        time: 'Just now',
        read: false
      });
    }
    if (deals.length) {
      list.push({
        id: 'note-payout',
        category: 'payouts',
        title: `${deals[0].business?.name ?? 'Deal'} payout queued`,
        detail: `${formatCurrency(deals[0].compensation_cash ?? 0)} scheduled via Rootd Finance.`,
        time: 'Today',
        read: false
      });
    }
    list.push({
      id: 'note-compliance',
      category: 'compliance',
      title: 'Compliance score check',
      detail: `Rootd score at ${formatPercent(readiness?.compliance) ?? '—'}—no overdue tasks.`,
      time: 'Today',
      read: true
    });
    return list;
  }, [matches, deals, readiness]);

  const accountColumns = [
    {
      key: 'channel',
      label: 'Channel',
      render: (row) => (
        <div style={{ fontWeight: 600, color: '#0f172a' }}>{row.channel.platform ?? row.channel}</div>
      )
    },
    { key: 'handle', label: 'Handle', render: (row) => <span style={{ color: gray.secondary }}>{row.handle}</span> },
    {
      key: 'followers',
      label: 'Followers',
      render: (row) => <span style={{ fontWeight: 600 }}>{formatFollowers(row.followers)}</span>
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => <StatusBadge status={row.status} />
    }
  ];

  const payoutColumns = [
    {
      key: 'partner',
      label: 'Partner',
      render: (row) => (
        <div style={{ fontWeight: 600 }}>
          {row.partner.business?.name ?? row.partner.business ?? row.partner}
          <div style={{ fontSize: '12px', color: gray.secondary }}>{row.partner.deliverables?.length ?? 0} deliverables</div>
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => <StatusBadge status={row.status} />
    },
    {
      key: 'amount',
      label: 'Amount',
      render: (row) => <span style={{ fontWeight: 600 }}>{formatCurrency(row.amount)}</span>
    }
  ];

  return (
    <div style={{ backgroundColor: gray.background, minHeight: '100%' }}>
      <PageHeader
        title="My Dashboard"
        description="Monitor your Rootd momentum across matches, deals, payouts, and compliance readiness."
        actions={(<Button variant="secondary" onClick={() => navigate('/notifications')}>Customize alerts</Button>)}
      />

      <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '16px' }}>
          {statCards.map((card) => (
            <StatCard key={card.key} {...card} />
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '24px' }}>
          <MatchFeedCard matches={matchFeedData} />
          <ComplianceTimelineCard tasks={complianceTimeline} />
          <PayoutTrackingCard payouts={payoutTracking} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: '24px' }}>
          <DeliverablesList deliverables={deliverablesData} />
          <DocumentVault documents={documentVaultData} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: '24px' }}>
          <InAppMessaging />
          <SmartNotifications notifications={notificationsData} />
        </div>

        <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))' }}>
          <TrendCard />
          <div style={cardStyle}>
            <SectionHeader
              eyebrow="Channels"
              title="Accounts health"
              description="Keep every connected channel green for recruiters."
            />
            <DataTable
              columns={accountColumns}
              data={accountRows}
              emptyState={<EmptyState title="No channels connected" description="Link Instagram, TikTok, or YouTube to unlock insights." />}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))' }}>
          <CardSection title="Strengths" items={sentiment.slice(0, 2)} />
          <CardSection title="Opportunities" items={sentiment.slice(2)} />
          <div style={cardStyle}>
            <SectionHeader
              eyebrow="Payments"
              title="Recent payouts"
              description="Logged payments from executed deals this quarter."
            />
            <DataTable
              columns={payoutColumns}
              data={payoutRows}
              onRowClick={(row) => setSelectedDeal(row.raw)}
              emptyState={<EmptyState title="No payouts yet" description="Close a match in the deal room to see payouts roll in." />}
            />
          </div>
        </div>
      </div>

      <DrawerContainer
        isOpen={Boolean(selectedDeal)}
        onClose={() => setSelectedDeal(null)}
        title={selectedDeal?.business?.name ?? 'Deal details'}
        size="lg"
      >
        {selectedDeal && (
          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <SectionHeader
                eyebrow="Deal insight"
                title="Deal overview"
                description={`Status • ${selectedDeal.status ?? 'Pending'} | ${selectedDeal.deliverables?.length ?? 0} deliverables`}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '16px' }}>
              <DetailItem label="Amount" value={formatCurrency(selectedDeal.compensation_cash)} />
              <DetailItem label="Match score" value={selectedDeal.match_score ?? selectedDeal.matchScore ?? '—'} />
              <DetailItem label="Confidence" value={selectedDeal.match_confidence ?? selectedDeal.matchConfidence ?? '—'} />
            </div>
            <div>
              <p style={{ fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', color: gray.secondary, letterSpacing: '0.1em' }}>Deliverables</p>
              <ul style={{ margin: '12px 0 0', paddingLeft: '20px', color: '#0f172a' }}>
                {(selectedDeal.deliverables ?? ['No deliverables yet']).map((item, idx) => (
                  <li key={`${item}-${idx}`} style={{ marginBottom: '6px' }}>
                    {typeof item === 'string' ? item : item?.title ?? 'Deliverable'}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="primary" onClick={() => navigate('/deals')}>
                View in deal room
              </Button>
            </div>
          </div>
        )}
      </DrawerContainer>
    </div>
  );
}

function TrendCard() {
  const values = [68, 72, 74, 79, 83, 87, 93];
  const max = Math.max(...values, 1);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        ...cardStyle,
        background: 'linear-gradient(135deg, #eef2e4 0%, #dfe5cc 100%)'
      }}
    >
      <SectionHeader
        eyebrow="Performance"
        title="Rootd score trend"
        description="Week-over-week lift driven by on-time deliverables."
      />
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', marginTop: '16px' }}>
        {values.map((point, index) => (
          <motion.span
            key={`${point}-${index}`}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: index * 0.05, type: 'spring', stiffness: 210, damping: 30 }}
            style={{
              display: 'inline-flex',
              width: '14px',
              height: `${(point / max) * 120}px`,
              borderRadius: '999px',
              background: 'linear-gradient(180deg, #6a784a 0%, #4c5937 100%)',
              boxShadow: '0 12px 30px rgba(76, 89, 55, 0.35)',
              transformOrigin: 'bottom center'
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

function CardSection({ title, items }) {
  return (
    <div style={cardStyle}>
      <SectionHeader eyebrow="Highlights" title={title} />
      {items && items.length > 0 ? (
        <ul style={{ margin: '16px 0 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {items.map((item) => (
            <li key={item.label}>
              <p style={{ margin: 0, fontWeight: 600, color: '#0f172a' }}>{item.label}</p>
              <p style={{ margin: '4px 0 0', color: gray.secondary }}>{item.detail}</p>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState title="No insights yet" description="Connect your channels to unlock sentiment tracking." />
      )}
    </div>
  );
}

function SectionHeader({ title, description, eyebrow = 'Overview' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <p style={{ margin: 0, fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', color: gray.secondary }}>{eyebrow}</p>
      <h3 style={{ margin: 0, fontSize: '20px', color: '#0f172a' }}>{title}</h3>
      {description && <p style={{ margin: 0, color: gray.secondary }}>{description}</p>}
    </div>
  );
}

function DetailItem({ label, value }) {
  return (
    <div style={{ backgroundColor: '#f8fafc', borderRadius: '12px', padding: '16px' }}>
      <p style={{ margin: 0, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', color: gray.secondary }}>{label}</p>
      <p style={{ margin: '8px 0 0', fontSize: '20px', fontWeight: 600 }}>{value}</p>
    </div>
  );
}

function mapChannelTone(tone) {
  if (!tone) return 'pending';
  const normalized = tone.toString().toLowerCase();
  if (normalized === 'green') return 'active';
  if (normalized === 'amber' || normalized === 'yellow') return 'warning';
  if (normalized === 'red') return 'fail';
  return 'pending';
}

function mapDealStatus(status) {
  if (!status) return 'pending';
  const normalized = status.toString().toLowerCase().replace(/\s+/g, '_');
  const allowed = ['negotiation', 'approved', 'executed', 'pending', 'pending_payment', 'completed', 'cancelled'];
  return allowed.includes(normalized) ? normalized : 'pending';
}

function formatPercent(value) {
  if (value === null || value === undefined) return '—';
  const number = Number(value);
  if (Number.isNaN(number)) return value;
  return `${Math.round(number)}%`;
}

function formatCurrency(value) {
  if (value === null || value === undefined) return '—';
  const number = Number(value);
  if (Number.isNaN(number)) return value;
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(number);
}

function formatFollowers(value) {
  if (value === null || value === undefined) return '—';
  const number = Number(value);
  if (Number.isNaN(number)) return value;
  if (number >= 1_000_000) return `${(number / 1_000_000).toFixed(1)}M`;
  if (number >= 1_000) return `${(number / 1_000).toFixed(1)}K`;
  return number.toLocaleString();
}

function formatDeadlineLabel(value) {
  if (!value) return 'Soon';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function formatReadableBytes(bytes) {
  if (!bytes || Number.isNaN(Number(bytes))) return '—';
  const units = ['B', 'KB', 'MB', 'GB'];
  let current = Number(bytes);
  let unitIndex = 0;
  while (current >= 1024 && unitIndex < units.length - 1) {
    current /= 1024;
    unitIndex += 1;
  }
  return `${current.toFixed(current >= 10 || unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
}
