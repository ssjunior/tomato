// import { createActions, handleActions } from "redux-actions";

// const modelId = { id: "modal" };

// const options = { prefix: "modal", namespace: "::" };

// export const modalActions = createActions(
//   {
//     CLOSE: (id) => ({
//       module: modelId,
//       id
//     }),

//     INIT: (id, props) => ({
//       module: modelId,
//       id,
//       props
//     }),

//     OPEN: (id, props) => ({
//       module: modelId,
//       id,
//       props
//     })
//   },
//   options
// );

// const reducer = handleActions(
//   {
//     CLOSE: (state, { payload: { id } }) => {
//       state[id] = { open: false };
//       return state;
//     },

//     INIT: (state, { payload: { id } }) => {
//       state[id] = { open: false };
//       return state;
//     },

//     OPEN: (state, { payload: { id, props } }) => {
//       state[id] = { open: true, props: props };
//       return state;
//     }
//   },
//   {},
//   options
// );

// export default reducer;
