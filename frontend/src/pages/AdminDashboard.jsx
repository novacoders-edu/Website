import React, { useState, useEffect } from 'react';
import MemberManagement from '../components/admin/MemberManagement';
import MessageManagement from '../components/admin/MessageManagement';
import ContactManagement from '../components/admin/ContactManagement';
import DashboardStats from '../components/admin/DashboardStats';
import LogoutButton from '../components/LogoutButton';
import { memberAPI, messageAPI, contactAPI } from '../utils/api';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({
    members: { total: 0, recent: 0 },
    messages: { total: 0, unread: 0 },
    contacts: { total: 0, recent: 0 }
  });

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'members', label: 'Members', icon: '👥' },
    { id: 'contacts', label: 'Contacts', icon: '📞' },
    { id: 'messages', label: 'Messages', icon: '💬' }
  ];

  const fetchStats = async () => {
    try {
      // Fetch basic stats from each API
      const [memberResult, messageResult, contactResult] = await Promise.all([
        memberAPI.getAll({ limit: 1 }),
        messageAPI.getStats().catch(() => ({ success: false })),
        contactAPI.getAll({ limit: 1 })
      ]);

      // Process member stats
      const memberStats = {
        total: memberResult.success ? memberResult.data.pagination?.totalRecords || 0 : 0,
        recentMembers: 0, // You can implement this based on date filtering
        statusBreakdown: [], // You can implement this with aggregation
        experienceBreakdown: [] // You can implement this with aggregation
      };

      // Process contact stats
      const contactStats = {
        total: contactResult.success ? contactResult.data.pagination?.totalRecords || 0 : 0,
        recentContacts: 0, // You can implement this based on date filtering
        statusBreakdown: [] // You can implement this with aggregation
      };

      // Process message stats (if available)
      const messageStats = messageResult.success ? messageResult.data : {
        total: 0,
        unread: 0,
        recentMessages: 0,
        statusBreakdown: []
      };

      setStats({
        members: memberStats,
        messages: messageStats,
        contacts: contactStats
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <div className="bg-slate-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-white">Nova Coders Admin</h1>
              <p className="text-gray-400 mt-1">Manage your community platform</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-400">Welcome back</p>
                <p className="text-white font-medium">
                  {localStorage.getItem('userEmail') || 'Administrator'}
                </p>
              </div>
              <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">
                  {(localStorage.getItem('userEmail') || 'A')[0].toUpperCase()}
                </span>
              </div>
              <LogoutButton className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">
                Logout
              </LogoutButton>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-slate-900/50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-cyan-500 text-cyan-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
                {tab.id === 'messages' && stats.messages.unread > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {stats.messages.unread}
                  </span>
                )}
                {tab.id === 'contacts' && stats.contacts.statusBreakdown?.find(s => s._id === 'new')?.count > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {stats.contacts.statusBreakdown.find(s => s._id === 'new').count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <DashboardStats stats={stats} onRefresh={fetchStats} />
        )}
        {activeTab === 'members' && (
          <MemberManagement onStatsUpdate={fetchStats} />
        )}
        {activeTab === 'contacts' && (
          <ContactManagement onStatsUpdate={fetchStats} />
        )}
        {activeTab === 'messages' && (
          <MessageManagement onStatsUpdate={fetchStats} />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;