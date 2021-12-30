import { ACTIONS } from "../store";

const fetchData = ({ dispatch, url, method = "GET" }) => {
  dispatch(ACTIONS.network.changeState({ isLoading: true }));
  const options = {
    method,
    headers: {},
  };
  return fetch(url, options)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      dispatch(ACTIONS.network.changeState({ isLoading: false }));
      return data;
    });
};

const GET = async ({
  attribute,
  dispatch,
  getState,
  slice,
  url,
  actions,
  loader,
}) => {
  let response = await fetchData({ dispatch, getState, slice, url });
  response = loader ? loader(dispatch, getState, response) : response;

  const state = {};
  if (attribute) {
    state[attribute] = response;
    dispatch(ACTIONS[slice].changeState(state));
  }
  return response;
};

export const FETCH = {
  "fetch/delete": GET,
  "fetch/get": GET,
  "fetch/patch": GET,
  "fetch/post": GET,
};
