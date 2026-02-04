import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { memberAPI } from '../utils/api';

const initialState = {
  members: [],
  member: null,
  loading: false,
  error: null,
};

export const joinMember = createAsyncThunk(
  'member/join',
  async (memberData, { rejectWithValue }) => {
    try {
      const result = await memberAPI.register(memberData);
      if (result.success) return result.data;
      return rejectWithValue(result.error || 'Failed to join member');
    } catch (err) {
      return rejectWithValue(err?.response?.data || err.message || String(err));
    }
  }
);

export const fetchMembers = createAsyncThunk(
  'member/fetchAll',
  async (params, { rejectWithValue }) => {
    try {
      const result = await memberAPI.getAll(params);
      if (result.success) return result.data;
      return rejectWithValue(result.error || 'Failed to fetch members');
    } catch (err) {
      return rejectWithValue(err?.response?.data || err.message || String(err));
    }
  }
);

const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(joinMember.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(joinMember.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload;
        if (payload?.member) {
          state.members.push(payload.member);
          state.member = payload.member;
        } else if (Array.isArray(payload)) {
          state.members = payload;
        } else {
          state.member = payload;
        }
      })
      .addCase(joinMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error?.message;
      })
      .addCase(fetchMembers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMembers.fulfilled, (state, action) => {
        state.loading = false;
        state.members = action.payload?.members || action.payload || [];
      })
      .addCase(fetchMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error?.message;
      });
  },
});

export const { clearError } = memberSlice.actions;
export default memberSlice.reducer;
