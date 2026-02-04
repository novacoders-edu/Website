import React, { useState, useEffect } from 'react';
import { memberAPI } from '../../utils/api';

const MemberManagement = ({ onStatsUpdate }) => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    search: '',
    page: 1,
    limit: 10
  });
  const [pagination, setPagination] = useState({});

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    inactive: 'bg-gray-100 text-gray-800'
  };

  const experienceLabels = {
    beginner: 'Beginner (0-1 years)',
    intermediate: 'Intermediate (1-3 years)',
    advanced: 'Advanced (3+ years)',
    professional: 'Professional (5+ years)'
  };

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.status) params.status = filters.status;
      if (filters.search) params.search = filters.search;
      params.page = filters.page;
      params.limit = filters.limit;

      const result = await memberAPI.getAll(params);

      if (result.success) {
        setMembers(result.data.members);
        setPagination(result.data.pagination);
      }
    } catch (error) {
      console.error('Failed to fetch members:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateMemberStatus = async (memberId, newStatus) => {
    try {
      const result = await memberAPI.updateStatus(memberId, newStatus);

      if (result.success) {
        fetchMembers();
        onStatsUpdate();
        if (selectedMember && selectedMember._id === memberId) {
          setSelectedMember(result.data.member);
        }
      }
    } catch (error) {
      console.error('Failed to update member status:', error);
    }
  };

  useEffect(() => {
    fetchMembers();
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
          <h2 className="text-2xl font-bold text-white">Member Management</h2>
          <p className="text-gray-400 mt-1">Manage community members and their status</p>
        </div>
        <button
          onClick={fetchMembers}
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
        >
          Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="bg-slate-800 rounded-xl p-6 border border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Search</label>
            <input
              type="text"
              placeholder="Search by name, email, or university..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="w-full bg-slate-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="w-full bg-slate-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="inactive">Inactive</option>
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

      {/* Members Table */}
      <div className="bg-slate-800 rounded-xl border border-gray-700 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500 mx-auto"></div>
            <p className="text-gray-400 mt-2">Loading members...</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Member
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      University
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Experience
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Joined
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {members.map((member) => (
                    <tr key={member._id} className="hover:bg-slate-700/50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-white">{member.fullName}</div>
                          <div className="text-sm text-gray-400">{member.email}</div>
                          <div className="text-xs text-gray-500">{member.membershipId}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">{member.university}</div>
                        <div className="text-xs text-gray-500">{member.year} Year</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">
                          {experienceLabels[member.experience] || member.experience}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[member.status]}`}>
                          {member.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {new Date(member.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button
                          onClick={() => setSelectedMember(member)}
                          className="text-cyan-400 hover:text-cyan-300"
                        >
                          View
                        </button>
                        {member.status === 'pending' && (
                          <>
                            <button
                              onClick={() => updateMemberStatus(member._id, 'approved')}
                              className="text-green-400 hover:text-green-300"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => updateMemberStatus(member._id, 'rejected')}
                              className="text-red-400 hover:text-red-300"
                            >
                              Reject
                            </button>
                          </>
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

      {/* Member Detail Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-bold text-white">Member Details</h3>
                <button
                  onClick={() => setSelectedMember(null)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-400">Full Name</label>
                    <p className="text-white">{selectedMember.fullName}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Email</label>
                    <p className="text-white">{selectedMember.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Phone</label>
                    <p className="text-white">{selectedMember.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Membership ID</label>
                    <p className="text-white">{selectedMember.membershipId}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400">University</label>
                  <p className="text-white">{selectedMember.university}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-400">Year</label>
                    <p className="text-white">{selectedMember.year}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Experience</label>
                    <p className="text-white">{experienceLabels[selectedMember.experience]}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400">Tech Interests</label>
                  <p className="text-white">{selectedMember.interests}</p>
                </div>

                <div>
                  <label className="text-sm text-gray-400">Motivation</label>
                  <p className="text-white">{selectedMember.motivation}</p>
                </div>

                {(selectedMember.github || selectedMember.linkedin) && (
                  <div>
                    <label className="text-sm text-gray-400">Social Links</label>
                    <div className="space-y-1">
                      {selectedMember.github && (
                        <p className="text-cyan-400">
                          <a href={selectedMember.github} target="_blank" rel="noopener noreferrer">
                            GitHub: {selectedMember.github}
                          </a>
                        </p>
                      )}
                      {selectedMember.linkedin && (
                        <p className="text-cyan-400">
                          <a href={selectedMember.linkedin} target="_blank" rel="noopener noreferrer">
                            LinkedIn: {selectedMember.linkedin}
                          </a>
                        </p>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                  <div>
                    <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${statusColors[selectedMember.status]}`}>
                      {selectedMember.status}
                    </span>
                  </div>
                  <div className="space-x-2">
                    {selectedMember.status !== 'approved' && (
                      <button
                        onClick={() => updateMemberStatus(selectedMember._id, 'approved')}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                      >
                        Approve
                      </button>
                    )}
                    {selectedMember.status !== 'rejected' && (
                      <button
                        onClick={() => updateMemberStatus(selectedMember._id, 'rejected')}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                      >
                        Reject
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberManagement;