import { Route, Routes as ReactRoutes } from "react-router-dom";
import { useSelector } from "react-redux";

import { Login } from "@tomato/core";

import { Forbidden, Page404 } from "../views";
import { LAYOUTS } from "../layouts";
import { ROUTES } from "./routes";

const Element = ({ route }) => {
  const user = useSelector((state) => state["account"].user);

  const { admin, authenticated, moduleId, layout, view, ...props } = route;

  const Layout = LAYOUTS[layout];

  const View = view;

  const isAdmin = admin === true || false;
  if (isAdmin && (!user || (user && !user.is_admin))) return <Forbidden />;

  const isAuthenticated = authenticated === true || false;
  if (isAuthenticated && !user) return <Login />;

  return (
    <Layout moduleId={moduleId}>
      <View moduleId={moduleId} {...props} />
    </Layout>
  );
};

export const Routes = () => {
  return (
    <ReactRoutes>
      {ROUTES.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={<Element route={route} />}
        />
      ))}
      <Route path="*" element={Page404()} />
    </ReactRoutes>
  );
};
