import React from 'react';
import StatCard from '../components/StatCard.jsx';
import DataTable from '../components/DataTable.jsx';
import NotificationItem from '../components/NotificationItem.jsx';
import PageHeader from '../components/PageHeader.jsx';
import Avatar from '../components/Avatar.jsx';
import insights from '../data/insights.json';
import stats from '../data/stats.json';
import athletes from '../data/athletes.json';
import notifications from '../data/notifications.json';

const rosterPreview = athletes.slice(0, 4);

export default function DirectorDashboard() {
  const rosterColumns = [
    {
      header: 'Athlete',
      accessor: 'name',
      render: (row) => <Avatar name={row.name} email={row.email} src={row.avatar} />
    },
    { header: 'Sport', accessor: 'sport' },
    { header: 'Class', accessor: 'classYear' },
    {
      header: 'Profile',
      accessor: 'profileCompletion',
      render: (row) => (
        <div className="flex items-center gap-2">
          <div className="w-24 h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-rootd-green" style={{ width: `${row.profileCompletion}%` }} />
          </div>
          <span>{row.profileCompletion}%</span>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Director View"
        title={`${stats.university.name}`}
        description="Stanford’s NIL cockpit keeps athletes, deals, compliance, and insights in one command surface."
        actions={
          <button className="px-4 py-2 rounded-2xl bg-white/10 border border-white/30 text-sm font-medium hover:bg-white/20">
            Export Snapshot
          </button>
        }
      />

      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/0 p-8 flex flex-wrap gap-6 items-center">
        <img src={stats.university.logo} alt="Stanford" className="w-20 h-20 object-contain" />
        <div>
          <p className="text-sm uppercase tracking-[0.5em] text-white/50">Stanford Cardinal NIL</p>
          <p className="text-4xl font-semibold mt-2">Director Intelligence Hub</p>
          <p className="text-white/70 mt-3 max-w-2xl">
            Monitor deal flow, compliance posture, and athlete readiness in a single, responsive view.
          </p>
        </div>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.metrics.map((metric) => (
          <StatCard key={metric.label} label={metric.label} value={metric.value} delta={metric.delta} />
        ))}
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-6">
          <h2 className="text-xl font-semibold text-white">Athlete Roster Preview</h2>
          <DataTable columns={rosterColumns} data={rosterPreview} />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Notifications</h2>
          <div className="space-y-3">
            {notifications.map((note) => (
              <NotificationItem key={note.id} {...note} />
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-8">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-white/50">Business Insights</p>
              <p className="text-2xl font-semibold text-white">Category Momentum</p>
            </div>
            <span className="text-3xl font-semibold text-rootd-green">{insights.businessPulse.activePartners}</span>
          </div>
          <div className="space-y-4">
            {insights.categories.map((category) => (
              <div key={category.label} className="flex items-center gap-4">
                <div className="flex-1">
                  <p className="text-white font-medium">{category.label}</p>
                  <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden mt-2">
                    <div className="h-full bg-rootd-green" style={{ width: `${category.count * 4}%` }} />
                  </div>
                </div>
                <span className="text-white/70">{category.count}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-transparent p-6 space-y-4">
          <p className="text-sm uppercase tracking-[0.4em] text-white/50">Pulse</p>
          <div>
            <p className="text-white/60 text-sm">Average turnaround</p>
            <p className="text-3xl font-semibold">{insights.businessPulse.avgTurnaround}</p>
          </div>
          <div>
            <p className="text-white/60 text-sm">Renewal rate</p>
            <p className="text-3xl font-semibold">{insights.businessPulse.renewalRate}%</p>
            <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden mt-2">
              <div className="h-full bg-rootd-green" style={{ width: `${insights.businessPulse.renewalRate}%` }} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
