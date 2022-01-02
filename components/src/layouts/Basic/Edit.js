import React, { useEffect } from "react";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { useDispatch, useSelector } from "react-redux";

import actions from "store/reducers/actions";
// import { API_ROOT } from "config/constants";
import Flex from "components/Flex";
import load from "util/fetch";
import Spinner from "components/Spinner";

const EditLayout = ({ model, View, route }) => {
  const dispatch = useDispatch();

  const data = useSelector((state) => state[model.id].edit);
  const ttl = useSelector((state) => state[model.id].ttl.edit);

  // let url = `${API_ROOT}${model.endpoint}/${route.match.params.id}`;
  let url;

  useEffect(() => {
    if (ttl < Date.now()) {
      load.page(model.id, url);
    }
    return () => dispatch(actions.edit.clean(model.id));
  }, []);

  return (
    <>
      {Object.keys(data).length === 0 ? (
        <Flex height="100%" width={1}>
          <Spinner margin="auto" width={40} height={40} />
        </Flex>
      ) : (
        <DndProvider backend={HTML5Backend}>
          <View model={model} route={route} url={url} />
        </DndProvider>
      )}
    </>
  );
};

export default EditLayout;
