// import { createActions, handleActions } from "redux-actions";

// import { uuidv4 } from "../../util/uuidv4";

// const modelId = "toast";

// const options = { prefix: "toast", namespace: "::" };

// export const toastActions = createActions(
//   {
//     ADD_TOAST: ({ message, type, uuid, autoClose = 2500 }) => ({
//       module: modelId,
//       message,
//       type,
//       uuid,
//       autoClose
//     }),

//     REMOVE_TOAST: ({ uuid }) => ({
//       module: modelId,
//       uuid
//     })
//   },
//   options
// );

// const reducer = handleActions(
//   {
//     ADD_TOAST: (state, { payload: { message, type, uuid, autoClose } }) => {
//       if (!uuid) {
//         uuid = uuidv4();
//       }
//       state.push({ message, type, uuid, autoClose });
//       return state;
//     },

//     REMOVE_TOAST: (state, { payload: { uuid } }) => {
//       let index = state.findIndex((toast) => toast.uuid === uuid);
//       state.splice(index, 1);
//       return state;
//     }
//   },
//   {},
//   options
// );

// export default reducer;
