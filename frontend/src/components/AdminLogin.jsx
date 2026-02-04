import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './ui/Button';
import InputField from './ui/InputField';
import { authAPI } from '../utils/api';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await authAPI.login(credentials);
      
      if (result.success) {
        // Store user session data
        const userData = result.data.data || result.data;
        
        localStorage.setItem('userEmail', userData.email || credentials.email);
        localStorage.setItem('userRole', userData.role || 'user');
        localStorage.setItem('token', userData.token || 'authenticated');
        localStorage.setItem('userId', userData._id || userData.id);
        
        // Check if user is admin
        const isAdmin = userData.role === 'admin' || 
                       userData.email?.includes('admin') || 
                       userData.email === 'novacoder007@gmail.com';
        
        if (isAdmin) {
          localStorage.setItem('userRole', 'admin');
          navigate('/admin');
        } else {
          setError('Admin privileges required to access this area');
        }
      } else {
        setError(result.error?.message || 'Invalid credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-slate-800 rounded-xl p-8 border border-gray-700">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Admin Login</h2>
            <p className="text-gray-400">
              Access the Nova Coders admin dashboard
            </p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 mb-6">
              <p className="text-red-400 text-center">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              label="Admin Email"
              type="email"
              placeholder="admin@novacoders.com"
              value={credentials.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
            />

            <InputField
              label="Password"
              type="password"
              placeholder="Enter admin password"
              value={credentials.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              required
            />

            <Button
              type="submit"
              variant="secondary"
              className="w-full justify-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing In...
                </>
              ) : (
                'Sign In to Admin Panel'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Use your registered admin account to access the dashboard
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;