import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import DashboardSlice from "./DashboardSlice";
import AuthSlice from "./AuthSlice";

const store = configureStore({
  reducer: {
    dashboard: DashboardSlice,
    auth: AuthSlice,
  },
  middleware: (getDefaultMiddleware) => {
    if (process.env.NODE_ENV !== "production") {
      return getDefaultMiddleware().concat(logger);
    }
    return getDefaultMiddleware();
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
