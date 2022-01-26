import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Transition from "react-transition-group/Transition";

import { Flex } from "./Flex";
import { Hotkeys } from "./Hotkeys";
import { Icon } from "./Icon";

const SidesheetWrapper = styled.div`
  position: fixed;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  display: flex;
  z-index: 99999;
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: black;
  opacity: 0.4;
  z-index: 50;
`;

const ANIMATION_DURATION = 180;

const defaultStyle = {
  transition: `opacity ${ANIMATION_DURATION}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 1 },
  exited: { opacity: 0 },
};

const defaultInnerStyle = {
  zIndex: 75,
  transform: "translate(100%)",
  boxShadow: "0px 0px 18px 0px rgba(0,0,0,0.5)",
};

// const transitionInnerStyles = {
//   entering: {
//     transform: "translate(100%)",
//     transition: `transform ${ANIMATION_DURATION}ms ease-in-out`,
//   },
//   entered: {
//     transform: "translate(0%)",
//     transition: `transform ${ANIMATION_DURATION}ms ease-in-out`,
//   },
//   exiting: {
//     transform: "translate(100%)",
//     transition: `transform ${ANIMATION_DURATION}ms ease-in-out`,
//   },
//   exited: {
//     transform: "translate(0%)",
//     transition: `transform ${ANIMATION_DURATION}ms ease-in-out`,
//   },
// };

export const Drawer = ({
  disableBg = false,
  position = "RIGHT",
  open,
  width,
  setOpen,
  onExit,
  onExited,
  children,
  showClose = true,
  ...props
}) => {
  const [openSidesheet, setOpenSidesheet] = useState(open);

  useEffect(() => {
    if (open) {
      setOpenSidesheet(true);
    } else if (openSidesheet && !open) setOpenSidesheet(false);
  }, [open, openSidesheet]);

  const handleExit = () => {
    onExit && onExit();
  };
  const handleExiting = () => {};
  const handleExited = () => {
    if (setOpen) setOpen(false);
    onExited && onExited();
  };
  const handleEnter = () => {};
  const handleEntering = () => {};
  const handleEntered = () => {};

  const handleClick = () => {
    setOpenSidesheet(false);
  };

  const onKeysDown = (keyStrokes) => {
    switch (keyStrokes) {
      case "escape":
        setOpenSidesheet(false);
        break;
      default:
    }
  };

  const style =
    position === "RIGHT" ? { ml: "auto", mr: 0 } : { ml: 0, mr: "auto" };

  const getTranstitionStyle = (position) => {
    const left = position === "RIGHT";
    return {
      entering: {
        transform: `translate(${left ? "100%" : "-100%"})`,
        transition: `transform ${ANIMATION_DURATION}ms ease-in-out`,
      },
      entered: {
        transform: "translate(0%)",
        transition: `transform ${ANIMATION_DURATION}ms ease-in-out`,
      },
      exiting: {
        transform: `translate(${left ? "100%" : "-100%"})`,
        transition: `transform ${ANIMATION_DURATION}ms ease-in-out`,
      },
      exited: {
        transform: "translate(0%)",
        transition: `transform ${ANIMATION_DURATION}ms ease-in-out`,
      },
    };
  };
  const transitionInnerStyles = getTranstitionStyle(position);

  return (
    <Transition
      appear
      unmountOnExit
      timeout={ANIMATION_DURATION}
      in={openSidesheet}
      onExit={handleExit}
      onExiting={handleExiting}
      onExited={handleExited}
      onEnter={handleEnter}
      onEntering={handleEntering}
      onEntered={handleEntered}
    >
      {(state) => (
        <SidesheetWrapper
          style={{ ...defaultStyle, ...transitionStyles[state] }}
          pl={20}
        >
          <Hotkeys keys={["escape"]} onKeysDown={onKeysDown} />

          <Flex
            style={{
              ...defaultInnerStyle,
              width: width || 600,
              maxWidth: width || 600,
              minWidth: width || 600,
              height: "100%",
              ...transitionInnerStyles[state],
            }}
            {...style}
            bg="l0"
            {...props}
          >
            {showClose && (
              <Flex
                bg="l0"
                p="0.25rem"
                onClick={() => {
                  setOpenSidesheet(false);
                }}
                style={{
                  cursor: "pointer",
                  borderRadius: "2rem",
                  position: "absolute",
                  top: "1rem",
                  left: "-2rem",
                  zIndex: "10",
                }}
              >
                <Icon.Close />
              </Flex>
            )}

            {children}
          </Flex>

          {!disableBg && <Background onClick={handleClick} />}
        </SidesheetWrapper>
      )}
    </Transition>
  );
};
