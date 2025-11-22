import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import RootdLogo from '../../assets/branding/rootd-logo.png';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Demo', to: '/demo' },
  { label: 'About', to: '/about' }
];

export default function AuthLayout({ children }) {
  const navbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 48px',
    background: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
    position: 'sticky',
    top: 0,
    zIndex: 100
  };

  const logoStyle = {
    width: '48px',
    height: '48px',
    objectFit: 'contain',
    filter: 'drop-shadow(0 2px 8px rgba(15, 23, 42, 0.08))'
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: '#F7F3EB'
    }}>
      <nav style={navbarStyle}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }} aria-label="Rootd home">
          <img
            src={RootdLogo}
            alt="Rootd"
            style={logoStyle}
          />
        </Link>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              style={({ isActive }) => ({
                fontSize: '14px',
                fontWeight: 600,
                color: isActive ? '#788D57' : '#556072',
                textDecoration: 'none',
                position: 'relative',
                paddingBottom: '4px',
                letterSpacing: '0.02em',
                transition: 'color 0.2s'
              })}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </nav>

      <div style={{
        flex: 1,
        width: '100%',
        maxWidth: '480px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '40px',
        padding: '48px 24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img
            src={RootdLogo}
            alt="Rootd"
            style={{
              width: '180px',
              height: '180px',
              objectFit: 'contain',
              filter: 'drop-shadow(0 8px 24px rgba(15, 23, 42, 0.12))'
            }}
          />
        </div>
        <div style={{ width: '100%' }}>
          {children}
        </div>
        <footer style={{ marginTop: '24px', textAlign: 'center' }}>
          <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>
            © 2025 Rootd Technologies
          </p>
        </footer>
      </div>
    </div>
  );
}
