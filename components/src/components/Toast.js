import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ACTIONS } from "../store/reducers/actions";
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
      width="1rem"
      height="1rem"
      stroke={TOAST_COLOR[type].color}
      style={{ strokeWidth: "2px" }}
    />
  );
};

const RenderToast = ({ toast }) => {
  const dispatch = useDispatch();
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    if (!toast.autoClose) return;

    const start = Date.now();

    const interval = setInterval(() => {
      const past = (Date.now() - start) / toast.autoClose;

      setCompleted(past);
      if (past > 1) {
        clearInterval(interval);
        removeToast(toast.uuid);
      }
    }, 50);
  }, [removeToast]);

  const removeToast = (uuid) => {
    dispatch(ACTIONS.toast.removeToast(uuid));
  };

  const color = TOAST_COLOR[toast.type || "info"];

  return (
    <Flex
      boxShadow="4px 6px 5px -2px rgba(0,0,0,0.20)"
      mb="0.5rem"
      width="20rem"
      minHeight="2rem"
      borderRadius="0.25rem"
      pt="0.5rem"
      pb="0.75rem"
      pl="1rem"
      pr="2rem"
      bg={color.backgroundColor}
      position="relative"
    >
      <RenderIcon type={toast.type} />

      <Text
        ml="0.75rem"
        color="t1"
        fontSize="0.9375rem"
        fontWeight="semibold"
        borderRight="1px solid lightGrey"
      >
        {toast.message}
      </Text>

      <Flex
        borderLeft="1px solid lightGrey"
        px="0.5rem"
        position="absolute"
        right={0}
      >
        <Icon.Close
          style={{ cursor: "pointer", strokeWidth: "2px" }}
          onClick={() => removeToast(toast.uuid)}
          width="1rem"
          height="1rem"
        />
      </Flex>

      {toast.autoClose && (
        <Flex
          left="0.5rem"
          bottom="0.125rem"
          position="absolute"
          width={completed}
          maxWidth="95%"
          minHeight="0.25rem"
          height="0.25rem"
          bg={color.color}
        />
      )}
    </Flex>
  );
};

export const Toast = () => {
  const toasts = useSelector((state) => state.toast);

  return (
    <Portal id="toast">
      {toasts && toasts.lenght !== 0 && (
        <Flex
          flexDirection="column-reverse"
          position="fixed"
          top="1.25em"
          right="1.25em"
          alignItems="flex-end"
          style={{ zIndex: 100000 }}
        >
          {toasts.map((toast) => (
            <RenderToast key={toast.uuid} toast={toast} />
          ))}
        </Flex>
      )}
    </Portal>
  );
};
