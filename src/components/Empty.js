import { useTranslation } from "react-i18next";

import { Flex, Icon, Image, Text } from "./";

export const Empty = ({ src, show = true, label, value, ...props }) => {
  const { t } = useTranslation();

  if (!show) return null;

  return (
    <Flex
      mt="2rem"
      mx="auto"
      {...props}
      style={{
        flexDirection: src ? "column" : "row",
        alignItems: "center",
      }}
    >
      {src ? (
        <>
          <Image style={{ maxHeight: "8rem" }} src={src} />
          <Text ml="0.5rem" mt="1rem" color="t3">
            {label || t("No data to show")}
          </Text>
        </>
      ) : (
        <>
          <Icon.Info />
          <Text ml="0.5rem" color="t3">
            {value || t("No data to show")}
          </Text>
        </>
      )}
    </Flex>
  );
};
