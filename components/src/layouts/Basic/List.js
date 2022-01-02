import React from "react";

import ListView from "views/ListView";

const ListLayout = ({ View, route, ...props }) => {
  console.log(props);
  return <ListView model={model} View={View} route={route} />;
};

export default ListLayout;
