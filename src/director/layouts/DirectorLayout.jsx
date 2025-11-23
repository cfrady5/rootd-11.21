import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import director from '../data/director.json';
import RootdLogo from '../../assets/branding/rootd-logo.png';

const navItems = [
  { to: '/director/dashboard', label: 'Dashboard' },
  { to: '/director/athletes', label: 'Athletes' },
  { to: '/director/deals', label: 'Deals' },
  { to: '/director/compliance', label: 'Compliance' },
  { to: '/director/insights', label: 'Insights' }
];

export default function DirectorLayout() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Dark Sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-[#2b3442]">
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-6 border-b border-white/10">
          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
            <img src={RootdLogo} alt="Rootd" className="w-6 h-6" />
          </div>
          <span className="text-white text-xl font-bold">Rootd</span>
        </div>

        {/* Main Menu */}
        <div className="flex-1 px-4 py-6 space-y-6">
          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Director Portal
            </h3>
            <nav className="space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    \`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors \${
                      isActive
                        ? 'bg-white text-gray-900'
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }\`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>

        {/* Profile at bottom */}
        <div className="px-4 py-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-3 py-2.5 bg-white/10 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
              {director.name?.[0] || 'D'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {director.name || 'Director'}
              </p>
              <p className="text-xs text-gray-400 truncate">NIL Director</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 md:pl-64">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={RootdLogo} alt="Rootd" className="w-8 h-8 md:hidden" />
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Director Portal</h1>
                <p className="text-sm text-gray-500">NIL Operations Center</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/signin')}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Sign in
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
              >
                Get started
              </button>
            </div>
          </div>
        </header>

        {/* Mobile nav */}
        <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3 overflow-x-auto">
          <nav className="flex gap-2 min-w-max">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  \`px-3 py-2 text-sm font-medium rounded-lg whitespace-nowrap \${
                    isActive
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-700'
                  }\`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Page content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
