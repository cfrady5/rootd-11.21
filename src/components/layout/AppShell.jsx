import React from 'react';
import RootdHeader from './RootdHeader.jsx';

export default function AppShell({ children }) {
  return (
    <div className="min-h-screen bg-[#eef1e7] text-[#0f172a]">
      <RootdHeader />
      <main className="pt-[96px] sm:pt-[108px]">
        <div className="mx-auto max-w-screen-xl px-6 pb-20 sm:px-8 lg:px-10">
          {children}
        </div>
      </main>
      <footer className="border-t border-[rgba(15,23,42,0.08)] bg-white">
        <div className="mx-auto max-w-screen-xl px-6 py-8">
          <p className="m-0 text-sm text-slate-500">
            © {new Date().getFullYear()} Rootd Technologies. Purpose-built for athletic departments and compliant NIL operations.
          </p>
        </div>
      </footer>
    </div>
  );
}
