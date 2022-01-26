import { Flex as FlexBase } from "theme-ui";
import styled from "@emotion/styled";

export const Flex = styled(FlexBase)(
  {},
  (props) =>
    props.hoverColor &&
    `
      &:hover {
        color: ${props.theme.colors[props.hoverColor]};
      }
    `,
  (props) =>
    props.hoverBg &&
    `
      &:hover {
        background-color: ${props.theme.colors[props.hoverBg]};
      }
    `
);

Flex.displayName = "Flex";
