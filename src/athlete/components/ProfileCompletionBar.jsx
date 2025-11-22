import React from 'react';

export default function ProfileCompletionBar({ value }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm text-[#5b5b5b]">
        <span>Profile completion</span>
        <span className="font-semibold text-[#161616]">{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-[#ebebe7] overflow-hidden">
        <div className="h-full rounded-full bg-rootd-green" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
