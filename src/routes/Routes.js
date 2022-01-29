import { Route, Routes as ReactRoutes } from "react-router-dom";
import { useSelector } from "react-redux";

import { Clean } from "../layouts";
import { LoginForm } from "../components";
import { Forbidden, Page404 } from "../views";

export const Routes = ({ routes, loginPage }) => {
  const Element = ({ route }) => {
    const user = useSelector((state) => state["account"].user);

    const { admin, authenticated, layout, view, ...props } = route;

    const isAdmin = admin === true || false;
    if (isAdmin && (!user || (user && !user.is_admin))) View = Forbidden;

    const isAuthenticated = authenticated === true || false;

    if (!isAuthenticated || (isAuthenticated && !user)) {
      View = loginPage || LoginForm;
      Layout = Clean;
      return <View />;
    }

    let Layout = layout || Clean;
    let View = view;

    return <Layout {...props} />;
  };

  return (
    <ReactRoutes>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.route}
          element={<Element route={route} />}
        />
      ))}
      <Route path="*" element={Page404()} />
    </ReactRoutes>
  );
};
