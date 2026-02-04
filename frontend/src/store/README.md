# Redux Store Documentation

## Overview
This Redux store manages the application's global state using Redux Toolkit. It includes authentication and user management functionality.

## Store Structure

### Auth Slice (`authSlice.jsx`)
Manages authentication state including:
- `isAuthenticated`: Boolean indicating if user is logged in
- `user`: Current user object
- `token`: Authentication token
- `loading`: Loading state for auth operations
- `error`: Error messages from auth operations

### User Slice (`userSlice.jsx`)
Manages user data including:
- `users`: Array of all users
- `currentUser`: Currently selected user
- `loading`: Loading state for user operations
- `error`: Error messages from user operations

## Usage Examples

### 1. Using Redux in Components

```jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, logout } from '../store/userActions';
import { selectIsAuthenticated, selectCurrentUser } from '../store/selectors';

const MyComponent = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectCurrentUser);

  const handleLogin = (credentials) => {
    dispatch(loginUser(credentials));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user?.fullName}!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button onClick={() => handleLogin({ email, password })}>
          Login
        </button>
      )}
    </div>
  );
};
```

### 2. Using the Custom Hook

```jsx
import React from 'react';
import { useAuth } from '../hooks/useAuth';

const AuthComponent = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Hello, {user?.fullName}!</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <p>Please log in</p>
      )}
    </div>
  );
};
```

### 3. Dispatching Actions

```jsx
import { useDispatch } from 'react-redux';
import { registerUser, fetchUsers } from '../store/userActions';

const dispatch = useDispatch();

// Register a new user
dispatch(registerUser({
  userName: 'john_doe',
  email: 'john@example.com',
  password: 'password123',
  fullName: 'John Doe'
}));

// Fetch all users
dispatch(fetchUsers());
```

## Available Actions

### Auth Actions
- `loginUser(credentials)`: Login with email and password
- `registerUser(userData)`: Register a new user
- `logout()`: Logout current user
- `clearError()`: Clear auth errors
- `updateProfile(userData)`: Update user profile

### User Actions
- `fetchUsers()`: Fetch all users
- `fetchCurrentUser(userId)`: Fetch specific user
- `setUsers(users)`: Set users array
- `updateUser(userData)`: Update user data

## Selectors
Use selectors for consistent state access:

```jsx
import { 
  selectIsAuthenticated, 
  selectCurrentUser, 
  selectUsers 
} from '../store/selectors';

const isAuth = useSelector(selectIsAuthenticated);
const user = useSelector(selectCurrentUser);
const users = useSelector(selectUsers);
```

## Local Storage Integration
The auth slice automatically syncs with localStorage:
- `auth_token`: Authentication token
- `auth_user`: User data

This ensures authentication persists across browser sessions.