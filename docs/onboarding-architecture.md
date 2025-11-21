# Rootd NIL Onboarding & Routing Architecture

> Last updated: 2025-11-19

## Goals
- Gate the premium experience until a user finishes the correct onboarding track (athlete, business owner, or school director).
- Persist onboarding progress in Supabase tables (athletes, businesses, directors) and expose it to the client through a single hook.
- Keep the rest of the app implementation-friendly by providing helpers for profile context, role-aware routing, and status checks.

## Contract at a Glance
- **Auth session source**: Supabase JS client using `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY`.
- **Persona flag**: `session.user.user_metadata.persona` (string `athlete | business | director`). Fallback to `localStorage.getItem('rootd_persona')` while we wait on backend metadata syncing.
- **Onboarding completion**: Derived, not a new column. We mark a track completed once we have a corresponding row in `athletes`, `businesses`, or `directors` for the authed user.
- **Routing enforcement**: `ProtectedRoute` checks `(session && hasCompletedOnboarding)`; otherwise it redirects to `/onboarding` while preserving the intended path in state.

## Building Blocks

### 1. Supabase Client (`src/lib/supabaseClient.js`)
A thin singleton that creates the client and exports helpers for common operations (fetch profile, upsert onboarding payloads, invoke edge functions like `processQuiz`).

### 2. Auth & Profile Contexts
- `AuthProvider` subscribes to supabase auth state, exposes `{ session, user, persona, signIn, signOut }`.
- `ProfileProvider` consumes `AuthContext` and fetches the persona-specific record:
  ```ts
  const queries = {
    athlete: () => supabase.from('athletes').select('*').eq('user_id', user.id).single(),
    business: () => supabase.from('businesses').select('*').eq('owner_user_id', user.id).single(),
    director: () => supabase.from('directors').select('*').eq('user_id', user.id).single()
  };
  ```
- Derived booleans: `isOnboardingComplete`, `needsKyc`, `needsComplianceRefresh`, etc.

### 3. Onboarding Flow (`/onboarding/*`)
A shared layout that hosts persona-specific steps while reusing premium cards/components.

| Track     | Steps                                                                                                         | Table writes |
|-----------|---------------------------------------------------------------------------------------------------------------|--------------|
| Athlete   | Choose sport + school → Compliance readiness & docs (KYC, W9) → Content footprint → Review & submit           | `athletes` + `compliance_logs`
| Business  | Business discovery lookup (Google/Yelp IDs) → Brand tone/risk tags → Budget & campaign types → Review        | `businesses`
| Director  | School selection → Compliance policy upload → Restricted categories + approval workflows → Review             | `directors`, `restricted_categories`

Implementation ideas:
- Stepper state stored in `useReducer` per track.
- Persist partial progress to `localStorage` so a refresh does not lose data.
- Final submit calls the matching Supabase table insert/update using the contextual user id.

### 4. Navigation & Guards
- `App.jsx` will wrap `<Routes>` with both providers and a `RootLayout` containing the premium nav + messaging drawer.
- `ProtectedRoute` ensures everything except `/onboarding` and `/support` is gated.
- `OnboardingGate` component also surfaces which step is incomplete; it can be reused on dashboards to remind users.

### 5. Data Access Layer (`src/lib/api/*.js`)
Create role-focused helpers so UI components never talk to Supabase directly:
- `profileApi`: fetch/update persona profile, upload docs, record compliance events.
- `dealsApi`: CRUD for deals, approvals, documents, ratings.
- `matchesApi`: wraps Supabase RPC `calculate_matches` and Edge Function `generatePersona`.
- `notificationsApi`: leverages `supabase.channel` for realtime alerts or falls back to polling.

Each helper returns `{ data, error }` and throws only on network-level issues.

### 6. Edge-function Hooks
We expect five serverless functions:
1. `processQuiz` – store quiz answers + update athlete config.
2. `generatePersona` – synthesize persona for matching.
3. `calculateMatches` – returns `[{ deal_id, match_score, reasons[] }]`.
4. `updateComplianceScore` – recalculates readiness.
5. `classifyBusiness` – tags risk categories.

Frontend wrappers should live in `src/lib/functions/{name}.js` and call `fetch('/functions/v1/${name}', {...})` with the Supabase service URL + anon key header per Supabase Edge standard.

## Edge Cases & Risks
1. **Persona missing** – show a light-weight selector before onboarding begins and persist the choice to user metadata (when backend update path is ready).
2. **Partial onboarding rows** – treat rows with required null fields as incomplete and resume the wizard at the first missing requirement.
3. **Network failures** – keep optimistic UI minimal; confirm writes succeed before navigating away. Surface inline error banners with retry.
4. **Multi-device** – subscribe to Supabase Realtime on the persona table for the current user so other tabs update instantly when onboarding completes.
5. **Role switching** – if a user belongs to multiple personas, store `activePersona` separately and allow switching via profile menu once all relevant onboarding is complete.

## Next Steps
1. Scaffold the contexts, Supabase client, and onboarding route shell.
2. Replace `src/App.jsx` nav/routes with the protected layout and new pages.
3. Wire the onboarding wizard to table mutations and derived completion checks.
4. Layer in the expanded dashboards (matching, deals, compliance) using the new data helpers.
