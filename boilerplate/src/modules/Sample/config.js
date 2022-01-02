import { prepareInitialState } from "@tomato/components";

import { List } from "./views";

const routes = [
  {
    moduleId: "sample",
    admin: false,
    authenticated: true,
    path: "/",
    layout: "Default",
    view: List,
  },
];

export const sample = {
  id: "source",
  endpoint: "/sample",
  icon: "Email",
  name: "Sample",
  routes,
  initialState: prepareInitialState({}),
};
