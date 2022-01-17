// import { createActions, handleActions } from "redux-actions";

// const modelId = "account";

// const options = { prefix: "account", namespace: "::" };

// export const accountActions = createActions(
//   {
//     CHANGE_LANGUAGE: ({ language }) => ({ module: modelId, language }),

//     LOAD_TEAMS: (response) => ({
//       module: modelId,
//       response
//     }),

//     LOAD_USER: (response) => ({
//       module: modelId,
//       response
//     }),

//     LOAD_USERS: (response) => ({
//       module: modelId,
//       response
//     }),

//     LOGIN_START: ({ email, password }) => ({
//       module: modelId,
//       email,
//       password
//     }),

//     LOGIN_DONE: (response) => ({
//       module: modelId,
//       response
//     }),

//     LOGIN_ERROR: ({ error }) => ({ module: modelId, error }),

//     LOGOUT: () => ({ module: modelId }),

//     RE_AUTH: () => ({ module: modelId }),

//     SET_PREFERENCE: (key, value) => ({ module: modelId, key, value }),

//     UPDATE: (key, value) => ({ module: modelId, key, value }),

//     UPDATE_STATE: (user, key) => ({ module: modelId, user, key }),

//     UPDATE_USER: (key, value) => ({ module: modelId, key, value })
//   },
//   options
// );

// const reducer = handleActions(
//   {
//     CHANGE_LANGUAGE: (state, { payload: { language } }) => {
//       state.user.language = language;
//       return state;
//     },

//     LOAD_TEAMS: (state, { payload: { response } }) => {
//       state.teams = {};
//       response.objects.forEach((team) => {
//         state.teams[team.id] = {
//           id: team.id,
//           name: team.name,
//           count: team.count
//         };
//       });

//       return state;
//     },

//     LOAD_USER: (state, { payload: { response } }) => {
//       state.user = response;

//       state.user.firstName = response.name.split(" ")[0];
//       state.user.authenticated = true;
//       state.user.needsAuth = false;
//       state.user.refreshed = true;

//       state.user.locale = response.language;

//       state.preferences = response.preferences;

//       if (!response.preferences.status)
//         state.preferences.status = {
//           clearId: null,
//           emojiCode: null,
//           message: null,
//           expireDate: null
//         };

//       if (!response.preferences.theme) state.preferences.theme = "light";
//       if (!response.preferences.color)
//         response.preferences.color = { h: 240, s: 10, l: 70 };

//       if (!state.preferences.grid)
//         state.preferences.grid = {
//           size: "Medium",
//           paginationType: "Pagination",
//           linesPerPage: 25
//         };

//       if (!state.preferences.segments) state.preferences.segments = {};

//       // let preferences = JSON.parse(localStorage.getItem("preferences"));

//       state.uuid = response.uuid;

//       localStorage.setItem(
//         "user",
//         JSON.stringify({
//           name: response.name,
//           nickname: response.nickname,
//           email: response.email,
//           uuid: response.uuid,
//           id: response.id,
//           timezone: response.timezone,
//           locale: response.language,
//           avatar: response.avatar,
//           preferences: state.preferences
//         })
//       );

//       return state;
//     },

//     LOAD_USERS: (state, { payload: { response } }) => {
//       state.users = response;
//       return state;
//     },

//     LOGIN_DONE: (state, { payload: { response } }) => {
//       console.log(response);
//       if (!("success" in response)) return state;

//       if (response.success === false) {
//         return state;
//       }

//       let user = response.user;
//       user.locale = user.language;
//       delete user.language;

//       user.authenticated = true;
//       user.needsAuth = false;
//       user.firstName = user.name.split(" ")[0];
//       state.loginState.doingLogin = false;
//       state.loginState.error = null;

//       let preferences = response.user.preferences;

//       if (!preferences.status)
//         preferences.status = {
//           clearId: null,
//           emojiCode: null,
//           message: null,
//           expireDate: null
//         };

//       if (!preferences.theme) preferences.theme = "light";
//       if (!preferences.color) preferences.color = { h: 240, s: 10, l: 70 };

//       localStorage.setItem(
//         "preferences",
//         JSON.stringify({ ...preferences, ...user.preferences })
//       );
//       state.preferences = preferences;

//       localStorage.setItem(
//         "user",
//         JSON.stringify({
//           name: user.name,
//           nickname: user.nickname,
//           email: user.email,
//           uuid: user.uuid,
//           id: user.id,
//           timezone: user.timezone,
//           locale: user.language,
//           avatar: user.avatar
//         })
//       );

//       state.uuid = user.uuid;

//       user.refreshed = true;
//       state.user = user;
//       return state;
//     },

//     LOGIN_ERROR: (state, { payload: { error } }) => {
//       state.loginState.error = error;
//       return state;
//     },

//     LOGIN_START: (state) => {
//       state.loginState.doingLogin = true;
//       state.loginState.error = null;
//       return state;
//     },

//     LOGOUT: (state) => {
//       localStorage.removeItem("user");
//       state.user = null;
//       return state;
//     },

//     RE_AUTH: (state) => {
//       state.user.needsAuth = true;
//       return state;
//     },

//     SET_PREFERENCE: (state, { payload: { key, value } }) => {
//       state.user.preferences[key] = value;
//       state.preferences[key] = value;
//       localStorage.setItem("preferences", JSON.stringify(state.preferences));
//       return state;
//     },

//     UPDATE: (state, { payload: { key, value } }) => {
//       state[key] = value;
//       return state;
//     },

//     UPDATE_STATE: (state, { payload: { user, key } }) => {
//       if (key) {
//         state.user[key] = user;
//       } else {
//         user.firstName = user.name.split(" ")[0];
//         state.user = user;
//       }
//       return state;
//     },

//     UPDATE_USER: (state, { payload: { key, value } }) => {
//       state.user[key] = value;
//       if (key === "name") state.user.firstName = value.split(" ")[0];
//       return state;
//     }
//   },
//   {},
//   options
// );

// export default reducer;
