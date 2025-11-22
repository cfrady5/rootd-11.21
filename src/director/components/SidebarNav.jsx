import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users2, Handshake, ShieldCheck, UserCog } from 'lucide-react';

const items = [
  { to: '/director/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/director/roster', label: 'Roster', icon: Users2 },
  { to: '/director/deals', label: 'Deals', icon: Handshake },
  { to: '/director/compliance', label: 'Compliance', icon: ShieldCheck },
  { to: '/director/profile', label: 'Profile', icon: UserCog }
];

export default function SidebarNav() {
  return (
    <nav className="flex flex-col gap-2 text-sm">
      {items.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition-all ${
              isActive
                ? 'bg-rootd-green/20 text-white border border-rootd-green/50 shadow-rootd-soft'
                : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
            }`
          }
        >
          <Icon size={18} />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
