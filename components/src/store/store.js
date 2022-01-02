import { configureStore } from "@reduxjs/toolkit";

import { fetchMiddleware } from "../network/middleware";
import { initState, REDUCERS } from "./reducers";

let STORE = {};

export const initStore = ({ reducers = {}, state = {} }) => {
  initState(state);
  console.log({ ...REDUCERS, ...state });
  STORE = configureStore({
    devTools: process.env.NODE_ENV !== "production",
    reducer: { ...REDUCERS, ...reducers },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActionPaths: ["payload.loader"],
        },
      }).concat(fetchMiddleware),
  });
  return STORE;
};

export { STORE };
