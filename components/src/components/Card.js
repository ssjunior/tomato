import styled from "@emotion/styled";

import { Column } from "./Column";

export const Card = styled(Column)({
  padding: 16,
  borderRadius: 8,
  boxShadow: "0 4px 32px rgba(0,0,0,.1)",
});

Card.displayName = "Card";
