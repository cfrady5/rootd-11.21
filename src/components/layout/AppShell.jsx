import React from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../director/PremiumComponents.jsx';
import RootdLogo from '../../assets/branding/rootd-logo.png';

const palette = {
  primary: '#4c5937',
  dark: '#2f3621',
  background: '#f5f7f0',
  surface: 'rgba(255,255,255,0.85)'
};

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Demo', to: '/demo' },
  { label: 'About', to: '/about' }
];

function BrandMark() {
  return (
    <Link
      to="/"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0',
        textDecoration: 'none'
      }}
      aria-label="Rootd home"
    >
      <img
        src={RootdLogo}
        alt="Rootd"
        style={{
          width: '92px',
          height: '92px',
          objectFit: 'contain',
          filter: 'drop-shadow(0 6px 16px rgba(15,23,42,0.15))'
        }}
      />
    </Link>
  );
}

function MarketingNav() {
  return (
    <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
      {navLinks.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          style={({ isActive }) => ({
            fontSize: '14px',
            fontWeight: 600,
            color: isActive ? palette.primary : '#556072',
            textDecoration: 'none',
            position: 'relative',
            paddingBottom: '4px',
            letterSpacing: '0.02em'
          })}
        >
          {({ isActive }) => (
            <span style={{ position: 'relative' }}>
              {link.label}
              {isActive && (
                <motion.span
                  layoutId="marketing-nav-underline"
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: -2,
                    height: '2px',
                    borderRadius: '999px',
                    backgroundColor: palette.primary
                  }}
                />
              )}
            </span>
          )}
        </NavLink>
      ))}
    </nav>
  );
}

const badges = [
  { label: 'Live compliance telemetry', value: '2.7M events processed' },
  { label: 'Deal velocity lift', value: '+41% faster approvals' },
  { label: 'Athlete satisfaction', value: '98% CSAT (2025 cohort)' }
];

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
        <header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 20,
            backdropFilter: 'blur(16px)',
            backgroundColor: palette.surface,
            borderBottom: '1px solid rgba(76,89,55,0.1)'
          }}
        >
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '18px 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
          >
            <BrandMark />
            <MarketingNav />
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => navigate('/signin')}
              >
                Sign in
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate('/signup')}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                Create account
                <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </header>

        {isHome && (
          <section style={{ padding: '80px 32px 40px' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '18px',
                maxWidth: '720px'
              }}
              >
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  borderRadius: '999px',
                  background: 'rgba(76,89,55,0.08)',
                  color: palette.primary,
                  fontSize: '13px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase'
                }}
                >
                  <Sparkles size={16} />
                  Built for 2025 collectives
                </span>
                <h1 style={{ fontSize: '52px', lineHeight: 1.1, margin: 0, letterSpacing: '-0.04em' }}>
                  Built by athletes, rootd in community.
                </h1>
                <p style={{ fontSize: '18px', color: '#475467', margin: 0, lineHeight: 1.6 }}>
                  From match intelligence to compliance automation, Rootd mirrors the exact workflows your department runs everyday and wraps them inside a premium, board-ready experience.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '16px', marginTop: '32px', flexWrap: 'wrap' }}>
                <Button variant="primary" size="lg" style={{ minWidth: '200px' }}>
                  Launch live workspace
                </Button>
                <Button variant="secondary" size="lg">
                  Download product brief
                </Button>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '16px',
                marginTop: '40px'
              }}
              >
                {badges.map((badge) => (
                  <div
                    key={badge.label}
                    style={{
                      padding: '18px',
                      borderRadius: '16px',
                      border: '1px solid rgba(76,89,55,0.15)',
                      background: 'rgba(255,255,255,0.7)',
                      backdropFilter: 'blur(8px)'
                    }}
                  >
                    <p style={{ margin: 0, fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#475467' }}>{badge.label}</p>
                    <p style={{ margin: '8px 0 0', fontSize: '18px', fontWeight: 600, color: palette.dark }}>{badge.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
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
          <BrandMark />
          <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>© {new Date().getFullYear()} Rootd Technologies. Purpose-built for athletic departments and compliant NIL operations.</p>
        </div>
      </footer>
    </div>
  );
}
