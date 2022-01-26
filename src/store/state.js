export const prepareInitialState = (state = {}) => {
  return {
    object: null,
    objects: null,
    loadingObjId: null,
    loading: null,
    filter: {},
    ...state,
  };
};

export const getStates = (modules = []) => {
  const state = {};
  Object.values(modules).forEach((module) => {
    state[module.id] = module.initialState || {};
  });
  return state;
};
