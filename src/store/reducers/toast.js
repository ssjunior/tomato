import { createAction } from "@reduxjs/toolkit";

import { uuidv4 } from "../../util";

export const toastActions = {
  add: createAction("toast/add"),
  remove: createAction("toast/remove"),
};

const add = (state, { payload: { message, type, autoClose, uuid } }) => {
  if (!uuid) {
    uuid = uuidv4();
  }
  state.push({ message, type, uuid, autoClose });
  return state;
};

const remove = (state, { payload }) => {
  const index = state.findIndex((toast) => toast.uuid === payload);
  state.splice(index, 1);
};

export const toastReducers = { add, remove };
