import React from 'react';
import { ShieldCheck, ClipboardList, Sparkles } from 'lucide-react';
import { PageHeader, SectionCard, StatusBadge, Button, DataTable } from '../../components/director/PremiumComponents.jsx';

const tasks = [
  { id: 'c-1', title: 'Policy refresh: alcohol partners', owner: 'Compliance desk', status: 'in_progress', sla: '4 hrs' },
  { id: 'c-2', title: 'Upload ACH confirmation for Delta', owner: 'Finance automation', status: 'todo', sla: 'Due today' },
  { id: 'c-3', title: 'Collect W9 from Avery Carter', owner: 'Rootd concierge', status: 'blocked', sla: 'Waiting on athlete' },
  { id: 'c-4', title: 'Approve content usage rights', owner: 'Legal', status: 'done', sla: 'Cleared' }
];

const audits = [
  { id: 'a-1', title: 'Quarterly NCAA check', result: 'Pass', owner: 'Rootd', timestamp: 'Jan 08 • 04:00' },
  { id: 'a-2', title: 'External counsel review', result: 'Warning', owner: 'Winston LLP', timestamp: 'Dec 18 • 12:30' }
];

export default function Compliance() {
  return (
    <div>
      <PageHeader
        title="Compliance desk"
        description="Rootd orchestrates documents, automates reminders, and stores an immutable audit trail."
        actions={<Button variant="primary" icon={ShieldCheck}>Launch readiness report</Button>}
      />

      <div style={{ marginTop: '24px' }}>
        <SectionCard
          title="Live queue"
          description="Tasks are prioritized by risk and routed to the right owner automatically."
          action={<Button variant="secondary" icon={ClipboardList}>View runbooks</Button>}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {tasks.map((task) => (
              <div key={task.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid rgba(15,23,42,0.06)' }}>
                <div>
                  <p style={{ margin: 0, fontWeight: 600 }}>{task.title}</p>
                  <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#6b7280' }}>{task.owner}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '13px', color: '#94a3b8' }}>{task.sla}</span>
                  <StatusBadge status={task.status} />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div style={{ marginTop: '24px' }}>
        <SectionCard
          title="Automated audits"
          description="Every policy update triggers a sweep. Results sync with your general counsel in minutes."
          tone="sage"
          variant="tinted"
        >
          <DataTable
            columns={[
              { key: 'title', label: 'Audit' },
              { key: 'result', label: 'Result', render: (row) => <StatusBadge status={row.result === 'Pass' ? 'pass' : 'warning'} /> },
              { key: 'owner', label: 'Owner' },
              { key: 'timestamp', label: 'Completed' }
            ]}
            data={audits}
          />
        </SectionCard>
      </div>

      <div style={{ marginTop: '24px' }}>
        <SectionCard
          title="Automations"
          description="Use AI assistance to keep policies evergreen."
          tone="blush"
          variant="tinted"
          action={<Button variant="primary" icon={Sparkles}>Generate policy addendum</Button>}
        >
          <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: 1.7, color: '#475467' }}>
            <li>Contracts scanned for restricted categories.</li>
            <li>Instant notifications to student-athletes via SMS + email.</li>
            <li>Auto-escalations when partners upload new deliverables.</li>
          </ul>
        </SectionCard>
      </div>
    </div>
  );
}
