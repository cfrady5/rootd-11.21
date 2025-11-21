import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { fetchDeals, fetchMatches } from '../lib/api/index.js';
import GuidanceBanner from '../components/GuidanceBanner.jsx';
import {
  PageHeader,
  StatCard,
  DataTable,
  Button,
  EmptyState,
  StatusBadge,
  SectionCard
} from '../components/director/PremiumComponents.jsx';

export default function Home() {
  const { profile, persona, readiness, complianceTasks } = useProfile();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [deals, setDeals] = useState([]);
  const [matches, setMatches] = useState([]);
  const [activeHint, setActiveHint] = useState(null);

  const hintCopy = useMemo(
    () => ({
      compliance: {
        title: 'Boost your Rootd score',
        body: 'Finish outstanding compliance filings to unlock next-level partners.',
        actionLabel: 'Go to compliance',
        href: '/compliance'
      },
      tax: {
        title: 'Tighten tax readiness',
        body: 'Upload your W9 and confirm payout banking to stay audit ready.',
        actionLabel: 'Review checklist',
        href: '/compliance'
      }
    }),
    []
  );

  useEffect(() => {
    let mounted = true;
    async function sync() {
      const [{ data: dealData }, { data: matchData }] = await Promise.all([
        fetchDeals(persona, user?.id),
        fetchMatches(user?.id)
      ]);
      if (!mounted) return;
      setDeals(dealData ?? []);
      setMatches(matchData ?? []);
    }
    sync();
    return () => {
      mounted = false;
    };
  }, [persona, user?.id]);

  const matchColumns = useMemo(
    () => [
      {
        key: 'partner',
        label: 'Partner',
        render: (row) => (
          <div>
            <p style={{ margin: 0, fontWeight: 600 }}>{row.business ?? row.business_name ?? 'Partner'}</p>
            <p style={{ margin: '4px 0 0', color: '#6b7280', fontSize: '13px' }}>
              Score {row.score ?? '—'} · Confidence {row.confidence ?? 'High'}
            </p>
          </div>
        )
      },
      {
        key: 'highlights',
        label: 'Highlights',
        render: (row) => (
          <p style={{ margin: 0, color: '#374151' }}>{truncate(row.highlights?.[0])}</p>
        )
      },
      {
        key: 'action',
        label: 'Action',
        render: () => (
          <Button variant="secondary" size="sm" onClick={() => navigate('/matches')}>
            Inspect
          </Button>
        )
      }
    ],
    [navigate]
  );

  const dealColumns = useMemo(
    () => [
      {
        key: 'brand',
        label: 'Brand',
        render: (row) => (
          <div>
            <p style={{ margin: 0, fontWeight: 600 }}>{row.business?.name ?? row.business ?? 'Deal'}</p>
            <p style={{ margin: '4px 0 0', color: '#6b7280', fontSize: '13px' }}>Start {row.start_date ?? 'TBD'}</p>
          </div>
        )
      },
      {
        key: 'status',
        label: 'Status',
        render: (row) => <StatusBadge status={normalizeDealStatus(row.deal_status ?? row.status)} />
      },
      {
        key: 'value',
        label: 'Value',
        render: (row) => (
          <p style={{ margin: 0, fontWeight: 600 }}>{formatCurrency(row.compensation_cash)}</p>
        )
      }
    ],
    []
  );

  const complianceColumns = useMemo(
    () => [
      {
        key: 'task',
        label: 'Task',
        render: (row) => (
          <div>
            <p style={{ margin: 0, fontWeight: 600 }}>{row.title}</p>
            <p style={{ margin: '4px 0 0', color: '#6b7280', fontSize: '13px' }}>{row.detail}</p>
          </div>
        )
      },
      {
        key: 'due',
        label: 'Due',
        render: (row) => <span style={{ color: '#374151' }}>{row.due ?? '—'}</span>
      },
      {
        key: 'status',
        label: 'Status',
        render: (row) => <StatusBadge status={mapComplianceStatus(row.status)} />
      }
    ],
    []
  );

  const stats = [
    {
      key: 'rootd',
      label: 'Rootd score',
      value: formatPercent(readiness?.compliance),
      helper: 'Compliance weighted',
      onClick: () => setActiveHint(hintCopy.compliance)
    },
    {
      key: 'deals',
      label: 'Open deals',
      value: deals.length,
      helper: 'Deal room activity'
    },
    {
      key: 'matches',
      label: 'New matches',
      value: matches.length,
      helper: 'Supabase AI'
    },
    {
      key: 'tax',
      label: 'Tax readiness',
      value: formatPercent(readiness?.tax),
      helper: 'Rootd finance',
      onClick: () => setActiveHint(hintCopy.tax)
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <PageHeader
        title={`Hi ${profile?.first_name ?? 'Rootd partner'} 👋`}
        description="Your NIL business is synced. Act on fresh matches and knock out compliance before Friday."
        actions={(
          <Button variant="secondary" onClick={() => navigate('/quiz')}>
            Retake Rootd quiz
          </Button>
        )}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '16px' }}>
        {stats.map((stat) => (
          <StatCard key={stat.key} {...stat} />
        ))}
      </div>

      <GuidanceBanner hint={activeHint} onDismiss={() => setActiveHint(null)} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: '20px' }}>
        <SectionCard
          title="In-flight matches"
          description="Rootd AI curated matches ready to advance into the deal room."
          action={<Button variant="secondary" onClick={() => navigate('/matches')}>View all matches</Button>}
        >
          <DataTable
            columns={matchColumns}
            data={matches.slice(0, 5)}
            emptyState={(
              <EmptyState
                title="No matches yet"
                description="Complete the Rootd quiz to unlock high-intent partners."
                action={(
                  <Button variant="secondary" onClick={() => navigate('/quiz')}>
                    Launch quiz
                  </Button>
                )}
              />
            )}
          />
        </SectionCard>

        <SectionCard
          title="Deal room"
          description="Everything in active negotiation with brands and compliance."
          action={<Button variant="secondary" onClick={() => navigate('/deals')}>Open deal room</Button>}
        >
          <DataTable
            columns={dealColumns}
            data={deals.slice(0, 5)}
            emptyState={(
              <EmptyState
                title="No deals"
                description="Approve a match to spin up a shared workspace."
                action={(
                  <Button variant="secondary" onClick={() => navigate('/matches')}>
                    Review matches
                  </Button>
                )}
              />
            )}
          />
        </SectionCard>

        <SectionCard
          title="Compliance checklist"
          description="Stay ahead of filings and approvals with real-time status."
          action={<Button variant="secondary" onClick={() => navigate('/compliance')}>See checklist</Button>}
        >
          <DataTable
            columns={complianceColumns}
            data={complianceTasks.slice(0, 5)}
            emptyState={(
              <EmptyState
                title="All clear"
                description="Compliance center will populate as new filings land."
              />
            )}
          />
        </SectionCard>
      </div>
    </div>
  );
}

function normalizeDealStatus(status) {
  if (!status) return 'pending';
  const normalized = status.toString().toLowerCase().replace(/\s+/g, '_');
  return normalized;
}

function mapComplianceStatus(status) {
  const lookup = {
    due: 'warning',
    in_progress: 'in_progress',
    completed: 'completed'
  };
  const key = status?.toString().toLowerCase() ?? '';
  return lookup[key] || 'pending';
}

function truncate(text, limit = 80) {
  if (!text) return '—';
  return text.length > limit ? `${text.slice(0, limit)}…` : text;
}

function formatCurrency(value) {
  if (value === null || value === undefined) return '—';
  const number = Number(value);
  if (Number.isNaN(number)) {
    return value;
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(number);
}

function formatPercent(value) {
  if (value === null || value === undefined) return '—';
  const number = Number(value);
  if (Number.isNaN(number)) {
    return value;
  }
  return `${Math.round(number)}%`;
}
