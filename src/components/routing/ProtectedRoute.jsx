import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { useProfile } from '../../context/ProfileContext.jsx';
import { getPersonaPortalPath } from '../../lib/personaRoutes.js';
import { LoadingSpinner } from '../director/PremiumComponents.jsx';

export default function ProtectedRoute() {
  const { session, loading } = useAuth();
  const { onboardingComplete, loading: profileLoading, persona } = useProfile();
  const location = useLocation();
  const personaPortalPath = getPersonaPortalPath(persona);

  if (loading || profileLoading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!session?.user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  if (!onboardingComplete && location.pathname !== '/onboarding') {
    return <Navigate to="/onboarding" state={{ from: location }} replace />;
  }

  if (onboardingComplete && location.pathname === '/onboarding') {
    const fallback = location.state?.from?.pathname && location.state.from.pathname !== '/onboarding'
      ? location.state.from.pathname
      : personaPortalPath;
    return <Navigate to={fallback} replace />;
  }

  return <Outlet />;
}
