import { configureStore } from "@reduxjs/toolkit";

import { fetchMiddleware } from "../network/middleware";
import { REDUCERS } from "./reducers";

export const STORE = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: REDUCERS,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ["payload.loader"],
      },
    }).concat(fetchMiddleware),
});
