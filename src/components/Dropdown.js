import { useEffect, useState } from "react";
import Tippy from "@tippyjs/react/headless";

import { Flex } from "./Flex";
import { Button, Column, Icon, Label, Text } from "./";

const DropdownGroup = ({ children }) => {
  return <>{children}</>;
};

const DropdownOption = ({ option, selectedOption, onSelect }) => {
  return (
    <Text
      onClick={() => {
        onSelect(option);
      }}
      onKeyUp={(e) => {
        if (["Enter", "Space"].includes(e.code)) {
          onSelect(option);
        }
      }}
      tabIndex="0"
      hoverBg="l2"
      my="1px"
      bg={option.id === selectedOption.id ? "l2" : "l0"}
      sx={{
        fontSize: "0.875rem",
        color: "t3",
        cursor: "pointer",
        padding: "0.375rem 0.5rem 0.375rem 1rem",
        width: "100%",
      }}
    >
      {option.value}
    </Text>
  );
};

export const Dropdown = ({
  label,
  onSelect,
  options,
  optionsHeight,
  selected = null,
  ...props
}) => {
  const [instance, setInstance] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(selected);

  useEffect(() => {
    if (!instance) return;
    if (open) {
      instance.show();
    } else {
      instance.hide();
    }
  }, [instance, open]);

  useEffect(() => {
    onSelect && onSelect(selectedOption);
    setOpen(false);
  }, [onSelect, selected, selectedOption]);

  return (
    <Column {...props} style={{ border: "1px solid transparent" }}>
      <Label>{label}</Label>
      <Tippy
        onClickOutside={() => setOpen(false)}
        placement="bottom-start"
        trigger="manual"
        interactive={true}
        offset={[0, 8]}
        onShow={({ popper, reference }) => {
          const dim = reference.getBoundingClientRect();
          popper.style.minWidth = dim.width + "px";
        }}
        render={() => {
          return (
            <Column
              py="0.25rem"
              bg="l0"
              style={{
                width: "100%",
                height: optionsHeight || "fitContent",
                borderRadius: "0.25rem",
                border: "1px solid lightGrey",
                flexDirection: "column",
                boxShadow: "2px 3px 8px -2px rgba(0,0,0,0.30)",
              }}
            >
              <DropdownGroup>
                {options.map((option) => (
                  <DropdownOption
                    option={option}
                    setOpen={setOpen}
                    key={option.id}
                    onSelect={setSelectedOption}
                    selectedOption={selectedOption}
                  />
                ))}
              </DropdownGroup>
            </Column>
          );
        }}
        onCreate={setInstance}
      >
        <Button
          onClick={() => {
            setOpen(!open);
          }}
          onKeyUp={(e) => {
            if (e.key === "Escape") {
              setOpen(false);
            }
          }}
          variant={open ? "dropdownOpen" : "dropdown"}
          style={{ minWidth: "5rem", width: "10rem" }}
        >
          <Flex
            style={{
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {selectedOption ? selectedOption.value : "placeholder"}

            <Icon.ChevronDown
              stroke={open ? "#ffffff" : "grey"}
              size="small"
              style={{
                marginLeft: "1rem",
                marginRight: 0,
                strokeWidth: "3px",
              }}
            />
          </Flex>
        </Button>
      </Tippy>
    </Column>
  );
};
