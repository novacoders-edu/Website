import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, registerUser } from '../store/userActions';
import { logout, clearError } from '../store/authSlice';
import { 
  selectIsAuthenticated, 
  selectCurrentUser, 
  selectAuthLoading, 
  selectAuthError 
} from '../store/selectors';

/**
 * Example component demonstrating Redux usage
 * This shows how to:
 * 1. Access state with useSelector
 * 2. Dispatch actions with useDispatch
 * 3. Use custom selectors
 * 4. Handle loading and error states
 */
const ReduxExample = () => {
  const dispatch = useDispatch();
  
  // Using selectors to access state
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectCurrentUser);
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  // Example: Clear errors on component mount
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleLogin = () => {
    dispatch(loginUser({
      email: 'test@example.com',
      password: 'password123'
    }));
  };

  const handleRegister = () => {
    dispatch(registerUser({
      userName: 'testuser',
      email: 'test@example.com',
      password: 'password123',
      fullName: 'Test User'
    }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg text-white">
      <h2 className="text-2xl font-bold mb-4">Redux Store Example</h2>
      
      {/* Loading State */}
      {loading && (
        <div className="mb-4 p-3 bg-blue-500/20 border border-blue-400/50 rounded">
          Loading...
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-400/50 rounded">
          Error: {error}
        </div>
      )}

      {/* Authentication Status */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Authentication Status:</h3>
        <p>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</p>
        {user && (
          <div className="mt-2">
            <p>User: {user.fullName || user.userName}</p>
            <p>Email: {user.email}</p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="space-x-4">
        {!isAuthenticated ? (
          <>
            <button
              onClick={handleLogin}
              disabled={loading}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 rounded"
            >
              Test Login
            </button>
            <button
              onClick={handleRegister}
              disabled={loading}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 disabled:opacity-50 rounded"
            >
              Test Register
            </button>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded"
          >
            Logout
          </button>
        )}
      </div>

      {/* State Debug Info */}
      <details className="mt-6">
        <summary className="cursor-pointer text-gray-300">
          Debug: View Raw State
        </summary>
        <pre className="mt-2 p-3 bg-gray-900 rounded text-xs overflow-auto">
          {JSON.stringify({ isAuthenticated, user, loading, error }, null, 2)}
        </pre>
      </details>
    </div>
  );
};

export default ReduxExample;