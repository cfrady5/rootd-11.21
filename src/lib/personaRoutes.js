const personaDestinations = {
  athlete: '/athlete',
  director: '/director',
  business: '/dashboard'
};

export function getPersonaPortalPath(persona) {
  if (!persona) return personaDestinations.business;
  return personaDestinations[persona] ?? personaDestinations.business;
}

export function extractPersonaFromUser(user, fallback) {
  return user?.user_metadata?.persona ?? fallback ?? 'business';
}
