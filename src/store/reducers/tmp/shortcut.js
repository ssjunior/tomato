import { createActions, handleActions } from "redux-actions";

const modelId = "shortcut";

const options = { prefix: "shortcut", namespace: "::" };

export const SHORTCUTS = {};

export const registerShortcut = (key, func, value) => {
  SHORTCUTS[key] = { func, value };
};

export const shortcutActions = createActions(
  {
    DISABLE: () => ({
      modelId
    }),
    ENABLE: () => ({
      modelId
    }),
    REGISTER: (key, value) => ({
      modelId,
      key,
      value
    }),
    UNREGISTER: (key, value) => ({
      modelId,
      key,
      value
    })
  },
  options
);

const reducer = handleActions(
  {
    DISABLE: state => {
      state["ENABLED"] = false;
      return state;
    },
    ENABLE: state => {
      state["ENABLED"] = true;
      return state;
    },
    REGISTER: (state, { payload: { key, value } }) => {
      if (key === "ENABLED") return;
      SHORTCUTS[key] = value;
      state[key] = value;
      return state;
    },
    UNREGISTER: (state, { payload: { key, value } }) => {
      if (key === "ENABLED") return;
      state[key] = value;
      return state;
    }
  },
  {},
  options
);

export default reducer;
