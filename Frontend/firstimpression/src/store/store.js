// src/redux/store.js

import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../Components/AuthPage/redux/slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
