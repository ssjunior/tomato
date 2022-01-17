const compare = (a, b) => {
    // a = a.toString().toLowerCase()
    // b = b.toString().toLowerCase()
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
};

export const orderObjects = (objects, field, direction = "asc") => {
  let ordered = [];


  if (Object.keys(objects).length === 0) return [];

  if (!direction) direction = direction = "asc";

  let x, y;

  ordered = Object.keys(objects).sort((a, b) => {
    if (field) {
      [x, y] = [objects[a][field], objects[b][field]];
    } else {
      [x, y] = [objects[a], objects[b]];
    }

    if (direction === "asc") {
      return compare(x, y);
    } else {
      return compare(y, x);
    }
  });

  let list = [];
  ordered.forEach(objId => {
    list.push(objects[objId]);
  });

  return list;
  // if (!field) {
  //   let obj;
  //   let order = ordered.forEach(objId => {
  //     obj = {};
  //     obj[objId] = objects[objId];
  //     return obj;
  //   });
  //   return order;
  // }
  // return ordered;
};

export const orderObjectsList = (
  objectsList,
  field = "order",
  direction = "asc"
) => {
  let ordered = [];

  if (!field) return [];

  if (objectsList.length === 0) return [];

  if (!direction) direction = direction = "asc";

  let x, y;

  ordered = [...objectsList].sort((a, b) => {
    [x, y] = [a[field], b[field]];

    if (direction === "asc") {
      return compare(x, y);
    } else {
      return compare(y, x);
    }
  });

  return ordered;
};
