import React from 'react';
import { NavLink } from 'react-router-dom';
import { radii } from '../lib/theme.js';

const brand = {
  primary: '#4c5937',
  dark: '#3a4528',
  tint: '#eef2e4',
  tintAlt: '#dfe5cc',
  border: '#cfd6b5',
  shadow: 'rgba(76, 89, 55, 0.2)'
};

const toneTokens = {
  mint: {
    background: `linear-gradient(135deg, ${brand.tint} 0%, ${brand.tintAlt} 100%)`,
    border: brand.border,
    overline: brand.dark,
    heading: brand.dark,
    body: brand.primary,
    cta: brand.primary,
    shadow: `0 18px 45px ${brand.shadow}`
  },
  amber: {
    background: 'linear-gradient(135deg, #fff7ed 0%, #fef3c7 100%)',
    border: '#fed7aa',
    overline: '#b45309',
    heading: '#78350f',
    body: '#b45309',
    cta: '#92400e',
    shadow: '0 18px 45px rgba(217, 119, 6, 0.2)'
  },
  sky: {
    background: 'linear-gradient(135deg, #eef2ff 0%, #e0f2fe 100%)',
    border: '#bfdbfe',
    overline: '#1d4ed8',
    heading: '#0f172a',
    body: '#1e3a8a',
    cta: '#1d4ed8',
    shadow: '0 18px 45px rgba(59, 130, 246, 0.18)'
  }
};

export default function GuidanceBanner({ hint, onDismiss, tone = 'mint' }) {
  if (!hint) return null;

  const paletteTone = toneTokens[tone] || toneTokens.mint;

  return (
    <div
      style={{
        background: paletteTone.background,
        borderRadius: radii.lg,
        padding: '20px 24px',
        border: `1px solid ${paletteTone.border}`,
        display: 'flex',
        justifyContent: 'space-between',
        gap: '16px',
        flexWrap: 'wrap',
        alignItems: 'center',
        boxShadow: paletteTone.shadow
      }}
    >
      <div>
        <p style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '12px', color: paletteTone.overline }}>Guidance</p>
        <h3 style={{ margin: '6px 0', color: paletteTone.heading }}>{hint.title}</h3>
        <p style={{ margin: 0, color: paletteTone.body }}>{hint.body}</p>
      </div>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        {hint.href && (
          <NavLink to={hint.href} style={{ fontWeight: 600, color: paletteTone.cta }}>
            {hint.actionLabel}
          </NavLink>
        )}
        <button
          type="button"
          className="touch-target"
          onClick={onDismiss}
          style={{ border: 'none', background: 'transparent', color: paletteTone.cta, fontWeight: 600 }}
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
