import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
export const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase = null;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      detectSessionInUrl: true
    }
  });
} else {
  console.warn('[Rootd] Supabase credentials are missing. The UI will run in demo mode.');
}

export const isSupabaseConfigured = Boolean(supabase);
export function getSupabase() {
  return supabase;
}

export async function withSupabase(fn, fallback) {
  if (!supabase) {
    return { data: fallback ?? null, error: null, source: 'demo' };
  }
  try {
    const data = await fn(supabase);
    return { data, error: null, source: 'remote' };
  } catch (error) {
    console.error('[Rootd] Supabase call failed', error);
    return { data: fallback ?? null, error, source: 'remote' };
  }
}
