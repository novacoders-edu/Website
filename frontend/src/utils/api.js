import axios from "../api/axiosconfig.jsx";

export const authAPI = {
  register: async (userData) => {
    try {
      const resp = await axios.post('/api/auth/register', userData);
      return { success: true, data: resp.data };
    } catch (err) {
      console.error('authAPI.register error', err);
      return { success: false, error: err?.response?.data || err.message || String(err) };
    }
  },
  login: async (credentials) => {
    try {
      const resp = await axios.post('/api/auth/login', credentials);
      return { success: true, data: resp.data };
    } catch (err) {
      console.error('authAPI.login error', err);
      return { success: false, error: err?.response?.data || err.message || String(err) };
    }
  },
  getCurrentUser: async () => {
    try {
      const resp = await axios.get('/api/auth/me');
      return { success: true, data: resp.data };
    } catch (err) {
      console.error('authAPI.getCurrentUser error', err);
      return { success: false, error: err?.response?.data || err.message || String(err) };
    }
  },
  logout: async () => {
    try {
      const resp = await axios.get('/api/auth/logout');
      return { success: true, data: resp.data };
    } catch (err) {
      console.error('authAPI.logout error', err);
      return { success: false, error: err?.response?.data || err.message || String(err) };
    }
  }
};

export const messageAPI = {
  create: async (payload) => {
    try {
      const resp = await axios.post('/messages', payload);
      return { success: true, data: resp.data };
    } catch (err) {
      console.error('messageAPI.create error', err);
      return { success: false, error: err?.response?.data || err.message || String(err) };
    }
  }
};

export const contactAPI = {
  create: async (contactData) => {
    try {
      const resp = await axios.post('/api/contact/create', contactData);
      return { success: true, data: resp.data };
    } catch (err) {
      console.error('contactAPI.create error', err);
      return { success: false, error: err?.response?.data || err.message || String(err) };
    }
  },
  getAll: async (params) => {
    try {
      const resp = await axios.get('/api/contact/all', { params });
      return { success: true, data: resp.data };
    } catch (err) {
      console.error('contactAPI.getAll error', err);
      return { success: false, error: err?.response?.data || err.message || String(err) };
    }
  },
  updateStatus: async (contactId, status) => {
    try {
      const resp = await axios.patch(`/api/contact/${contactId}/status`, { status });
      return { success: true, data: resp.data };
    } catch (err) {
      console.error('contactAPI.updateStatus error', err);
      return { success: false, error: err?.response?.data || err.message || String(err) };
    }
  }
};

export const memberAPI = {
  getAll: async (params) => {
    try {
      const resp = await axios.get('/api/member/all', { params });
      return { success: true, data: resp.data };
    } catch (err) {
      console.error('memberAPI.getAll error', err);
      return { success: false, error: err?.response?.data || err.message || String(err) };
    }
  },
  register: async (memberData) => {
    try {
      const resp = await axios.post('/api/member/join-member', memberData);
      return { success: true, data: resp.data };
    } catch (err) {
      console.error('memberAPI.register error', err);
      return { success: false, error: err?.response?.data || err.message || String(err) };
    }
  },
  updateStatus: async (memberId, status) => {
    try {
      const resp = await axios.patch(`/members/${memberId}/status`, { status });
      return { success: true, data: resp.data };
    } catch (err) {
      console.error('memberAPI.updateStatus error', err);
      return { success: false, error: err?.response?.data || err.message || String(err) };
    }
  }
};

export default { authAPI, messageAPI, memberAPI, contactAPI };

// Additional helpers
memberAPI.getStats = async () => {
  try {
    const resp = await axios.get('/api/member/stats');
    return { success: true, data: resp.data };
  } catch (err) {
    console.error('memberAPI.getStats error', err);
    return { success: false, error: err?.response?.data || err.message || String(err) };
  }
};

messageAPI.getStats = async () => {
  try {
    const resp = await axios.get('/messages/stats');
    return { success: true, data: resp.data };
  } catch (err) {
    console.error('messageAPI.getStats error', err);
    return { success: false, error: err?.response?.data || err.message || String(err) };
  }
};
