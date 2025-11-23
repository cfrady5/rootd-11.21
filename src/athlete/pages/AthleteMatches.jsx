import React, { useState } from 'react';
import matches from '../data/matches.json';
import {
  SectionCard,
  DataTable,
  Button,
  Badge
} from '../../components/director/PremiumComponents.jsx';

export default function AthleteMatches() {
  const [sortDesc, setSortDesc] = useState(true);

  const sortedMatches = [...matches].sort((a, b) => 
    sortDesc ? b.score - a.score : a.score - b.score
  );

  const columns = [
    { 
      key: 'business', 
      label: 'Business',
      render: (row) => (
        <div>
          <p className="font-semibold text-[#111827]">{row.business}</p>
          <p className="text-xs text-[#6b7280]">{row.distance}</p>
        </div>
      )
    },
    {
      key: 'category',
      label: 'Category',
      render: (row) => <Badge>{row.category}</Badge>
    },
    { 
      key: 'value', 
      label: 'Est. Value',
      render: (row) => (
        <span className="font-semibold text-[#111827]">{row.value}</span>
      )
    },
    {
      key: 'score',
      label: 'Match Score',
      render: (row) => (
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#4c6b38] rounded-full"
              style={{ width: `${row.score}%` }}
            />
          </div>
          <span className="text-sm font-semibold text-[#111827] w-10">{row.score}%</span>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6 py-2">
      <SectionCard
        title="Potential matches"
        description="Smart recommendations based on your profile and preferences."
      >
        <div className="mb-6 flex justify-between items-center">
          <p className="text-sm text-[#6b7280]">
            {matches.length} potential brand partnerships
          </p>
          <Button
            variant="secondary"
            onClick={() => setSortDesc((prev) => !prev)}
          >
            {sortDesc ? 'Highest Match First' : 'Lowest Match First'}
          </Button>
        </div>

        <DataTable
          columns={columns}
          data={sortedMatches}
        />
      </SectionCard>
    </div>
  );
}
