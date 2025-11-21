import { getSupabase, isSupabaseConfigured, supabaseUrl, supabaseAnonKey } from '../supabaseClient.js';
import {
  demoAthlete,
  demoBusiness,
  demoDirector,
  demoComplianceTasks,
  demoMatches,
  demoDeals,
  demoNotifications,
  demoMessages
} from './mockData.js';

const supabase = getSupabase();

// -----------------
// Profile Helpers
// -----------------
export async function fetchPersonaProfile(persona, userId) {
  if (!persona || !userId) return { data: null, error: null };

  if (!isSupabaseConfigured) {
    const demoMap = { athlete: demoAthlete, business: demoBusiness, director: demoDirector };
    return { data: demoMap[persona] ?? null, error: null };
  }

  const table = persona === 'business' ? 'businesses' : persona === 'director' ? 'directors' : 'athletes';
  const key = persona === 'business' ? 'owner_user_id' : 'user_id';
  const { data, error } = await supabase.from(table).select('*').eq(key, userId).single();
  return { data, error };
}

export async function upsertPersonaProfile(persona, payload, userId) {
  if (!persona || !userId) {
    return { data: null, error: new Error('Missing persona or user id') };
  }

  if (!isSupabaseConfigured) {
    return { data: { ...payload, id: `${persona}-demo`, user_id: userId }, error: null };
  }

  const table = persona === 'business' ? 'businesses' : persona === 'director' ? 'directors' : 'athletes';
  const upsertPayload = {
    ...payload,
    [persona === 'business' ? 'owner_user_id' : 'user_id']: userId
  };

  const { data, error } = await supabase.from(table).upsert(upsertPayload).select().single();
  return { data, error };
}

export async function updateProfileDetails(persona, updates, userId) {
  if (!persona || !userId) {
    return { data: null, error: new Error('Missing persona or user id') };
  }

  if (!updates || Object.keys(updates).length === 0) {
    return { data: null, error: new Error('No updates provided') };
  }

  if (!isSupabaseConfigured) {
    return { data: { ...updates }, error: null };
  }

  const table = persona === 'business' ? 'businesses' : persona === 'director' ? 'directors' : 'athletes';
  const key = persona === 'business' ? 'owner_user_id' : 'user_id';
  const { data, error } = await supabase.from(table).update(updates).eq(key, userId).select().single();
  return { data, error };
}

// -----------------
// Matchmaking + Deals
// -----------------
export async function fetchMatches(userId) {
  if (!userId || !isSupabaseConfigured) {
    return { data: demoMatches, error: null };
  }
  const { data, error } = await supabase.rpc('calculate_matches', { p_user_id: userId });
  return { data, error };
}

export async function fetchDeals(persona, userId) {
  if (!userId || !isSupabaseConfigured) {
    return { data: demoDeals, error: null };
  }
  const column = persona === 'business' ? 'business_id' : 'athlete_id';
  const relation = persona === 'business' ? 'businesses' : 'athletes';
  const { data: profile } = await supabase.from(relation).select('id').eq(persona === 'business' ? 'owner_user_id' : 'user_id', userId).single();
  if (!profile) {
    return { data: [], error: null };
  }
  const { data, error } = await supabase
    .from('deals')
    .select('*, business:businesses(name), athlete:athletes(sport, user_id)')
    .eq(column, profile.id)
    .order('created_at', { ascending: false });
  return { data, error };
}

export async function updateDealStatus(dealId, status) {
  if (!isSupabaseConfigured) {
    return { data: { id: dealId, deal_status: status }, error: null };
  }
  const { data, error } = await supabase.from('deals').update({ deal_status: status }).eq('id', dealId).select().single();
  return { data, error };
}

// -----------------
// Compliance + Notifications
// -----------------
export async function fetchComplianceTasks(userId) {
  if (!userId || !isSupabaseConfigured) {
    return { data: demoComplianceTasks, error: null };
  }
  const { data, error } = await supabase
    .from('compliance_logs')
    .select('*')
    .eq('entity_id', userId)
    .order('created_at', { ascending: false });
  return { data, error };
}

export async function fetchNotifications(userId) {
  if (!userId || !isSupabaseConfigured) {
    return { data: demoNotifications, error: null };
  }
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(30);
  return { data, error };
}

export function subscribeToNotificationStream(userId, onPayload) {
  if (!supabase || !userId) {
    return () => {};
  }
  const channel = supabase
    .channel('notifications-channel')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'notifications', filter: `user_id=eq.${userId}` }, (payload) => {
      onPayload(payload.new ?? payload.old);
    })
    .subscribe();
  return () => {
    supabase.removeChannel(channel);
  };
}

// -----------------
// Messaging Drawer
// -----------------
export async function fetchMessages(userId) {
  if (!userId || !isSupabaseConfigured) {
    return { data: demoMessages, error: null };
  }
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(25);
  return { data, error };
}

export async function sendMessage(userId, message) {
  if (!userId) {
    return { data: null, error: new Error('Missing user id') };
  }
  if (!isSupabaseConfigured) {
    return { data: { id: `demo-${Date.now()}`, sender: 'You', body: message, timestamp: 'Just now' }, error: null };
  }
  const { data, error } = await supabase
    .from('messages')
    .insert({ user_id: userId, body: message })
    .select()
    .single();
  return { data, error };
}

// -----------------
// Quiz Functions
// -----------------
export async function submitRootdQuiz(payload) {
  if (!isSupabaseConfigured) {
    return { data: { status: 'queued', payload }, error: null };
  }
  const baseUrl = supabaseUrl || supabase.rest?.url;
  if (!baseUrl) {
    return { data: null, error: new Error('Supabase base URL missing') };
  }
  const url = `${baseUrl}/functions/v1/processQuiz`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: supabaseAnonKey
    },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    return { data: null, error: new Error('Quiz submission failed') };
  }
  const data = await response.json();
  return { data, error: null };
}
