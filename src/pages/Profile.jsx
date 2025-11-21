import React, { useMemo, useState } from 'react';
import { useProfile } from '../context/ProfileContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import InfoTooltip from '../components/InfoTooltip.jsx';
import {
  PageHeader,
  SectionCard,
  Button,
  DrawerContainer,
  StatusBadge,
  EmptyState,
  TextInput
} from '../components/director/PremiumComponents.jsx';
import { updateProfileDetails } from '../lib/api/index.js';
import { palette } from '../lib/theme.js';

export default function Profile() {
  const { profile, persona, readiness, refreshProfile } = useProfile();
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [formState, setFormState] = useState({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const initialForm = useMemo(() => buildInitialForm(profile, persona), [profile, persona]);

  if (!profile) {
    return <p>Loading profile…</p>;
  }

  const openEditor = () => {
    setFormState(initialForm);
    setEditing(true);
    setError(null);
    setSuccess(null);
  };

  const handleFieldChange = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    const payload = buildUpdatePayload(persona, formState);
    const { error: updateError } = await updateProfileDetails(persona, payload, user?.id ?? profile.user_id ?? profile.owner_user_id);

    if (updateError) {
      setError(updateError.message);
    } else {
      await refreshProfile();
      setSuccess('Profile updated successfully.');
      setEditing(false);
    }
    setSaving(false);
  };

  const handleExport = (format) => {
    const data = format === 'csv' ? convertToCsv(profile) : JSON.stringify(profile, null, 2);
    const blob = new Blob([data], { type: format === 'csv' ? 'text/csv' : 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `rootd-profile.${format === 'csv' ? 'csv' : 'json'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <PageHeader
        title="Profile"
        description="Your Rootd identity, readiness, and connected channels in one clean overview."
        actions={(
          <div style={{ display: 'flex', gap: '12px' }}>
            <Button variant="secondary" onClick={() => setPrivacyOpen(true)}>
              Data & privacy
            </Button>
            <Button onClick={openEditor}>Edit profile</Button>
          </div>
        )}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '16px' }}>
        <SectionCard title="Persona overview" description="High-level readiness and compliance posture for this account.">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <p style={{ margin: 0, color: '#6b7280', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Persona</p>
              <h2 style={{ margin: '6px 0 0' }}>{persona}</h2>
              <p style={{ margin: '4px 0 0', color: '#6b7280' }}>{profile.first_name ? `${profile.first_name} ${profile.last_name ?? ''}` : profile.name}</p>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <QuickStat label="Compliance" value={`${Math.round(readiness.compliance ?? 0)}%`} />
              <QuickStat label="Tax readiness" value={`${Math.round(readiness.tax ?? 0)}%`} />
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <StatusBadge status={mapStatus(profile.kyc_status)} />
              <StatusBadge status={mapStatus(profile.w9_status)} />
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Key details" description="Compliance, school, and governance data pulled directly from Supabase.">
          <DetailRow label="School" value={profile.school?.name ?? profile.school_name ?? '—'} />
          <DetailRow label="Sport" value={profile.sport ?? '—'} />
          <DetailRow label="City" value={profile.city ?? '—'} />
          <DetailRow label="State" value={profile.state ?? '—'} />
          <DetailRow
            label="KYC status"
            value={profile.kyc_status ?? '—'}
            info={{ label: 'Know Your Customer status', description: 'Identity verification required for payouts and compliance.' }}
          />
          <DetailRow
            label="W9 status"
            value={profile.w9_status ?? '—'}
            info={{ label: 'IRS W-9 form', description: 'Tracks whether your W-9 is uploaded and approved.' }}
          />
          <DetailRow label="Restricted categories" value={(profile.restricted_categories ?? []).join(', ') || '—'} />
        </SectionCard>

        <SectionCard
          title="Channels"
          description="Linked social accounts inform Rootd scoring and partner recommendations."
        >
          {(profile.content_channels ?? []).length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {profile.content_channels.map((channel) => (
                <DetailRow
                  key={channel.platform}
                  label={channel.platform}
                  value={`${channel.handle} · ${channel.followers?.toLocaleString?.() ?? channel.followers ?? '—'}`}
                />
              ))}
            </div>
          ) : (
            <EmptyState title="No channels connected" description="Link Instagram, TikTok, or YouTube to unlock insights." />
          )}
          {persona === 'business' && (
            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <DetailRow label="Categories" value={(profile.categories ?? []).join(', ') || '—'} />
              <DetailRow label="Budget" value={profile.budget_range ?? '—'} />
            </div>
          )}
        </SectionCard>
      </div>

      <DrawerContainer isOpen={editing} onClose={() => setEditing(false)} title="Edit profile" size="lg">
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '32px' }}>
          {Object.entries(formState).map(([field, value]) => (
            <TextInput
              key={field}
              label={field.replaceAll('_', ' ')}
              value={value ?? ''}
              onChange={(next) => handleFieldChange(field, next)}
            />
          ))}
          {error && <p style={{ color: '#dc2626', margin: 0 }}>{error}</p>}
          {success && <p style={{ color: palette.pine, margin: 0 }}>{success}</p>}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <Button variant="secondary" type="button" onClick={() => setEditing(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? 'Saving…' : 'Save changes'}
            </Button>
          </div>
        </form>
      </DrawerContainer>

      <DrawerContainer isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} title="Data & privacy" size="md">
        <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px', color: '#4b5563' }}>
          <p>
            Rootd stores your social handles, compliance documents, and deal history securely in Supabase. Only teams you authorize can view deal rooms,
            and every change is logged for auditing.
          </p>
          <ul>
            <li>Social channels are encrypted at rest.</li>
            <li>Compliance files live in private buckets with signed URL access.</li>
            <li>Deal and payment metadata is retained for 7 years for NIL regulations.</li>
          </ul>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Button variant="secondary" onClick={() => handleExport('json')}>
              Export JSON
            </Button>
            <Button variant="secondary" onClick={() => handleExport('csv')}>
              Export CSV
            </Button>
          </div>
        </div>
      </DrawerContainer>
    </div>
  );
}

function QuickStat({ label, value }) {
  return (
    <div style={{ backgroundColor: '#f9fafb', borderRadius: '14px', padding: '12px 16px' }}>
      <p style={{ margin: 0, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#6b7280' }}>{label}</p>
      <p style={{ margin: '6px 0 0', fontSize: '24px', fontWeight: 700 }}>{value}</p>
    </div>
  );
}

function DetailRow({ label, value, info }) {
  return (
    <div>
      <p style={{ margin: '12px 0 0', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#6b7280', display: 'flex', gap: '4px', alignItems: 'center' }}>
        {label}
        {info?.description && <InfoTooltip label={info.label} description={info.description} />}
      </p>
      <p style={{ margin: '4px 0 0', fontWeight: 600 }}>{value}</p>
    </div>
  );
}

function mapStatus(status) {
  if (!status) return 'pending';
  const normalized = status.toString().toLowerCase();
  if (normalized.includes('approved') || normalized.includes('complete')) return 'completed';
  if (normalized.includes('pending')) return 'pending';
  return 'warning';
}

function buildInitialForm(profile, persona) {
  if (!profile) return {};
  if (persona === 'business') {
    return {
      name: profile.name ?? '',
      city: profile.city ?? '',
      state: profile.state ?? '',
      budget_range: profile.budget_range ?? ''
    };
  }
  if (persona === 'director') {
    return {
      school: profile.school?.name ?? '',
      restricted_categories: (profile.restricted_categories ?? []).join(', '),
      approval_sla_days: profile.approval_sla_days ?? 5
    };
  }
  return {
    school: profile.school?.name ?? '',
    sport: profile.sport ?? '',
    class_year: profile.class_year ?? '',
    city: profile.city ?? '',
    state: profile.state ?? ''
  };
}

function buildUpdatePayload(persona, formState) {
  if (persona === 'business') {
    return cleanPayload({
      name: formState.name,
      city: formState.city,
      state: formState.state,
      budget_range: formState.budget_range
    });
  }
  if (persona === 'director') {
    return cleanPayload({
      approval_sla_days: Number(formState.approval_sla_days) || null,
      restricted_categories: formState.restricted_categories?.split(',').map((item) => item.trim()).filter(Boolean)
    });
  }
  return cleanPayload({
    sport: formState.sport,
    class_year: formState.class_year
  });
}

function convertToCsv(profile) {
  const flat = Object.entries(profile).map(([key, value]) => `${key},"${JSON.stringify(value)}"`);
  return ['field,value', ...flat].join('\n');
}

function cleanPayload(payload) {
  return Object.fromEntries(Object.entries(payload).filter(([, value]) => value !== undefined));
}
