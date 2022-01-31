import React from "react";
import styled from "@emotion/styled";
import { Button as ButtonBase } from "theme-ui";

import { Icon } from "./Icon";

const StyledButton = styled(ButtonBase)``;

export const Button = React.forwardRef((props, ref) => {
  const { children, icon, ...bProps } = { ...props };
  const RenderIcon = icon ? Icon[icon] : null;
  return (
    <StyledButton ref={ref} variant="primary" {...bProps}>
      {icon && <RenderIcon size="small" style={{ marginRight: "0.5rem" }} />}
      {children}
    </StyledButton>
  );
});

Button.displayName = "Button";
