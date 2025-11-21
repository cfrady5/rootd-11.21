import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getSupabase, isSupabaseConfigured } from '../lib/supabaseClient.js';

const AuthContext = createContext(null);

const demoUser = {
  id: 'demo-user',
  email: 'demo@rootd.app',
  user_metadata: {
    persona: 'athlete',
    full_name: 'Jordan Kelly'
  }
};

const PERSONA_KEY = 'rootd_persona';

function readPersonaFromStorage() {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(PERSONA_KEY);
}

function persistPersona(value) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(PERSONA_KEY, value);
}

function derivePersona(user) {
  return user?.user_metadata?.persona || readPersonaFromStorage() || 'athlete';
}

export function AuthProvider({ children }) {
  const supabase = getSupabase();
  const [session, setSession] = useState(null);
  const [persona, setPersona] = useState(() => derivePersona(demoUser));
  const [loading, setLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setSession({ user: demoUser });
      return;
    }

    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session ?? null);
      if (data.session?.user) {
        const derived = derivePersona(data.session.user);
        setPersona(derived);
        persistPersona(derived);
      }
      setLoading(false);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      if (nextSession?.user) {
        const derived = derivePersona(nextSession.user);
        setPersona(derived);
        persistPersona(derived);
      }
      setLoading(false);
    });

    return () => {
      mounted = false;
      authListener.subscription.unsubscribe();
    };
  }, [supabase]);

  const setPersonaPersisted = (value) => {
    setPersona(value);
    persistPersona(value);
  };

  const signInWithOtp = async (email) => {
    if (!isSupabaseConfigured) {
      setSession({ user: { ...demoUser, email } });
      return { data: { user: demoUser }, error: null };
    }
    return supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: window.location.origin } });
  };

  const signInWithPassword = async ({ email, password }) => {
    if (!isSupabaseConfigured) {
      setSession({ user: { ...demoUser, email } });
      return { data: { user: demoUser }, error: null };
    }
    return supabase.auth.signInWithPassword({ email, password });
  };

  const signUpWithPassword = async ({ email, password, metadata }) => {
    if (!isSupabaseConfigured) {
      const nextUser = { ...demoUser, email, user_metadata: { ...demoUser.user_metadata, ...metadata } };
      setSession({ user: nextUser });
      return { data: { user: nextUser }, error: null };
    }
    return supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: metadata
      }
    });
  };

  const signInWithGoogle = async () => {
    if (!isSupabaseConfigured) {
      setSession({ user: { ...demoUser, email: 'google@rootd.demo', user_metadata: { ...demoUser.user_metadata } } });
      return { data: { user: demoUser }, error: null };
    }
    return supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    });
  };

  const signOut = async () => {
    if (!isSupabaseConfigured) {
      setSession(null);
      return { error: null };
    }
    return supabase.auth.signOut();
  };

  const value = useMemo(() => ({
    session,
    user: session?.user ?? demoUser,
    persona,
    setPersona: setPersonaPersisted,
    loading,
    signInWithOtp,
    signInWithPassword,
    signUpWithPassword,
    signInWithGoogle,
    signOut,
    isDemo: !isSupabaseConfigured
  }), [session, persona, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
