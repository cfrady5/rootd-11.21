import React from 'react';
import { PageHeader, Button } from '../components/director/PremiumComponents.jsx';

const HELP_TOPICS = [
  'How to log NIL earnings in Rootd',
  'Best practices for campus compliance approvals',
  'Connecting new social accounts to Rootd',
  'Understanding Rootd Score methodology'
];

const FAQS = [
  { question: 'When are payments released?', answer: 'Within 5 business days of deliverable approval unless contract states otherwise.' },
  { question: 'Can I pause an active deal?', answer: 'Yes—use “View Report” on the Matches page and select “Request pause”. The partner is notified instantly.' },
  { question: 'Where do I download archived contracts?', answer: 'Navigate to Support › Legal & Compliance, then choose the contract to export as PDF.' }
];

const RESOURCES = [
  { title: 'NIL Guidelines', type: 'PDF', action: 'Download' },
  { title: 'Playbook: Campus pop-up activations', type: 'Video series', action: 'Watch' },
  { title: 'Office hours with legal team', type: 'Webinar', action: 'Reserve spot' }
];

export default function Support() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
      <PageHeader
        title="Help & Support"
        description="Get help from Rootd specialists, explore NIL education, and contact compliance support."
        actions={<Button variant="secondary">Contact Rootd Support</Button>}
      />

      <main style={{ padding: '32px 16px 64px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: '1080px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <section
            style={{
              backgroundColor: 'white',
              borderRadius: '24px',
              padding: '28px',
              boxShadow: '0 24px 60px rgba(15,23,42,0.08)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))',
              gap: '20px'
            }}
          >
            <div>
              <h3>Help topics</h3>
              <ul style={{ paddingLeft: '18px', color: '#4b5563', lineHeight: 1.6 }}>
                {HELP_TOPICS.map((topic) => (
                  <li key={topic}>{topic}</li>
                ))}
              </ul>
              <Button variant="secondary">Browse knowledge base</Button>
            </div>
            <div>
              <h3>Contact options</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', color: '#4b5563' }}>
                <div>
                  <p style={{ margin: 0, fontWeight: 600 }}>Email support</p>
                  <p style={{ margin: '4px 0 0' }}>support@rootd.com · avg response 2h</p>
                </div>
                <div>
                  <p style={{ margin: 0, fontWeight: 600 }}>Schedule a call</p>
                  <p style={{ margin: '4px 0 0' }}>Book 30-min strategy or legal reviews.</p>
                </div>
                <div>
                  <p style={{ margin: 0, fontWeight: 600 }}>Legal & compliance</p>
                  <p style={{ margin: '4px 0 0' }}>Direct line for filings + contract escalations.</p>
                </div>
              </div>
            </div>
          </section>

          <section
            style={{
              backgroundColor: 'white',
              borderRadius: '24px',
              padding: '28px',
              boxShadow: '0 20px 60px rgba(15,23,42,0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
          >
            <h3 style={{ margin: 0 }}>FAQs</h3>
            {FAQS.map((faq) => (
              <div key={faq.question} style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '12px' }}>
                <p style={{ margin: 0, fontWeight: 600 }}>{faq.question}</p>
                <p style={{ margin: '6px 0 0', color: '#4b5563' }}>{faq.answer}</p>
              </div>
            ))}
            <Button variant="secondary">See all FAQs</Button>
          </section>

          <section
            style={{
              backgroundColor: 'white',
              borderRadius: '24px',
              padding: '28px',
              boxShadow: '0 20px 60px rgba(15,23,42,0.08)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))',
              gap: '16px'
            }}
          >
            {RESOURCES.map((resource) => (
              <div key={resource.title} style={{ border: '1px solid #e5e7eb', borderRadius: '16px', padding: '18px' }}>
                <p style={{ margin: 0, fontWeight: 600 }}>{resource.title}</p>
                <p style={{ margin: '4px 0 12px', color: '#6b7280' }}>{resource.type}</p>
                <Button variant="secondary">{resource.action}</Button>
              </div>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}
