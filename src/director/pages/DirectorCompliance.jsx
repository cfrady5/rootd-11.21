import React from 'react';
import PageHeader from '../components/PageHeader.jsx';
import Badge from '../components/Badge.jsx';
import complianceItems from '../data/compliance.json';

const severityTone = {
  high: 'danger',
  medium: 'review',
  low: 'clear'
};

export default function DirectorCompliance() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Compliance"
        title="Alerts + posture"
        description="Every outstanding doc, disclosure, and approval consolidated with severity labels."
        actions={
          <button className="px-4 py-2 rounded-2xl bg-rootd-green text-sm font-semibold text-black">
            Export Compliance Pack
          </button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {complianceItems.map((alert) => (
          <article key={alert.id} className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-4 shadow-rootd-soft">
            <div className="flex items-center justify-between">
              <h3 className="text-white text-xl font-semibold">{alert.title}</h3>
              <Badge tone={severityTone[alert.severity]}>{alert.status}</Badge>
            </div>
            <p className="text-white/70 leading-relaxed">{alert.detail}</p>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 rounded-2xl bg-white/10 border border-white/20 text-sm font-semibold">
                Mark as Resolved
              </button>
              <button className="text-sm text-rootd-green font-medium">View Thread</button>
            </div>
          </article>
        ))}
      </div>

      <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-rootd-green/20 to-transparent p-6">
        <p className="text-sm uppercase tracking-[0.4em] text-white/50">Director Policy</p>
        <p className="text-2xl font-semibold text-white mt-2">Auto-alert rules</p>
        <p className="text-white/70 mt-3 max-w-2xl">
          Rootd automatically triggers alerts for missing tax documentation, high-risk categories, and director approvals.
        </p>
      </div>
    </div>
  );
}
