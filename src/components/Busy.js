import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

import { Flex } from "./Flex";

const bounce = keyframes`
    0% {
        transform: scale(1.0);
    }
    50% {
        transform: scale(3.0);
    }
      
    100% {
        transform: scale(1.0);
    }
      
`;
const Dots = styled("div")`
  width: 5px;
  height: 5px;
  border-radius: 100%;
  margin-right: 16px;
  display: inline-block;
  background-color: blue;
  animation: 1.7s ${bounce} ease-in-out infinite;
  &:nth-of-type(2) {
    animation-delay: 0.2s;
  }
  &:nth-of-type(3) {
    animation-delay: 0.35s;
  }
`;

export const Busy = ({ ...props }) => {
  return (
    <Flex style={{ alignItems: "center", padding: "1rem" }} {...props}>
      <Dots />
      <Dots />
      <Dots />
    </Flex>
  );
};
