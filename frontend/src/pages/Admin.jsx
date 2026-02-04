import React from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import AdminDashboard from './AdminDashboard';

const Admin = () => {
  return (
    <ProtectedRoute requireAdmin={true}>
      <AdminDashboard />
    </ProtectedRoute>
  );
};

export default Admin;