// import { createActions, handleActions } from "redux-actions";

// const moduleId = "network";

// const options = { prefix: "network", namespace: "::" };

// export const networkActions = createActions(
//   {
//     ADD_PENDING_ACTION: (action) => ({
//       module: moduleId,
//       action
//     }),

//     REMOVE_PENDING_ACTION: () => ({
//       module: moduleId
//     }),

//     RUN_PENDING_ACTIONS: () => ({
//       module: moduleId
//     }),

//     END: () => ({
//       module: moduleId
//     }),

//     START: () => ({
//       module: moduleId
//     })
//   },
//   options
// );

// const reducer = handleActions(
//   {
//     END: (state) => {
//       state.activity = false;
//       return state;
//     },

//     ADD_PENDING_ACTION: (state, { payload: { action } }) => {
//       state.pendingActions.push(action);
//       return state;
//     },

//     REMOVE_PENDING_ACTION: (state) => {
//       state.pendingActions.shift();
//       return state;
//     },

//     RUN_PENDING_ACTIONS: (state) => {
//       // state.pendingActions.map(action => console.log(action));
//       return state;
//     },

//     START: (state) => {
//       state.activity = true;
//       return state;
//     }
//   },
//   {},
//   options
// );

// export default reducer;
