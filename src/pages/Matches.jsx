import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Handshake, RefreshCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { fetchMatches, updateDealStatus } from '../lib/api/index.js';
import {
  PageHeader,
  FilterBar,
  Select,
  Button,
  DataTable,
  StatusBadge,
  EmptyState,
  LoadingSpinner,
  Pagination
} from '../components/director/PremiumComponents.jsx';
import MatchDetailDrawer from '../components/MatchDetailDrawer.jsx';

const gray = {
  background: '#f5f7fb',
  secondary: '#64748b'
};

const filterOptions = [
  { value: 'all', label: 'All confidence levels' },
  { value: 'high', label: 'High confidence' },
  { value: 'medium', label: 'Medium confidence' }
];

export default function Matches() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [confidence, setConfidence] = useState('all');
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 8;

  const pullMatches = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await fetchMatches(user?.id);
      setMatches(data ?? []);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    pullMatches();
  }, [pullMatches]);

  const filteredMatches = useMemo(() => {
    if (confidence === 'all') return matches;
    return matches.filter((match) => (match.confidence ?? match.match_confidence ?? '').toLowerCase() === confidence);
  }, [matches, confidence]);

  useEffect(() => {
    setCurrentPage(1);
  }, [confidence]);

  const totalPages = Math.max(1, Math.ceil(filteredMatches.length / pageSize));
  const start = (currentPage - 1) * pageSize;
  const paginatedMatches = filteredMatches.slice(start, start + pageSize);

  const columns = useMemo(() => ([
    {
      key: 'partner',
      label: 'Partner',
      render: (row) => (
        <div style={{ fontWeight: 600, color: '#0f172a' }}>
          {row.business?.name ?? row.name ?? 'Untitled partner'}
          <div style={{ fontSize: '12px', color: gray.secondary }}>Match score {row.match_score ?? row.score ?? '—'}</div>
        </div>
      )
    },
    {
      key: 'deliverables',
      label: 'Deliverables',
      render: (row) => (
        <div style={{ color: '#475569' }}>
          {(row.deliverables ?? ['Campaign takeover']).slice(0, 2).join(', ')}
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => <StatusBadge status={mapMatchStatus(row.status)} />
    },
    {
      key: 'updated',
      label: 'Updated',
      render: (row) => <span>{formatDate(row.updated_at ?? row.updatedAt ?? row.created_at)}</span>
    }
  ]), []);

  const emptyState = (
    <EmptyState
      icon={Handshake}
      title="No matches found"
      description="Try adjusting your filters or check back later."
      action={(<Button variant="secondary" onClick={() => navigate('/quiz')}>Improve signals</Button>)}
    />
  );

  const handleAdvance = async () => {
    if (!selectedMatch) return;
    setSaving(true);
    await updateDealStatus(selectedMatch.id ?? selectedMatch.deal_id ?? 'demo', 'pending');
    setSaving(false);
    setSelectedMatch(null);
    pullMatches();
  };

  return (
    <div style={{ backgroundColor: gray.background, minHeight: '100%' }}>
      <PageHeader
        title="Matches"
        description="Review Rootd AI matches and move the best fits into the deal room."
        actions={(<Button variant="secondary" onClick={() => navigate('/quiz')}>Improve signals</Button>)}
      />

      <FilterBar>
        <Select label="Confidence" value={confidence} onChange={setConfidence} options={filterOptions} />
        <Button variant="ghost" onClick={pullMatches} icon={RefreshCcw}>
          Refresh
        </Button>
      </FilterBar>

      <div style={{ padding: '32px' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 24px 60px rgba(15,23,42,0.08)', padding: '24px' }}>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              <DataTable
                columns={columns}
                data={paginatedMatches}
                onRowClick={setSelectedMatch}
                emptyState={emptyState}
              />
              {filteredMatches.length > pageSize && (
                <div style={{ marginTop: '16px' }}>
                  <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => setCurrentPage(page)} />
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <MatchDetailDrawer
        match={selectedMatch}
        isOpen={Boolean(selectedMatch)}
        onClose={() => setSelectedMatch(null)}
        onAdvance={handleAdvance}
        saving={saving}
      />
    </div>
  );
}

function mapMatchStatus(status) {
  if (!status) return 'pending';
  const normalized = status.toString().toLowerCase().replace(/\s+/g, '_');
  const allowed = ['pending', 'negotiation', 'approved', 'completed', 'cancelled'];
  return allowed.includes(normalized) ? normalized : 'pending';
}

function formatDate(value) {
  if (!value) return '—';
  try {
    return new Date(value).toLocaleDateString();
  } catch (error) {
    return value;
  }
}
