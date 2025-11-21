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
