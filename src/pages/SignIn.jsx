import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { extractPersonaFromUser, getPersonaPortalPath } from '../lib/personaRoutes.js';

export default function SignIn() {
  const { signInWithPassword, signInWithGoogle, persona } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [formState, setFormState] = useState({ email: '', password: '', rememberMe: false });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormState((prev) => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const resolveDestination = (user) => {
    const next = location.state?.from?.pathname;
    // Keep user on the main site shell after auth; only deep-link if they were
    // explicitly trying to access a protected route before signing in.
    if (next && !next.startsWith('/signin') && !next.startsWith('/signup')) {
      return next;
    }
    const resolvedPersona = extractPersonaFromUser(user, persona);
    return getPersonaPortalPath(resolvedPersona);
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
    <div className="auth-card">
      <div className="auth-header">
        <p className="auth-eyebrow">ROOTD ACCESS</p>
        <h1 className="auth-title">Sign in to launch operations</h1>
        <p className="auth-subtitle">Authenticate to unlock dashboards, approvals, and compliance trails.</p>
      </div>

      {error && (
        <div className="auth-error">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-field">
          <label htmlFor="email" className="form-label">Work email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            required
            placeholder="you@university.edu"
            className="form-input"
          />
        </div>

        <div className="form-field">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={formState.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
            className="form-input"
          />
        </div>

        <div className="form-remember">
          <label className="remember-label">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formState.rememberMe}
              onChange={handleChange}
              className="remember-checkbox"
            />
            <span>Remember me</span>
          </label>
          <Link to="/forgot-password" className="forgot-link">Forgot password?</Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="auth-button-primary"
        >
          {loading ? 'Signing in...' : 'Enter workspace'}
        </button>
      </form>

      <div className="auth-divider">
        <span>Or continue with</span>
      </div>

      <div className="oauth-buttons">
        <button
          type="button"
          onClick={handleGoogle}
          className="oauth-button oauth-google"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
            <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853"/>
            <path d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707 0-.593.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z" fill="#FBBC05"/>
            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        <button
          type="button"
          disabled
          className="oauth-button oauth-apple"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
            <path d="M14.94 13.52c-.26.56-.39.81-.73 1.3-.48.69-1.16 1.55-2 1.56-.75.01-0.94-.48-1.96-.48s-1.24.47-1.98.49c-.82.01-1.46-.79-1.94-1.48-1.35-1.93-1.5-4.19-.66-5.39.59-.84 1.53-1.34 2.41-1.34.89 0 1.45.49 2.19.49.71 0 1.14-.49 2.16-.49.77 0 1.63.42 2.23 1.14-1.96 1.08-1.64 3.89.28 4.7zM11.53 3.27c.41-.51.73-1.23.62-1.97-.67.03-1.45.47-1.91 1.01-.41.48-.75 1.21-.62 1.91.73.06 1.48-.39 1.91-.95z"/>
          </svg>
          Continue with Apple
        </button>
      </div>

      <p className="auth-footer-text">
        Don't have an account?{' '}
        <Link to="/signup" className="auth-link">Sign up</Link>
      </p>

      <style jsx>{`
        .auth-card {
          width: 100%;
          max-width: 450px;
          background: white;
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
        }

        .auth-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .auth-eyebrow {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--ink-muted);
          margin: 0 0 12px 0;
        }

        .auth-title {
          font-size: 24px;
          font-weight: 700;
          color: var(--ink);
          margin: 0 0 8px 0;
          line-height: 1.3;
        }

        .auth-subtitle {
          font-size: 14px;
          color: var(--ink-muted);
          margin: 0;
          line-height: 1.5;
        }

        .auth-error {
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #991b1b;
          padding: 12px 16px;
          border-radius: 8px;
          font-size: 14px;
          margin-bottom: 24px;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 24px;
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-label {
          font-size: 14px;
          font-weight: 600;
          color: var(--ink);
        }

        .form-input {
          width: 100%;
          padding: 12px 14px;
          border: 1.5px solid var(--hair);
          border-radius: 8px;
          font-size: 15px;
          color: var(--ink);
          transition: all 0.2s;
        }

        .form-input:focus {
          outline: none;
          border-color: var(--brand-primary);
          box-shadow: 0 0 0 3px rgba(120, 141, 87, 0.1);
        }

        .form-input::placeholder {
          color: #94a3b8;
        }

        .form-remember {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 8px;
        }

        .remember-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: var(--ink-muted);
          cursor: pointer;
        }

        .remember-checkbox {
          width: 16px;
          height: 16px;
          cursor: pointer;
        }

        .forgot-link {
          font-size: 14px;
          color: var(--brand-primary);
          text-decoration: none;
          font-weight: 500;
        }

        .forgot-link:hover {
          text-decoration: underline;
        }

        .auth-button-primary {
          width: 100%;
          height: 48px;
          background: var(--brand-primary);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          margin-top: 8px;
        }

        .auth-button-primary:hover:not(:disabled) {
          background: var(--brand-primary-hover);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(120, 141, 87, 0.3);
        }

        .auth-button-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .auth-divider {
          position: relative;
          text-align: center;
          margin: 24px 0;
        }

        .auth-divider::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          width: 100%;
          height: 1px;
          background: var(--hair);
        }

        .auth-divider span {
          position: relative;
          background: white;
          padding: 0 12px;
          font-size: 13px;
          color: var(--ink-muted);
        }

        .oauth-buttons {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 24px;
        }

        .oauth-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          height: 48px;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .oauth-google {
          background: white;
          border: 1.5px solid var(--hair);
          color: var(--ink);
        }

        .oauth-google:hover:not(:disabled) {
          border-color: #cbd5e1;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }

        .oauth-apple {
          background: #000;
          border: 1.5px solid #000;
          color: white;
        }

        .oauth-apple:hover:not(:disabled) {
          background: #1a1a1a;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .oauth-button:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .auth-footer-text {
          text-align: center;
          font-size: 14px;
          color: var(--ink-muted);
          margin: 0;
        }

        .auth-link {
          color: var(--brand-primary);
          text-decoration: none;
          font-weight: 600;
        }

        .auth-link:hover {
          text-decoration: underline;
        }

        @media (max-width: 640px) {
          .auth-card {
            padding: 24px 20px;
          }

          .auth-title {
            font-size: 20px;
          }

          .form-input,
          .auth-button-primary,
          .oauth-button {
            height: 52px;
          }
        }
      `}</style>
    </div>
  );
}
