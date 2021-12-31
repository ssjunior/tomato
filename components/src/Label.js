import { Text } from "./Text";

export const Label = ({ children }) => {
  return (
    <Text sx={{ marginBottom: 1, fontWeight: "bold", fontSize: 14 }}>
      {children}
    </Text>
  );
};
