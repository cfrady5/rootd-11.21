# Supabase Auth wiring

The marketing sign-in and create-account flows are backed by Supabase Auth whenever `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are configured. This guide captures the minimum steps to get a functional environment.

## 1. Create or reuse a Supabase project
1. Login via the CLI (`supabase login`) or console.
2. Create a project (or use the existing `rootd` instance) and note the project ref. The `supabase link` command in the root (`rootd-clean/supabase`) already targets `fzeapslovsskmrcshnoi`.

## 2. Apply the database schema + RLS
```bash
cd rootd-clean
supabase db push
```
This applies the migrations under `rootd-clean/supabase/migrations`, including the RLS policies that the dashboard expects.

## 3. Configure environment variables
Copy `.env.example` to `.env` and paste your project credentials:
```
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon-public-key>
```
Restart `npm run dev` after editing the file so Vite picks up the new env vars.

## 4. Enable redirect domains
Add `http://localhost:5173` and your production URL to **Auth → URL Configuration** in Supabase. The app uses `window.location.origin` for both password and OAuth redirects.

## 5. Test the flows
1. `npm run dev`
2. Visit `http://localhost:5173/signup`, create an account, and complete onboarding.
3. Sign out and back in via `http://localhost:5173/signin` to confirm sessions persist and `ProtectedRoute` gates `/dashboard` routes.

With these steps, the UI switches from demo mode to live Supabase Auth + data access automatically.
