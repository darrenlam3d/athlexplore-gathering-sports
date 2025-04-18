
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { isUserRoleLoaded } from '@/utils/roleUtils';
import { Loader2 } from 'lucide-react';
import { isDemoMode } from '@/lib/supabase';

interface RouteGuardProps {
  children: React.ReactNode;
  requiredRole?: 'athlete' | 'scout' | 'coach';
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children, requiredRole }) => {
  const { role, user, loading } = useAuth();
  const location = useLocation();

  // Define public routes that don't require authentication
  const publicPaths = ['/', '/login', '/login-demo', '/registration'];
  const isPublicPath = publicPaths.includes(location.pathname);

  // Show loading state
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-athlex-accent" />
        <span className="ml-2 text-lg">Loading authentication...</span>
      </div>
    );
  }

  // Allow access to public paths without authentication
  if (isPublicPath) {
    // If user is authenticated and trying to access login/registration, redirect to dashboard
    if (user) {
      if (role === 'athlete') return <Navigate to="/athlete/dashboard" replace />;
      if (role === 'scout') return <Navigate to="/scout/dashboard" replace />;
      if (role === 'coach') return <Navigate to="/coach/dashboard" replace />;
    }
    return <>{children}</>;
  }

  // Check authentication for protected routes
  if (!isDemoMode() && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If no specific role is required, render the children
  if (!requiredRole) {
    return <>{children}</>;
  }

  // Check if role is loaded and if it matches the required role
  if (isUserRoleLoaded(role) && role !== requiredRole) {
    // Redirect to the appropriate dashboard based on the user's role
    if (role === 'athlete') {
      return <Navigate to="/athlete/dashboard" replace />;
    } else if (role === 'scout') {
      return <Navigate to="/scout/dashboard" replace />;
    } else if (role === 'coach') {
      return <Navigate to="/coach/dashboard" replace />;
    }
    // If no valid role, redirect to login
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default RouteGuard;
