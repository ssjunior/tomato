import styled from "@emotion/styled";
import { Text as TextBase } from "theme-ui";

export const Text = styled(TextBase)(
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
