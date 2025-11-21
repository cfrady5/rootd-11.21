import React, { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { PageHeader, Button, EmptyState, LoadingSpinner } from '../components/director/PremiumComponents.jsx';
import { fetchNotifications, subscribeToNotificationStream } from '../lib/api/index.js';
import { palette, radii, shadows } from '../lib/theme.js';

const NOTIFICATION_TYPES = ['match', 'compliance', 'finance', 'deal', 'milestone', 'general'];

const FILTER_DEFAULTS = [
  { label: 'All activity', value: 'all' },
  { label: 'Unread only', value: 'unread' }
];

const FILTER_CATEGORIES = [
  { label: 'Matchmaking', value: 'match' },
  { label: 'Compliance', value: 'compliance' },
  { label: 'Deal room', value: 'deal' },
  { label: 'Finance', value: 'finance' }
];

const TYPE_COPY = {
  match: 'Matchmaking',
  compliance: 'Compliance',
  finance: 'Payments',
  deal: 'Deal room',
  milestone: 'Milestone',
  general: 'Rootd'
};

const TYPE_ACCENTS = {
  match: palette.rust,
  compliance: '#b45309',
  finance: '#0f766e',
  deal: palette.pineDark,
  milestone: palette.moss,
  general: palette.pine
};

const relativeTimeFormatter = typeof Intl !== 'undefined' && typeof Intl.RelativeTimeFormat !== 'undefined'
  ? new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
  : null;

export default function Notifications() {
  const { user, isDemo } = useAuth();
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [streamActive, setStreamActive] = useState(false);

  const unreadCount = useMemo(() => items.filter((item) => !item.read).length, [items]);
  const priorityCount = useMemo(() => items.filter((item) => item.priority === 'high').length, [items]);
  const financeCount = useMemo(() => items.filter((item) => item.type === 'finance').length, [items]);

  const filteredItems = useMemo(() => {
    if (filter === 'all') return items;
    if (filter === 'unread') return items.filter((item) => !item.read);
    return items.filter((item) => item.type === filter);
  }, [filter, items]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchNotifications(user?.id)
      .then(({ data }) => {
        if (!mounted) return;
        setItems(normalizeNotifications(data));
      })
      .catch(() => {
        if (mounted) {
          setItems([]);
        }
      })
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });

    const teardown = subscribeToNotificationStream(user?.id, (payload) => {
      if (!payload) return;
      setStreamActive(true);
      setItems((prev) => {
        const next = normalizeNotification(payload);
        if (!next) return prev;
        const deduped = prev.filter((item) => item.id !== next.id);
        return [next, ...deduped].slice(0, 40);
      });
    });

    return () => {
      mounted = false;
      teardown?.();
    };
  }, [user?.id]);

  const markAllRead = () => {
    if (unreadCount === 0) return;
    setItems((prev) => prev.map((item) => ({ ...item, read: true })));
  };

  const handleMarkRead = (id) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, read: true } : item)));
  };

  const handleDismiss = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f0' }}>
      <PageHeader
        title="Notifications"
        description="Track offers, payments, and compliance alerts as soon as they hit Supabase."
        actions={(<Button variant="secondary" onClick={markAllRead} disabled={unreadCount === 0}>Mark all as read</Button>)}
      />

      <main style={{ padding: '32px 16px 64px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: '1024px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '16px' }}>
            <SummaryCard label="Unread alerts" value={unreadCount} helper="Across every workstream" />
            <SummaryCard label="High priority" value={priorityCount} helper="Compliance & deadlines" accent="#b45309" />
            <SummaryCard label="Finance updates" value={financeCount} helper="Payments + invoicing" accent="#0f766e" />
          </section>

          <section
            style={{
              backgroundColor: '#fff',
              borderRadius: radii.lg,
              border: '1px solid rgba(0,0,0,0.06)',
              padding: '18px 20px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '24px',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <FilterDropdown value={filter} onChange={setFilter} />
            <RealtimePill active={streamActive} isDemo={isDemo} />
          </section>

          <section style={{ backgroundColor: '#fff', borderRadius: radii.lg, padding: '32px', boxShadow: shadows.card }} aria-live="polite">
            {loading && <LoadingSpinner />}

            {!loading && filteredItems.length === 0 && (
              <EmptyState
                title={filter === 'unread' ? 'Nothing new right now' : 'No alerts in this view'}
                description={filter === 'all' ? 'Activity will land here as soon as offers, approvals, or payments change.' : 'Try switching filters or check back soon.'}
                action={filter !== 'all' ? <Button variant="secondary" onClick={() => setFilter('all')}>Show all activity</Button> : null}
              />
            )}

            {!loading && filteredItems.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {filteredItems.map((item) => (
                  <FeedCard key={item.id} item={item} onMarkRead={handleMarkRead} onDismiss={handleDismiss} />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

function FilterDropdown({ value, onChange }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <span style={{ fontSize: '13px', fontWeight: 600, color: palette.grey }}>Filter activity</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          minWidth: '220px',
          borderRadius: radii.md,
          border: '1px solid rgba(0,0,0,0.12)',
          padding: '10px 12px',
          fontSize: '15px'
        }}
        aria-label="Filter notifications"
      >
        {FILTER_DEFAULTS.map((opt) => (
          <option value={opt.value} key={opt.value}>
            {opt.label}
          </option>
        ))}
        <optgroup label="By channel">
          {FILTER_CATEGORIES.map((opt) => (
            <option value={opt.value} key={opt.value}>
              {opt.label}
            </option>
          ))}
        </optgroup>
      </select>
    </label>
  );
}

function SummaryCard({ label, value, helper, accent = palette.pine }) {
  return (
    <div
      style={{
        backgroundColor: '#fff',
        borderRadius: radii.lg,
        padding: '20px 24px',
        border: '1px solid rgba(0,0,0,0.06)',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}
    >
      <p style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '12px', color: palette.grey }}>{label}</p>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
        <span style={{ fontSize: '34px', fontWeight: 600 }}>{value}</span>
        <span style={{ fontSize: '14px', color: accent }}>{helper}</span>
      </div>
    </div>
  );
}

function PriorityPill({ level }) {
  const isHigh = level === 'high';
  const color = isHigh ? '#b45309' : palette.grey;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '12px',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        padding: '6px 12px',
        borderRadius: radii.pill,
        backgroundColor: isHigh ? 'rgba(255,184,138,0.25)' : palette.cream,
        color,
        fontWeight: 600
      }}
    >
      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: color }} />
      {isHigh ? 'High priority' : 'Reminder'}
    </span>
  );
}

function RealtimePill({ active, isDemo }) {
  const label = isDemo ? 'Demo dataset' : active ? 'Live via Supabase' : 'Listening for updates';
  const color = isDemo ? palette.grey : active ? palette.pine : '#9ca3af';
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', color }}>
      <span
        style={{
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          backgroundColor: color,
          boxShadow: active ? '0 0 0 8px rgba(120,141,87,0.15)' : 'none'
        }}
      />
      {label}
    </span>
  );
}

function FeedCard({ item, onMarkRead, onDismiss }) {
  const accent = TYPE_ACCENTS[item.type] ?? palette.pine;
  const handlePrimaryAction = () => {
    if (item.actionUrl && typeof window !== 'undefined') {
      window.open(item.actionUrl, '_blank');
    }
  };

  return (
    <div
      style={{
        backgroundColor: item.read ? '#fff' : '#fbf7ef',
        borderRadius: radii.lg,
        border: `1px solid ${item.read ? 'rgba(0,0,0,0.06)' : 'rgba(120,141,87,0.45)'}`,
        padding: '24px',
        boxShadow: item.read ? '0 18px 40px rgba(31,31,31,0.06)' : '0 24px 60px rgba(120,141,87,0.18)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <p style={{ margin: 0, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.12em', color: accent }}>{TYPE_COPY[item.type] ?? 'Activity'}</p>
          {!item.read && <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: accent }} />}
        </div>
        <span style={{ color: palette.grey, fontSize: '13px' }}>{item.timestamp}</span>
      </div>

      <div>
        <p style={{ margin: 0, fontWeight: 600, fontSize: '18px', color: palette.charcoal }}>{item.title}</p>
        <p style={{ margin: '6px 0 0', color: palette.grey }}>{item.detail}</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          {item.action && (
            <Button variant="secondary" size="sm" onClick={handlePrimaryAction}>
              {item.action}
            </Button>
          )}
          <PriorityPill level={item.priority} />
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {!item.read && (
            <Button variant="ghost" size="sm" onClick={() => onMarkRead(item.id)}>
              Mark read
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={() => onDismiss(item.id)}>
            Dismiss
          </Button>
        </div>
      </div>
    </div>
  );
}

function normalizeNotifications(payload) {
  if (!payload) return [];
  const raw = Array.isArray(payload) ? payload : [payload];
  return raw
    .map(normalizeNotification)
    .filter(Boolean)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

function normalizeNotification(raw = {}) {
  if (!raw) return null;
  const sourceType = raw.type || raw.category || raw.channel || raw.topic || 'general';
  const normalizedType = typeof sourceType === 'string' ? sourceType.toLowerCase() : 'general';
  const type = NOTIFICATION_TYPES.includes(normalizedType) ? normalizedType : 'general';
  const createdAt = raw.created_at || raw.createdAt || raw.timestamp || new Date().toISOString();
  const detail = raw.detail || raw.body || raw.description || raw.message;

  return {
    id: raw.id || randomId(),
    title: raw.title || raw.heading || 'Rootd update',
    detail: detail || 'New activity inside Rootd.',
    action: raw.action || raw.action_label || raw.cta || null,
    actionUrl: raw.action_url || raw.link || null,
    type,
    priority: raw.priority || (type === 'compliance' ? 'high' : 'normal'),
    read: Boolean(raw.read || raw.is_read || raw.status === 'read'),
    createdAt,
    timestamp: formatRelativeTime(createdAt)
  };
}

function formatRelativeTime(value) {
  if (!value) {
    return 'Just now';
  }
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    return typeof value === 'string' ? value : 'Just now';
  }
  const diff = date.getTime() - Date.now();
  const ms = Math.abs(diff);
  if (!relativeTimeFormatter) {
    return date.toLocaleString();
  }
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  if (ms < hour) {
    const minutes = Math.round(ms / minute) || 0;
    return relativeTimeFormatter.format(diff < 0 ? -minutes : minutes, 'minute');
  }
  if (ms < day) {
    const hours = Math.round(ms / hour);
    return relativeTimeFormatter.format(diff < 0 ? -hours : hours, 'hour');
  }
  const days = Math.round(ms / day);
  if (days < 7) {
    return relativeTimeFormatter.format(diff < 0 ? -days : days, 'day');
  }
  const weeks = Math.round(days / 7);
  return relativeTimeFormatter.format(diff < 0 ? -weeks : weeks, 'week');
}

function randomId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `notif-${Math.random().toString(36).slice(2, 10)}`;
}
