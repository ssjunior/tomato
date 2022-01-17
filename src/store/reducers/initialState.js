// import { GRID } from "../../constants";
// import { MODULES } from "config/modules";

// let initialState = {};

// const modules = Object.values(MODULES);

// modules.forEach((module) => {
//   initialState[module.id] = { ...module.state };
// });

// // definição do estado inicial dos módulos sem models
// let preferences = localStorage.getItem("preferences");

// if (preferences) {
//   preferences = JSON.parse(preferences);
// } else {
//   preferences = {
//     sideMenuOpen: true,
//     showFilters: true,
//     theme: "light",
//     grid: {
//       size: GRID.SIZE.MEDIUM,
//       linesPerPage: GRID.DEFAULT_LINES_PER_PAGE
//     }
//   };

//   localStorage.setItem("preferences", JSON.stringify(preferences));
// }

// let user = JSON.parse(localStorage.getItem("user"));
// let userState = { authenticated: false, needsAuth: true };

// if (user) userState = { ...user, authenticated: true, needsAuth: false };

// initialState["account"] = {
//   loginState: {
//     doingLogin: false,
//     error: null
//   },
//   permissions: {},
//   plan: null,
//   preferences,
//   user: userState,
//   users: null,
//   teams: null
// };

// initialState["combobox"] = {};

// initialState["modal"] = {};

// initialState["network"] = {
//   activity: false,
//   pendingActions: []
// };

// initialState["toast"] = [];

// const allModules = Object.keys(initialState).map((slice) => {
//   return { id: slice };
// });

// const getInitialState = () => {};

// export { initialState, allModules, getInitialState };
