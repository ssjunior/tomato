import { Route, Routes as ReactRoutes } from "react-router-dom";
import { useSelector } from "react-redux";

import { Flex, Login, Forbidden, Page404 } from "@tomato/components";

export const Routes = ({ routes, layouts }) => {
  const Element = ({ route }) => {
    const user = useSelector((state) => state["account"].user);

    const { admin, authenticated, moduleId, layout, view, ...props } = route;

    const Layout = layouts[layout];

    const View = view;

    const isAdmin = admin === true || false;
    if (isAdmin && (!user || (user && !user.is_admin))) return <Forbidden />;

    const isAuthenticated = authenticated === true || false;
    if (isAuthenticated && !user) return <Login />;

    if (!Layout) return <Flex>Missing layout</Flex>;
    if (!View) return <Flex>Missing view</Flex>;

    return (
      <Layout moduleId={moduleId}>
        <View moduleId={moduleId} {...props} />
      </Layout>
    );
  };

  return (
    <ReactRoutes>
      {routes.map((route, index) => (
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
