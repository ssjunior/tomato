import { createActions } from "redux-actions";

export const redirectActions = createActions({
  REDIRECT: (route, url) => ({
    route,
    url
  }),

  REDIRECT_AFTER_CREATION: (response, modelId, { history, url }) => ({
    response,
    history,
    url
  })
});
