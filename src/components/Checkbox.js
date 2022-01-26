import { useState } from "react";
import { Checkbox as Base } from "theme-ui";

import { Flex, Text } from "./";

export const Checkbox = ({
  checked,
  onChange,
  disabled = false,
  label,
  ...props
}) => {
  const [active, setActive] = useState(checked);

  return (
    <Flex
      {...props}
      style={{ alignItems: "center", cursor: "pointer" }}
      onClick={(e) => {
        e.preventDefault();
        if (disabled) return;
        setActive(!active);
        onChange && onChange(!active);
      }}
    >
      <Base checked={active} />

      {label && <Text>{label}</Text>}
    </Flex>
  );
};
