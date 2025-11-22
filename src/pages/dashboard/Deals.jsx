import React from 'react';
import { PencilLine } from 'lucide-react';
import { PageHeader, Button } from '../../components/director/PremiumComponents.jsx';
import {
  OpportunitiesPipeline,
  MatchIntelligence,
  ComplianceWorkflow,
  ContractTemplates,
  AuditTrail,
  StakeholderCollaboration
} from '../../components/business/PortalComponents.jsx';

export default function Deals() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Deal room"
        description="Single source of truth for every activation, attachment, and approval."
        actions={<Button variant="primary" icon={PencilLine}>Create custom contract</Button>}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <OpportunitiesPipeline />
        <MatchIntelligence />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ComplianceWorkflow />
        <ContractTemplates />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <AuditTrail />
        <StakeholderCollaboration />
      </div>
    </div>
  );
}
