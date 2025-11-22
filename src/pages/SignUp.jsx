import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function SignUp() {
  const { signUpWithPassword, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({ email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formState.password !== formState.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    setError(null);
    const { data, error: authError } = await signUpWithPassword({
      email: formState.email,
      password: formState.password,
      metadata: { onboarding_completed: false }
    });
    if (authError) {
      setError(authError.message);
    } else {
      navigate('/onboarding', { replace: true, state: { welcome: true } });
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
    <div className="flex min-h-[70vh] items-center justify-center bg-[#fbfcf7] px-4 py-20">
      <div className="relative w-full max-w-lg rounded-[32px] border border-white/70 bg-white/95 p-10 shadow-[0_45px_90px_rgba(15,23,42,0.12)] backdrop-blur">
        <div className="absolute inset-x-6 top-0 h-1 rounded-full bg-gradient-to-r from-[#24b14a] via-[#5fd479] to-[#24b14a] opacity-80" aria-hidden />
        <div className="mt-6 mb-10 space-y-2 text-center">
          <p className="text-[13px] font-semibold uppercase tracking-[0.4em] text-slate-400">rootd access</p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Create your account</h1>
          <p className="text-sm text-slate-500">Invite-only beta. Sign up to access Rootd OS.</p>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-rose-100 bg-rose-50/90 px-4 py-3 text-sm text-rose-800">
            {error}
          </div>
        )}

        <div className="mb-7 rounded-[22px] border border-slate-200 bg-slate-50/60 p-1 text-sm font-semibold text-slate-600">
          <div className="grid grid-cols-2 overflow-hidden rounded-[18px]">
            <button
              type="button"
              onClick={handleGoogle}
              className="flex items-center justify-center border-r border-slate-200/70 bg-white py-2 text-slate-800 transition hover:text-rootd-pine"
            >
              Google
            </button>
            <button
              type="button"
              disabled
              className="flex items-center justify-center bg-transparent py-2 text-slate-400"
            >
              Apple
            </button>
          </div>
          <p className="mt-3 text-center text-[10px] font-semibold tracking-[0.45em] text-slate-300">OR USE YOUR EMAIL</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <label className="block text-left">
            <span className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Email</span>
            <input
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="mt-3 w-full rounded-[18px] border border-slate-200/80 bg-slate-50/70 px-5 py-3.5 text-base text-slate-900 focus:border-rootd-pine focus:bg-white focus:outline-none"
            />
          </label>

          <label className="block text-left">
            <span className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Password</span>
            <input
              type="password"
              name="password"
              value={formState.password}
              onChange={handleChange}
              required
              className="mt-3 w-full rounded-[18px] border border-slate-200/80 bg-slate-50/70 px-5 py-3.5 text-base text-slate-900 focus:border-rootd-pine focus:bg-white focus:outline-none"
            />
          </label>

          <label className="block text-left">
            <span className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Confirm password</span>
            <input
              type="password"
              name="confirmPassword"
              value={formState.confirmPassword}
              onChange={handleChange}
              required
              className="mt-3 w-full rounded-[18px] border border-slate-200/80 bg-slate-50/70 px-5 py-3.5 text-base text-slate-900 focus:border-rootd-pine focus:bg-white focus:outline-none"
            />
          </label>

          <label className="flex items-center gap-3">
            <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-rootd-pine focus:ring-rootd-pine" required />
            <span className="text-sm text-slate-500">I agree to Rootd's terms.</span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-[#24b14a] py-3.5 text-base font-semibold text-white shadow-[0_12px_30px_rgba(21,128,61,0.25)] transition hover:bg-[#18963c] disabled:opacity-60"
          >
            {loading ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-500">
          Already have an account?{' '}
          <Link to="/signin" className="font-semibold text-[#24b14a]">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
