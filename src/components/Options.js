import { useTranslation } from "react-i18next";

import { Column, Flex, Label, Text } from "../components";

export const Options = ({
  label,
  onSelect,
  options,
  selected,
  size = "MEDIUM",
  uppercase = false,
  ...props
}) => {
  const { t } = useTranslation();

  if (!options) return null;

  const SIZES = {
    SMALL: {
      borderRadius: "0.25rem",
      fontSize: uppercase ? "0.675rem" : "0.75rem",
      minWidth: "4rem",
      px: "0.25rem",
      py: "0.125rem",
    },
    MEDIUM: {
      borderRadius: "0.375rem",
      fontSize: uppercase ? "0.675rem" : "0.75rem",
      minWidth: "4rem",
      px: "0.25rem",
      py: "0.125rem",
    },
    LARGE: {
      borderRadius: "0.375rem",
      fontSize: uppercase ? "0.75rem" : "0.875rem",
      minWidth: "5rem",
      px: "1rem",
      py: "0.5rem",
    },
  };

  const borderRadius = SIZES[size.toUpperCase()].borderRadius;

  return (
    <Column {...props}>
      {label && <Label>{t(label)}</Label>}

      <Flex
        bg="l2"
        style={{
          borderRadius: borderRadius,
          justifyContent: "space-between",
          width: props.width || "fit-content",
        }}
      >
        {options.map((option, index) => (
          <Flex
            key={index}
            m="0.125rem"
            py="0.25rem"
            px="1rem"
            bg={selected && selected.id === option.id ? "l0" : ""}
            style={{
              textTransform: uppercase ? "uppercase" : "",
              cursor: "pointer",
              justifyContent: "center",
              alignItems: "center",
              ...SIZES[size.toUpperCase()],
            }}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => onSelect && onSelect(option)}
            // fontWeight="semibold"
            // color={selected && selected.id === option.id ? "t1" : "t3"}
            // justifyContent="center"
            // alignItems="center"
          >
            <Text
              // ml="0.5rem"
              // mr={option.count && option.count !== 0 ? "0.25rem" : "0.5rem"}
              style={{
                textAlign: "center",
                whiteSpace: "nowrap",
                textTransform: uppercase ? "uppercase" : "",
                cursor: "pointer",
                width: "fit-content",
                fontWeight: "semibold",
              }}
              color={selected && selected.id === option.id ? "t1" : "t2"}
            >
              {t(option.value)}
            </Text>

            {option.count !== 0 && option.count && (
              <Flex
                style={{ borderRadius: "0.25rem", width: "fit-content" }}
                bg={selected && selected.id === option.id ? "lightBlue" : "l2"}
                ml="0.5rem"
                mr="-0.25rem"
              >
                <Text
                  style={{
                    fontWeight: "semibold",
                    fontSize: "0.6875rem",
                    textAlign: "center",
                  }}
                  px="0.25rem"
                  color={selected && selected.id === option.id ? "t1" : "t2"}
                >
                  {option.count}
                </Text>
              </Flex>
            )}
          </Flex>
        ))}
      </Flex>
    </Column>
  );
};
