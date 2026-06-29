import { configureStore } from "@reduxjs/toolkit";
import AppReducer from "../fetures/Slice";

export const Store = configureStore({
  reducer: {
    app: AppReducer,
  },
});