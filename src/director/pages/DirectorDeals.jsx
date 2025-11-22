import React, { useMemo, useState } from 'react';
import FilterBar from '../components/FilterBar.jsx';
import DataTable from '../components/DataTable.jsx';
import PageHeader from '../components/PageHeader.jsx';
import Badge from '../components/Badge.jsx';
import deals from '../data/deals.json';

const statuses = [...new Set(deals.map((deal) => deal.status))];
const types = [...new Set(deals.map((deal) => deal.type))];

export default function DirectorDeals() {
  const [typeFilter, setTypeFilter] = useState('All types');
  const [statusFilter, setStatusFilter] = useState('All statuses');
  const [valueCap, setValueCap] = useState(100000);

  const filtered = useMemo(() => {
    return deals
      .filter((deal) => (typeFilter === 'All types' ? true : deal.type === typeFilter))
      .filter((deal) => (statusFilter === 'All statuses' ? true : deal.status === statusFilter))
      .filter((deal) => deal.value <= valueCap);
  }, [typeFilter, statusFilter, valueCap]);

  const columns = [
    { header: 'Athlete', accessor: 'athlete' },
    { header: 'Business', accessor: 'business' },
    { header: 'Deal Type', accessor: 'type' },
    {
      header: 'Value',
      accessor: 'value',
      render: (row) => `$${row.value.toLocaleString()}`
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => (
        <Badge tone={row.status === 'Active' ? 'clear' : row.status === 'Pending' ? 'pending' : 'review'}>
          {row.status}
        </Badge>
      )
    },
    {
      header: 'Compliance Docs',
      accessor: 'complianceDocs',
      render: (row) => (
        <div className="flex flex-wrap gap-2">
          {row.complianceDocs.length > 0 ? (
            row.complianceDocs.map((doc) => (
              <span key={doc} className="px-2 py-1 rounded-full bg-white/10 text-xs">{doc}</span>
            ))
          ) : (
            <span className="text-white/50 text-xs">Missing</span>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Deals"
        title="Active engagements"
        description="Surface every agreement, status, and outstanding document in under a second."
      />

      <FilterBar>
        <select
          value={typeFilter}
          onChange={(event) => setTypeFilter(event.target.value)}
          className="bg-white/5 border border-white/10 rounded-2xl px-4 py-2 focus:outline-none"
        >
          <option>All types</option>
          {types.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          className="bg-white/5 border border-white/10 rounded-2xl px-4 py-2 focus:outline-none"
        >
          <option>All statuses</option>
          {statuses.map((status) => (
            <option key={status}>{status}</option>
          ))}
        </select>
        <div className="flex items-center gap-3">
          <label className="text-xs uppercase tracking-widest text-white/50">Value ≤ ${valueCap.toLocaleString()}</label>
          <input
            type="range"
            min="20000"
            max="120000"
            step="5000"
            value={valueCap}
            onChange={(event) => setValueCap(Number(event.target.value))}
            className="w-48 accent-rootd-green"
          />
        </div>
      </FilterBar>

      <DataTable columns={columns} data={filtered} />
    </div>
  );
}
