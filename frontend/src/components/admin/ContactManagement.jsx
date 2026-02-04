import React, { useState, useEffect } from 'react';
import { contactAPI } from '../../utils/api';
import { 
  FaEnvelope, 
  FaPhone, 
  FaGlobe, 
  FaEye, 
  FaReply, 
  FaCheck, 
  FaTrash,
  FaFilter,
  FaSearch,
  FaCalendarAlt
} from 'react-icons/fa';

const ContactManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    search: '',
    page: 1,
    limit: 10
  });
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    fetchContacts();
  }, [filters]);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const result = await contactAPI.getAll(filters);
      
      if (result.success) {
        setContacts(result.data.data);
        setPagination(result.data.pagination);
      } else {
        setError(result.error?.message || 'Failed to fetch contacts');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  const updateContactStatus = async (contactId, newStatus) => {
    try {
      const result = await contactAPI.updateStatus(contactId, newStatus);
      
      if (result.success) {
        setContacts(contacts.map(contact => 
          contact._id === contactId 
            ? { ...contact, status: newStatus }
            : contact
        ));
        
        if (selectedContact && selectedContact._id === contactId) {
          setSelectedContact({ ...selectedContact, status: newStatus });
        }
      } else {
        alert('Failed to update status');
      }
    } catch (err) {
      alert('Error updating status');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-500';
      case 'read': return 'bg-yellow-500';
      case 'replied': return 'bg-green-500';
      case 'resolved': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: key !== 'page' ? 1 : value
    }));
  };

  if (loading && contacts.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Contact Management</h2>
          <p className="text-gray-400 mt-1">Manage customer inquiries and messages</p>
        </div>
        <button
          onClick={fetchContacts}
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
        >
          Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="bg-slate-800 rounded-xl p-6 border border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <FaSearch className="inline mr-2" />
              Search
            </label>
            <input
              type="text"
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              placeholder="Search by name or email..."
              className="w-full bg-slate-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <FaFilter className="inline mr-2" />
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="w-full bg-slate-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="">All Status</option>
              <option value="new">New</option>
              <option value="read">Read</option>
              <option value="replied">Replied</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Items per page
            </label>
            <select
              value={filters.limit}
              onChange={(e) => handleFilterChange('limit', parseInt(e.target.value))}
              className="w-full bg-slate-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-500 rounded-lg p-4">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {/* Contacts Table */}
      <div className="bg-slate-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Contact Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Message
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
              {contacts.map((contact) => (
                <tr key={contact._id} className="hover:bg-slate-700/50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-white font-medium">{contact.name}</div>
                      <div className="text-gray-400 text-sm flex items-center mt-1">
                        <FaEnvelope className="mr-1" />
                        {contact.email}
                      </div>
                      <div className="text-gray-400 text-sm flex items-center mt-1">
                        <FaPhone className="mr-1" />
                        {contact.phone}
                      </div>
                      {contact.url && (
                        <div className="text-gray-400 text-sm flex items-center mt-1">
                          <FaGlobe className="mr-1" />
                          <a href={contact.url} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400">
                            Website
                          </a>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-300 max-w-xs">
                      {contact.message ? (
                        <p className="truncate">{contact.message}</p>
                      ) : (
                        <span className="text-gray-500 italic">No message</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${getStatusColor(contact.status)}`}>
                      {contact.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-300 text-sm flex items-center">
                      <FaCalendarAlt className="mr-1" />
                      {formatDate(contact.createdAt)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedContact(contact)}
                        className="text-cyan-400 hover:text-cyan-300 p-1"
                        title="View Details"
                      >
                        <FaEye />
                      </button>
                      
                      {contact.status === 'new' && (
                        <button
                          onClick={() => updateContactStatus(contact._id, 'read')}
                          className="text-yellow-400 hover:text-yellow-300 p-1"
                          title="Mark as Read"
                        >
                          <FaEye />
                        </button>
                      )}
                      
                      {(contact.status === 'new' || contact.status === 'read') && (
                        <button
                          onClick={() => updateContactStatus(contact._id, 'replied')}
                          className="text-green-400 hover:text-green-300 p-1"
                          title="Mark as Replied"
                        >
                          <FaReply />
                        </button>
                      )}
                      
                      {contact.status !== 'resolved' && (
                        <button
                          onClick={() => updateContactStatus(contact._id, 'resolved')}
                          className="text-gray-400 hover:text-gray-300 p-1"
                          title="Mark as Resolved"
                        >
                          <FaCheck />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.total > 1 && (
          <div className="bg-slate-700 px-6 py-3 flex items-center justify-between">
            <div className="text-gray-300 text-sm">
              Showing {((pagination.current - 1) * filters.limit) + 1} to {Math.min(pagination.current * filters.limit, pagination.totalRecords)} of {pagination.totalRecords} results
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleFilterChange('page', pagination.current - 1)}
                disabled={pagination.current === 1}
                className="px-3 py-1 bg-slate-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-500"
              >
                Previous
              </button>
              <span className="px-3 py-1 text-gray-300">
                Page {pagination.current} of {pagination.total}
              </span>
              <button
                onClick={() => handleFilterChange('page', pagination.current + 1)}
                disabled={pagination.current === pagination.total}
                className="px-3 py-1 bg-slate-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-500"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Contact Detail Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Contact Details</h3>
              <button
                onClick={() => setSelectedContact(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                  <p className="text-white">{selectedContact.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${getStatusColor(selectedContact.status)}`}>
                    {selectedContact.status}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                  <p className="text-white">{selectedContact.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Phone</label>
                  <p className="text-white">{selectedContact.phone}</p>
                </div>
              </div>
              
              {selectedContact.url && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Website</label>
                  <a href={selectedContact.url} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">
                    {selectedContact.url}
                  </a>
                </div>
              )}
              
              {selectedContact.message && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                  <div className="bg-slate-700 rounded-lg p-3">
                    <p className="text-white whitespace-pre-wrap">{selectedContact.message}</p>
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Submitted</label>
                  <p className="text-white">{formatDate(selectedContact.createdAt)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Last Updated</label>
                  <p className="text-white">{formatDate(selectedContact.updatedAt)}</p>
                </div>
              </div>
              
              <div className="flex space-x-3 pt-4">
                {selectedContact.status === 'new' && (
                  <button
                    onClick={() => updateContactStatus(selectedContact._id, 'read')}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    Mark as Read
                  </button>
                )}
                
                {(selectedContact.status === 'new' || selectedContact.status === 'read') && (
                  <button
                    onClick={() => updateContactStatus(selectedContact._id, 'replied')}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    Mark as Replied
                  </button>
                )}
                
                {selectedContact.status !== 'resolved' && (
                  <button
                    onClick={() => updateContactStatus(selectedContact._id, 'resolved')}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    Mark as Resolved
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactManagement;