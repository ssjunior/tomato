// import { createActions, handleActions } from "redux-actions";

// const moduleId = "ws";

// const options = { prefix: "ws", namespace: "::" };

// export const wsActions = createActions(
//   {
//     SET_ONLINE: ({ user_id }) => ({
//       module: moduleId,
//       user_id
//     }),

//     SET_OFFLINE: ({ user_id }) => ({
//       module: moduleId,
//       user_id
//     }),

//     SET_ONLINE_USERS: ({ usersIds }) => ({
//       module: moduleId,
//       usersIds
//     }),

//     SET_PRESENCE: ({ userId }) => ({
//       module: moduleId,
//       userId
//     }),

//     SET_STATE: (connected) => ({
//       module: moduleId,
//       connected
//     }),

//     SET_WS: (ws) => ({
//       module: moduleId,
//       ws
//     })
//   },
//   options
// );

// const reducer = handleActions(
//   {
//       SET_ONLINE_USERS: (state, { payload: { usersIds } }) => {
//       state.onlineUsersIds = usersIds || [];
//       return state;
//     },

//     SET_ONLINE: (state, { payload: { user_id } }) => {
//       if (state.onlineUsersIds.includes(user_id)) return state;
//       state.onlineUsersIds.push(user_id);
//       return state;
//     },

//     SET_OFFLINE: (state, { payload: { user_id } }) => {
//       if (!state.onlineUsersIds.includes(user_id)) return state;
//       let index = state.onlineUsersIds.indexOf(user_id);
//       state.onlineUsersIds.splice(index, 1);
//       return state;
//     },

//     SET_PRESENCE: (state, { payload: { userId } }) => {
//       if (state.onlineUsersIds.includes(userId)) {
//         let index = state.onlineUsersIds.indexOf(userId);
//         state.onlineUsersIds.splice(index, 1);
//       } else state.onlineUsersIds.push(userId);
//       return state;
//     },

//     SET_STATE: (state, { payload: { connected } }) => {
//       state.connected = connected;
//       return state;
//     },

//     SET_WS: (state, { payload: { ws } }) => {
//       state.ws = ws;
//       return state;
//     }
//   },
//   {},
//   options
// );

// export default reducer;
