import React from 'react';
import Card from '../components/Card.jsx';
import StatCard from '../components/StatCard.jsx';
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

export default function AthleteOverview() {
  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Profile Summary" subtitle="Snapshot" className="bg-gradient-to-br from-white to-[#f9f9f7]">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <InfoRow label="Sport" value={athlete.summary.sport} />
            <InfoRow label="Year" value={athlete.summary.year} />
            <InfoRow label="School" value={athlete.summary.school} />
          </div>
        </Card>
        <Card title="Analytics & Compliance" subtitle="Live" className="bg-white">
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#9b9b9b]">Potential matches</p>
                <p className="text-3xl font-semibold text-[#0f0f0f]">{athlete.analytics.potentialMatches}</p>
              </div>
              <ProfileCompletionBar value={athlete.analytics.profileCompletion} />
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#9b9b9b]">Compliance docs</p>
                <p className="text-3xl font-semibold text-[#0f0f0f]">{athlete.analytics.complianceDocs}/4</p>
                <p className="text-sm text-[#6a6a6a] mt-1">All filings current</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-[#5c5c5c]">
              {completion.complianceDocs.map((doc) => (
                <span key={doc.label} className="px-3 py-1 rounded-full bg-rootd-green/10 text-[#1d1d1d]">
                  {doc.label} · {doc.status}
                </span>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <section className="grid gap-6 lg:grid-cols-4">
        {overviewStats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.4fr,1fr]">
        <Card title="My Details" subtitle="Identity">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <InfoRow label="Full Name" value={athlete.fullName} />
            <InfoRow label="Sport" value={athlete.sport} />
            <InfoRow label="Year" value={athlete.year} />
            <InfoRow label="Email" value={athlete.email} />
            <InfoRow label="University" value={athlete.university} />
            <InfoRow label="Major" value={athlete.major} />
          </div>
          <div className="mt-8">
            <p className="text-xs uppercase tracking-[0.3em] text-[#9a9a9a] mb-3">Interests</p>
            <div className="flex flex-wrap gap-3">
              {athlete.interests.map((interest) => (
                <Tag key={interest}>{interest}</Tag>
              ))}
            </div>
          </div>
          <div className="mt-8">
            <p className="text-xs uppercase tracking-[0.3em] text-[#9a9a9a] mb-3">Bio</p>
            <p className="text-[#3c3c3c] leading-7">{athlete.bio}</p>
          </div>
        </Card>
        <Card title="Recent Activity" subtitle="Timeline">
          <ul className="space-y-4">
            {activity.map((item) => (
              <li key={item.id} className="flex justify-between gap-4">
                <div>
                  <p className="text-base text-[#1f1f1f] font-medium">{item.detail}</p>
                  <p className="text-sm text-[#6b6b6b]">{item.timestamp}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </section>
    </div>
  );
}
