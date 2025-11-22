import React from 'react';

export default function LayoutWrapper({ children }) {
  return (
    <section className="px-6 py-8 lg:px-10">
      <div className="space-y-6">{children}</div>
    </section>
  );
}
