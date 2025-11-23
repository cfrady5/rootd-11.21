import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock3 } from 'lucide-react';
import InfoRow from '../components/InfoRow.jsx';
import Tag from '../components/Tag.jsx';
import ProfileCompletionBar from '../components/ProfileCompletionBar.jsx';
import athlete from '../data/athlete.json';
import activity from '../data/activity.json';
import completion from '../data/completion.json';

const overviewStats = [
  { label: 'Potential Matches', value: athlete.analytics.potentialMatches, delta: '+2 this week' },
  { label: 'Profile Completion', value: `${athlete.analytics.profileCompletion}%`, delta: 'On track' },
  { label: 'Compliance Docs', value: `${athlete.analytics.complianceDocs} / 4`, delta: '100% filed' },
  { label: 'NIL Value Estimate', value: athlete.analytics.nilEstimate, delta: 'Demo estimate' }
];

const heroHighlights = [
  {
    label: 'Potential matches',
    value: athlete.analytics.potentialMatches,
    detail: 'Up 2 this week'
  },
  {
    label: 'NIL estimate',
    value: athlete.analytics.nilEstimate,
    detail: 'Scenario refreshed'
  },
  {
    label: 'Compliance docs',
    value: `${athlete.analytics.complianceDocs}/4`,
    detail: 'All filings current'
  }
];

const statCardClass = 'rounded-[20px] border border-black/5 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)]';

const identityDetails = [
  { label: 'Full Name', value: athlete.fullName },
  { label: 'Sport', value: athlete.sport },
  { label: 'Year', value: athlete.year },
  { label: 'Email', value: athlete.email },
  { label: 'University', value: athlete.university },
  { label: 'Major', value: athlete.major }
];

const isCompleteStatus = (status = '') => /submitted|signed|completed|complete|approved/i.test(status);

export default function AthleteOverview() {
  return (
    <div className="space-y-10">
      <section className="grid gap-6 xl:grid-cols-[1.35fr,0.65fr]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-[#10160f] via-[#1e2a1a] to-[#4c5f35] p-10 text-white shadow-[0_60px_140px_rgba(10,17,9,0.45)]"
        >
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.5em] text-white/60">Athlete profile</p>
              <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">{athlete.fullName}</h1>
              <p className="mt-3 text-lg text-white/80">
                {athlete.sport} · {athlete.year} · {athlete.university}
              </p>
            </div>
            <div className="min-w-[220px] rounded-3xl border border-white/20 bg-white/10 px-6 py-5 text-right backdrop-blur">
              <p className="text-xs uppercase tracking-[0.4em] text-white/70">Profile completion</p>
              <p className="text-4xl font-semibold">{athlete.analytics.profileCompletion}%</p>
              <p className="text-sm text-white/70">Aligned with onboarding</p>
            </div>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {heroHighlights.map((highlight, i) => (
              <motion.div
                key={highlight.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.35, delay: 0.05 * i }}
                className="rounded-2xl border border-white/15 bg-white/10 px-4 py-5 backdrop-blur"
              >
                <p className="text-xs uppercase tracking-[0.5em] text-white/60">{highlight.label}</p>
                <p className="mt-2 text-2xl font-semibold">{highlight.value}</p>
                <p className="text-sm text-white/75">{highlight.detail}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-10">
            <p className="text-xs uppercase tracking-[0.5em] text-white/60">Focus areas</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {athlete.interests.map((interest) => (
                <span
                  key={interest}
                  className="rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-semibold tracking-wide"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
          <div className="pointer-events-none absolute -bottom-24 -right-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.05 }}
          className="rounded-[32px] border border-black/5 bg-white/95 p-8 shadow-[0_30px_80px_rgba(16,20,12,0.15)]"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-[#717867]">Readiness</p>
            <p className="mt-2 text-2xl font-semibold text-[#1d2616]">Compliance & automations</p>
            <p className="text-sm text-[#5b6652]">Documentation synced across finance, legal, and brand workflows.</p>
          </div>
          <div className="mt-6 rounded-3xl border border-[#e0e6d4] bg-[#f8faf2] p-5">
            <ProfileCompletionBar value={athlete.analytics.profileCompletion} />
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {completion.timeline.map((track) => (
                <div key={track.label} className="rounded-2xl border border-[#e2e7d6] bg-white/70 p-4">
                  <p className="text-xs uppercase tracking-[0.4em] text-[#7c826d]">{track.label}</p>
                  <p className="mt-3 text-3xl font-semibold text-[#1b2116]">{track.value}%</p>
                  <div className="mt-3 h-1.5 rounded-full bg-[#e0e6d1]">
                    <div className="h-full rounded-full bg-[#4c6b38]" style={{ width: `${track.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 space-y-4">
            {completion.complianceDocs.map((doc) => {
              const done = isCompleteStatus(doc.status);
              return (
                <div
                  key={doc.label}
                  className="flex items-center justify-between rounded-2xl border border-[#ecefe0] px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-2xl text-lg ${
                        done ? 'bg-[#e1f5dc] text-[#2b4725]' : 'bg-[#fff4db] text-[#8c5a18]'
                      }`}
                    >
                      {done ? <CheckCircle2 className="h-5 w-5" /> : <Clock3 className="h-5 w-5" />}
                    </span>
                    <div>
                      <p className="text-base font-semibold text-[#1b1f16]">{doc.label}</p>
                      <p className="text-xs uppercase tracking-[0.4em] text-[#8a8f7b]">{doc.status}</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-[#2f4d27]">View</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {overviewStats.map((stat, index) => (
          <motion.article
            key={stat.label}
            className={`${statCardClass} transition-transform duration-300 hover:-translate-y-1`}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.35, delay: 0.04 * index }}
          >
            <p className="text-xs uppercase tracking-[0.25em] text-[#7a7f6d]">{stat.label}</p>
            <p className="mt-3 text-3xl font-semibold text-[#10160f]">{stat.value}</p>
            <p className="text-sm text-[#4d5c44]">{stat.delta}</p>
          </motion.article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.25fr,0.75fr]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="rounded-[32px] border border-black/5 bg-white/95 p-8 shadow-[0_30px_80px_rgba(16,20,12,0.12)] space-y-8"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            {identityDetails.map((detail) => (
              <InfoRow key={detail.label} label={detail.label} value={detail.value} />
            ))}
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-[#8a8f7b] mb-3">Bio</p>
            <p className="rounded-3xl bg-[#f6f7f2] p-6 text-[#313729] leading-relaxed shadow-inner">
              {athlete.bio}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-[#8a8f7b] mb-3">Interests</p>
            <div className="flex flex-wrap gap-3">
              {athlete.interests.map((interest) => (
                <Tag key={interest}>{interest}</Tag>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, ease: 'easeOut', delay: 0.05 }}
          className="rounded-[32px] border border-black/5 bg-white/95 p-8 shadow-[0_30px_80px_rgba(16,20,12,0.12)]"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-[#8a8f7b]">Recent Activity</p>
              <p className="text-2xl font-semibold text-[#1b2116]">Timeline</p>
            </div>
            <span className="text-sm font-semibold text-[#4c6b38]">Live sync</span>
          </div>
          <div className="mt-6 space-y-2">
            {activity.map((item, index) => {
              const isLast = index === activity.length - 1;
              return (
                <motion.div key={item.id} className="flex gap-4" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: 0.03 * index }}>
                  <div className="flex flex-col items-center">
                    <span className="mt-1 h-3 w-3 rounded-full bg-[#4c6b38]" />
                    {!isLast && <span className="w-px flex-1 bg-[#e0e4d3]" />}
                  </div>
                  <div className={`flex-1 pb-6 ${!isLast ? 'border-b border-[#eef0e4]' : ''}`}>
                    <p className="text-base font-semibold text-[#1c2217]">{item.detail}</p>
                    <p className="text-sm text-[#6a715f]">{item.timestamp}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
