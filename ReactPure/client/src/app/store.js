import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/user/usserSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
