import { ACTIONS, STORE } from "../store";

const get = ({ attribute, includeCredentials = true, loader, slice, url }) => {
  const transform = ({ dispatch, state, response }) => {
    const result = loader ? loader({ dispatch, state, response }) : response;
    return result;
  };

  STORE.dispatch(
    ACTIONS.fetch.get({
      attribute,
      slice,
      url,
      includeCredentials,
      loader: transform,
    })
  );
};

const post = ({
  attribute,
  includeCredentials = true,
  loader,
  slice,
  payload,
  url,
}) => {
  const transform = ({ dispatch, state, response }) => {
    const result = loader ? loader({ dispatch, state, response }) : response;
    return result;
  };

  STORE.dispatch(
    ACTIONS.fetch.post({
      attribute,
      payload,
      slice,
      url,
      includeCredentials,
      loader: transform,
    })
  );
};

const getOne = ({
  attribute,
  id,
  loader,
  path,
  slice,
  url,
  includeCredentials = true,
}) => {
  const newUrl = `${url}/${id}`;

  const transform = (dispatch, getState, response) => {
    const result = loader ? loader({ dispatch, getState, response }) : response;
    return result;
  };

  STORE.dispatch(
    ACTIONS.fetch.get({
      attribute: attribute || "obj",
      slice,
      url: newUrl,
      loader: transform,
      includeCredentials,
    })
  );
};

const getAll = ({ slice, url, attribute, args, loader, normalized }) => {
  const newAttribute = attribute || "objs";
  let newUrl = url;

  if (args) {
    const params = Object.keys(args)
      .map((key) => `${key}=${args[key]}`)
      .join("&");
    newUrl = `${newUrl}?${params}`;
  }

  STORE.dispatch(
    ACTIONS.fetch.get(
      slice,
      newUrl,
      ACTIONS.state.loadObject,
      loader
        ? (state, response) => loader(state, response)
        : (state, response) => {
            let objs = {};
            if (normalized) {
              objs = response;
            } else {
              response.objects.forEach((obj) => (objs[obj.id] = obj));
            }
            state[newAttribute]
              ? (state[newAttribute] = { ...state[newAttribute], ...objs })
              : (state[newAttribute] = objs);
            return state;
          }
    )
  );
};

const deleteOne = ({
  action,
  after,
  before,
  slice,
  url,
  attribute,
  id,
  loader,
}) => {
  const newAttribute = attribute || "obj";
  let newUrl = `${url}/${id}`;
  if (action) newUrl = `${newUrl}/${action}`;
  before && before();

  const actions = [ACTIONS.state.loadObject];

  STORE.dispatch(
    ACTIONS.fetch.delete(
      slice,
      newUrl,
      actions,
      loader
        ? (state, response) => loader(state, response)
        : (state, response) => {
            console.log(newAttribute);
            console.log(response);
            state[newAttribute] = response;
            return state;
          }
    )
  );

  after && after();
};

const update = ({
  action,
  args = {},
  attribute,
  after,
  before,
  dispatch,
  id,
  loader,
  slice,
  url,
}) => {
  const newAttribute = attribute || "obj";
  let newUrl = `${url}/${id}`;
  if (action) newUrl = `${newUrl}/${action}`;

  before && before();

  let actions = [ACTIONS.state.loadObject];
  if (dispatch) actions = [...actions, ...dispatch];

  STORE.dispatch(
    ACTIONS.fetch.patch(
      slice,
      newUrl,
      actions,
      args,
      loader
        ? (state, response) => loader(state, response)
        : (state, response) => {
            state[newAttribute] = response;
            if (newAttribute === "obj" && state.objs && state.objs[response.id])
              state.objs[response.id] = response;
            return state;
          }
    )
  );

  after && after();
};

export const crud = {
  get,
  delete: deleteOne,
  getAll,
  getOne,
  post,
  update,
};
