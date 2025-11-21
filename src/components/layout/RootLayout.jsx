import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { useProfile } from '../../context/ProfileContext.jsx';
import MessagingDrawer from '../MessagingDrawer.jsx';
import { palette, radii, shadows } from '../../lib/theme.js';
import RootdLogo from '../../assets/branding/rootd-logo.png';

const NAV_LINKS = [
  { label: 'Control Center', to: '/home' },
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Matches', to: '/matches' },
  { label: 'Deal Room', to: '/deals' },
  { label: 'Compliance', to: '/compliance' },
  { label: 'Notifications', to: '/notifications' },
  { label: 'Profile', to: '/profile' },
  { label: 'Support', to: '/support' },
  { label: 'Quiz', to: '/quiz' }
];

function PersonaChip({ persona, onChange }) {
  const personas = ['athlete', 'business', 'director'];
  return (
    <div style={{ display: 'flex', gap: '6px', backgroundColor: palette.cream, padding: '6px', borderRadius: radii.pill }}>
      {personas.map((option) => (
        <button
          className="touch-target"
          key={option}
          onClick={() => onChange(option)}
          type="button"
          style={{
            border: 'none',
            borderRadius: radii.pill,
            padding: '8px 14px',
            fontWeight: 600,
            textTransform: 'capitalize',
            backgroundColor: option === persona ? palette.pine : 'transparent',
            color: option === persona ? '#fff' : palette.grey,
            cursor: 'pointer'
          }}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default function RootLayout() {
  const { persona, setPersona, user, signOut, isDemo } = useAuth();
  const { readiness, needsKyc, needsW9 } = useProfile();
  const location = useLocation();

  return (
    <div className="rootd-shell" style={{ backgroundColor: palette.cream }}>
      <aside
        className="rootd-sidebar"
        style={{
          width: '240px',
          padding: '32px 24px',
          borderRight: '1px solid rgba(0,0,0,0.08)',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
          position: 'sticky',
          top: 0,
          height: '100vh'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <img src={RootdLogo} alt="Rootd" style={{ height: '32px', width: 'auto' }} />
          <div>
            <p style={{ margin: 0, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.2em', color: palette.grey }}>Rootd</p>
            <h2 style={{ margin: '6px 0 0', fontSize: '28px', letterSpacing: '-0.02em', color: palette.pineDark }}>NIL OS</h2>
          </div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              style={({ isActive }) => ({
                padding: '12px 16px',
                borderRadius: radii.md,
                textDecoration: 'none',
                fontWeight: 600,
                color: isActive ? '#fff' : palette.grey,
                backgroundColor: isActive ? palette.pine : 'transparent'
              })}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div style={{ marginTop: 'auto' }}>
          <p style={{ margin: 0, fontSize: '12px', letterSpacing: '0.08em', color: palette.grey }}>Persona</p>
          <PersonaChip persona={persona} onChange={setPersona} />
          <button
            className="touch-target"
            type="button"
            onClick={signOut}
            style={{
              marginTop: '16px',
              padding: '10px 16px',
              width: '100%',
              borderRadius: radii.md,
              border: '1px solid rgba(0,0,0,0.12)',
              backgroundColor: 'white',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            {isDemo ? 'Reset demo' : 'Sign out'}
          </button>
        </div>
      </aside>

      <div className="rootd-main-wrapper">
        <header
          style={{
            padding: '28px 48px 0',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          <div className="rootd-stack-sm" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
            <div>
              <p style={{ margin: 0, fontSize: '13px', color: palette.grey }}>Signed in as</p>
              <h1 style={{ margin: 0, fontSize: '32px', letterSpacing: '-0.02em' }}>{user?.email ?? 'Demo user'}</h1>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ textAlign: 'right' }}>
                <p style={{ margin: 0, fontSize: '12px', color: palette.grey }}>Compliance readiness</p>
                <p style={{ margin: 0, fontSize: '24px', fontWeight: 700 }}>{readiness.compliance}%</p>
              </div>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: palette.pine, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700 }}>
                {persona?.charAt(0)?.toUpperCase()}
              </div>
            </div>
          </div>

          {(needsKyc || needsW9) && (
            <div style={{
              padding: '14px 18px',
              borderRadius: radii.md,
              backgroundColor: '#fff3cd',
              border: '1px solid #ffe49c',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <strong>Finish compliance setup</strong>
                <p style={{ margin: '4px 0 0', color: palette.grey }}>
                  {needsKyc ? 'KYC verification pending. ' : ''}
                  {needsW9 ? 'W9 upload required.' : ''}
                </p>
              </div>
              <NavLink to="/compliance" style={{ fontWeight: 600, color: palette.pine }}>
                Open compliance
              </NavLink>
            </div>
          )}
        </header>

        <main style={{ flex: 1, padding: '24px 48px 80px' }}>
          <div style={{
            backgroundColor: '#fff',
            minHeight: 'calc(100vh - 160px)',
            borderRadius: radii.lg,
            padding: '32px',
            boxShadow: shadows.card
          }}>
            <Outlet key={location.pathname} />
          </div>
        </main>
      </div>

      <MessagingDrawer />
    </div>
  );
}
