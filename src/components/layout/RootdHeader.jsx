import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import RootdLogo from '../../assets/branding/rootd-logo.png';
import { Button } from '../director/PremiumComponents.jsx';
import { getPersonaPortalPath } from '../../lib/personaRoutes.js';

const navLinks = [
  { label: 'Demo', to: '/demo' },
  { label: 'About', to: '/about' },
  { label: 'Dashboard', to: '/dashboard' }
];

export default function RootdHeader() {
  const { user, persona } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const goToAuth = (path) => navigate(path);
  const personaPortalPath = getPersonaPortalPath(persona);

  const handlePrimaryCta = () => {
    if (user) {
      navigate(personaPortalPath);
      return;
    }
    goToAuth('/signin');
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full">
      <div className="mx-auto flex h-[78px] max-w-screen-xl items-center justify-between px-5 sm:px-8 lg:px-10 surface-glass">
        <button
          type="button"
          onClick={() => navigate('/')}
          aria-label="Rootd home"
          className="group inline-flex items-center gap-2 rounded-full bg-transparent p-0 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#4c5937]/30"
        >
          <img src={RootdLogo} alt="Rootd" className="h-[1.6rem] w-auto" />
        </button>

        <nav className="flex flex-1 items-center justify-center px-4 sm:px-7" style={{ gap: '12px' }}>
          {navLinks.map(({ to, label }) => {
            const targetPath = label === 'Dashboard' ? personaPortalPath : to;
            const matchesActive = location.pathname === targetPath || location.pathname.startsWith(`${targetPath}/`);
            return (
            <NavLink
              key={label}
              to={targetPath}
              className={() =>
                `inline-flex items-center rounded-full px-4 py-2 text-[13px] font-medium tracking-[0.06em] no-underline transition-all duration-200 focus-visible:outline-none focus:no-underline focus-visible:no-underline active:no-underline ${
                  matchesActive
                    ? 'bg-[#4c5937] text-white shadow-sm'
                    : 'text-[#1f2716]/70 hover:text-[#1f2716] hover:bg-white/70'
                }`
              }
            >
              {label}
            </NavLink>
            );
          })}
        </nav>

        <div className="flex items-center">
          <Button
            variant="primary"
            size="sm"
            onClick={handlePrimaryCta}
            aria-label={user ? 'Open portal' : 'Sign in'}
            style={{ padding: '14px 30px', fontSize: '0.95rem', letterSpacing: '0.01em', boxShadow: 'var(--shadow-sm)' }}
          >
            {user ? 'Open portal' : 'Sign in'}
          </Button>
        </div>
  </div>
    </header>
  );
}