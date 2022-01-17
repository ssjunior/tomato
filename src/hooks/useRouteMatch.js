import { matchPath, useLocation } from "react-router-dom";

export const useRouteMatch = (path) => {
  const { pathname } = useLocation();
  return matchPath(path, pathname);
};
