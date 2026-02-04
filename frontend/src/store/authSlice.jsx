import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI } from "../utils/api";

const initialState = {
  isAuthenticated: false,
  user: null,
  token: localStorage.getItem('auth_token') || null,
  loading: false,
  error: null,
};

// Async thunks for auth operations
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const result = await authAPI.login(credentials);
      if (result.success) {
        return result.data;
      }
      return rejectWithValue(result.error?.message || "Login failed");
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || "Network error");
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const result = await authAPI.register(userData);
      if (result.success) {
        return result.data.data || result.data;
      }
      return rejectWithValue(result.error?.message || "Registration failed");
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || "Network error");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { token, user } = action.payload;
      state.isAuthenticated = true;
      state.user = user;
      state.token = token;
      state.loading = false;
      state.error = null;
      if (token) localStorage.setItem('auth_token', token);
      if (user) localStorage.setItem('auth_user', JSON.stringify(user));
    },
    loginFailure: (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = action.payload || "Authentication failed";
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
    },
    setLoading: (state, action) => {
      state.loading = Boolean(action.payload);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      ['auth_token', 'auth_user', 'token', 'userEmail', 'userRole', 'userId'].forEach(key => 
        localStorage.removeItem(key)
      );
    },
    clearError: (state) => {
      state.error = null;
    },
    updateProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem('auth_user', JSON.stringify(state.user));
    },
    initializeAuth: (state) => {
      const token = localStorage.getItem('auth_token');
      const user = localStorage.getItem('auth_user');
      if (token && user) {
        state.isAuthenticated = true;
        state.token = token;
        state.user = JSON.parse(user);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { token, user } = action.payload || {};
        state.isAuthenticated = true;
        state.user = user;
        state.token = token;
        state.loading = false;
        state.error = null;
        if (token) localStorage.setItem('auth_token', token);
        if (user) localStorage.setItem('auth_user', JSON.stringify(user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.loading = false;
        state.error = action.payload;
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload.token) {
          state.isAuthenticated = true;
          state.user = payload;
          state.token = payload.token;
          state.loading = false;
          state.error = null;
          localStorage.setItem('auth_token', payload.token);
          localStorage.setItem('auth_user', JSON.stringify(payload));
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { loginSuccess, loginFailure, setLoading, logout, clearError, updateProfile, initializeAuth } = authSlice.actions;
export default authSlice.reducer;