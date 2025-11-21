import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function SignIn() {
  const { signInWithPassword, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const resolveDestination = (user) => {
    if (!user) return '/onboarding';
    const next = location.state?.from?.pathname;
    const onboardingComplete = Boolean(user.user_metadata?.onboarding_completed);
    if (onboardingComplete) {
      return next && !next.startsWith('/signin') && !next.startsWith('/signup') ? next : '/dashboard';
    }
    return '/onboarding';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const { data, error: authError } = await signInWithPassword(formState);
    if (authError) {
      setError(authError.message);
    } else {
      navigate(resolveDestination(data?.user), { replace: true });
    }
    setLoading(false);
  };

  const handleGoogle = async () => {
    setError(null);
    const { error: googleError } = await signInWithGoogle();
    if (googleError) {
      setError(googleError.message);
    } else {
      navigate('/onboarding', { replace: true });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-rootd-cream px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-rootd">
        <div className="mb-8 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Rootd Access</p>
          <h1 className="mt-3 font-display text-3xl text-slate-900">Sign in</h1>
          <p className="mt-2 text-sm text-slate-500">Welcome back. Pick up right where you left off.</p>
        </div>

        {error && (
          <div className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block text-left">
            <span className="text-sm font-semibold text-slate-600">Email</span>
            <input
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-rootd-pine focus:outline-none"
            />
          </label>

          <label className="block text-left">
            <span className="text-sm font-semibold text-slate-600">Password</span>
            <input
              type="password"
              name="password"
              value={formState.password}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-rootd-pine focus:outline-none"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-rootd-pine py-3 text-sm font-semibold text-white transition hover:bg-rootd-pine-dark disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-300">
          <span className="h-px flex-1 bg-slate-200" />
          Or
          <span className="h-px flex-1 bg-slate-200" />
        </div>

        <button
          type="button"
          onClick={handleGoogle}
          className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:border-slate-300"
        >
          <span className="h-5 w-5 rounded-full bg-slate-200" aria-hidden />
          Sign in with Google
        </button>

        <p className="mt-6 text-center text-sm text-slate-500">
          Need an account?{' '}
          <Link to="/signup" className="font-semibold text-rootd-pine">Create one</Link>
        </p>
      </div>
    </div>
  );
}
