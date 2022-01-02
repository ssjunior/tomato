import { createAction, createSlice } from "@reduxjs/toolkit";

import { INITIAL_STATE } from "./state";

export const ACTIONS = {
  fetch: {
    get: createAction("fetch/get"),
    patch: createAction("fetch/patch"),
    post: createAction("fetch/post"),
    delete: createAction("fetch/delete"),
  },
};

export const REDUCERS = {};
const SLICES = {};

const changeState = (state, values, custom) => {
  custom
    ? custom(state, values)
    : Object.keys(values).forEach((key) => (state[key] = values[key]));
};

Object.keys(INITIAL_STATE).forEach((name) => {
  const slice = createSlice({
    name,
    initialState: INITIAL_STATE[name],
    reducers: {
      changeState: (state, { type, payload }) => {
        changeState(state, payload);
      },
    },
  });

  ACTIONS[name] = slice.actions;
  REDUCERS[name] = slice.reducer;
  SLICES[name] = slice;
});

export const initState = (initialState) => {
  Object.keys(initialState).forEach((name) => {
    const slice = createSlice({
      name,
      initialState: initialState[name],
      reducers: {
        changeState: (state, { type, payload }) => {
          changeState(state, payload);
        },
      },
    });

    ACTIONS[name] = slice.actions;
    REDUCERS[name] = slice.reducer;
    SLICES[name] = slice;
  });
  console.log(REDUCERS);
};
