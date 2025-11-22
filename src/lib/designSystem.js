export const brandPalette = {
  deep: '#111317',
  charcoal: '#0f172a',
  sage: '#4c5937',
  sageDark: '#39442c',
  mist: '#eef1e7',
  bone: '#f7f8f2',
  accent: '#9fb45d',
  blush: '#f9efe7'
};

export const typeScale = {
  display: 'clamp(2.3rem, 4vw, 3.8rem)',
  headline: 'clamp(1.6rem, 2.6vw, 2.6rem)',
  subhead: '1.25rem',
  body: '1rem',
  small: '0.9rem',
  micro: '0.75rem'
};

export const rhythm = {
  sectionGap: '72px',
  blockGap: '32px',
  cardPadding: '24px',
  gridGap: '20px'
};

export const shadows = {
  card: '0 18px 45px rgba(15, 23, 42, 0.08)',
  subtle: '0 6px 24px rgba(15, 23, 42, 0.07)'
};

export const motionPresets = {
  fadeUp: {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.5, ease: 'easeOut' }
  },
  fadeIn: {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, amount: 0.4 },
    transition: { duration: 0.4 }
  }
};

export const surfaceStyles = {
  frosted: {
    borderRadius: '28px',
    border: '1px solid rgba(76,89,55,0.15)',
    background: 'rgba(255,255,255,0.82)',
    backdropFilter: 'blur(14px)'
  },
  tinted: {
    borderRadius: '28px',
    border: '1px solid rgba(76,89,55,0.12)',
    background: 'linear-gradient(135deg, rgba(255,255,255,0.92) 0%, rgba(247,248,242,0.9) 100%)'
  }
};

export const buttonTone = {
  primary: {
    backgroundColor: brandPalette.sage,
    color: '#fff',
    borderRadius: '999px',
    padding: '14px 28px',
    fontSize: '1rem',
    fontWeight: 600
  },
  secondary: {
    backgroundColor: 'rgba(76,89,55,0.1)',
    color: brandPalette.sage,
    borderRadius: '999px',
    padding: '14px 28px',
    fontSize: '1rem',
    fontWeight: 600
  }
};
