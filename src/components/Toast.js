import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ACTIONS } from "../store";
import { Flex, Icon, Portal, Text } from "./";

const TOAST_COLOR = {
  info: {
    backgroundColor: "lightBlue",
    color: "blue",
  },
  error: {
    backgroundColor: "lightRed",
    color: "red",
  },
  success: {
    backgroundColor: "lightGreen",
    color: "green",
  },
  warning: {
    backgroundColor: "lightOrange",
    color: "orange",
  },
};

const RenderIcon = ({ type }) => {
  const IconRender =
    Icon[type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()];

  return (
    <IconRender
      mt="0.25rem"
      stroke={TOAST_COLOR[type].color}
      style={{
        strokeWidth: "2px",
        width: "1rem",
        height: "1rem",
      }}
    />
  );
};

const RenderToast = ({ toast }) => {
  const dispatch = useDispatch();
  const [completed, setCompleted] = useState(0);

  const removeToast = useCallback(
    (uuid) => {
      dispatch(ACTIONS.toast.remove(uuid));
    },
    [dispatch]
  );

  useEffect(() => {
    if (!toast.autoClose) return;

    const start = Date.now();

    const interval = setInterval(() => {
      const past = (Date.now() - start) / toast.autoClose;

      setCompleted(past * 100);
      if (past > 1) {
        clearInterval(interval);
        removeToast(toast.uuid);
      }
    }, 50);
  }, [removeToast, toast]);

  const color = TOAST_COLOR[toast.type || "info"];

  return (
    <Flex
      px="1rem"
      py="0.5rem"
      mb="1rem"
      bg={color.backgroundColor}
      style={{
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "4px 6px 5px -2px rgba(0,0,0,0.20)",
        width: "20rem",
        minHeight: "2rem",
        borderRadius: "0.25rem",
        position: "relative",
        alignItems: "flex-start",
      }}
    >
      <Flex
        style={{
          width: "100%",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div>
          <RenderIcon type={toast.type} />
        </div>

        <Text
          mx="0.75rem"
          sx={{
            mt: "-0.125rem",
            width: "100%",
            color: "t1",
            fontSize: "0.9375rem",
            fontWeight: "semibold",
          }}
        >
          {toast.message}
        </Text>

        <Flex>
          <Icon.Close
            style={{ cursor: "pointer", strokeWidth: "2px" }}
            onClick={() => removeToast(toast.uuid)}
            width="1rem"
            height="1rem"
          />
        </Flex>
      </Flex>

      {toast.autoClose && (
        <Flex
          style={{
            left: "0.5rem",
            bottom: "0.125rem",
            position: "absolute",
            width: `${completed}%`,
            maxWidth: "96%",
            minHeight: "0.25rem",
            height: "0.25rem",
            transitionDuration: "0.1s",
            transitionProperty: "all",
          }}
          bg={color.color}
        />
      )}
    </Flex>
  );
};

const Toasts = () => {
  const toasts = useSelector((state) => state["toast"]);

  return (
    <>
      {toasts && toasts.lenght !== 0 && (
        <Flex
          style={{
            flexDirection: "column-reverse",
            alignItems: "flex-end",
            position: "absolute",
            right: "1rem",
            top: "1rem",
            zIndex: 100000,
            width: "10px",
          }}
        >
          {toasts.map((toast) => (
            <RenderToast key={toast.uuid} toast={toast} />
          ))}
        </Flex>
      )}
    </>
  );
};

export const Toast = () => {
  return (
    <Portal id="toast">
      <Toasts />
    </Portal>
  );
};
