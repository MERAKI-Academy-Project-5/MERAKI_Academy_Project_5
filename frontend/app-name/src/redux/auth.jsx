import { createSlice } from "@reduxjs/toolkit";
import { roles } from "./roles";
export const auth = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    userid: localStorage.getItem("userid") || null,
    role: localStorage.getItem("role")
      ? Number(localStorage.getItem("role"))
      : null,
    isLoggedIn: localStorage.getItem("token") ? true : false,
  },

  reducers: {
    login: (state, action) => {
        const { token, role, userId } = action.payload;

      state.token = token;
      state.role = (role);
      state.userid = userId;
      state.isLoggedIn = true;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", userId);
    },
    setUserId: (state, action) => {
      (state.userid = action.payload),
        localStorage.setItem("userId", action.payload);
    },
    logout: (state) => {
      (state.token = null),
        (state.userid = null),
        (state.isLoggedIn = false),
          state.role = null;
        localStorage.clear();
    },
  },
});
export const { login, logout, setUserId } = auth.actions;
export default auth.reducer;
