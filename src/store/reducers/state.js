// import { createActions, handleActions } from "redux-actions";

// const options = { prefix: "state", namespace: "::" };

// export const stateActions = createActions(
//   {
//     CLEAN: (module, attribute, value) => ({ module, attribute, value }),

//     LOAD_OBJECT: (response, module, custom) => ({
//       module,
//       response,
//       custom
//     }),

//     CHANGE_STATE: (module, custom) => ({ module, custom }),

//     CHANGE_STATE_FROM_RESPONSE: (module, custom) => ({ module, custom }),

//     LOAD_OBJECTS: (response, module, custom) => ({ module, response, custom }),

//     SET_ATTRIBUTE: (module, attribute, value) => ({ module, attribute, value }),

//     SET_LOCAL_ATTRIBUTE: (module, attribute, value) => ({
//       module,
//       attribute,
//       value
//     }),

//     SET_STATE: (module, value) => ({ module, value }),

//     UPDATE_OBJECT: (response, module) => ({ module, response })
//   },
//   options
// );

// const reducer = handleActions(
//   {
//     CLEAN: (state, { payload: { attribute, value } }) => {
//       if (value) {
//         state = value;
//         // }
//         // else if (attribute) {
//         // state[attribute] = module.state[attribute];
//       } else delete state[attribute];

//       return state;
//     },

//     LOAD_OBJECT: (state, { payload: { response, custom } }) => {
//       if (custom) {
//         if (typeof custom === "function") {
//           state = custom(state, response);
//         } else state[custom] = response;
//       } else {
//         state.object = response;
//       }
//       return state;
//     },

//     CHANGE_STATE_FROM_RESPONSE: (state, { payload: { response, custom } }) => {
//       if (custom) {
//         state = custom(state, response);
//       }
//       return state;
//     },

//     LOAD_OBJECTS: (state, { payload: { response, custom } }) => {
//       if (custom) {
//         state = custom(state, response);
//       } else {
//         state.objects = response;
//       }
//       return state;
//     },

//     CHANGE_STATE: (state, { payload: { custom } }) => {
//       if (custom) {
//         state = custom(state);
//       }
//       return state;
//     },

//     SET_ATTRIBUTE: (state, { payload: { attribute, value } }) => {
//       if (attribute) {
//         state[attribute] = value;
//       } else {
//         delete state[attribute];
//       }
//       return state;
//     },

//     SET_LOCAL_ATTRIBUTE: (state, { payload: { module, attribute, value } }) => {
//       let localState = localStorage.getItem("localState");

//       localState = JSON.parse(localState);
//       if (!localState) localState = {};
//       if (!localState[module]) localState[module] = {};
//       localState[module][attribute] = value;

//       if (attribute) {
//         state[attribute] = value;
//       } else {
//         delete state[attribute];
//       }

//       localStorage.setItem("localState", JSON.stringify(localState));

//       return state;
//     },

//     SET_STATE: (state, { payload: { value } }) => {
//       state = value;
//       return state;
//     },

//     UPDATE_OBJECT: (state, { payload: { response } }) => {
//       console.log(response);
//       return state;
//     }
//   },
//   {},
//   options
// );

// export default reducer;
