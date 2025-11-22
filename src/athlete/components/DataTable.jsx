import React from 'react';

export default function DataTable({ columns, data, renderActions }) {
  return (
    <div className="rounded-3xl border border-black/5 overflow-hidden bg-white shadow-[0_30px_65px_rgba(0,0,0,0.08)]">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm text-[#1c1c1c]">
          <thead className="bg-[#f9f9f7] text-xs uppercase tracking-[0.3em] text-[#8c8c8c]">
            <tr>
              {columns.map((column) => (
                <th key={column.accessor} className="px-6 py-4 font-semibold">
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={row.id || index}
                className={`${index % 2 === 0 ? 'bg-white' : 'bg-[#fcfcfa]'} hover:bg-rootd-green/5 transition-colors`}
              >
                {columns.map((column) => (
                  <td key={column.accessor} className="px-6 py-4 align-middle">
                    {column.render ? column.render(row) : row[column.accessor]}
                  </td>
                ))}
                {renderActions && <td className="px-6 py-4">{renderActions(row)}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
