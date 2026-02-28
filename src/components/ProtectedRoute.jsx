import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    // Check token on mount and when location changes
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('role');
    
    console.log('ProtectedRoute check:', { token, role, pathname: location.pathname });
    
    // Only allow if token exists and role is admin
    if (token && role === 'admin') {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [location]);

  // While checking auth status, don't render anything to prevent flash
  if (isAuthenticated === null) {
    return null;
  }

  if (!isAuthenticated) {
    console.warn('Access denied - redirecting to login from:', location.pathname);
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
