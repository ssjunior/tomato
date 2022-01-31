import { Text } from "./Text";

export const Label = ({ children, ...props }) => {
  if (!children) return null;

  return (
    <Text variant="label" {...props}>
      {children}
    </Text>
  );
};
