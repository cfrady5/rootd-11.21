import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { fetchPersonaProfile, fetchComplianceTasks } from '../lib/api/index.js';
import { useAuth } from './AuthContext.jsx';

const ProfileContext = createContext(null);

export function ProfileProvider({ children }) {
  const { user, persona } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [complianceTasks, setComplianceTasks] = useState([]);
  const [error, setError] = useState(null);

  const refreshProfile = useCallback(async () => {
    if (!user?.id || !persona) {
      setProfile(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    const [{ data, error: profileError }, { data: complianceData }] = await Promise.all([
      fetchPersonaProfile(persona, user.id),
      fetchComplianceTasks(user.id)
    ]);
    if (profileError) {
      setError(profileError.message);
    } else {
      setError(null);
    }
    setProfile(data ?? null);
    setComplianceTasks(complianceData ?? []);
    setLoading(false);
  }, [user?.id, persona]);

  useEffect(() => {
    refreshProfile();
  }, [refreshProfile]);

  const readiness = useMemo(() => {
    if (!profile) return { compliance: 0, tax: 0 };
    return {
      compliance: profile.compliance_readiness_score ?? 0,
      tax: profile.tax_readiness_score ?? 0
    };
  }, [profile]);

  const needsKyc = profile?.kyc_status && profile.kyc_status !== 'completed';
  const needsW9 = profile?.w9_status && profile.w9_status !== 'completed';

  const onboardingComplete = Boolean(profile?.onboarding_completed ?? profile ?? user?.user_metadata?.onboarding_completed);

  const value = useMemo(() => ({
    profile,
    persona,
    loading,
    error,
    complianceTasks,
    readiness,
    needsKyc,
    needsW9,
    onboardingComplete,
    isOnboardingComplete: onboardingComplete,
    refreshProfile
  }), [profile, persona, loading, error, complianceTasks, readiness, needsKyc, needsW9, onboardingComplete, refreshProfile]);

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) {
    throw new Error('useProfile must be used within ProfileProvider');
  }
  return ctx;
}
