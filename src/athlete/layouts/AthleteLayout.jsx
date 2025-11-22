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
      <div className="border-b border-black/5 bg-white/90 backdrop-blur sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-0 py-6 flex flex-col gap-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-[#a0a0a0]">Rootd NIL</p>
              <h1 className="text-2xl font-semibold tracking-tight">Athlete Experience</h1>
            </div>
            <Tabs
              items={[
                { key: 'athlete', label: 'Athlete Profile' },
                { key: 'director', label: 'Director Portal' },
                { key: 'stanford', label: athlete.university }
              ]}
              activeKey={primaryActive}
              onChange={handlePrimaryChange}
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-[#707070]">{athlete.fullName}</p>
              <p className="text-lg font-semibold">{athlete.sport} · {athlete.year}</p>
            </div>
            <Tabs items={secondaryNav} activeKey={activeSecondary} onChange={handleSecondaryChange} />
          </div>
        </div>
        <div className="bg-rootd-green/10 border-t border-black/5 text-center text-xs tracking-[0.4em] uppercase text-[#4f4f4f] py-2">
          You are in Demo Mode. All data is for illustrative purposes only.
        </div>
      </div>

      <LayoutWrapper>
        <Outlet />
      </LayoutWrapper>
    </div>
  );
}
