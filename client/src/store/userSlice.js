import { createSlice } from "@reduxjs/toolkit";

// Initialize token from localStorage
const tokenFromStorage = localStorage.getItem("token") || null;

const initialState = {
  firstName: null,
  lastName: null,
  email: null,
  role: null,
  token: tokenFromStorage,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      // Accept all fields from backend response
      const { firstName, lastName, email, role, token } = action.payload;
      state.firstName = firstName;
      state.lastName = lastName;
      state.email = email;
      state.role = role;
      state.token = token;
      // Persist only token
      localStorage.setItem("token", token);
    },
    clearUser: (state) => {
      state.firstName = null;
      state.lastName = null;
      state.email = null;
      state.role = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
