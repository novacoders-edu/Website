import { createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI } from "../utils/api";
import { setLoading, setUsers, setCurrentUser, setError } from "./userSlice";
import {
  loginSuccess,
  loginFailure,
  setLoading as setAuthLoading,
} from "./authSlice";

// Auth Actions
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setAuthLoading(true));
      const result = await authAPI.login(credentials);

      if (result.success) {
        const { token, user } = result.data || {};
        dispatch(loginSuccess({ token, user }));
        return { token, user };
      } else {
        dispatch(loginFailure(result.error?.message || "Login failed"));
        return rejectWithValue(result.error?.message || "Login failed");
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Network error";
      dispatch(loginFailure(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setAuthLoading(true));
      const result = await authAPI.register(userData);

      if (result.success) {
        const responseData = result.data.data || result.data;
        if (responseData.token) {
          dispatch(
            loginSuccess({
              token: responseData.token,
              user: responseData,
            })
          );
        }
        return result;
      } else {
        dispatch(loginFailure(result.error?.message || "Registration failed"));
        return rejectWithValue(result.error?.message || "Registration failed");
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Network error";
      dispatch(loginFailure(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

// User Actions
export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      // Replace with your actual API endpoint
      const response = await fetch("/api/users");

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      dispatch(setUsers(data));
      return data;
    } catch (error) {
      const errorMessage = error.message || "Failed to fetch users";
      dispatch(setError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  "user/fetchCurrentUser",
  async (userId, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      // Replace with your actual API endpoint
      const response = await fetch(`/api/users/${userId}`);

      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }

      const data = await response.json();
      dispatch(setCurrentUser(data));
      return data;
    } catch (error) {
      const errorMessage = error.message || "Failed to fetch user";
      dispatch(setError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);
