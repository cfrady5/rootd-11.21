import React, { useMemo, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Tabs from '../components/Tabs.jsx';
import LayoutWrapper from '../components/LayoutWrapper.jsx';
import athlete from '../data/athlete.json';

const secondaryNav = [
  { key: 'overview', label: 'Overview', path: '/athlete/overview' },
  { key: 'matches', label: 'My Matches', path: '/athlete/matches' },
  { key: 'edit', label: 'Edit Profile', path: '/athlete/edit-profile' }
];

export default function AthleteLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [primaryActive, setPrimaryActive] = useState('athlete');

  const activeSecondary = useMemo(() => {
    const found = secondaryNav.find((item) => location.pathname.includes(item.path));
    return found?.key ?? 'overview';
  }, [location.pathname]);

  const handlePrimaryChange = (key) => {
    if (key === 'director') {
      navigate('/director/dashboard');
      return;
    }
    setPrimaryActive(key);
  };

  const handleSecondaryChange = (key) => {
    const target = secondaryNav.find((item) => item.key === key);
    if (target) {
      navigate(target.path);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f4f1] text-[#141414]">
      <div className="sticky top-0 z-40 border-b border-black/5 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-screen-xl flex-col gap-5 px-4 py-5 sm:px-6 lg:px-0">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#9ca3af]">Athlete portal</p>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Profile & matches</h1>
                <span className="hidden items-center rounded-full border border-black/5 bg-black/5 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6b7280] sm:inline-flex">
                  Demo
                </span>
              </div>
              <p className="text-sm text-[#6b7280]">{athlete.fullName} · {athlete.sport} · {athlete.year}</p>
            </div>
            <Tabs
              items={[
                { key: 'athlete', label: 'Athlete', subtle: true },
                { key: 'director', label: 'Director', subtle: true },
                { key: 'stanford', label: athlete.university, subtle: true }
              ]}
              activeKey={primaryActive}
              onChange={handlePrimaryChange}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-baseline gap-2 text-sm text-[#6b7280]">
              <span className="font-medium text-[#111827]">Overview</span>
              <span className="hidden text-[#9ca3af] sm:inline">·</span>
              <span className="hidden text-[#6b7280] sm:inline">See your NIL readiness, matches, and profile in one view.</span>
            </div>
            <div className="w-full max-w-md rounded-full bg-black/5 p-1 text-sm sm:w-auto">
              <Tabs items={secondaryNav} activeKey={activeSecondary} onChange={handleSecondaryChange} variant="segmented" />
            </div>
          </div>
        </div>
      </div>

      <LayoutWrapper>
        <Outlet />
      </LayoutWrapper>
    </div>
  );
}
