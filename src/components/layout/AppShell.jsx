import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { Button } from '../director/PremiumComponents.jsx';
import { brandPalette, typeScale } from '../../lib/designSystem.js';
import RootdHeader from './RootdHeader.jsx';

const palette = {
  primary: brandPalette.sage,
  dark: brandPalette.sageDark,
  background: brandPalette.bone,
  surface: 'rgba(255,255,255,0.88)'
};

const heroStats = [
  { label: 'Live compliance telemetry', value: '2.7M events', helper: 'streaming into Rootd' },
  { label: 'Deal velocity lift', value: '+41%', helper: 'faster approvals' },
  { label: 'Athlete satisfaction', value: '98% CSAT', helper: '2025 cohort' }
];

const heroHighlights = [
  'Director cockpit + automations',
  'Athlete portal with proactive nudges',
  'Full telemetry streaming to partners'
];

function HeroStat({ label, value, helper }) {
  return (
    <div style={{
      padding: '20px',
      borderRadius: '24px',
      border: '1px solid rgba(76,89,55,0.12)',
      backgroundColor: 'rgba(255,255,255,0.9)',
      boxShadow: '0 18px 45px rgba(15,23,42,0.08)'
    }}
    >
      <p style={{ margin: 0, fontSize: '13px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#94a3b8' }}>{label}</p>
      <p style={{ margin: '8px 0 0', fontSize: '1.8rem', fontWeight: 600 }}>{value}</p>
      <p style={{ margin: '6px 0 0', color: '#475467' }}>{helper}</p>
    </div>
  );
}

function HomeHero({ onDemo, onSignup }) {
  return (
    <section style={{ padding: '48px 0 40px' }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 32px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '32px',
        alignItems: 'center'
      }}
      >
        <div>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: '999px',
            backgroundColor: 'rgba(76,89,55,0.12)',
            color: brandPalette.sageDark,
            fontWeight: 600,
            fontSize: typeScale.small,
            letterSpacing: '0.12em',
            textTransform: 'uppercase'
          }}
          >
            <Sparkles size={16} />
            Unified NIL OS
          </span>
          <h1 style={{
            fontSize: typeScale.display,
            lineHeight: 1.1,
            margin: '24px 0 16px',
            color: brandPalette.charcoal
          }}
          >
            Bring every director, athlete, and partner back into the same workspace.
          </h1>
          <p style={{ fontSize: typeScale.subhead, color: '#475467', margin: '0 0 28px', maxWidth: '540px' }}>
            Rootd orchestrates compliance, finance, and creative deliverables with real-time telemetry and automations purpose-built for athletic departments.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <Button variant="primary" size="lg" onClick={onDemo}>
              Explore the demo
            </Button>
            <Button variant="secondary" size="lg" onClick={onSignup}>
              Create workspace
            </Button>
          </div>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: '28px 0 0',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}
          >
            {heroHighlights.map((highlight) => (
              <li key={highlight} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475467', fontWeight: 500 }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '999px', backgroundColor: brandPalette.sage }} />
                {highlight}
              </li>
            ))}
          </ul>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {heroStats.map((stat) => (
            <HeroStat key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function AppShell({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: palette.background, color: '#0f172a' }}>
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 20% 20%, rgba(76,89,55,0.15), transparent 50%)'
          }}
        />
        <RootdHeader />
        {isHome && (
          <div style={{
            position: 'relative',
            background: 'radial-gradient(circle at 10% 20%, rgba(76,89,55,0.12), transparent 55%)'
          }}
          >
            <HomeHero
              onDemo={() => navigate('/demo')}
              onSignup={() => navigate('/signup')}
            />
          </div>
        )}
      </div>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px 80px' }}>
        {children}
      </main>

      <footer style={{ borderTop: '1px solid rgba(15,23,42,0.08)', backgroundColor: '#fff', marginTop: '40px' }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}
        >
          <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>© {new Date().getFullYear()} Rootd Technologies. Purpose-built for athletic departments and compliant NIL operations.</p>
        </div>
      </footer>
    </div>
  );
}
