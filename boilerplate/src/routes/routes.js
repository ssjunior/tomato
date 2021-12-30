import MODULES from "../modules";

let routes = [];
Object.values(MODULES).forEach((module) => {
  routes = [...routes, ...module.routes];
});

export const ROUTES = [...routes];
