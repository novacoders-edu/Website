// Auth selectors
export const selectAuth = (state) => state.auth;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectCurrentUser = (state) => state.auth.user;
export const selectAuthToken = (state) => state.auth.token;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;

// Member selectors
export const selectMembers = (state) => state.member.members;
export const selectMember = (state) => state.member.member;
export const selectMemberLoading = (state) => state.member.loading;
export const selectMemberError = (state) => state.member.error;