// import { createActions, handleActions } from "redux-actions";

// import { generateListUrls } from "./util";
// import { GRID } from "../../constants";

// const options = { prefix: "list", namespace: "::" };

// export const listActions = createActions(
//   {
//     SET_SEARCH: (module, search, limit) => ({
//       module,
//       search,
//       limit
//     }),

//     SET_LOADER: (module, value) => ({
//       module,
//       value
//     }),

//     SET: (module, key, value) => ({
//       module,
//       key,
//       value
//     }),

//     SET_UI: (module, key, value) => ({
//       module,
//       key,
//       value
//     }),

//     FETCH: (module, limit) => ({ module, limit }),

//     FETCH_COUNT: (module) => ({ module }),

//     LIST_NEXT_PAGE: (module, limit) => ({ module, limit }),

//     LOAD_PAGE: (module, page, limit) => ({ module, page, limit }),

//     SET_FILTER: (module, type, id, label, conditions) => ({
//       module,
//       id,
//       label,
//       conditions,
//       type
//     }),

//     SET_SEGMENT: (
//       module,
//       moduleObject,
//       type,
//       filter,
//       label,
//       conditions,
//       encodedConditions,
//       limit
//     ) => ({
//       module,
//       moduleObject,
//       type,
//       filter,
//       label,
//       conditions,
//       encodedConditions,
//       limit
//     }),

//     SET_CONTEXT: (module, context) => ({ module, context }),

//     SET_ORDER: (module, field, order) => ({
//       module,
//       field,
//       order
//     }),

//     UPDATE_COUNT: (response, module) => ({ module, response }),

//     UPDATE_STATE: (response, module) => ({ module, response }),

//     REFRESH: (module, limit) => ({ module, limit }),

//     SAVE_LOCAL_STATE: (response, module, key) => ({
//       module,
//       response,
//       key
//     })
//   },
//   options
// );

// const reducer = handleActions(
//   {
//     SET_SEARCH: (state, { payload: { search } }) => {
//       state.filters.search = search;
//       state.filters.page = 1;
//       state.objects = [];
//       return state;
//     },

//     SET_LOADER: (state, { payload: { value } }) => {
//       state.loader = { ...state.loader, ...value };
//       return state;
//     },

//     SET: (state, { payload: { key, value } }) => {
//       state[key] = { ...state[key], ...value };
//       return state;
//     },

//     SET_UI: (state, { payload: { key, value } }) => {
//       state.ui[key] = value;
//       return state;
//     },

//     FETCH: (state, { payload: { module, limit } }) => {
//       state.ui.isLoading = true;
//       [state.ui.url] = generateListUrls(state.ui, module, limit);
//       return state;
//     },

//     FETCH_COUNT: (state, { payload: { module } }) => {
//       state.ui.isCountLoading = true;
//       [, state.ui.countUrl] = generateListUrls(state.ui, module);
//       return state;
//     },

//     NEXT_PAGE: (state, { payload: { module, limit } }) => {
//       // state.ttl.list = Date.now() + TTL;
//       state.ui.page += 1;
//       state.ui.lastLoad = null;
//       [state.ui.url] = generateListUrls(state.ui, module, limit);
//       return state;
//     },

//     LOAD_PAGE: (state, { payload: { module, page, limit } }) => {
//       // state.ttl.list = Date.now() + TTL;
//       state.ui.page = page;
//       [state.ui.url] = generateListUrls(state.ui, module, limit);
//       return state;
//     },

//     SET_CONTEXT: (state, { payload: { context } }) => {
//       state.local.context = context;
//       return state;
//     },

//     SET_SEGMENT: (
//       state,
//       {
//         payload: {
//           moduleObject,
//           type,
//           filter,
//           label,
//           conditions,
//           encodedConditions
//         }
//       }
//     ) => {
//       let module = moduleObject;

//       if (type === null) {
//         state.filters = {
//           type: "default",
//           id: "all",
//           label: module.listView.filters["all"].label
//         };
//       } else {
//         state.filters = {
//           type,
//           id: filter,
//           label,
//           conditions: conditions || null,
//           encodedConditions: encodedConditions || null
//         };
//       }

//       state.filters.page = 1;
//       state.loader.isLoading = true;
//       state.objects = [];

//       // if (typeof type === "undefined") {
//       //   if (filters[module.id]) {
//       //     state.ui.filter = filters[module.id];
//       //   } else if (module.listView.filters && module.listView.filters["all"]) {
//       //     state.ui.filter = {
//       //       type: "default",
//       //       id: "all",
//       //       label: module.listView.filters["all"].label
//       //     };
//       //   } else {
//       //     state.ui.filter = {
//       //       type: "default",
//       //       id: "all",
//       //       label: module.listView.filters["all"].label
//       //     };
//       //   }
//       // } else if (type === null) {
//       //   state.ui.filter = {
//       //     type: "default",
//       //     id: "all",
//       //     label: module.listView.filters["all"].label
//       //   };
//       // } else {
//       //   state.ui.filter = {
//       //     type,
//       //     id: filter,
//       //     label,
//       //     conditions,
//       //     encodedConditions
//       //   };
//       // }

//       // localStorage.setItem("filters", JSON.stringify({ ...filters }));

//       // state.ui.page = 1;
//       // state.ui.lastLoad = null;
//       // state.objects = [];
//       // state.loader.isLoading = true;

//       // state.ui.selection = {
//       //   type: null,
//       //   selected: {},
//       //   total: 0
//       // };

//       return state;
//     },

//     SET_FILTER: (state, { payload: { type, id, label, conditions } }) => {
//       // if (state.filters.id === id) return state;

//       // if (state.filters.id === id || state.filters.filter === filter)
//       // return state;
//       const orderBy = state.filters.orderBy

//       state.filters = {
//         type,
//         id,
//         label,
//         conditions,
//         orderBy
//       };

//       state.filters.page = 1;
//       state.objects = [];

//       return state;
//     },

//     SET_ORDER: (state, { payload: { field, order } }) => {
//       state.filters.orderBy = { field, order };
//       return state;
//     },

//     UPDATE_COUNT: (state, { payload: { response } }) => {
//       state.loader.isCountLoading = false;

//       // if (
//       //   Object.keys(state.ui.filter).length === 0 ||
//       //   state.ui.filter.id === "all"
//       // )
//       //   state.loader.total = response.count;

//       state.loader.count = response.count;
//       return state;
//     },

//     UPDATE_STATE: (state, { payload: { module, response } }) => {
//       // state.ttl.list = Date.now() + TTL;
//       state.loader.isLoading = false;

//       if (module.onLoad && module.onLoad.objects)
//         return module.onLoad.objects(state, response);

//       if (!response.objects) return state;

//       state.loader.lastLoad = response.objects.length;

//       if (GRID.DEFAULT_PAGINATION === GRID.PAGINATION_TYPE.INFINITE) {
//         state.objects = state.objects.concat(response.objects);
//       } else state.objects = response.objects;

//       return state;
//     },

//     REFRESH: (state, { payload: { module, limit } }) => {
//       state.filters = { ...state.filters };
//       return state;
//     },

//     SAVE_LOCAL_STATE: (state, { payload: { response, key } }) => {
//       if (key) {
//         state.local[key] = response;
//       } else {
//         state.local = { ...state.local, ...response };
//       }
//       return state;
//     }
//   },
//   {},
//   options
// );

// export default reducer;
