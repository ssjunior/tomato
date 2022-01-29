import styled from "@emotion/styled";

import { Column } from "./Column";
import { Text } from "./Text";

export const Base = styled(Column)(
  {
    alignItems: "center",
    borderRadius: "0.5rem",
    overflow: "auto",
    height: "fit-content",
    width: "100%",
    boxShadow: "0px 4px 12px 0px rgba(0,0,0,0.1)",
    backgroundColor: "#ffffff",
    position: "relative",
  },
  (props) =>
    props.backgroundColor
      ? `backgroundColor: ${props.theme.colors[props.backgroundColor]};`
      : `backgroundColor: ${props.theme.colors.l0};`
);

export const Card = ({ title, children, ...props }) => {
  return (
    <Base p="1rem" pt={title ? "3rem" : "1rem"} {...props}>
      {title && <Text variant="cardTitle">{title}</Text>}
      {children}
    </Base>
  );
};
Card.displayName = "Card";
