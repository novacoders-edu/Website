import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

const AuthStatus = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  if (loading) {
    return <div className="text-gray-400">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div className="text-gray-400">Not authenticated</div>;
  }

  return (
    <div className="flex items-center gap-4 text-white">
      <span>Welcome, {user?.fullName || user?.userName || 'User'}!</span>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
      >
        Logout
      </button>
    </div>
  );
};

export default AuthStatus;