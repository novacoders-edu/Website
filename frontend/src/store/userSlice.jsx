import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  currentUser: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
      state.loading = false;
      state.error = null;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    updateUser: (state, action) => {
      const updatedUser = action.payload;
      state.users = state.users.map(user => 
        user.id === updatedUser.id ? updatedUser : user
      );
      if (state.currentUser?.id === updatedUser.id) {
        state.currentUser = updatedUser;
      }
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { 
  setLoading, 
  setUsers, 
  setCurrentUser, 
  updateUser, 
  setError, 
  clearError 
} = userSlice.actions;

export default userSlice.reducer;
