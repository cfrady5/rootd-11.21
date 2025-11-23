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
    <nav className="flex flex-col gap-1.5 text-sm">
      {items.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `relative flex items-center gap-3 rounded-2xl px-3.5 py-2.5 font-medium transition-all ${
              isActive
                ? 'bg-white/10 text-white shadow-sm before:absolute before:left-1 before:top-1/2 before:h-6 before:w-0.5 before:-translate-y-1/2 before:rounded-full before:bg-rootd-green'
                : 'text-white/70 hover:bg-white/5 hover:text-white'
            }`
          }
        >
          <Icon size={18} className="shrink-0" />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
