import React from 'react';

const DashboardStats = ({ stats, onRefresh }) => {
  const statCards = [
    {
      title: 'Total Members',
      value: stats.members?.total || 0,
      icon: '👥',
      color: 'bg-blue-500',
      change: `+${stats.members?.recentMembers || 0} this month`
    },
    {
      title: 'Pending Members',
      value: stats.members?.statusBreakdown?.find(s => s._id === 'pending')?.count || 0,
      icon: '⏳',
      color: 'bg-yellow-500',
      change: 'Awaiting approval'
    },
    {
      title: 'Total Contacts',
      value: stats.contacts?.total || 0,
      icon: '📞',
      color: 'bg-green-500',
      change: `+${stats.contacts?.recentContacts || 0} today`
    },
    {
      title: 'New Contacts',
      value: stats.contacts?.statusBreakdown?.find(s => s._id === 'new')?.count || 0,
      icon: '📧',
      color: 'bg-red-500',
      change: 'Need attention'
    },
    {
      title: 'Total Messages',
      value: stats.messages?.total || 0,
      icon: '💬',
      color: 'bg-purple-500',
      change: `+${stats.messages?.recentMessages || 0} today`
    },
    {
      title: 'Unread Messages',
      value: stats.messages?.unread || 0,
      icon: '📨',
      color: 'bg-orange-500',
      change: 'Need attention'
    }
  ];

  const memberStatusData = stats.members?.statusBreakdown || [];
  const messageStatusData = stats.messages?.statusBreakdown || [];
  const contactStatusData = stats.contacts?.statusBreakdown || [];
  const experienceData = stats.members?.experienceBreakdown || [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Dashboard Overview</h2>
          <p className="text-gray-400 mt-1">Monitor your community metrics</p>
        </div>
        <button
          onClick={onRefresh}
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center"
        >
          <span className="mr-2">🔄</span>
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {statCards.map((card, index) => (
          <div key={index} className="bg-slate-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">{card.title}</p>
                <p className="text-3xl font-bold text-white mt-2">{card.value}</p>
                <p className="text-gray-500 text-sm mt-1">{card.change}</p>
              </div>
              <div className={`${card.color} p-3 rounded-lg`}>
                <span className="text-2xl">{card.icon}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Member Status Breakdown */}
        <div className="bg-slate-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Member Status</h3>
          <div className="space-y-3">
            {memberStatusData.map((item) => (
              <div key={item._id} className="flex justify-between items-center">
                <span className="text-gray-300 capitalize">{item._id}</span>
                <div className="flex items-center">
                  <div className="w-24 bg-gray-700 rounded-full h-2 mr-3">
                    <div
                      className="bg-cyan-500 h-2 rounded-full"
                      style={{
                        width: `${stats.members?.total ? (item.count / stats.members.total) * 100 : 0}%`
                      }}
                    ></div>
                  </div>
                  <span className="text-white font-medium w-8">{item.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Status Breakdown */}
        <div className="bg-slate-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Contact Status</h3>
          <div className="space-y-3">
            {contactStatusData.map((item) => (
              <div key={item._id} className="flex justify-between items-center">
                <span className="text-gray-300 capitalize">{item._id}</span>
                <div className="flex items-center">
                  <div className="w-24 bg-gray-700 rounded-full h-2 mr-3">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{
                        width: `${stats.contacts?.total ? (item.count / stats.contacts.total) * 100 : 0}%`
                      }}
                    ></div>
                  </div>
                  <span className="text-white font-medium w-8">{item.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Level Breakdown */}
        <div className="bg-slate-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Experience Levels</h3>
          <div className="space-y-3">
            {experienceData.map((item) => (
              <div key={item._id} className="flex justify-between items-center">
                <span className="text-gray-300 capitalize">{item._id}</span>
                <div className="flex items-center">
                  <div className="w-24 bg-gray-700 rounded-full h-2 mr-3">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{
                        width: `${stats.members?.total ? (item.count / stats.members.total) * 100 : 0}%`
                      }}
                    ></div>
                  </div>
                  <span className="text-white font-medium w-8">{item.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Message Categories */}
      <div className="bg-slate-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-4">Message Categories</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {messageStatusData.map((item) => (
            <div key={item._id} className="text-center">
              <div className="bg-slate-700 rounded-lg p-4">
                <p className="text-2xl font-bold text-white">{item.count}</p>
                <p className="text-gray-400 text-sm capitalize mt-1">{item._id}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-slate-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg transition-colors duration-200 text-left">
            <div className="flex items-center">
              <span className="text-2xl mr-3">👥</span>
              <div>
                <p className="font-medium">Review Pending Members</p>
                <p className="text-sm opacity-80">
                  {memberStatusData.find(s => s._id === 'pending')?.count || 0} waiting
                </p>
              </div>
            </div>
          </button>
          
          <button className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg transition-colors duration-200 text-left">
            <div className="flex items-center">
              <span className="text-2xl mr-3">📞</span>
              <div>
                <p className="font-medium">New Contacts</p>
                <p className="text-sm opacity-80">
                  {contactStatusData.find(s => s._id === 'new')?.count || 0} new inquiries
                </p>
              </div>
            </div>
          </button>
          
          <button className="bg-orange-600 hover:bg-orange-700 text-white p-4 rounded-lg transition-colors duration-200 text-left">
            <div className="flex items-center">
              <span className="text-2xl mr-3">📧</span>
              <div>
                <p className="font-medium">Check Messages</p>
                <p className="text-sm opacity-80">
                  {stats.messages?.unread || 0} unread
                </p>
              </div>
            </div>
          </button>
          
          <button className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg transition-colors duration-200 text-left">
            <div className="flex items-center">
              <span className="text-2xl mr-3">📊</span>
              <div>
                <p className="font-medium">Export Data</p>
                <p className="text-sm opacity-80">Download reports</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;