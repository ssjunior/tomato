import { Box } from "theme-ui";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

import { SIZES } from "../constants";

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const border = "3px";
const color = "#9bcff7";

const SpinnerBase = styled(Box)`
  animation: ${rotate360} 0.5s linear infinite;
  transform: translateZ(0);
  border-top: ${border} solid ${color};
  border-right: ${border} solid ${color};
  border-bottom: ${border} solid ${color};
  border-left: ${border} solid #1480d6;
  background: transparent;
  border-radius: 50%;
  z-index: 50;
  pointer-events: none;
`;

export const Spinner = ({ ...props }) => {
  const size = props.size ? SIZES[props.size] : SIZES.medium;

  return <SpinnerBase m="auto" {...props} {...size} />;
};
