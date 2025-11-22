import React from 'react';

export default function LayoutWrapper({ children }) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-0 py-10 space-y-8">
      {children}
    </div>
  );
}
