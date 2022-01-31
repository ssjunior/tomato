import styled from "@emotion/styled";

import { Flex } from "./Flex";

export const Action = styled(Flex)`
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 250ms ease-in-out;
  width: fit-content;
  height: fit-content;
  align-items: center;
  font-weight: 500;
  font-size: 0.875rem;
  as: button;
  ${(props) =>
    `
	  color: ${props.theme.colors["t2"]};
      background: ${props.theme.colors["l2"]};
      &:hover {
	  color: ${props.theme.colors["blue"]};
        background-color: ${props.theme.colors["lightBlue"]};
      }
    `}
`;

Action.defaultProps = {
  as: "button",
  fontSize: "0.875rem",
  paddingTop: "0.25rem",
  paddingBottom: "0.25rem",
  paddingLeft: "0.5rem",
  paddingRight: "0.5rem",
};
