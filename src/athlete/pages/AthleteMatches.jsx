import React, { useMemo, useState } from 'react';
import Card from '../components/Card.jsx';
import FilterBar from '../components/FilterBar.jsx';
import DataTable from '../components/DataTable.jsx';
import Badge from '../components/Badge.jsx';
import matches from '../data/matches.json';

const categories = ['All categories', ...new Set(matches.map((match) => match.category))];
const distances = ['Any distance', ...new Set(matches.map((match) => match.distance))];

export default function AthleteMatches() {
  const [category, setCategory] = useState('All categories');
  const [distance, setDistance] = useState('Any distance');
  const [sortDesc, setSortDesc] = useState(true);

  const filteredMatches = useMemo(() => {
    const dataset = matches
      .filter((match) => (category === 'All categories' ? true : match.category === category))
      .filter((match) => (distance === 'Any distance' ? true : match.distance === distance))
      .sort((a, b) => (sortDesc ? b.score - a.score : a.score - b.score));
    return dataset;
  }, [category, distance, sortDesc]);

  const columns = [
    { header: 'Business', accessor: 'business' },
    {
      header: 'Category',
      accessor: 'category',
      render: (row) => <Badge>{row.category}</Badge>
    },
    { header: 'Distance', accessor: 'distance' },
    { header: 'Estimated Value', accessor: 'value' },
    {
      header: 'Match Score',
      accessor: 'score',
      render: (row) => (
        <span className="px-3 py-1 rounded-full bg-rootd-green/15 text-[#141414] font-semibold">{row.score}</span>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <Card title="Potential Matches" subtitle="Smart recommendations" actions={<span className="text-sm text-[#6b6b6b]">{filteredMatches.length} results</span>}>
        <div className="space-y-6">
          <FilterBar>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="px-4 py-2 rounded-2xl border border-black/10 text-sm"
            >
              {categories.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <select
              value={distance}
              onChange={(event) => setDistance(event.target.value)}
              className="px-4 py-2 rounded-2xl border border-black/10 text-sm"
            >
              {distances.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <button
              onClick={() => setSortDesc((prev) => !prev)}
              className="px-4 py-2 rounded-2xl border border-black/10 text-sm"
            >
              Match score {sortDesc ? 'High → Low' : 'Low → High'}
            </button>
          </FilterBar>

          <DataTable
            columns={columns}
            data={filteredMatches}
            renderActions={(row) => (
              <div className="flex gap-2">
                <button className="px-4 py-2 rounded-2xl border border-black/10 text-sm font-medium">
                  View
                </button>
                <button className="px-4 py-2 rounded-2xl bg-rootd-green/80 text-white text-sm font-semibold">
                  Learn more
                </button>
              </div>
            )}
          />
        </div>
      </Card>
    </div>
  );
}
