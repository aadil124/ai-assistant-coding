import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FullPageLoader } from './Loader';

/**
 * GuestRoute: Redirects already-authenticated users to their dashboards.
 */
export function GuestRoute({ children }) {
  const { isAuthenticated, role, loading } = useAuth();

  if (loading) {
    return <FullPageLoader message="Restoring auth state..." />;
  }

  if (isAuthenticated) {
    if (role === 'patient') {
      return <Navigate to="/patient/dashboard" replace />;
    } else if (role === 'doctor') {
      return <Navigate to="/doctor/dashboard" replace />;
    } else if (role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return children;
}

/**
 * ProtectedRoute: Requires authentication to view dashboard layouts.
 */
export function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <FullPageLoader message="Checking platform keys..." />;
  }

  if (!isAuthenticated) {
    // Save target path to redirect back after sign-in completes
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

/**
 * PatientRoute: Restricts access to role 'patient'.
 */
export function PatientRoute({ children }) {
  const { isAuthenticated, role, loading } = useAuth();

  if (loading) {
    return <FullPageLoader message="Verifying patient files..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role !== 'patient') {
    return <Navigate to="/forbidden" replace />;
  }

  return children;
}

/**
 * DoctorRoute: Restricts access to role 'doctor'.
 */
export function DoctorRoute({ children }) {
  const { isAuthenticated, role, loading } = useAuth();

  if (loading) {
    return <FullPageLoader message="Checking provider files..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role !== 'doctor') {
    return <Navigate to="/forbidden" replace />;
  }

  return children;
}

/**
 * AdminRoute: Restricts access to role 'admin'.
 */
export function AdminRoute({ children }) {
  const { isAuthenticated, role, loading } = useAuth();

  if (loading) {
    return <FullPageLoader message="Verifying terminal keys..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role !== 'admin') {
    return <Navigate to="/forbidden" replace />;
  }

  return children;
}
