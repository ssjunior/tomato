// import { API_LIMIT, API_ROOT } from "constant";

// const API_LIMIT = 25;
// const API_ROOT = "/";

// export const generateListUrls = (ui, module, limit) => {
//   console.log(ui);
//   console.log(module);
//   console.log(limit);
//   // let url = `${API_ROOT}${module.endpoint}?`;

//   let API_LIMIT_ITEMS = limit || API_LIMIT;

//   let offset = (ui.page - 1) * API_LIMIT_ITEMS;
//   let countUrl;

//   if (ui.segment || ui.search || ui.tags || ui.list || ui.filter) {
//     if (ui.segment) {
//       url = `${url}&segment_id=${ui.segment.id}`;
//     }

//     if (ui.search) {
//       url = `${url}&search=${ui.search}`;
//     }

//     if (ui.filter) {
//       let filter = false;

//       if (ui.filter.type === "default" && ui.filter.id !== "all")
//         if (ui.filter.type === "default")
//           filter = module.listView.filters[ui.filter.id].filter;

//       if (ui.filter.type === "segment") filter = `segment_id=${ui.filter.id}`;

//       if (ui.filter.type === "filter")
//         filter = `filter=${ui.filter.encodedConditions}`;

//       if (filter) url = `${url}&${filter}`;
//     }

//     countUrl = `${url}&count=1`;

//     url = `${url}&limit=${API_LIMIT_ITEMS}&offset=${offset}`;
//   } else {
//     countUrl = `${url}count=1`;

//     url = `${url}limit=${API_LIMIT_ITEMS}&offset=${offset}`;
//   }

//   if (Object.keys(ui.orderBy).length !== 0) {
//     url = `${url}&order_by=${ui.orderBy.direction === "asc" ? "" : "-"}${
//       ui.orderBy.field
//     }`;
//   }

//   return [url, countUrl];
// };
