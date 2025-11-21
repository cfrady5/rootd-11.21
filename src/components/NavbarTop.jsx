import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import RootdLogo from '../assets/branding/rootd-logo.png';

const DEFAULT_ITEMS = [
  { key: 'dashboard', label: 'Dashboard', to: '/dashboard' },
  { key: 'matches', label: 'Matches', to: '/matches' },
  { key: 'deals', label: 'Deals', to: '/deals' },
  { key: 'compliance', label: 'Compliance', to: '/compliance' }
];

export default function NavbarTop({ navItems = DEFAULT_ITEMS, activeKey = 'matches' }) {
  const navigate = useNavigate();

  return (
    <div className="rounded-3xl border border-slate-100 bg-white/95 px-4 py-4 shadow-rootd sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          className="flex items-center gap-3"
          onClick={() => navigate('/dashboard')}
          aria-label="Go to dashboard"
        >
          <img src={RootdLogo} alt="Rootd" className="h-8 w-auto" />
          <div className="text-left">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Rootd</p>
            <p className="font-display text-base font-semibold text-slate-900">NIL OS</p>
          </div>
        </button>

        <nav className="flex flex-1 flex-wrap items-center justify-end gap-4 sm:gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.key}
              to={item.to}
              className={({ isActive }) =>
                `relative px-1 text-sm font-semibold transition-colors ${
                  isActive || item.key === activeKey ? 'text-rootd-pine' : 'text-slate-500 hover:text-rootd-pine'
                }`
              }
            >
              {item.label}
              <span
                className={`absolute inset-x-0 -bottom-1 h-0.5 rounded-full transition-opacity ${
                  item.key === activeKey ? 'bg-rootd-pine opacity-100' : 'opacity-0'
                }`}
              />
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}
