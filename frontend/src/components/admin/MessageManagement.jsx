import React, { useState, useEffect } from 'react';
import { messageAPI } from '../../utils/api';

const MessageManagement = ({ onStatsUpdate }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    category: '',
    priority: '',
    page: 1,
    limit: 10
  });
  const [pagination, setPagination] = useState({});

  const statusColors = {
    unread: 'bg-red-100 text-red-800',
    read: 'bg-blue-100 text-blue-800',
    replied: 'bg-green-100 text-green-800',
    resolved: 'bg-purple-100 text-purple-800',
    archived: 'bg-gray-100 text-gray-800'
  };

  const priorityColors = {
    low: 'bg-gray-100 text-gray-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-orange-100 text-orange-800',
    urgent: 'bg-red-100 text-red-800'
  };

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.status) params.status = filters.status;
      if (filters.category) params.category = filters.category;
      if (filters.priority) params.priority = filters.priority;
      params.page = filters.page;
      params.limit = filters.limit;

      const result = await messageAPI.getAll(params);

      if (result.success) {
        setMessages(result.data.messages);
        setPagination(result.data.pagination);
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateMessageStatus = async (messageId, newStatus) => {
    try {
      const result = await messageAPI.updateStatus(messageId, newStatus);

      if (result.success) {
        fetchMessages();
        onStatsUpdate();
        if (selectedMessage && selectedMessage._id === messageId) {
          setSelectedMessage(result.data.message);
        }
      }
    } catch (error) {
      console.error('Failed to update message status:', error);
    }
  };

  const replyToMessage = async (messageId) => {
    if (!replyText.trim()) return;

    try {
      const result = await messageAPI.reply(messageId, {
        content: replyText,
        respondedBy: 'Admin'
      });

      if (result.success) {
        setReplyText('');
        fetchMessages();
        onStatsUpdate();
        setSelectedMessage(result.data.message);
      }
    } catch (error) {
      console.error('Failed to reply to message:', error);
    }
  };

  const viewMessage = async (message) => {
    setSelectedMessage(message);
    
    // Mark as read if unread
    if (message.status === 'unread') {
      await updateMessageStatus(message._id, 'read');
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setFilters(prev => ({ ...prev, page: newPage }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Message Management</h2>
          <p className="text-gray-400 mt-1">Manage community messages and inquiries</p>
        </div>
        <button
          onClick={fetchMessages}
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
        >
          Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="bg-slate-800 rounded-xl p-6 border border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="w-full bg-slate-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="">All Statuses</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
              <option value="replied">Replied</option>
              <option value="resolved">Resolved</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="w-full bg-slate-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="">All Categories</option>
              <option value="general">General</option>
              <option value="support">Support</option>
              <option value="feedback">Feedback</option>
              <option value="partnership">Partnership</option>
              <option value="event">Event</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Priority</label>
            <select
              value={filters.priority}
              onChange={(e) => handleFilterChange('priority', e.target.value)}
              className="w-full bg-slate-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Per Page</label>
            <select
              value={filters.limit}
              onChange={(e) => handleFilterChange('limit', parseInt(e.target.value))}
              className="w-full bg-slate-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
      </div>

      {/* Messages Table */}
      <div className="bg-slate-800 rounded-xl border border-gray-700 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500 mx-auto"></div>
            <p className="text-gray-400 mt-2">Loading messages...</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Sender
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {messages.map((message) => (
                    <tr key={message._id} className="hover:bg-slate-700/50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-white">{message.senderName}</div>
                          <div className="text-sm text-gray-400">{message.senderEmail}</div>
                          {message.memberId && (
                            <div className="text-xs text-cyan-400">Member: {message.memberId.membershipId}</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-300 max-w-xs truncate">{message.subject}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-300 capitalize">{message.category}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${priorityColors[message.priority]}`}>
                          {message.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[message.status]}`}>
                          {message.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {new Date(message.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button
                          onClick={() => viewMessage(message)}
                          className="text-cyan-400 hover:text-cyan-300"
                        >
                          View
                        </button>
                        {message.status !== 'resolved' && (
                          <button
                            onClick={() => updateMessageStatus(message._id, 'resolved')}
                            className="text-green-400 hover:text-green-300"
                          >
                            Resolve
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="bg-slate-700 px-6 py-3 flex items-center justify-between">
                <div className="text-sm text-gray-400">
                  Showing {((pagination.current - 1) * filters.limit) + 1} to {Math.min(pagination.current * filters.limit, pagination.total)} of {pagination.total} results
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handlePageChange(pagination.current - 1)}
                    disabled={pagination.current === 1}
                    className="px-3 py-1 bg-slate-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-500"
                  >
                    Previous
                  </button>
                  <span className="px-3 py-1 text-gray-300">
                    Page {pagination.current} of {pagination.pages}
                  </span>
                  <button
                    onClick={() => handlePageChange(pagination.current + 1)}
                    disabled={pagination.current === pagination.pages}
                    className="px-3 py-1 bg-slate-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-500"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-bold text-white">Message Details</h3>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                {/* Message Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-400">From</label>
                    <p className="text-white">{selectedMessage.senderName}</p>
                    <p className="text-gray-400 text-sm">{selectedMessage.senderEmail}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Date</label>
                    <p className="text-white">{new Date(selectedMessage.createdAt).toLocaleString()}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400">Subject</label>
                  <p className="text-white text-lg">{selectedMessage.subject}</p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm text-gray-400">Category</label>
                    <p className="text-white capitalize">{selectedMessage.category}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Priority</label>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${priorityColors[selectedMessage.priority]}`}>
                      {selectedMessage.priority}
                    </span>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Status</label>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[selectedMessage.status]}`}>
                      {selectedMessage.status}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400">Message</label>
                  <div className="bg-slate-700 rounded-lg p-4 mt-2">
                    <p className="text-white whitespace-pre-wrap">{selectedMessage.message}</p>
                  </div>
                </div>

                {/* Admin Response */}
                {selectedMessage.adminResponse && selectedMessage.adminResponse.content && (
                  <div>
                    <label className="text-sm text-gray-400">Admin Response</label>
                    <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 mt-2">
                      <p className="text-white whitespace-pre-wrap">{selectedMessage.adminResponse.content}</p>
                      <div className="text-sm text-gray-400 mt-2">
                        Replied by {selectedMessage.adminResponse.respondedBy} on {new Date(selectedMessage.adminResponse.respondedAt).toLocaleString()}
                      </div>
                    </div>
                  </div>
                )}

                {/* Reply Section */}
                <div>
                  <label className="text-sm text-gray-400">Reply to Message</label>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your response here..."
                    rows={4}
                    className="w-full bg-slate-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 mt-2"
                  />
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                  <div className="space-x-2">
                    {selectedMessage.status !== 'read' && selectedMessage.status !== 'replied' && (
                      <button
                        onClick={() => updateMessageStatus(selectedMessage._id, 'read')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                      >
                        Mark as Read
                      </button>
                    )}
                    {selectedMessage.status !== 'resolved' && (
                      <button
                        onClick={() => updateMessageStatus(selectedMessage._id, 'resolved')}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
                      >
                        Mark as Resolved
                      </button>
                    )}
                    <button
                      onClick={() => updateMessageStatus(selectedMessage._id, 'archived')}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
                    >
                      Archive
                    </button>
                  </div>
                  <button
                    onClick={() => replyToMessage(selectedMessage._id)}
                    disabled={!replyText.trim()}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Send Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageManagement;