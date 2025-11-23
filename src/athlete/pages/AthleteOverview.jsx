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

const statCardClass = 'rounded-[20px] border border-black/5 bg-white p-6 shadow-sm';

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
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="relative overflow-hidden rounded-[32px] border border-black/5 bg-white/95 p-8 text-[#111827] shadow-md"
        >
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#9ca3af]">Athlete profile</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{athlete.fullName}</h1>
              <p className="mt-2 text-sm text-[#6b7280]">
                {athlete.sport} · {athlete.year} · {athlete.university}
              </p>
            </div>
            <div className="min-w-[240px] rounded-3xl border border-black/5 bg-[#f9fafb] px-6 py-5 text-right shadow-sm">
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#9ca3af]">Profile completion</p>
              <p className="mt-1 text-4xl font-semibold text-[#111827]">{athlete.analytics.profileCompletion}%</p>
              <p className="text-sm text-[#6b7280]">Aligned with onboarding</p>
            </div>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {heroHighlights.map((highlight, i) => (
              <motion.div
                key={highlight.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.35, delay: 0.05 * i }}
                className="rounded-2xl border border-black/5 bg-[#f9fafb] px-4 py-4"
              >
                <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#9ca3af]">{highlight.label}</p>
                <p className="mt-2 text-2xl font-semibold text-[#111827]">{highlight.value}</p>
                <p className="text-sm text-[#6b7280]">{highlight.detail}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-10">
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#9ca3af]">Focus areas</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {athlete.interests.map((interest) => (
                <span
                  key={interest}
                  className="rounded-full border border-black/5 bg-white px-4 py-1.5 text-sm font-medium tracking-wide text-[#111827] shadow-xs"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.05 }}
          className="rounded-[32px] border border-black/5 bg-white/95 p-8 shadow-md"
        >
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#9ca3af]">Readiness</p>
            <p className="mt-2 text-2xl font-semibold text-[#111827]">Compliance & automations</p>
            <p className="text-sm text-[#6b7280]">Documentation synced across finance, legal, and brand workflows.</p>
          </div>
          <div className="mt-6 rounded-3xl border border-[#e5e7eb] bg-[#f9fafb] p-5">
            <ProfileCompletionBar value={athlete.analytics.profileCompletion} />
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {completion.timeline.map((track) => (
                <div key={track.label} className="rounded-2xl border border-[#e5e7eb] bg-white p-4 shadow-xs">
                  <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#9ca3af]">{track.label}</p>
                  <p className="mt-3 text-3xl font-semibold text-[#111827]">{track.value}%</p>
                  <div className="mt-3 h-1.5 rounded-full bg-[#e5e7eb]">
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
                  className="flex items-center justify-between rounded-2xl border border-[#e5e7eb] bg-white px-4 py-3 shadow-xs"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-2xl text-lg ${
                        done ? 'bg-[#dcfce7] text-[#166534]' : 'bg-[#fef9c3] text-[#854d0e]'
                      }`}
                    >
                      {done ? <CheckCircle2 className="h-5 w-5" /> : <Clock3 className="h-5 w-5" />}
                    </span>
                    <div>
                      <p className="text-base font-semibold text-[#111827]">{doc.label}</p>
                      <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#9ca3af]">{doc.status}</p>
                    </div>
                  </div>
                  <button className="text-sm font-semibold text-[#4c6b38]">View</button>
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
          className="space-y-8 rounded-[32px] border border-black/5 bg-white/95 p-8 shadow-md"
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
          className="rounded-[32px] border border-black/5 bg-white/95 p-8 shadow-md"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#9ca3af]">Recent activity</p>
              <p className="text-2xl font-semibold text-[#111827]">Timeline</p>
            </div>
            <span className="text-sm font-medium text-[#4c6b38]">Live sync</span>
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
