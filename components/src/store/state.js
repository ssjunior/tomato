export const prepareInitialState = (state = {}) => {
  return { obj: null, objs: null, loadingObjId: null, loading: null, ...state };
};

export const getStates = (modules = []) => {
  const state = {};
  Object.values(modules).forEach((module) => {
    state[module.id] = module.initialState || {};
  });
  return state;
};

export const INITIAL_STATE = {};
INITIAL_STATE["account"] = {};
INITIAL_STATE["network"] = { isLoading: false };
