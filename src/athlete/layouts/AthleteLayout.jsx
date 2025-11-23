import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import athlete from '../data/athlete.json';
import RootdLogo from '../../assets/branding/rootd-logo.png';

export default function AthleteLayout() {
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
              Main Menu
            </h3>
            <nav className="space-y-1">
              <NavLink
                to="/athlete/overview"
                className={({ isActive }) =>
                  `flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-white text-gray-900'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`
                }
              >
                Overview
              </NavLink>
              <NavLink
                to="/athlete/matches"
                className={({ isActive }) =>
                  `flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-white text-gray-900'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`
                }
              >
                Matches
              </NavLink>
              <NavLink
                to="/athlete/edit-profile"
                className={({ isActive }) =>
                  `flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-white text-gray-900'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`
                }
              >
                Edit Profile
              </NavLink>
            </nav>
          </div>
        </div>

        {/* Profile at bottom */}
        <div className="px-4 py-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-3 py-2.5 bg-white/10 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold text-sm">
              {athlete.firstName[0]}{athlete.lastName[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {athlete.firstName} {athlete.lastName}
              </p>
              <p className="text-xs text-gray-400 truncate">{athlete.sport}</p>
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
                <h1 className="text-lg font-semibold text-gray-900">Athlete Portal</h1>
                <p className="text-sm text-gray-500">{athlete.fullName}</p>
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
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg"
              >
                Get started
              </button>
            </div>
          </div>
        </header>

        {/* Mobile nav */}
        <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3">
          <nav className="flex gap-2">
            <NavLink
              to="/athlete/overview"
              className={({ isActive }) =>
                `flex-1 text-center px-3 py-2 text-sm font-medium rounded-lg ${
                  isActive
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`
              }
            >
              Overview
            </NavLink>
            <NavLink
              to="/athlete/matches"
              className={({ isActive }) =>
                `flex-1 text-center px-3 py-2 text-sm font-medium rounded-lg ${
                  isActive
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`
              }
            >
              Matches
            </NavLink>
            <NavLink
              to="/athlete/edit-profile"
              className={({ isActive }) =>
                `flex-1 text-center px-3 py-2 text-sm font-medium rounded-lg ${
                  isActive
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`
              }
            >
              Edit Profile
            </NavLink>
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
