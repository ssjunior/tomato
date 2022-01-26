import produce from "immer";

import { ACTIONS } from "../store";

const fetchData = ({
  dispatch,
  includeCredentials,
  method = "GET",
  payload,
  url,
}) => {
  dispatch(ACTIONS.network.changeState({ isLoading: true }));
  const options = {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    mode: "cors",
    redirect: "follow",
    referrerPolicy: "origin",
  };

  if (includeCredentials) options.credentials = "include";

  if (payload) options.body = JSON.stringify(payload);

  return fetch(url, options)
    .then((response) => {
      dispatch(ACTIONS.network.changeState({ isLoading: false }));

      const status = response.status;
      if (status === 200) return response.json();
      if (status === 401) return {};
      if (status === 403) return {};
      return {};
    })
    .then((data) => {
      return data;
    });
};

const GET = async ({
  attribute,
  dispatch,
  getState,
  loader,
  includeCredentials,
  slice,
  url,
}) => {
  const method = "GET";
  const response = await fetchData({
    dispatch,
    getState,
    includeCredentials,
    method,
    slice,
    url,
  });
  const state = getState()[slice];
  const nextState = produce(state, (draft) => {
    if (attribute) {
      draft[attribute] = response;
    }
    if (loader) {
      loader({ dispatch, state: draft, response });
    }
  });
  dispatch(ACTIONS[slice].changeState(nextState));

  return response;
};

const POST = async ({
  attribute,
  dispatch,
  getState,
  loader,
  includeCredentials,
  payload,
  slice,
  url,
}) => {
  const method = "POST";
  const response = await fetchData({
    dispatch,
    getState,
    includeCredentials,
    method,
    payload,
    slice,
    url,
  });

  const state = getState()[slice];
  const nextState = produce(state, (draft) => {
    if (attribute) {
      draft[attribute] = response;
    }
    if (loader) {
      loader({ dispatch, state: draft, response });
    }
  });
  dispatch(ACTIONS[slice].changeState(nextState));

  return response;
};

export const FETCH = {
  "fetch/delete": GET,
  "fetch/get": GET,
  "fetch/patch": GET,
  "fetch/post": POST,
};
