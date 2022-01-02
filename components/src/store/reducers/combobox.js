// import { createActions, handleActions } from "redux-actions";

// const modelId = { id: "combobox" };

// const options = { prefix: "combobox", namespace: "::" };

// export const comboboxActions = createActions(
//   {
//     CLEAN_OPTIONS: (uuid) => ({
//       module: modelId,
//       uuid
//     }),

//     LOAD_RESULTS: (response, model, location) => ({
//       module: modelId,
//       response,
//       location
//     }),

//     SET_OPTIONS: (uuid, options) => ({
//       module: modelId,
//       uuid,
//       options
//     })
//   },
//   options
// );

// const reducer = handleActions(
//   {
//     CLEAN_OPTIONS: (state, { payload: { uuid } }) => {
//       delete state[uuid];
//       return state;
//     },

//     LOAD_RESULTS: (state, { payload: { location, response } }) => {
//       let { field, uuid } = location;

//       let orderedOptions = [];
//       response.objects.forEach((object) => {
//         orderedOptions.push({ id: object.id, value: object[field] });
//       });
//       state[uuid] = orderedOptions;
//       return state;
//     },

//     SET_OPTIONS: (state, { payload: { uuid, options } }) => {
//       state[uuid] = options;
//       return state;
//     }
//   },
//   {},
//   options
// );

// export default reducer;
