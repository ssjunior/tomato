import { createActions, handleActions } from "redux-actions";

import { defaultStateForModels } from "store/reducers/initialState";
import { getInitialState } from "store/reducers/initialState.js";
// import { TTL } from "config/constants";

export const editActions = createActions({
  CLEAN: (modelId) => ({ modelId }),

  EDIT: (modelId) => ({
    modelId
  }),

  SAVE: (modelId, name, data) => ({
    name,
    modelId,
    data
  }),

  SAVE_NEW: (modelId, url, data, route, redirectTo) => ({
    url,
    data,
    route,
    redirectTo
  }),

  SAVE_LOCAL_STATE: (response, modelId, key) => ({
    modelId,
    response,
    key
  }),

  SAVE_NEW_STATE: (modelId, key, value) => ({
    modelId,
    key,
    value
  }),

  SET_LOCAL: (modelId, key, value) => ({
    modelId,
    key,
    value
  }),

  SET_TTL: (modelId, key) => ({
    modelId,
    key
  }),

  UPDATE: (modelId, key, value) => ({
    modelId,
    key,
    value
  }),

  UPDATE_FROM_FETCH: (response, modelId, key) => ({
    modelId,
    key,
    response
  }),

  UPDATE_STATE: (response, modelId) => ({ modelId, response })
});

const reducer = handleActions(
  {
    CLEAN: (state) => {
      // if (state.ttl.list < Date.now()) state = getInitialState();
      return state;
    },

    EDIT: (state) => {
      // state.isLoading = true;
      return state;
    },

    SAVE: (state, { payload: { name, data } }) => {
      // state.isSaving[name] = true;
      // state.saveResult = null;
      // state.nextAction = editActions.updateSaveState;
      return state;
    },

    SAVE_NEW: (state, { payload: { url, data, route, redirectTo } }) => {
      // state.isSaving = false;
      // state.saveResult = null;
      return state;
    },

    SAVE_LOCAL_STATE: (state, { payload: { response, key } }) => {
      // state.local.isLoading = false;
      if (key) {
        state.local[key] = response;
      } else {
        state.local = { ...state.local, ...response };
      }
      return state;
    },

    SAVE_NEW_STATE: (state, { payload: { key, value } }) => {
      // state.local.isLoading = false;
      state.local.new[key] = value;
      return state;
    },

    SET_TTL: (state, { payload: { key } }) => {
      state.ttl[key] = Date.now() + TTL;
      return state;
    },

    SET_LOCAL: (state, { payload: { key, value } }) => {
      state.local[key] = value;
      return state;
    },

    UPDATE: (state, { payload: { key, value } }) => {
      state[key] = value;
      return state;
    },

    UPDATE_FROM_FETCH: (state, { payload: { key, response } }) => {
      state[key] = response;
      return state;
    },

    UPDATE_STATE: (state, { payload: { response } }) => {
      // state.ttl.edit = Date.now() + TTL;
      state.edit = response;
      return state;
    }
  },
  {}
);

export default reducer;
