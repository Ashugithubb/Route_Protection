import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface User {
  fullName: string;
  email: string;
  password: string;
}

interface UserState {
  users: User[];
  currentUser: User | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  users: [],
  currentUser: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signup: (state, action: PayloadAction<User>) => {
      // Save new user
      state.users.push(action.payload);
      state.currentUser = action.payload;
      state.isAuthenticated = true;
    },
    login: (
      state,
      action: PayloadAction<{ email: string; password: string }>
    ) => {
      const { email, password } = action.payload;
      const user = state.users.find(
        (u) => u.email === email && u.password === password
      );
      if (user) {
        state.currentUser = user;
        state.isAuthenticated = true;
      } else {
        state.currentUser = null;
        state.isAuthenticated = false;
      }
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
    },
  },
});

export const { signup, login, logout } = userSlice.actions;
export default userSlice.reducer;
