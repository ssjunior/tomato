import { createAction, createSlice } from "@reduxjs/toolkit";

import { INITIAL_STATE } from "./initialState.js";

import { toastActions, toastReducers } from "./reducers/toast";

export const ACTIONS = {
  toast: toastActions,
  fetch: {
    get: createAction("fetch/get"),
    patch: createAction("fetch/patch"),
    post: createAction("fetch/post"),
    delete: createAction("fetch/delete"),
  },
};

export const REDUCERS = {
  toast: toastReducers,
};

const SLICES = {};

const changeState = (state, values, custom) => {
  custom
    ? custom(state, values)
    : Object.keys(values).forEach((key) => (state[key] = values[key]));
};

// Estado default do sistema
Object.keys(INITIAL_STATE).forEach((name) => {
  let reducers = {
    changeState: (state, { payload }) => {
      changeState(state, payload);
    },
  };

  //reducers personalizados
  if (REDUCERS[name]) {
    reducers = { ...reducers, ...REDUCERS[name] };
  }

  const slice = createSlice({
    name,
    initialState: INITIAL_STATE[name],
    reducers,
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
        changeState: (state, { payload }) => {
          changeState(state, payload);
        },
      },
    });

    ACTIONS[name] = slice.actions;
    REDUCERS[name] = slice.reducer;
    SLICES[name] = slice;
  });
};

// REDUCERS["toast"] = toastReducers;
