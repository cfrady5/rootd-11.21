import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext.jsx';
import { useProfile } from '../context/ProfileContext.jsx';
import { upsertPersonaProfile } from '../lib/api/index.js';
import { palette, radii, shadows } from '../lib/theme.js';
import InfoTooltip from '../components/InfoTooltip.jsx';
import { getSupabase, isSupabaseConfigured } from '../lib/supabaseClient.js';

const personaCopy = {
  athlete: {
    title: 'Athlete onboarding',
    description: 'Lock in your sport, school, and compliance readiness so Rootd can curate best-fit NIL partners.'
  },
  business: {
    title: 'Business onboarding',
    description: 'Tell us about your storefront, campaign goals, and guardrails. We will match you with athletes instantly.'
  },
  director: {
    title: 'School director onboarding',
    description: 'Map your restricted categories, approval workflow, and compliance contacts.'
  }
};

const defaultForm = {
  athlete: {
    first_name: 'Jordan',
    last_name: 'Kelly',
    sport: 'Basketball',
    school_name: 'Coastal State University',
    class_year: '2026',
    instagram: '@jkelly',
    tiktok: '@jordynkelly',
    kyc_status: 'completed',
    w9_status: 'completed'
  },
  business: {
    name: 'Village Coffee Roasters',
    city: 'Austin',
    state: 'TX',
    categories: 'Coffee, Community',
    budget_range: '$8K - $12K',
    campaign_types: 'Livestream, Drops'
  },
  director: {
    school_name: 'Coastal State University',
    title: 'Associate AD, NIL',
    restricted_categories: 'Sports betting, Energy drinks',
    approval_sla_days: 5
  }
};

export default function Onboarding() {
  const supabase = getSupabase();
  const { persona, setPersona, user, signOut } = useAuth();
  const { refreshProfile } = useProfile();
  const [activePersona, setActivePersona] = useState(persona ?? 'athlete');
  const [stepIndex, setStepIndex] = useState(persona ? 1 : 0);
  const [formState, setFormState] = useState(defaultForm[persona ?? 'athlete']);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [autosaveState, setAutosaveState] = useState('idle');
  const navigate = useNavigate();
  const location = useLocation();

  const steps = useMemo(() => ['Choose your track', 'Core profile', 'Compliance & preferences', 'Review & confirm'], []);

  useEffect(() => {
    if (stepIndex === 0) {
      setAutosaveState('idle');
    }
  }, [stepIndex]);

  const handlePersonaPick = (value) => {
    setActivePersona(value);
    setPersona(value);
    setFormState(defaultForm[value]);
    setStepIndex(1);
  };

  const updateField = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const buildPayload = useCallback(() => {
    const payloadMap = {
      athlete: {
        first_name: formState.first_name,
        last_name: formState.last_name,
        sport: formState.sport,
        class_year: formState.class_year,
        instagram: formState.instagram,
        tiktok: formState.tiktok,
        kyc_status: formState.kyc_status,
        w9_status: formState.w9_status
      },
      business: {
        name: formState.name,
        city: formState.city,
        state: formState.state,
        budget_range: formState.budget_range,
        categories: formState.categories?.split(',').map((item) => item.trim()),
        value_tags: formState.campaign_types?.split(',').map((item) => item.trim())
      },
      director: {
        school_name: formState.school_name,
        title: formState.title,
        restricted_categories: formState.restricted_categories?.split(',').map((item) => item.trim()),
        approval_sla_days: Number(formState.approval_sla_days)
      }
    };

    return payloadMap[activePersona];
  }, [activePersona, formState]);

  useEffect(() => {
    if (!user?.id || stepIndex === 0) return undefined;

    let cancelled = false;
    setAutosaveState('saving');
    const timeout = setTimeout(async () => {
      const payload = buildPayload();
      const { error: draftError } = await upsertPersonaProfile(
        activePersona,
        { ...payload, onboarding_completed: false },
        user.id
      );
      if (!cancelled) {
        setAutosaveState(draftError ? 'error' : 'saved');
      }
    }, 900);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [activePersona, buildPayload, stepIndex, user?.id]);

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);

    const payload = buildPayload();

    const { error: upsertError } = await upsertPersonaProfile(
      activePersona,
      { ...payload, onboarding_completed: true },
      user?.id
    );

    if (upsertError) {
      setError(upsertError.message);
    } else {
      if (isSupabaseConfigured && supabase) {
        try {
          await supabase.auth.updateUser({ data: { onboarding_completed: true } });
        } catch (updateError) {
          console.error('Failed to update onboarding flag', updateError);
        }
      }
      await refreshProfile();
      const nextFromState = location.state?.from?.pathname;
      const next = nextFromState && nextFromState !== '/onboarding' ? nextFromState : '/dashboard';
      navigate(next, { replace: true });
    }

    setSubmitting(false);
  };

  const renderForm = () => {
    switch (activePersona) {
      case 'business':
        return (
          <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))' }}>
            <TextField label="Business name" value={formState.name} onChange={(e) => updateField('name', e.target.value)} />
            <TextField label="City" value={formState.city} onChange={(e) => updateField('city', e.target.value)} />
            <TextField label="State" value={formState.state} onChange={(e) => updateField('state', e.target.value)} />
            <TextField label="Categories" value={formState.categories} onChange={(e) => updateField('categories', e.target.value)} helper="Comma separated" />
            <TextField label="Budget range" value={formState.budget_range} onChange={(e) => updateField('budget_range', e.target.value)} />
            <TextField label="Campaign types" value={formState.campaign_types} onChange={(e) => updateField('campaign_types', e.target.value)} helper="Comma separated" />
          </div>
        );
      case 'director':
        return (
          <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))' }}>
            <TextField label="School name" value={formState.school_name} onChange={(e) => updateField('school_name', e.target.value)} />
            <TextField label="Title" value={formState.title} onChange={(e) => updateField('title', e.target.value)} />
            <TextField label="Restricted categories" value={formState.restricted_categories} onChange={(e) => updateField('restricted_categories', e.target.value)} helper="Comma separated" />
            <TextField label="Approval SLA (days)" value={formState.approval_sla_days} onChange={(e) => updateField('approval_sla_days', e.target.value)} type="number" />
          </div>
        );
      default:
        return (
          <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))' }}>
            <TextField label="First name" value={formState.first_name} onChange={(e) => updateField('first_name', e.target.value)} />
            <TextField label="Last name" value={formState.last_name} onChange={(e) => updateField('last_name', e.target.value)} />
            <TextField label="Sport" value={formState.sport} onChange={(e) => updateField('sport', e.target.value)} />
            <TextField label="School" value={formState.school_name} onChange={(e) => updateField('school_name', e.target.value)} />
            <TextField label="Class year" value={formState.class_year} onChange={(e) => updateField('class_year', e.target.value)} />
            <TextField label="Instagram" value={formState.instagram} onChange={(e) => updateField('instagram', e.target.value)} />
            <TextField label="TikTok" value={formState.tiktok} onChange={(e) => updateField('tiktok', e.target.value)} />
            <SelectField
              label="KYC status"
              info={{ label: 'Know Your Customer status', description: 'KYC verifies your identity so Rootd can release payments compliantly. Keep this completed to avoid payout delays.' }}
              value={formState.kyc_status}
              onChange={(e) => updateField('kyc_status', e.target.value)}
              options={['not_started', 'in_review', 'completed']}
            />
            <SelectField
              label="W9 status"
              info={{ label: 'IRS W-9 form', description: 'Upload a signed W-9 so brands can report NIL income correctly at tax time.' }}
              value={formState.w9_status}
              onChange={(e) => updateField('w9_status', e.target.value)}
              options={['not_started', 'in_review', 'completed']}
            />
          </div>
        );
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: palette.cream, padding: '40px 24px' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        <header style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
            <div>
              <p style={{ textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '12px', color: palette.grey }}>Rootd onboarding</p>
              <h1 style={{ fontSize: '48px', margin: '12px 0', letterSpacing: '-0.04em', fontFamily: 'Clash Display, Space Grotesk, sans-serif' }}>{personaCopy[activePersona].title}</h1>
              <p style={{ fontSize: '18px', color: palette.grey, maxWidth: '640px' }}>{personaCopy[activePersona].description}</p>
            </div>
            <button
              type="button"
              onClick={signOut}
              style={{
                border: '1px solid rgba(0,0,0,0.12)',
                borderRadius: radii.pill,
                padding: '10px 20px',
                backgroundColor: '#fff',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Sign out
            </button>
          </div>
        </header>

        <Stepper steps={steps} currentStep={stepIndex} />

        {stepIndex > 0 && (
          <p style={{ marginTop: '8px', fontSize: '13px', color: autosaveState === 'error' ? '#b91c1c' : palette.grey }}>
            {autosaveState === 'saving' && 'Autosaving progress to Supabase…'}
            {autosaveState === 'saved' && 'Progress saved • switch tabs anytime'}
            {autosaveState === 'error' && 'We could not save your latest changes. Please retry before continuing.'}
            {autosaveState === 'idle' && 'Updates will autosave as you type.'}
          </p>
        )}

        {stepIndex === 0 && (
          <div style={{ marginTop: '32px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {Object.keys(personaCopy).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => handlePersonaPick(key)}
                style={{
                  flex: '1 1 260px',
                  borderRadius: radii.lg,
                  border: key === activePersona ? `2px solid ${palette.pine}` : '1px solid rgba(0,0,0,0.12)',
                  padding: '24px',
                  textAlign: 'left',
                  backgroundColor: '#fff',
                  cursor: 'pointer',
                  boxShadow: key === activePersona ? shadows.card : 'none'
                }}
              >
                <p style={{ margin: 0, fontSize: '13px', letterSpacing: '0.08em', textTransform: 'uppercase', color: palette.grey }}>{key}</p>
                <h3 style={{ margin: '8px 0 0', fontSize: '22px' }}>{personaCopy[key].title}</h3>
                <p style={{ margin: '8px 0 0', color: palette.grey }}>{personaCopy[key].description}</p>
              </button>
            ))}
          </div>
        )}

        {stepIndex > 0 && (
          <div style={{ marginTop: '32px', backgroundColor: '#fff', borderRadius: radii.lg, padding: '32px', boxShadow: shadows.card }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activePersona}-${stepIndex}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.25 }}
              >
                {stepIndex < steps.length - 1 ? (
                  renderForm()
                ) : (
                  <div>
                    <h3 style={{ marginTop: 0 }}>Ready to launch</h3>
                    <p style={{ color: palette.grey }}>We will sync this data to your Supabase profile.</p>
                    <ul>
                      {Object.entries(formState).map(([key, value]) => (
                        <li key={key} style={{ marginBottom: '6px' }}>
                          <strong>{key.replaceAll('_', ' ')}:</strong> {String(value)}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px' }}>
              <button
                type="button"
                onClick={() => setStepIndex((prev) => Math.max(prev - 1, 0))}
                style={{ border: 'none', background: 'transparent', color: palette.grey, fontWeight: 600, cursor: 'pointer' }}
              >
                Back
              </button>
              {stepIndex < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setStepIndex((prev) => Math.min(prev + 1, steps.length - 1))}
                  style={{
                    border: 'none',
                    borderRadius: radii.pill,
                    padding: '14px 32px',
                    backgroundColor: palette.pine,
                    color: '#fff',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Continue
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  style={{
                    border: 'none',
                    borderRadius: radii.pill,
                    padding: '14px 32px',
                    backgroundColor: palette.pine,
                    color: '#fff',
                    fontWeight: 600,
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    opacity: submitting ? 0.7 : 1
                  }}
                >
                  {submitting ? 'Saving…' : 'Finish onboarding'}
                </button>
              )}
            </div>

            {error && (
              <p style={{ marginTop: '16px', color: 'crimson' }}>Could not save onboarding data: {error}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Stepper({ steps, currentStep }) {
  return (
    <div style={{ display: 'flex', gap: '12px', marginTop: '16px', flexWrap: 'wrap' }}>
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isComplete = index < currentStep;
        return (
          <div key={step} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: isComplete ? palette.pine : isActive ? palette.pineDark : '#e0e0e0',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700
              }}
            >
              {index + 1}
            </div>
            <p style={{ margin: 0, fontWeight: 600, color: isActive ? palette.pineDark : palette.grey }}>{step}</p>
          </div>
        );
      })}
    </div>
  );
}

function TextField({ label, helper, info, ...props }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <span style={{ fontSize: '14px', fontWeight: 600, display: 'flex', alignItems: 'center' }}>
        {label}
        {info?.description && <InfoTooltip label={info.label} description={info.description} />}
      </span>
      <input
        {...props}
        style={{
          borderRadius: radii.md,
          border: '1px solid rgba(0,0,0,0.15)',
          padding: '12px 14px',
          fontSize: '15px'
        }}
      />
      {helper && <span style={{ fontSize: '12px', color: palette.grey }}>{helper}</span>}
    </label>
  );
}

function SelectField({ label, options, info, ...props }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <span style={{ fontSize: '14px', fontWeight: 600, display: 'flex', alignItems: 'center' }}>
        {label}
        {info?.description && <InfoTooltip label={info.label} description={info.description} />}
      </span>
      <select
        {...props}
        style={{
          borderRadius: radii.md,
          border: '1px solid rgba(0,0,0,0.15)',
          padding: '12px 14px',
          fontSize: '15px'
        }}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
