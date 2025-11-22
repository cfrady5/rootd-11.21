import React from 'react';
import { PageHeader, Button } from '../../components/director/PremiumComponents.jsx';
import {
  ProgramRiskScoring,
  DealStageTelemetry,
  UnifiedCockpitDashboard,
  PlaybookBuilder,
  PolicyEngine,
  RoutingRules,
  AnalyticsDashboard,
  LeadershipCirclePanel
} from '../../components/director/CockpitComponents.jsx';
import { LayoutDashboard } from 'lucide-react';

export default function Cockpit() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <PageHeader
        title="Director cockpit"
        description="Command center for program risk, deals, policy automation, and leadership signals."
        actions={<Button variant="primary" icon={LayoutDashboard}>Launch playbook</Button>}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: '24px' }}>
        <ProgramRiskScoring />
        <DealStageTelemetry />
        <UnifiedCockpitDashboard />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(340px,1fr))', gap: '24px' }}>
        <PlaybookBuilder />
        <PolicyEngine />
        <RoutingRules />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(340px,1fr))', gap: '24px' }}>
        <AnalyticsDashboard />
        <LeadershipCirclePanel />
      </div>
    </div>
  );
}
