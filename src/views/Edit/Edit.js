import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  Action,
  Busy,
  ClickToEdit,
  Confirm,
  Column,
  crud,
  Flex,
  Icon,
} from "../../";

const Tags = () => {};

import { ACTIONS } from "../../store";
// import { PIPZ_API_ROOT } from "config";
import { DEFAULT_SHADOW, MAX_WIDTH } from "../../constants";
import { Data } from "./Data";
import { Filters } from "./Filters";
// import { Header as MainHeader, MainEdit } from "../../components";

const PIPZ_API_ROOT = "";

export const MainHeader = ({ children, ...props }) => {
  return (
    <Column
      mb="1rem"
      style={{ width: "100%", height: "fit-content", ...props }}
    >
      {children}
    </Column>
  );
};

export const MainEdit = ({ children, ...props }) => {
  return (
    <Column
      width={1}
      height="100%"
      bg="l0"
      pt="1rem"
      overflow="auto"
      zIndex={99}
      boxShadow={DEFAULT_SHADOW}
      {...props}
    >
      {children}
    </Column>
  );
};

const SideBar = ({ children, ...props }) => {
  return (
    <Column
      pt="1.5rem"
      style={{
        minWidth: "14rem",
        overflow: "auto",
        flexDirection: "column",
        // bg: "l1",
        ...props,
      }}
    >
      {children}
    </Column>
  );
};

const DefaultHeader = ({ module }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const object = useSelector((state) => state[module.id].object);
  const tags = useSelector((state) => state[module.id].tags) || [];

  const [open, setOpen] = useState(false);

  const hasTags = module.hasTags;
  const updateObj = (data) => {
    dispatch(
      ACTIONS.toast.add({
        message: t("Saving"),
        type: "success",
        autoClose: 1000,
      })
    );

    dispatch(
      ACTIONS.fetch.patch(
        module.id,
        `${PIPZ_API_ROOT}${module.endpoint}/${object.id}`,
        ACTIONS.state.loadObject,
        { ...data },
        (state, response) => {
          state.object = response;
          return state;
        }
      )
    );
  };

  const setTags = (tags) => {
    dispatch(
      ACTIONS.toast.add({
        message: t("Saving"),
        type: "success",
        autoClose: 2000,
      })
    );

    dispatch(
      ACTIONS.fetch.patch(
        module.id,
        `${PIPZ_API_ROOT}${module.endpoint}/${object.id}`,
        ACTIONS.state.loadObject,
        { tags },
        (state, response) => {
          state.object = response;
          return state;
        }
      )
    );
  };

  const deleteObj = () => {
    dispatch(
      ACTIONS.fetch.delete(
        module.id,
        `${PIPZ_API_ROOT}${module.endpoint}/${object.id}`,
        ACTIONS.state.loadObject,
        (state, response) => {
          const id = parseInt(response.id);

          if (Array.isArray(state.objects)) {
            const index = state.objects
              ? state.objects.findIndex((obj) => obj.id === id)
              : -1;

            if (index > -1) {
              state.objects.splice(index, 1);
            }
          } else {
            delete state.objects[id];
          }
          state.object = null;
          state.loadingObjId = null;
          return state;
        }
      )
    );
  };

  const RenderIcon = module.icon ? Icon[module.icon] : null;

  return (
    <>
      {false && (
        <Confirm
          title={t("Delete") + " " + t(module.id)}
          content={
            t("Are you sure that you want to delete") +
            " " +
            t(module.id) +
            " " +
            object[module.deleteInfoKey] +
            "?"
          }
          open={open}
          setOpen={setOpen}
          onConfirm={() => deleteObj(object)}
          yesText={t("Yes, delete")}
          noText={t("No, take me back")}
        />
      )}

      <Column px="2rem" style={{ width: "100%" }}>
        <Flex
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Flex alignItems="center">
            {false && RenderIcon && (
              <Flex borderRadius="50%" mr="0.5rem" border="1px solid black">
                <RenderIcon
                  style={{ strokeWidth: "2px" }}
                  stroke="black"
                  m="0.25rem"
                />
              </Flex>
            )}

            <ClickToEdit
              enabled={true}
              sx={{
                minHeight: "28px",
                fontWeight: "semibold",
                fontSize: "title",
              }}
              value={object.name}
              onBlur={(name) => updateObj({ name })}
              onEnter={(name) => updateObj({ name })}
              placeholder={t("Enter name")}
            />
          </Flex>

          <Flex
            bg="blue"
            borderRadius="50%"
            style={{ cursor: "pointer" }}
            onClick={() => setOpen(true)}
            minWidth="1.75rem"
            height="1.75rem"
          >
            <Icon.Trash
              m="auto"
              stroke="white"
              size="14px"
              style={{ strokeWidth: "2px" }}
            />
          </Flex>
        </Flex>

        {hasTags && (
          <Tags
            mt="1rem"
            tags={object.tags}
            options={tags.map((tag) => tag.name)}
            onChange={setTags}
          />
        )}
      </Column>
    </>
  );
};

export const EditObj = ({ config, module, closeEdit }) => {
  const dispatch = useDispatch();
  const [t] = useTranslation();

  const object = useSelector((state) => state[module.id].object);
  const filter = useSelector((state) => state[module.id].filter);

  const navigate = useNavigate();

  let url;

  const refreshPage = () => {
    dispatch(ACTIONS.fetch.get(module, url, ACTIONS.state.loadObject));
  };

  if (!object) return <Busy mx="auto" />;

  const DataView = (filter && filter.view) || config.main || Data;
  const FilterView = config.left || Filters;
  const HeaderView = config.header || DefaultHeader;
  const RightView = config.right || null;

  return (
    <Flex
      mx="auto"
      style={{
        width: "100%",
        height: "100%",
        maxWidth: 1680,
        overflow: "auto",
      }}
    >
      <SideBar style={{ width: 1 / 6 }}>
        <Action
          ml="0.5rem"
          onClick={() => {
            closeEdit ? closeEdit() : navigate(-1);
          }}
        >
          &#8594; {t("close")}
        </Action>

        <Flex
          mt="2rem"
          // px="0.5rem"
          style={{
            width: "100%",
            height: "100%",
            overflow: "auto",
            flexDirection: "column",
          }}
        >
          <FilterView module={module} config={config} />
        </Flex>
      </SideBar>

      <Column mx="auto" style={{ maxWidth: MAX_WIDTH, width: "100%" }}>
        <MainHeader>
          <HeaderView module={module} refreshPage={refreshPage} />
        </MainHeader>

        <Column
          style={{
            width: "100%",
            height: "100%",
            overflow: "auto",
          }}
        >
          <DataView module={module} config={config} />
        </Column>
      </Column>

      {RightView && (
        <SideBar minWidth="22rem" width={1 / 6}>
          <RightView module={module} object={object} />
        </SideBar>
      )}
    </Flex>
  );
};

export const Edit = ({ editConfig, endpoint, url, module, id, onExit }) => {
  const dispatch = useDispatch();

  const object = useSelector((state) => state[module.id].object);

  useEffect(() => {
    dispatch(ACTIONS[module.id].changeState({ loadingObjId: id }));
    const loader = ({ state, response }) => {
      if (response.meta) {
        state.page = response.meta.page;
        state.objs = response.objects;
      }
      dispatch(ACTIONS[module.id].changeState({ loadingObjId: null }));
      return state;
    };

    crud.get({
      slice: module.id,
      attribute: "object",
      url: endpoint + `/${id}`,
      payload: {},
      loader,
    });
  }, [dispatch, id, endpoint, module.id, url]);

  useEffect(() => {
    return () => {
      dispatch(ACTIONS[module.id].changeState({ object: null }));
    };
  }, [dispatch, module.id]);

  return (
    <>
      {object === null || !editConfig ? (
        <Busy m="auto" />
      ) : (
        <EditObj config={editConfig} module={module} closeEdit={onExit} />
      )}
    </>
  );
};
// <Drawer width="100%" open={open} showClose={false} {...props} bg="l1">
