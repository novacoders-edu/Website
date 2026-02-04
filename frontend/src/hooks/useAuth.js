import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { initializeAuth, logout } from '../store/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user, token, loading, error } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    // Initialize auth state from localStorage on app start
    dispatch(initializeAuth());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return {
    isAuthenticated,
    user,
    token,
    loading,
    error,
    logout: handleLogout,
  };
};

export default useAuth;