import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Download } from 'lucide-react';
import DataTable from '../components/DataTable.jsx';
import NotificationItem from '../components/NotificationItem.jsx';
import Avatar from '../components/Avatar.jsx';
import insights from '../data/insights.json';
import stats from '../data/stats.json';
import athletes from '../data/athletes.json';
import notifications from '../data/notifications.json';

const rosterPreview = athletes.slice(0, 4);

const statTileClass = 'rounded-[24px] border border-white/10 bg-white/5 p-6 shadow-[0_25px_80px_rgba(2,3,4,0.35)]';

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
          <div className="h-1.5 w-24 overflow-hidden rounded-full bg-white/10">
            <div className="h-full bg-rootd-green" style={{ width: `${row.profileCompletion}%` }} />
          </div>
          <span className="text-white/70">{row.profileCompletion}%</span>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-10">
      <section className="grid gap-6 xl:grid-cols-[1.3fr,0.7fr]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-br from-[#101217] via-[#141f1d] to-[#2c4030] p-10 shadow-[0_70px_140px_rgba(0,0,0,0.55)]"
        >
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.5em] text-white/60">{stats.university.tagline}</p>
              <h1 className="mt-3 text-4xl sm:text-5xl font-semibold tracking-tight text-white">Director Intelligence</h1>
              <p className="mt-4 max-w-2xl text-base text-white/70">
                Orchestrate athletes, deals, and compliance from a single calm surface with realtime health indicators
                built for NIL leaders.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <button className="inline-flex items-center gap-2 rounded-3xl bg-rootd-green px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#86b46b]">
                  Launch workflow
                  <ArrowUpRight className="h-4 w-4" />
                </button>
                <button className="inline-flex items-center gap-2 rounded-3xl border border-white/30 bg-white/5 px-5 py-3 text-sm font-semibold text-white/80">
                  <Download className="h-4 w-4" />
                  Export snapshot
                </button>
              </div>
            </div>
            <div className="min-w-[220px] rounded-[28px] border border-white/20 bg-white/5 px-5 py-4 text-right backdrop-blur">
              <p className="text-xs uppercase tracking-[0.4em] text-white/60">Active deals</p>
              <p className="text-4xl font-semibold text-white">{stats.metrics[1].value}</p>
              <p className="text-sm text-white/70">{stats.metrics[1].delta}</p>
            </div>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            <motion.div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white/80" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3 }}>
              <p className="text-xs uppercase tracking-[0.5em] text-white/60">Partners</p>
              <p className="mt-2 text-3xl font-semibold text-white">{insights.businessPulse.activePartners}</p>
              <p className="text-sm">Active strategic partners</p>
            </motion.div>
            <motion.div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white/80" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: 0.05 }}>
              <p className="text-xs uppercase tracking-[0.5em] text-white/60">Turnaround</p>
              <p className="mt-2 text-3xl font-semibold text-white">{insights.businessPulse.avgTurnaround}</p>
              <p className="text-sm">Avg contracting cycle</p>
            </motion.div>
            <motion.div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white/80" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: 0.1 }}>
              <p className="text-xs uppercase tracking-[0.5em] text-white/60">Renewals</p>
              <p className="mt-2 text-3xl font-semibold text-white">{insights.businessPulse.renewalRate}%</p>
              <p className="text-sm">12-mo renewal rate</p>
            </motion.div>
          </div>
          <div className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, ease: 'easeOut', delay: 0.05 }}
          className="rounded-[32px] border border-white/10 bg-gradient-to-b from-white/10 to-transparent p-8 shadow-[0_40px_120px_rgba(3,5,6,0.65)]"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-white/60">Signal stack</p>
          <div className="mt-6 space-y-5">
            {stats.metrics.map((metric, index) => (
              <div key={metric.label} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-white">{metric.label}</p>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/50">{metric.delta}</p>
                </div>
                <p className="text-2xl font-semibold text-white">{metric.value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {stats.metrics.map((metric, index) => (
          <motion.article
            key={`${metric.label}-tile`}
            className={`${statTileClass} transition-transform duration-300 hover:-translate-y-1`}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.35, delay: 0.04 * index }}
          >
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">{metric.label}</p>
            <div className="mt-3 flex items-end justify-between">
              <p className="text-4xl font-semibold text-white">{metric.value}</p>
              <span className="text-sm text-rootd-green">{metric.delta}</span>
            </div>
          </motion.article>
        ))}
      </section>

      <section className="grid gap-8 xl:grid-cols-[1.5fr,0.5fr]">
  <motion.div className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-[0_25px_80px_rgba(2,3,5,0.45)]" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.45 }}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-white/50">Roster readiness</p>
              <p className="text-2xl font-semibold text-white">Athlete cockpit</p>
            </div>
            <button className="rounded-2xl border border-white/20 px-4 py-2 text-sm font-semibold text-white/80">
              View full roster
            </button>
          </div>
          <div className="mt-6">
            <DataTable columns={rosterColumns} data={rosterPreview} />
          </div>
        </motion.div>
        <motion.div className="rounded-[32px] border border-white/10 bg-gradient-to-b from-white/10 to-transparent p-6 shadow-[0_25px_80px_rgba(2,3,5,0.45)]" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.45, delay: 0.05 }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-white/50">Notifications</p>
              <p className="text-2xl font-semibold text-white">Signal feed</p>
            </div>
            <span className="text-sm text-white/60">Live</span>
          </div>
          <div className="mt-5 space-y-3">
            {notifications.map((note) => (
              <NotificationItem key={note.id} {...note} />
            ))}
          </div>
        </motion.div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.6fr,0.8fr]">
  <motion.div className="rounded-[32px] border border-white/10 bg-white/5 p-6" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.45 }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-white/50">Category momentum</p>
              <p className="text-2xl font-semibold text-white">Business intelligence</p>
            </div>
            <span className="text-3xl font-semibold text-rootd-green">{insights.businessPulse.activePartners}</span>
          </div>
          <div className="mt-6 space-y-4">
            {insights.categories.map((category) => (
              <div key={category.label} className="flex items-center gap-4">
                <div className="flex-1">
                  <p className="text-white font-semibold">{category.label}</p>
                  <div className="mt-2 h-2 rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-rootd-green" style={{ width: `${category.count * 4}%` }} />
                  </div>
                </div>
                <span className="text-white/70">{category.count}</span>
              </div>
            ))}
          </div>
  </motion.div>
  <motion.div className="rounded-[32px] border border-white/10 bg-gradient-to-b from-white/15 to-transparent p-6 space-y-6" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.45, delay: 0.05 }}>
          <p className="text-xs uppercase tracking-[0.4em] text-white/60">Pulse</p>
          <div>
            <p className="text-white/60 text-sm">Average turnaround</p>
            <p className="text-3xl font-semibold text-white">{insights.businessPulse.avgTurnaround}</p>
          </div>
          <div>
            <p className="text-white/60 text-sm">Renewal rate</p>
            <p className="text-3xl font-semibold text-white">{insights.businessPulse.renewalRate}%</p>
            <div className="mt-3 h-2 rounded-full bg-white/10">
              <div className="h-full rounded-full bg-rootd-green" style={{ width: `${insights.businessPulse.renewalRate}%` }} />
            </div>
          </div>
          <div>
            <p className="text-white/60 text-sm">Deal queue</p>
            <p className="text-3xl font-semibold text-white">{stats.metrics[2].value}</p>
            <p className="text-sm text-rootd-green">{stats.metrics[2].delta}</p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
