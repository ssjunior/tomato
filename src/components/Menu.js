import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";

import { Column, Flex, Icon, Text } from "./";

export const Menu = ({
  actions,
  options,
  selected,
  onSelect,
  title,
  opened = true,
  ...props
}) => {
  const { t } = useTranslation();

  const [showOptions, setShowOptions] = useState(false);
  const [open, setOpen] = useState(opened);

  const levelActive = (option) => {
    if (typeof selected === "undefined" || !selected) return false;
    const level = option.level ? option.level : 1;
    const selectedLevel = selected.level ? selected.level : 1;
    const levelActive = selectedLevel === level;
    return levelActive && selected.id === option.id;
  };

  if (!options || !options.length > 0) return null;

  return (
    <Column {...props}>
      {title && (
        <Flex
          ml="1rem"
          mb={open ? "0.5rem" : ""}
          style={{
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => setOpen(!open)}
        >
          <Text
            sx={{
              fontSize: "0.875rem",
              fontWeight: "semibold",
            }}
            // style={{ textTransform: "uppercase" }}
            color="t1"
          >
            {t(title)}
          </Text>

          {false && (
            <Text
              fontSize="0.625rem"
              fontWeight="semibold"
              style={{ textTransform: "uppercase" }}
              color="t4"
              ml="0.5rem"
            >
              {options && options.length}
            </Text>
          )}

          <Icon.ChevronRight
            ml="0.25rem"
            // stroke="grey"
            size="16px"
            style={{
              cursor: "pointer",
              strokeWidth: "1px",
              transform: open ? "rotate(90deg)" : "rotate(0deg)",
            }}
          />
        </Flex>
      )}

      {open &&
        options.map((option, index) => (
          <Fragment key={index}>
            <Flex
              ml="0.5rem"
              pl="1rem"
              pr="1rem"
              py="0.375rem"
              mb="0.25rem"
              style={{
                cursor: "pointer",
                fontSize: "0.875rem",
                fontWeight: levelActive(option) ? "semibold" : "semibold",
                color: levelActive(option) ? "blue" : "t4",
              }}
              // bg={levelActive(option) ? "lightBlue" : "transparent"}
              onClick={() => {
                onSelect && onSelect(option);
              }}
              onMouseEnter={() => actions && setShowOptions(index)}
              onMouseLeave={() => {
                actions && setShowOptions(null);
              }}
              position="relative"
              hoverColor="lightBlue"
              alignItems="center"
            >
              <Text fontSize="0.875rem">{t(option.value)}</Text>
              {option.count !== 0 && (
                <Text ml="0.375rem" fontSize="0.75rem">
                  {option.count}
                </Text>
              )}

              {actions && showOptions === index && (
                <Flex
                  key={index}
                  style={{
                    position: "absolute",
                    right: "0.5rem",
                    top: 0,
                    height: "100%",
                  }}
                >
                  {actions.map((action, index) => {
                    const Render = action.render;
                    return (
                      <Flex
                        key={index}
                        hoverColor="userLight"
                        height="100%"
                        p="0.25rem"
                        alignItems="center"
                        onClick={(e) => {
                          if (!action.onClick) return;
                          e.stopPropagation();
                          action.onClick(option);
                        }}
                      >
                        <Render />
                      </Flex>
                    );
                  })}
                </Flex>
              )}
            </Flex>

            {option.submenu &&
              option.submenu.map((submenu, index) => (
                <Flex
                  ml="0.75rem"
                  px="0.5rem"
                  py="0.5rem"
                  key={index}
                  style={{ cursor: "pointer" }}
                  my="0.25rem"
                  enableHover={true}
                  // fontSize="0.75rem"
                  // fontWeight="semibold"
                  color={levelActive(submenu) ? "t1" : "t2"}
                  bg={levelActive(submenu) ? "l0" : ""}
                  onClick={() => {
                    onSelect && onSelect(submenu);
                  }}
                >
                  {submenu.value}
                </Flex>
              ))}
          </Fragment>
        ))}
    </Column>
  );
};
