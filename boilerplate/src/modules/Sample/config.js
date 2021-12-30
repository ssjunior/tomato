import { Edit, List } from "./views";

const routes = [
  {
    moduleId: "sample",
    admin: false,
    authenticated: false,
    path: "/",
    layout: "Default",
    view: List,
  },
];

const views = {
  Edit,
  List,
};

export const sample = {
  id: "source",
  endpoint: "/sample",
  icon: "Email",
  name: "Sample",
  routes,
  views,
};
