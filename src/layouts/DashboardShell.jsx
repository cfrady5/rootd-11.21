import React from 'react';
import { NavLink } from 'react-router-dom';
import { Activity, Briefcase, ShieldCheck, UserCircle, Users, LayoutDashboard, HelpCircle } from 'lucide-react';
import { Button, StatusBadge } from '../components/director/PremiumComponents.jsx';

const brand = {
  surface: '#ffffff',
  border: 'rgba(15,23,42,0.08)',
  background: '#f4f6f4',
  primary: '#4c5937'
};

const navItems = [
  { label: 'Overview', to: '/dashboard/overview', icon: Activity },
  { label: 'Matches', to: '/dashboard/matches', icon: Users },
  { label: 'Deals', to: '/dashboard/deals', icon: Briefcase },
  { label: 'Cockpit', to: '/dashboard/cockpit', icon: LayoutDashboard },
  { label: 'Compliance', to: '/dashboard/compliance', icon: ShieldCheck },
  { label: 'Profile', to: '/dashboard/profile', icon: UserCircle }
];

export default function DashboardShell({ children }) {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: brand.background }}>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <aside
          style={{
            width: '280px',
            padding: '32px 24px',
            borderRight: `1px solid ${brand.border}`,
            background: 'linear-gradient(180deg, #f9faf5, #f0f4ea)'
          }}
        >
          <div style={{ marginBottom: '32px' }}>
            <p style={{
              margin: 0,
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.24em',
              color: '#94a3b8'
            }}
            >
              Rootd OS
            </p>
            <h2 style={{ margin: '8px 0 0', fontSize: '22px', color: '#111827', letterSpacing: '-0.02em' }}>
              Director Console
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontWeight: 600,
                  color: isActive ? brand.primary : '#475467',
                  backgroundColor: isActive ? 'rgba(76,89,55,0.12)' : 'transparent',
                  border: isActive ? '1px solid rgba(76,89,55,0.2)' : '1px solid transparent'
                })}
              >
                <item.icon size={18} />
                {item.label}
              </NavLink>
            ))}
          </div>
          <div
            style={{
              marginTop: 'auto',
              padding: '18px',
              borderRadius: '16px',
              backgroundColor: 'rgba(76,89,55,0.08)'
            }}
          >
            <p style={{ margin: 0, fontSize: '13px', color: '#111827', fontWeight: 600 }}>Need support?</p>
            <p style={{ margin: '6px 0 12px', fontSize: '13px', color: '#475467' }}>
              The Rootd concierge team replies in under 5 minutes.
            </p>
            <Button variant="primary" size="sm" fullWidth icon={HelpCircle}>
              Open live chat
            </Button>
          </div>
        </aside>

        <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              padding: '28px 40px',
              borderBottom: `1px solid ${brand.border}`,
              backgroundColor: brand.surface,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <p style={{
                margin: 0,
                fontSize: '13px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#94a3b8'
              }}
              >
                NIL Workspace
              </p>
              <h1 style={{ margin: '6px 0 0', fontSize: '28px', letterSpacing: '-0.02em' }}>Saint Jude University</h1>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <StatusBadge status="active" />
              <Button variant="secondary" size="sm">
                Download board report
              </Button>
              <Button variant="primary" size="sm">
                Trigger compliance sync
              </Button>
            </div>
          </div>
          <div style={{ flex: 1, padding: '40px', background: brand.background }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
