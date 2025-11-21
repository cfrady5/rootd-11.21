import React from 'react';
import { LogOut, Mail, Phone, Settings } from 'lucide-react';
import { PageHeader, SectionCard, Button, StatusBadge } from '../../components/director/PremiumComponents.jsx';

const contact = [
  { label: 'Email', value: 'director@saintjude.edu', icon: Mail },
  { label: 'Direct line', value: '+1 (404) 555-1874', icon: Phone }
];

const preferences = [
  { label: 'Alerts', detail: 'Match wins, deal blockers, compliance escalations', status: 'active' },
  { label: 'Digest', detail: 'Nightly summary at 9:00 PM ET', status: 'active' }
];

export default function Profile() {
  return (
    <div>
      <PageHeader
        title="Director profile"
        description="Control notifications, workspace roles, and concierge access."
        actions={(
          <>
            <Button variant="secondary" icon={Settings}>Preferences</Button>
            <Button variant="danger" icon={LogOut}>Sign out</Button>
          </>
        )}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginTop: '24px' }}>
        <SectionCard title="Contact" description="We coordinate white-glove support with these details.">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {contact.map((item) => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <item.icon size={20} color="#4c5937" />
                <div>
                  <p style={{ margin: 0, fontSize: '13px', color: '#6b7280' }}>{item.label}</p>
                  <p style={{ margin: '4px 0 0', fontWeight: 600 }}>{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Workspace preferences" description="Rootd tailors alerts to the most critical workflows.">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {preferences.map((pref) => (
              <div key={pref.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ margin: 0, fontWeight: 600 }}>{pref.label}</p>
                  <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#6b7280' }}>{pref.detail}</p>
                </div>
                <StatusBadge status={pref.status} />
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div style={{ marginTop: '24px' }}>
        <SectionCard
          title="Concierge lane"
          description="Your dedicated Rootd operators are available 7 days a week."
          tone="mint"
          variant="tinted"
        >
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {[{ name: 'Morgan Taft', role: 'Deal desk' }, { name: 'Priya Shah', role: 'Compliance' }, { name: 'Chris Doe', role: 'Automation engineer' }].map((person) => (
              <div key={person.name} style={{ minWidth: '220px', padding: '16px', borderRadius: '14px', border: '1px solid rgba(76,89,55,0.12)' }}>
                <p style={{ margin: 0, fontWeight: 600 }}>{person.name}</p>
                <p style={{ margin: '4px 0 0', color: '#6b7280' }}>{person.role}</p>
                <Button variant="secondary" size="sm" style={{ marginTop: '12px' }}>
                  Open thread
                </Button>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
