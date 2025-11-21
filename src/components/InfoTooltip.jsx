import React, { useId, useState } from 'react';
import { palette, radii, shadows } from '../lib/theme.js';

export default function InfoTooltip({ label = 'More info', description = '', placement = 'top' }) {
  const tooltipId = useId();
  const [open, setOpen] = useState(false);

  const show = () => setOpen(true);
  const hide = () => setOpen(false);

  const positions = {
    top: { bottom: '100%', left: '50%', transform: 'translate(-50%, -8px)' },
    bottom: { top: '100%', left: '50%', transform: 'translate(-50%, 8px)' },
    left: { right: '100%', top: '50%', transform: 'translate(-8px, -50%)' },
    right: { left: '100%', top: '50%', transform: 'translate(8px, -50%)' }
  };

  return (
    <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
      <button
        type="button"
        aria-label={label}
        aria-describedby={open ? tooltipId : undefined}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        onClick={(event) => {
          event.preventDefault();
          setOpen((prev) => !prev);
        }}
        style={{
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          border: `1px solid ${palette.charcoal}`,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          lineHeight: 1,
          backgroundColor: '#fff',
          color: palette.charcoal,
          cursor: 'pointer',
          marginLeft: '6px'
        }}
      >
        i
      </button>
      {open && (
        <span
          id={tooltipId}
          role="tooltip"
          style={{
            position: 'absolute',
            padding: '8px 12px',
            borderRadius: radii.md,
            backgroundColor: palette.charcoal,
            color: '#fff',
            fontSize: '13px',
            width: '220px',
            boxShadow: shadows.card,
            zIndex: 100,
            ...positions[placement]
          }}
        >
          {description}
        </span>
      )}
    </span>
  );
}
