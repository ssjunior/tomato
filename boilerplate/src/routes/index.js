import { Route, Routes as ReactRoutes } from "react-router-dom";
import { useSelector } from "react-redux";
import { LAYOUTS } from "../layouts";
import { ROUTES } from "./routes";
import { VIEWS } from "../views";

export * from "./routes";

const Element = ({ route }) => {
  const user = useSelector((state) => state["account"].user);

  const { admin, authenticated, moduleId, layout, view, ...props } = route;

  const Layout = LAYOUTS[layout];

  const View = view;

  const isAdmin = admin === true || false;
  if (isAdmin && (!user || (user && !user.is_admin)))
    return VIEWS["Forbidden"]();

  const isAuthenticated = authenticated === true || false;
  if (isAuthenticated && !user) return VIEWS["Forbidden"]();

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
      <Route path="*" element={VIEWS["Page404"]()} />
    </ReactRoutes>
  );
};
