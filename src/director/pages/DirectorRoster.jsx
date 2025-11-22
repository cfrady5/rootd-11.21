import React, { useMemo, useState } from 'react';
import FilterBar from '../components/FilterBar.jsx';
import DataTable from '../components/DataTable.jsx';
import PageHeader from '../components/PageHeader.jsx';
import Avatar from '../components/Avatar.jsx';
import Badge from '../components/Badge.jsx';
import athletes from '../data/athletes.json';

const classYears = [...new Set(athletes.map((athlete) => athlete.classYear))];
const sports = [...new Set(athletes.map((athlete) => athlete.sport))];

export default function DirectorRoster() {
  const [search, setSearch] = useState('');
  const [sportFilter, setSportFilter] = useState('All sports');
  const [classFilter, setClassFilter] = useState('All classes');
  const [sortDescending, setSortDescending] = useState(true);

  const filtered = useMemo(() => {
    return athletes
      .filter((athlete) =>
        athlete.name.toLowerCase().includes(search.toLowerCase()) ||
        athlete.email.toLowerCase().includes(search.toLowerCase())
      )
      .filter((athlete) => (sportFilter === 'All sports' ? true : athlete.sport === sportFilter))
      .filter((athlete) => (classFilter === 'All classes' ? true : athlete.classYear === classFilter))
      .sort((a, b) =>
        sortDescending ? b.profileCompletion - a.profileCompletion : a.profileCompletion - b.profileCompletion
      );
  }, [search, sportFilter, classFilter, sortDescending]);

  const columns = [
    {
      header: 'Athlete',
      accessor: 'name',
      render: (row) => <Avatar name={row.name} email={row.email} src={row.avatar} />
    },
    { header: 'Sport', accessor: 'sport' },
    { header: 'Class Year', accessor: 'classYear' },
    {
      header: 'Profile Completion',
      accessor: 'profileCompletion',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-28 h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-rootd-green" style={{ width: `${row.profileCompletion}%` }} />
          </div>
          <span className="text-white/70">{row.profileCompletion}%</span>
        </div>
      )
    },
    { header: 'Deals', accessor: 'dealsCount' },
    {
      header: 'Revenue',
      accessor: 'revenue',
      render: (row) => `$${row.revenue.toLocaleString()}`
    },
    {
      header: 'Compliance',
      accessor: 'complianceStatus',
      render: (row) => <Badge tone={row.complianceStatus === 'Clear' ? 'clear' : row.complianceStatus === 'Pending' ? 'pending' : 'review'}>{row.complianceStatus}</Badge>
    },
    {
      header: 'Actions',
      accessor: 'actions',
      render: () => (
        <button className="text-sm font-semibold text-rootd-green hover:text-white">Open Profile</button>
      )
    }
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Roster"
        title="Athlete intelligence"
        description="Search, filter, and triage the entire athletic department’s NIL readiness in seconds."
      />

      <FilterBar searchPlaceholder="Search athletes" onSearchChange={setSearch}>
        <select
          value={sportFilter}
          onChange={(event) => setSportFilter(event.target.value)}
          className="bg-white/5 border border-white/10 rounded-2xl px-4 py-2 focus:outline-none"
        >
          <option>All sports</option>
          {sports.map((sport) => (
            <option key={sport}>{sport}</option>
          ))}
        </select>
        <select
          value={classFilter}
          onChange={(event) => setClassFilter(event.target.value)}
          className="bg-white/5 border border-white/10 rounded-2xl px-4 py-2 focus:outline-none"
        >
          <option>All classes</option>
          {classYears.map((year) => (
            <option key={year}>{year}</option>
          ))}
        </select>
        <button
          onClick={() => setSortDescending((prev) => !prev)}
          className="px-4 py-2 rounded-2xl border border-white/20 bg-white/5"
        >
          Profile {sortDescending ? 'High → Low' : 'Low → High'}
        </button>
      </FilterBar>

      <DataTable columns={columns} data={filtered} />
    </div>
  );
}
