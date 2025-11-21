import React, { useState } from 'react';
import { Filter, ArrowRight } from 'lucide-react';
import { PageHeader, FilterBar, Select, DataTable, StatusBadge, Button } from '../../components/director/PremiumComponents.jsx';

const mockMatches = [
  { id: 'm-21', athlete: 'Avery Carter', brand: 'Spotify Originals', score: 92, stage: 'Ready', vertical: 'Media' },
  { id: 'm-22', athlete: 'Maya Wren', brand: 'Hoka', score: 88, stage: 'Briefing', vertical: 'Apparel' },
  { id: 'm-23', athlete: 'Luka Ramos', brand: 'Red Bull', score: 85, stage: 'Legal', vertical: 'CPG' },
  { id: 'm-24', athlete: 'Cami Rhodes', brand: 'Polaris', score: 82, stage: 'Discovery', vertical: 'Auto' }
];

const stageStatusMap = {
  Ready: 'approved',
  Briefing: 'in_progress',
  Legal: 'pending',
  Discovery: 'todo'
};

const verticalOptions = [
  { label: 'All verticals', value: '' },
  { label: 'Media', value: 'Media' },
  { label: 'Apparel', value: 'Apparel' },
  { label: 'CPG', value: 'CPG' },
  { label: 'Auto', value: 'Auto' }
];

const stageOptions = [
  { label: 'All stages', value: '' },
  { label: 'Ready', value: 'Ready' },
  { label: 'Briefing', value: 'Briefing' },
  { label: 'Legal', value: 'Legal' },
  { label: 'Discovery', value: 'Discovery' }
];

export default function Matches() {
  const [vertical, setVertical] = useState('');
  const [stage, setStage] = useState('');

  const filtered = mockMatches.filter((match) => (
    (!vertical || match.vertical === vertical) && (!stage || match.stage === stage)
  ));

  return (
    <div>
      <PageHeader
        title="Match intelligence"
        description="Signal-weighted opportunities sorted by velocity, risk, and persona readiness."
        actions={<Button variant="primary" icon={ArrowRight}>Push to deal room</Button>}
      />

      <FilterBar>
        <Filter size={16} color="#4c5937" />
        <Select label="Industry" value={vertical} onChange={setVertical} options={verticalOptions} placeholder="All" />
        <Select label="Stage" value={stage} onChange={setStage} options={stageOptions} placeholder="All" />
      </FilterBar>

      <div style={{ background: 'white', borderRadius: '16px', marginTop: '24px', border: '1px solid #f3f4f6' }}>
        <DataTable
          columns={[
            { key: 'athlete', label: 'Athlete' },
            { key: 'brand', label: 'Brand' },
            { key: 'vertical', label: 'Vertical' },
            { key: 'score', label: 'Match score', render: (row) => `${row.score}%` },
            { key: 'stage', label: 'Status', render: (row) => <StatusBadge status={stageStatusMap[row.stage]} /> }
          ]}
          data={filtered}
        />
      </div>
    </div>
  );
}
