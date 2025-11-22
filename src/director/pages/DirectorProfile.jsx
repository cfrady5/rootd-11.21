import React, { useState } from 'react';
import PageHeader from '../components/PageHeader.jsx';
import director from '../data/director.json';

export default function DirectorProfile() {
  const [settings, setSettings] = useState(director.settings);

  const toggleSetting = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Profile"
        title={director.name}
        description={`${director.title} · ${director.university}`}
      />

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <article className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-white text-xl font-semibold mb-4">Contact</h3>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/70">
            <div>
              <dt className="text-xs uppercase tracking-[0.3em] text-white/40 mb-1">Email</dt>
              <dd className="text-white">{director.email}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.3em] text-white/40 mb-1">Phone</dt>
              <dd className="text-white">{director.phone}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.3em] text-white/40 mb-1">Office</dt>
              <dd className="text-white">{director.office}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.3em] text-white/40 mb-1">University</dt>
              <dd className="text-white">{director.university}</dd>
            </div>
          </dl>
        </article>

        <article className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-white text-xl font-semibold mb-4">Quick links</h3>
          <div className="space-y-3 text-sm">
            {director.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between px-4 py-3 rounded-2xl bg-white/5 hover:bg-white/10 transition"
              >
                <span>{link.label}</span>
                <span className="text-rootd-green">↗</span>
              </a>
            ))}
          </div>
        </article>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-4">
        <h3 className="text-white text-xl font-semibold">Settings</h3>
        {Object.entries(settings).map(([key, value]) => (
          <label key={key} className="flex items-center justify-between px-4 py-3 bg-white/5 rounded-2xl">
            <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
            <button
              type="button"
              onClick={() => toggleSetting(key)}
              className={`w-12 h-6 rounded-full transition ${value ? 'bg-rootd-green' : 'bg-white/20'}`}
            >
              <span
                className={`block h-5 w-5 rounded-full bg-white transform transition ${
                  value ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </label>
        ))}
      </section>
    </div>
  );
}
