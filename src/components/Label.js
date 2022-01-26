import { Text } from "./Text";

export const Label = ({ children, ...props }) => {
  return (
    <Text variant="label" {...props}>
      {children}
    </Text>
  );
};
