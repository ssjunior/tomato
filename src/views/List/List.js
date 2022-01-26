import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, withRouter } from "react-router";

import { ACTIONS } from "store";
// import { avatarColor } from "../../constants/colors";

import { COLOR_LIST, Empty, Flex, formatDate, GRID, Icon, Text } from "tomato";

import { Table, TableHead, TableData, TableRow } from "tomato";

// const avatarColor = "red";

const FormatValue = ({ object, field, endpoint, model }) => {
  const user = useSelector((state) => state["account"].user);

  let value = object[field.name];

  if (!value || typeof value === "undefined") {
    return <Text color="t5">——</Text>;
  }

  if (field.type === "DateTime") {
    value = formatDate(value, user.locale, user.timezone).distance();
  }

  return value;

  if (field.type === "Boolean") {
    value = value ? "Yes" : "No";
  }

  if (field.type === "Constant") {
    value = module.fields[field.name].choices[value];
  }

  if (field.type === "Binary") {
    return "";
    console.log(field.name, field.attribute);
    console.log(object[field.name][field.attribute]);

    if (!object[field.name][field.attribute]) {
      return "";
    }

    value = object[field.name][field.attribute];
  }

  if (field.type === "ForeignKey") {
    if (!object[field.name]) {
      return <Text color="t6">————</Text>;
    }
    value = object[field.name][field.relatedField];
  }
};

const handleAction = (e, action, model, object, history, openModal) => {
  if (action.action === "edit") {
    history.push(`${module.endpoint}/${object.id}`);
  }
  if (action.action === "delete") {
    openModal({
      component: action.component,
      props: { model, objects: [object], action },
    });
  }
};

// onClick={e =>
//  handleAction(e, action, model, object, history, openModal)
// }
//

const Actions = withRouter(({ model, object, setAction, history }) => {
  return (
    <Flex width="1rem" height="1rem">
      <Icon.MoreHorizontal />
    </Flex>
  );
});

export const LetterAvatar = ({ object, ...props }) => {
  let name = object.name || "";
  let id = object.name ? object.id : 10;
  let texts = name.split(/\s+/).slice(0, 2);

  const [hide, setHide] = useState(false);

  if (!texts[1] || (texts[1] && texts[1].length <= 3)) {
    texts = texts[0].charAt(0).toUpperCase();
  } else {
    texts = texts[0].charAt(0).toUpperCase() + texts[1].charAt(0).toUpperCase();
  }

  return (
    <Flex
      onMouseEnter={() => setHide(true)}
      onMouseLeave={() => setHide(false)}
      style={{ display: hide ? "hidden" : "visible" }}
    >
      <Text
        color="white"
        width="24px"
        height="24px"
        borderRadius="50%"
        bg={COLOR_LIST[id % 132]}
        textAlign="center"
        lineHeight="24px"
        fontWeight="semibold"
        fontSize="10px"
        {...props}
      >
        {texts}
      </Text>
    </Flex>
  );
};

const Row = ({ module, object }) => {
  const dispatch = useDispatch();

  const history = useHistory();

  const [hide, setHide] = useState(false);
  const height = "2.75rem";

  const selection = useSelector((state) => state[module.id].ui.selection);

  const handleEdit = (object) => {
    if (module.edit.useDrawer) {
      dispatch(
        ACTIONS.state.setAttribute(module.id, "loadingObjId", object.id)
      );
    } else {
      history.push(`${module.endpoint}/${object.id}`);
    }
  };

  const handleCheckbox = (e, object) => {
    e.preventDefault();
    e.stopPropagation();

    let selected = { ...selection.selected };
    if (selected[object.id]) {
      delete selected[object.id];
    } else {
      selected[object.id] = object.name || object.id;
    }

    dispatch(
      ACTIONS.list.saveLocalState(
        {
          type: "individual",
          filter: null,
          selected: { ...selected },
          total: Object.keys(selected).length,
        },
        module,
        "selection"
      )
    );
  };

  const visible =
    !(object.id in selection.selected) && selection.type !== "all";

  return (
    <TableRow
      key={object.id}
      onClick={() => handleEdit(object)}
      hoverColor="lightBlue"
      onMouseEnter={() => setHide(true)}
      onMouseLeave={() => setHide(false)}
      borderTop="1px solid #e6e6e6"
      style={{ cursor: "pointer" }}
    >
      <TableData
        height={height}
        minWidth="3rem"
        position="relative"
        textAlign="center"
      >
        {visible && !hide && (
          <LetterAvatar
            style={{ transform: `translate(calc(50%))` }}
            position="absolute"
            object={object}
          />
        )}

        {object.is_online && (
          <Flex
            position="absolute"
            bg="green"
            width={10}
            height={10}
            borderRadius="50%"
            top="15px"
            left="16px"
            border="1px solid white"
          />
        )}
        <input
          type="checkbox"
          defaultChecked={
            selection.selected[object.id] || selection.type === "all"
          }
          onClick={(e) => handleCheckbox(e, object)}
        />
      </TableData>

      {module.list.listing.map((field, index) => (
        <TableData
          key={index}
          height={height}
          textAlign={module.list.fields[field].alignment || "left"}
          color="t1"
          pl="0.25rem"
          pr="1.5rem"
          fontSize="0.9375rem"
        >
          <FormatValue
            endpoint={module.endpoint}
            field={module.list.fields[field]}
            object={object}
            model={module}
          />
        </TableData>
      ))}

      <TableData textAlign="center" minWidth="2rem">
        <Actions model={module} object={object} />
      </TableData>
    </TableRow>
  );
};

export const BasicList = ({ module }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const data = useSelector((state) => state[module.id].objects);
  const filters = useSelector((state) => state[module.id].filters);
  const grid = useSelector((state) => state["account"].preferences.grid);
  const selection = useSelector((state) => state[module.id].ui.selection);
  const ui = useSelector((state) => state[module.id].ui);

  const orderBy = filters.orderBy || module.list.orderBy;

  const selectAll = () => {
    if (selection.type === "all") {
      dispatch(
        ACTIONS.list.saveLocalState(
          { type: null, filter: null, selected: {}, total: null },
          module,
          "selection"
        )
      );
    } else {
      dispatch(
        ACTIONS.list.saveLocalState(
          {
            type: "all",
            filter: ui.filter,
            selected: {},
            total: ui.count || ui.total,
          },
          module,
          "selection"
        )
      );
    }
  };

  const clearFilter = () => {
    dispatch(ACTIONS.list.setFilter(module));
  };

  const handleOrderBy = (field) => {
    let order = "asc";
    if (orderBy && orderBy.field === field) {
      order = orderBy.order === "asc" ? "desc" : "asc";
    }

    dispatch(ACTIONS.list.setOrder(module.id, field, order));
  };

  const isSortable = (name) => {
    return (
      module.list.orderBy.fields && module.list.orderBy.fields.includes(name)
    );
  };

  if (data && data.length === 0) {
    return (
      <Flex
        flexDirection="column"
        justifyContent="center"
        height="100%"
        alignItems="center"
      >
        <Empty src="/images/notes.jpg" />

        {ui.filter && ui.filter.id !== "all" && (
          <Flex onClick={clearFilter} style={{ cursor: "pointer" }}>
            {t(
              'Your are filtering the results. Click here to remove filter "{{uiFilterLabel}}"',
              { uiFilterLabel: ui.filter.label }
            )}
          </Flex>
        )}
      </Flex>
    );
  }

  const Tbody = withRouter(() => {
    return (
      <tbody>
        {data.map((object) => (
          <Row key={object.id} object={object} module={module} />
        ))}
      </tbody>
    );
  });

  let height = GRID.DEFAULT_GRID_HEIGHT * GRID.MULTIPLIER[grid.size];

  return (
    <Table>
      <thead>
        <TableRow>
          <TableHead
            style={{ width: "40px", textAlign: "center" }}
            height={height}
          >
            <input
              type="checkbox"
              defaultChecked={
                selection.type === "all" && selection.type !== "individual"
              }
              onClick={selectAll}
            />
          </TableHead>

          {module.list.listing.map((field, index) => (
            <TableHead
              textStyle="tableHead"
              key={index}
              height={height}
              textAlign={module.list.fields[field].alignment || "left"}
            >
              <Flex
                alignItems="center"
                width="fit-content"
                style={{ cursor: "pointer", whiteSpace: "nowrap" }}
                onClick={() => handleOrderBy(field)}
                fontSize="0.875rem"
                color="t3"
                pr="0.5rem"
              >
                {t(module.list.fields[field].label)}

                {isSortable(field) && (
                  <Icon.Arrow
                    ml="0.125rem"
                    size="0.875rem"
                    onClick={() => handleOrderBy(field)}
                    style={{
                      strokeWidth: "3px",
                      cursor: "pointer",
                      transform:
                        orderBy && field === orderBy.field
                          ? orderBy.order === "desc"
                            ? "rotate(180deg)"
                            : ""
                          : "",
                    }}
                    stroke={
                      orderBy && field === orderBy.field ? "red" : "#bfbfbf"
                    }
                  />
                )}
              </Flex>
            </TableHead>
          ))}

          <TableHead
            textStyle="tableHead"
            style={{ width: "1rem", textAlign: "center" }}
            height={height}
          />
        </TableRow>
      </thead>
      <Tbody />
    </Table>
  );
};
