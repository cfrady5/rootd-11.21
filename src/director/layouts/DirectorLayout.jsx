import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import SidebarNav from '../components/SidebarNav.jsx';
import LayoutWrapper from '../components/LayoutWrapper.jsx';

const topNav = [
  { label: 'Home', to: '/' },
  { label: 'Demo', to: '/demo' },
  { label: 'Dashboard', to: '/dashboard/overview' },
  { label: 'About', to: '/about' }
];

export default function DirectorLayout() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="sticky top-0 z-40 backdrop-blur border-b border-white/10 bg-[#050505]/90">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rootd-green/30 border border-rootd-green/40 flex items-center justify-center text-white font-semibold">
              R
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-white/60">Rootd NIL</p>
              <div className="flex items-center gap-3">
                <p className="font-semibold text-lg tracking-tight">Director Portal</p>
                <span className="hidden md:inline-flex items-center rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">Demo</span>
              </div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {topNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className="text-white/70 hover:text-white transition-colors tracking-wide"
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <button className="px-4 py-2 rounded-2xl border border-white/20 bg-white/5 text-sm font-medium text-white/80">
            Contact Team
          </button>
        </div>
        
      </header>

      <div className="max-w-screen-xl mx-auto w-full px-6 lg:px-10 py-10 flex gap-8">
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-28 space-y-8">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-white/40 mb-3">Navigation</p>
              <SidebarNav />
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
              <p className="font-semibold text-white mb-2">Need a live tour?</p>
              <p className="text-white/60 mb-3">We’ll tailor a session around your NIL operating model.</p>
              <button className="w-full rounded-2xl bg-rootd-green/80 hover:bg-rootd-green text-sm font-semibold py-2">
                Schedule Call
              </button>
            </div>
          </div>
        </aside>

        <main className="flex-1 space-y-8">
          <div className="lg:hidden -mt-4">
            <p className="text-xs uppercase tracking-[0.4em] text-white/40 mb-3">Navigation</p>
            <SidebarNav />
          </div>
          <LayoutWrapper>
            <Outlet />
          </LayoutWrapper>
        </main>
      </div>
    </div>
  );
}
