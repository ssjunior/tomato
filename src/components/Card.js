import styled from "@emotion/styled";

import { Column } from "./Column";

export const Card = styled(Column)(
  {
    padding: "1rem",
    alignItems: "center",
    borderRadius: "0.375rem",
    overflow: "auto",
    height: "fit-content",
    width: "100%",
    boxShadow: "0px 4px 12px 0px rgba(0,0,0,0.1)",
    backgroundColor: "#ffffff",
  },
  (props) =>
    props.backgroundColor
      ? `backgroundColor: ${props.theme.colors[props.backgroundColor]};`
      : `backgroundColor: ${props.theme.colors.l0};`
);

Card.displayName = "Card";
