import React from 'react';
import { Globe2, Users2, Shield, Target } from 'lucide-react';
import { SectionCard, StatCard, Button } from '../../components/director/PremiumComponents.jsx';

const milestones = [
  { year: '2022', title: 'Launched NIL intelligence engine', detail: 'Began with 4 SEC programs focused on match scoring.' },
  { year: '2023', title: 'Compliance automation', detail: 'Introduced document workflows + realtime eligibility syncs.' },
  { year: '2024', title: 'Director playbooks', detail: 'Drag-and-drop automations, finance routing, and AI briefs.' },
  { year: '2025', title: 'Full Rootd OS', detail: 'Unified data model and premium experience for every stakeholder.' }
];

export default function About() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <StatCard label="Programs live" value="38" change="6 power conferences" trend="up" />
        <StatCard label="Deals orchestrated" value="$112M" change="Across 4,700 activations" trend="up" />
        <StatCard label="Compliance tasks automated" value="92%" change="Avg reduction in manual work" trend="up" />
      </section>

      <SectionCard
        title="Our mission"
        description="Rootd exists so directors and athletes can focus on building programs, not chasing paper. We translate messy operations into joyful, trustworthy software."
        action={<Button variant="primary">Meet the team</Button>}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px' }}>
          {[{ icon: Target, label: 'Precision' }, { icon: Shield, label: 'Trust' }, { icon: Globe2, label: 'Access' }].map((value) => (
            <div key={value.label} style={{ padding: '16px', borderRadius: '14px', border: '1px solid rgba(76,89,55,0.12)' }}>
              <value.icon size={28} color="#4c5937" />
              <p style={{ margin: '12px 0 0', fontWeight: 600 }}>{value.label}</p>
              <p style={{ margin: '6px 0 0', color: '#475467' }}>Everything we ship is measured against this value.</p>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Milestones" description="We share a build track with our partner schools so nothing is hidden.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {milestones.map((milestone) => (
            <div key={milestone.year} style={{ display: 'flex', gap: '18px', alignItems: 'flex-start' }}>
              <div style={{ width: '80px' }}>
                <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8', letterSpacing: '0.12em' }}>{milestone.year}</p>
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: '0 0 4px', fontSize: '18px' }}>{milestone.title}</h4>
                <p style={{ margin: 0, color: '#475467' }}>{milestone.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title="Leadership circle"
        description="Directors, student-athletes, brand partners, and counsel meet monthly to prioritize the roadmap."
        tone="blush"
        variant="tinted"
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {["Directors", "Athletes", "Brand partners", "Legal"].map((group) => (
            <div key={group} style={{ padding: '14px', borderRadius: '14px', backgroundColor: 'rgba(255,255,255,0.85)', border: '1px solid rgba(76,89,55,0.1)' }}>
              <Users2 size={28} color="#4c5937" />
              <p style={{ margin: '10px 0 0', fontWeight: 600 }}>{group}</p>
              <p style={{ margin: 0, color: '#475467' }}>Voice in every release.</p>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
