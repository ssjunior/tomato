export { Routes } from "./Routes";

export const getRoutes = (modules) => {
  let routes = [];
  Object.values(modules).forEach((module) => {
    routes = [...routes, ...module.routes];
  });
  return [...routes];
};
