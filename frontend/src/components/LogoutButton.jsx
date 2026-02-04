import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { authAPI } from '../utils/api';

const LogoutButton = ({ className = '', children }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      // Call logout API
      await authAPI.logout();
      
      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userId');
      
      // Update redux state
      dispatch(logout());

      // Redirect to login page
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // Even if API call fails, clear local data and redirect
      localStorage.clear();
      dispatch(logout());
      navigate('/login');
    }
  };

  return (
    <button
      onClick={handleLogout}
      className={`text-red-400 hover:text-red-300 transition-colors duration-200 ${className}`}
    >
      {children || 'Logout'}
    </button>
  );
};

export default LogoutButton;