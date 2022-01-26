import { FETCH } from "./fetch";

export const fetchMiddleware =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (action.type.startsWith("fetch")) {
      return FETCH[action.type]({ dispatch, getState, ...action.payload });
    }
    return next(action);
  };
