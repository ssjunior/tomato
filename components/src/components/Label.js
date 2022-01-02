import { Text } from "./Text";

export const Label = ({ children }) => {
  return <Text sx={{ fontWeight: "bold", fontSize: 14 }}>{children}</Text>;
};
