import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { authAPI } from '../utils/api';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // Check if user has a token
      const token = localStorage.getItem('auth_token') || localStorage.getItem('token') || document.cookie.includes('token=');
      
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      // Verify token with backend
      const result = await authAPI.getCurrentUser();
      
      if (result.success) {
        const userData = result.data.data || result.data;
        
        // Update local storage with fresh data
        localStorage.setItem('userEmail', userData.email);
        localStorage.setItem('userRole', userData.role || 'user');
        localStorage.setItem('userId', userData._id || userData.id);
        
        // Check admin status strictly from backend-provided flags/role
        const adminCheck = userData?.isAdmin === true || userData?.role === 'admin';
        
        setIsAuthenticated(true);
        setIsAdmin(adminCheck);
        
        // Update role in localStorage if user is admin
        if (adminCheck) {
          localStorage.setItem('userRole', 'admin');
        }
      } else {
        // Token is invalid, clear storage
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userId');
        setIsAuthenticated(false);
      }
      
    } catch (error) {
      console.error('Auth check failed:', error);
      // Clear storage on error
      localStorage.removeItem('token');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userId');
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-6xl mb-4">🚫</div>
          <h1 className="text-2xl font-bold text-white mb-2">Access Denied</h1>
          <p className="text-gray-400 mb-6">
            You don't have permission to access this page. Admin privileges are required.
          </p>
          <button
            onClick={() => window.history.back()}
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;