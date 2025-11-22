import React from 'react';

export default function DataTable({ columns, data, stickyHeader = true }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/5 text-sm text-white/80">
          <thead className={stickyHeader ? 'bg-white/5 backdrop-blur sticky top-0 z-10' : 'bg-white/5'}>
            <tr>
              {columns.map((column) => (
                <th key={column.accessor} className="px-5 py-4 text-left font-semibold uppercase tracking-wide text-xs text-white/60">
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {data.map((row, rowIndex) => (
              <tr key={row.id || rowIndex} className="hover:bg-white/5 transition-colors">
                {columns.map((column) => (
                  <td key={column.accessor} className="px-5 py-4 whitespace-nowrap">
                    {column.render ? column.render(row) : row[column.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
