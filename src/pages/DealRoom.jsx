import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Handshake, AlertTriangle, DollarSign, FileText, Download } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useProfile } from '../context/ProfileContext.jsx';
import { fetchDeals, updateDealStatus } from '../lib/api/index.js';
import {
  PageHeader,
  StatCard,
  DataTable,
  StatusBadge,
  Button,
  EmptyState
} from '../components/director/PremiumComponents.jsx';
import DealDetailDrawer from '../components/DealDetailDrawer.jsx';

const gray = {
  secondary: '#64748b'
};

const cardStyle = {
  backgroundColor: 'white',
  borderRadius: '16px',
  padding: '24px',
  boxShadow: '0 24px 60px rgba(15,23,42,0.08)'
};

export default function DealRoom() {
  const { user } = useAuth();
  const { persona } = useProfile();
  const navigate = useNavigate();
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [advancing, setAdvancing] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchDeals(persona, user?.id)
      .then(({ data }) => {
        if (active) {
          setDeals(data ?? []);
        }
      })
      .catch((error) => {
        if (active) {
          console.error('Failed to load deals', error);
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [persona, user?.id]);

  const totals = useMemo(() => {
    const approvals = deals.reduce((sum, deal) => sum + (deal.approvals?.length ?? 0), 0);
    const documents = deals.reduce((sum, deal) => sum + (deal.documents?.length ?? 0), 0);
    const value = deals.reduce((sum, deal) => sum + (Number(deal.compensation_cash) || 0), 0);
    return { approvals, documents, value };
  }, [deals]);

  const stats = [
    {
      key: 'live',
      label: 'Live deals',
      value: deals.length.toString(),
      icon: Handshake
    },
    {
      key: 'approvals',
      label: 'Approvals',
      value: totals.approvals.toString(),
      icon: AlertTriangle,
      trend: 'up',
      change: totals.approvals ? Math.min(99, totals.approvals * 4) : null
    },
    {
      key: 'documents',
      label: 'Documents',
      value: totals.documents.toString(),
      icon: FileText
    },
    {
      key: 'value',
      label: 'Total value',
      value: formatCurrency(totals.value),
      icon: DollarSign,
      trend: totals.value > 0 ? 'up' : undefined,
      change: totals.value > 0 ? 12.5 : null
    }
  ];

  const columns = useMemo(
    () => [
      {
        key: 'brand',
        label: 'Brand',
        render: (row) => (
          <div style={{ fontWeight: 600 }}>
            {row.business?.name ?? row.business ?? 'Deal'}
            <div style={{ fontSize: '12px', color: gray.secondary }}>Start {formatDate(row.start_date)}</div>
          </div>
        )
      },
      {
        key: 'status',
        label: 'Status',
        render: (row) => <StatusBadge status={normalizeStatus(row.deal_status ?? row.status)} />
      },
      {
        key: 'deliverables',
        label: 'Deliverables',
        render: (row) => (
          <span>{(row.deliverables ?? ['Scope pending']).slice(0, 2).map((item) => (typeof item === 'string' ? item : item?.label ?? item?.title)).join(', ')}</span>
        )
      },
      {
        key: 'value',
        label: 'Value',
        render: (row) => <strong>{formatCurrency(row.compensation_cash)}</strong>
      }
    ],
    []
  );

  const emptyState = (
    <EmptyState
      icon={Handshake}
      title="No active deals"
      description="New deals will appear here after approval."
      action={<Button variant="secondary" onClick={() => navigate('/matches')}>Browse matches</Button>}
    />
  );

  const openCreateDeal = () => navigate('/matches');

  const advanceDeal = async () => {
    if (!selectedDeal) return;
    try {
      setAdvancing(true);
      await updateDealStatus(selectedDeal.id ?? selectedDeal.deal_id ?? selectedDeal.match_id ?? 'demo', 'approved');
      const { data } = await fetchDeals(persona, user?.id);
      setDeals(data ?? []);
    } catch (error) {
      console.error('Failed to advance deal', error);
    } finally {
      setAdvancing(false);
      setSelectedDeal(null);
    }
  };

  return (
    <div>
      <PageHeader
        title="Deal Room"
        description="Track negotiations, approvals, and payments across every active NIL partnership."
        actions={(
          <Button variant="secondary" icon={Download} onClick={() => window.print?.()}>
            Export summary
          </Button>
        )}
      />

      <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '16px' }}>
          {stats.map((stat) => (
            <StatCard key={stat.key} {...stat} />
          ))}
        </div>

        <div style={cardStyle}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
            <div>
              <p style={{ margin: 0, fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', color: gray.secondary }}>Live partnerships</p>
              <h3 style={{ margin: '4px 0 0', fontSize: '22px', color: '#0f172a' }}>Negotiations & payouts</h3>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Button variant="primary" icon={Handshake} onClick={openCreateDeal}>
                New manual deal
              </Button>
            </div>
          </div>
          <DataTable
            columns={columns}
            data={deals}
            onRowClick={setSelectedDeal}
            loading={loading}
            emptyState={emptyState}
          />
        </div>
      </div>

      <DealDetailDrawer
        deal={selectedDeal}
        isOpen={Boolean(selectedDeal)}
        onClose={() => setSelectedDeal(null)}
        onAdvance={advanceDeal}
        saving={advancing}
      />
    </div>
  );
}

function normalizeStatus(status) {
  if (!status) return 'pending';
  return status.toString().toLowerCase().replace(/\s+/g, '_');
}

function formatCurrency(value) {
  if (value === null || value === undefined) return '—';
  const number = Number(value);
  if (Number.isNaN(number)) {
    return value;
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(number);
}

function formatDate(value) {
  if (!value) return 'TBD';
  try {
    return new Date(value).toLocaleDateString();
  } catch (error) {
    return value;
  }
}
