import React, { useMemo } from 'react';
import { useProfile } from '../context/ProfileContext.jsx';
import {
  PageHeader,
  StatCard,
  SectionCard,
  DataTable,
  StatusBadge,
  Button,
  EmptyState
} from '../components/director/PremiumComponents.jsx';

export default function Compliance() {
  const { complianceTasks } = useProfile();
  const counts = useMemo(
    () =>
      complianceTasks.reduce(
        (acc, task) => {
          const key = task.status ?? 'due';
          acc[key] = (acc[key] || 0) + 1;
          return acc;
        },
        { due: 0, in_progress: 0, completed: 0 }
      ),
    [complianceTasks]
  );

  const sorted = useMemo(() => [...complianceTasks].sort((a, b) => (a.due ?? '').localeCompare(b.due ?? '')), [complianceTasks]);

  const columns = useMemo(
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
        render: (row) => <span>{row.due ?? '—'}</span>
      },
      {
        key: 'status',
        label: 'Status',
        render: (row) => <StatusBadge status={mapStatus(row.status)} />
      },
      {
        key: 'action',
        label: 'Action',
        render: () => (
          <Button variant="secondary" size="sm">
            Open task
          </Button>
        )
      }
    ],
    []
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <PageHeader
        title="Compliance center"
        description="Rootd keeps your AD, brands, and state regulators aligned with every filing and disclosure."
        actions={<Button variant="secondary">Download log</Button>}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '16px' }}>
        <StatCard label="Due" value={counts.due} helper="Needs action" />
        <StatCard label="In progress" value={counts.in_progress} helper="Under review" />
        <StatCard label="Completed" value={counts.completed} helper="All done" />
      </div>

      <SectionCard
        title="Disclosures & filings"
        description="Tap into each record to upload proof, leave notes, or request help from Rootd legal."
      >
        <DataTable
          columns={columns}
          data={sorted}
          emptyState={<EmptyState title="All clear" description="New compliance items will land here." />}
        />
      </SectionCard>
    </div>
  );
}

function mapStatus(status) {
  const lookup = {
    due: 'warning',
    in_progress: 'in_progress',
    completed: 'completed'
  };
  const key = status?.toString().toLowerCase() ?? 'due';
  return lookup[key] || 'pending';
}
