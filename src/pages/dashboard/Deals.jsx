import React from 'react';
import { FileSpreadsheet, PencilLine } from 'lucide-react';
import { PageHeader, SectionCard, DataTable, Button, StatusBadge } from '../../components/director/PremiumComponents.jsx';

const pipeline = [
  { id: 'd-1', partner: 'Nike NIL Labs', value: '$180K', stage: 'Negotiation', owner: 'Morgan T.' },
  { id: 'd-2', partner: 'Adobe EDU', value: '$75K', stage: 'Drafting', owner: 'Priya S.' },
  { id: 'd-3', partner: 'Meta Creators', value: '$120K', stage: 'Ready to sign', owner: 'Cam R.' },
  { id: 'd-4', partner: 'PNC Bank', value: '$60K', stage: 'Compliance review', owner: 'Finance bot' }
];

const stageToStatus = {
  Negotiation: 'negotiation',
  Drafting: 'in_progress',
  'Ready to sign': 'approved',
  'Compliance review': 'pending'
};

export default function Deals() {
  return (
    <div>
      <PageHeader
        title="Deal room"
        description="Single source of truth for every activation, attachment, and approval."
        actions={<Button variant="primary" icon={PencilLine}>Create custom contract</Button>}
      />

      <div style={{ marginTop: '24px' }}>
        <SectionCard
          title="Pipeline health"
          description="Rootd surfaces blockers and auto-routes next steps."
          action={<Button variant="secondary" icon={FileSpreadsheet}>Download CSV</Button>}
        >
          <DataTable
            columns={[
              { key: 'partner', label: 'Partner' },
              { key: 'value', label: 'Value' },
              { key: 'stage', label: 'Stage', render: (row) => <StatusBadge status={stageToStatus[row.stage]} /> },
              { key: 'owner', label: 'Owner' }
            ]}
            data={pipeline}
          />
        </SectionCard>
      </div>

      <div style={{ marginTop: '24px' }}>
        <SectionCard
          title="Playbooks running"
          description="Every deal automatically inherits the correct routing based on persona, spend, and category."
          tone="mint"
          variant="tinted"
        >
          <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: 1.7, color: '#475467' }}>
            <li>Creative brief approvals sync to Figma + Frame io.</li>
            <li>Finance reconciliation pushes to Workday nightly.</li>
            <li>Contract redlines tracked inside Rootd with audit snapshots.</li>
          </ul>
        </SectionCard>
      </div>
    </div>
  );
}
