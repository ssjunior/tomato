import React from "react";

import { Box, Column, Label } from "../";

export const Base = React.forwardRef(function Textarea(props, ref) {
  return (
    <Box
      ref={ref}
      as="textarea"
      variant="textarea"
      {...props}
      __themeKey="forms"
      __css={{
        display: "block",
        width: "100%",
        p: "0.5rem",
        appearance: "none",
        fontSize: "inherit",
        fontFamily: "inherit",
        lineHeight: 1.5,
        border: "1px solid",
        borderRadius: "0.25rem",
        color: "inherit",
        bg: "transparent",
      }}
    />
  );
});

export const TextArea = ({ label, placeholder, value = "", ...props }) => {
  return (
    <Column sx={{ width: "100%", ...props }}>
      {label && (
        <Label
          mb="0.125rem"
          px="0.25rem"
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
            minHeight: "1.125rem",
          }}
        >
          {label}
        </Label>
      )}

      <Base
        rows={props.rows || 4}
        defaultValue={value}
        placeholder={placeholder}
        // onKeyUp={(e) => console.log(e)}
        onChange={(e) => console.log(e)}
      />
    </Column>
  );
};
