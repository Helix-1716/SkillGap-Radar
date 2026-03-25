import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * ProtectedRoute - Safeguards authenticated routes and the "Welcome" gate.
 * 
 * Logic:
 * 1. Shows a loading spinner while AuthContext is resolving.
 * 2. Checks if the user has "unlocked" the Radar experience (Welcome Page gate).
 * 3. Checks if the user is authenticated via Firebase.
 */
const ProtectedRoute = ({ children, requireUnlock = true }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // 1. Handle initial loading state
  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#030303] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // 2. Handle "Welcome Gate" check (Persistent via localStorage)
  // If the user is authenticated, we assume they've passed the gate
  const isUnlocked = localStorage.getItem('__RADAR_UNLOCKED__') === 'true' || !!user;
  
  if (requireUnlock && !isUnlocked && location.pathname !== '/') {
    return <Navigate to="/" replace />;
  }

  // 3. Handle Firebase Authentication check
  if (!user) {
    // Redirect to login but save the current location to return to after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
