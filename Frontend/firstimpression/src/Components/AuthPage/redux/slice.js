// src/redux/slices/authSlice.js

import { createSlice } from "@reduxjs/toolkit";

import { loginUser } from "../redux/thunk";

const initialState = {
  token: localStorage.getItem("user_token"),
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("user_token");
    },
  },

  extraReducers: (builder) => {
  
    builder.addCase(loginUser.pending, (state) => {

    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    });

    builder.addCase(loginUser.rejected, (state) => {
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
