import React from 'react';
import athlete from '../data/athlete.json';
import { SectionCard, StatCard, InfoRow, Tag, Button } from '../../components/director/PremiumComponents.jsx';

const overviewStats = [
  { label: 'Potential Matches', value: '12', helper: '+2 this week' },
  { label: 'Profile Completion', value: '85%', helper: 'On track' },
  { label: 'Active Deals', value: '3', helper: '2 pending' },
  { label: 'NIL Value', value: '$62K', helper: 'Est. annually' }
];

const identityDetails = [
  { label: 'Full Name', value: athlete.fullName },
  { label: 'Sport', value: athlete.sport },
  { label: 'Year', value: athlete.year },
  { label: 'Email', value: athlete.email },
  { label: 'University', value: athlete.university },
  { label: 'Major', value: athlete.major }
];

export default function AthleteOverview() {
  return (
    <div className="space-y-6 py-2">
      {/* Stats Grid */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {overviewStats.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            helper={stat.helper}
          />
        ))}
      </div>

      {/* Main Content */}
      <SectionCard
        title={athlete.fullName}
        description={`${athlete.sport} · ${athlete.year} · ${athlete.university}`}
      >
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {identityDetails.map((detail) => (
              <InfoRow key={detail.label} label={detail.label} value={detail.value} />
            ))}
          </div>
          
          <div className="pt-6 border-t border-black/5">
            <p className="text-xs uppercase tracking-[0.28em] text-[#9ca3af] mb-3">Bio</p>
            <p className="text-[#313729] leading-relaxed">
              {athlete.bio}
            </p>
          </div>

          <div className="pt-6 border-t border-black/5">
            <p className="text-xs uppercase tracking-[0.28em] text-[#9ca3af] mb-3">Interests</p>
            <div className="flex flex-wrap gap-3">
              {athlete.interests.map((interest) => (
                <Tag key={interest}>{interest}</Tag>
              ))}
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Quick Actions */}
      <SectionCard
        title="Quick actions"
        description="Common tasks and updates"
      >
        <div className="flex flex-wrap gap-3">
          <Button>Update Profile</Button>
          <Button variant="secondary">View Matches</Button>
          <Button variant="secondary">Contact Support</Button>
        </div>
      </SectionCard>
    </div>
  );
}
