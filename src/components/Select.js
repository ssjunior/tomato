import { useCallback, useEffect, useRef, useState } from "react";
import Fuse from "fuse.js";
import { Input } from "theme-ui";
import styled from "@emotion/styled";
import Tippy from "@tippyjs/react/headless";
import { useTranslation } from "react-i18next";
import { Virtuoso } from "react-virtuoso";

import { Flex } from "./Flex";
import { Avatar, ClickToEdit, Icon, Label, Spinner, Text } from "./";
import { useDebounce } from "../hooks";

import { t } from "../i18n";

const FlexWrapper = styled(Flex)`
  ${(props) => {
    return `
        transition: all 250ms;         
        box-shadow: ${
          props.focused ? `0px 0px 0px 1px ${props.theme.colors["focus"]}` : ""
        };
        border: 1px solid ${
          props.focused ? props.theme.colors["focus"] : props.theme.colors["t5"]
        };
        color: ${props.theme.colors["t1"]};
        &:hover {
            background-color: ${props.theme.colors["l1"]};
        }                         
    `;
  }}
`;

async function getData(endpoint, page, search, endpointFilter) {
  let url = endpoint + "?page=" + page;
  if (search) url += `&search=${search}`;
  if (endpointFilter) url += `&${endpointFilter}`;

  const response = await fetch(url, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

const fuseOptions = {
  includeScore: false,
  shouldSort: true,
  threshold: 0.15,
  location: 0,
  distance: 1000,
  ignoreLocation: true,
  maxPatternLength: 100,
  minMatchCharLength: 1,
  keys: ["value"],
};

const RenderOptions = ({
  asyncMode,
  disabled,
  enableClear,
  filteredOptions,
  open,
  required,
  selectedOption,
  setSelectedOption,
}) => {
  if (asyncMode && open && !filteredOptions)
    return (
      <div style={{ display: "inline-block" }}>
        <Flex ml="auto" mr="-0.25rem" pl="0.25rem" alignItems="center">
          <Spinner />
        </Flex>
      </div>
    );

  if (disabled) return null;

  return (
    <div style={{ display: "inline-block" }}>
      <Flex
        ml="auto"
        mr="-0.25rem"
        pl="0.25rem"
        style={{ alignItems: "center" }}
      >
        {!required && enableClear && selectedOption && selectedOption.id && (
          <Flex
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setSelectedOption(null);
            }}
          >
            <Icon.Close
              stroke="#cecece"
              minWidth={16}
              minHeight={16}
              style={{ strokeWidth: "2px" }}
            />
            <Flex
              ml="4px"
              style={{ height: "16px", borderLeft: "2px solid lightGrey" }}
            />
          </Flex>
        )}

        <Icon.ChevronDown
          stroke={open ? "black" : "#cecece"}
          size="medium"
          style={{ strokeWidth: "2px" }}
        />
      </Flex>
    </div>
  );
};

const DropdownContent = ({
  asyncMode,
  fuse,
  endpointFilter,
  onSelect,
  filteredOptions,
  selectedOption,
  setFilteredOptions,
  endpoint,
  searchValue,
  options,
  optionsHeight,
  instance,
}) => {
  const { t } = useTranslation();

  const debouncedValue = useDebounce(searchValue, asyncMode ? 400 : 0);
  const [end, setEnd] = useState(asyncMode ? false : true);
  const pageRef = useRef(1);

  useEffect(() => {
    if (asyncMode) pageRef.current = 1;
    instance.show();
    asyncMode && setEnd(false);
  }, [asyncMode, instance]);

  const loadData = useCallback(
    () =>
      getData(endpoint, pageRef.current, debouncedValue, endpointFilter).then(
        (data) => {
          const options = [];
          data.objects.forEach((obj) => {
            options.push({ id: obj.id, value: obj.name });
          });

          setFilteredOptions(
            pageRef.current === 1 ? options : [...filteredOptions, ...options]
          );
          if (data.objects.length < 25) setEnd(true);
        }
      ),
    [
      debouncedValue,
      endpoint,
      endpointFilter,
      filteredOptions,
      setFilteredOptions,
    ]
  );

  useEffect(() => {
    if (!asyncMode) return;
    pageRef.current = 1;
    loadData();
  }, [asyncMode, debouncedValue, loadData]);

  useEffect(() => {
    // a filtragem usando async é feita no get
    if (asyncMode) return;

    if (searchValue) {
      setFilteredOptions(fuse.search(searchValue).map((result) => result.item));
    } else {
      setFilteredOptions(options);
    }
  }, [asyncMode, fuse, options, searchValue, setFilteredOptions]);

  const loadMore = () => {
    if (!asyncMode) return;
    if (debouncedValue !== searchValue) return;
    pageRef.current += 1;
    loadData();
  };

  if (!filteredOptions) return null;

  return (
    <Flex
      ml="-0.25rem"
      bg="l0"
      style={{
        width: "100%",
        height: optionsHeight || "15rem",
        borderRadius: "0.25rem",
        border: "1px solid lightGrey",
        flexDirection: "column",
        boxShadow: "2px 3px 8px -2px rgba(0,0,0,0.30)",
        zIndex: "1000",
      }}
      // py="0.25rem"
    >
      <Virtuoso
        style={{ height: "100vh" }}
        data={filteredOptions}
        endReached={loadMore}
        overscan={200}
        itemContent={(index, option) => {
          console.log(option);

          let Component = null;
          if (option) {
            if (option.avatar) Component = <Avatar src={option.avatar} />;
            if (option.icon) {
              const RenderIcon = Icon[option.icon];
              Component = <RenderIcon />;
            }
            if (option.color)
              Component = (
                <Flex
                  style={{
                    width: "1rem",
                    height: "1rem",
                    bg: option.color,
                    borderRadius: "50%",
                  }}
                />
              );
          }

          return (
            <Flex
              style={{
                width: "100%",
                alignItems: "center",
                key: option.id,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
              px="0.75rem"
              py="0.5rem"
              hoverBg={
                selectedOption
                  ? String(option.id) === String(selectedOption.id)
                    ? "l3"
                    : "lightBlue"
                  : "lightBlue"
              }
              bg={
                selectedOption
                  ? String(option.id) === String(selectedOption.id)
                    ? "l3"
                    : "transparent"
                  : "transparent"
              }
              color={
                selectedOption
                  ? String(option.id) === String(selectedOption.id)
                    ? "white"
                    : "black"
                  : "black"
              }
              onClick={() => {
                onSelect(option);
              }}
            >
              {Component && Component}

              <Text
                stye={{ fontSize: "0.9375rem" }}
                ml={Component ? "0.5rem" : "0px"}
              >
                {option.value}
              </Text>
            </Flex>
          );
        }}
        components={{
          Footer: () => {
            if (!end) return <Spinner my="1rem" />;
            if (filteredOptions.length) {
              return null;
            } else {
              return (
                <Flex sytle={{ width: "100%", height: "100%" }}>
                  <Text m="auto" p="1rem" color="t3">
                    {t("no options found..")}
                  </Text>
                </Flex>
              );
            }
          },
        }}
      />
    </Flex>
  );
};

export const Dropdown1 = ({
  disabled = false,
  enableClear = false,
  endpointFilter,
  label,
  onSelect,
  options,
  optionsHeight,
  order,
  placeholder,
  required = false,
  selected = null,
  endpoint,
  ...props
}) => {
  const inputRef = useRef();

  const asyncMode = endpoint ? true : false;

  const [focused, setFocused] = useState(false);
  const [instance, setInstance] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const getSelected = (selected) => {
    if (!selected) return null;
    if ((selected.id || selected.id === 0) && selected.value) return selected;
    if (!selected.value) {
      const value = options.find((option) => {
        return option.id === selected.id;
      });
      if (value) return { id: selected.id, value: value.value };
    }
    return { id: selected.id, value: selected.value };
  };
  const [selectedOption, setSelectedOption] = useState(getSelected(selected));

  // inicialização das opções
  const getOptions = (options) => {
    if (!options) return;
    return options.filter(
      (option) =>
        (selectedOption && option.value !== selectedOption.value) || true
    );
  };
  // opções que podem ser filtradas usando fuse
  const [filteredOptions, setFilteredOptions] = useState(getOptions(options));

  // abre/fecha dropdown
  const [open, setOpen] = useState(false);

  // só inicializo o fuse se não for async
  let fuse;
  if (!asyncMode) fuse = new Fuse(options || [], fuseOptions);

  // salva o valor selecionado e ajusta o estado
  const onChange = (change) => {
    setSelectedOption(change);
    setOpen(false);
    instance.hide();
    inputRef.current.value = null;
    // inputRef.current.focus();

    if (asyncMode && filteredOptions) setFilteredOptions();

    if (
      typeof onSelect !== "function" ||
      JSON.stringify(change) === JSON.stringify(selected)
    )
      return;

    onSelect(change);
  };

  return (
    <Tippy
      placement="bottom"
      trigger="manual"
      interactive={true}
      offset={[0, 8]}
      onShow={({ popper, reference }) => {
        popper.style.width = reference.getBoundingClientRect().width + "px";
        // console.log(reference.getBoundingClientRect());
        // console.log(popper.style);     x
        // popper.style.x = "-" + reference.getBoundingClientRect().x + "px";
        // popper.style.width = "100%";
      }}
      render={() => {
        return open && !disabled ? (
          <DropdownContent
            asyncMode={asyncMode}
            instance={instance}
            selectedOption={selectedOption}
            onSelect={onChange}
            open={open}
            setOpen={setOpen}
            filteredOptions={filteredOptions}
            order={order}
            endpoint={endpoint}
            endpointFilter={endpointFilter}
            setFilteredOptions={setFilteredOptions}
            searchValue={searchValue}
            options={options}
            optionsHeight={optionsHeight}
            setSearchValue={setSearchValue}
            fuse={fuse}
          />
        ) : null;
      }}
      onCreate={setInstance}
    >
      <Flex flexDirection="column" {...props}>
        <Label label={label} />
        <FlexWrapper
          bg="l0"
          alignItems="center"
          focused={focused}
          onMouseDown={(e) => e.preventDefault()}
          onMouseUp={(e) => e.preventDefault()}
          onClick={() => {
            if (disabled) return;
            setOpen(!open);
            if (!focused) {
              inputRef.current.focus();
            }
          }}
          borderRadius="0.25rem"
          px="0.375rem"
          height={40}
          minHeight={40}
        >
          {!disabled && (
            <Input
              ref={inputRef}
              onFocus={() => {
                setFocused(true);
              }}
              onBlur={() => {
                setFocused(false);
                // setOpen(false);
                setSearchValue("");
                inputRef.current.value = null;
              }}
              onChange={(e) => {
                setSearchValue(e.target.value);

                if (e.target.value && !open) {
                  setOpen(true);
                  instance.show();
                }
              }}
              onKeyUp={(e) => {
                if (e.key === "Enter") console.log("Save");
                if (e.key === "Escape") {
                  setSearchValue("");
                  inputRef.current.value = null;
                  inputRef.current.blur();
                }
              }}
              width={searchValue ? "100%" : "2px"}
              border="1px"
              outline={0}
              px={0}
            />
          )}

          <div
            style={{
              lineHeight: 1,
              width: "calc(100% - 0px)",
            }}
          >
            {!searchValue && (
              <>
                {selectedOption ? (
                  <Text
                    style={{
                      width: "calc(100% - 46px)",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      display: "inline-block",
                      fontSize: "0.9375rem",
                    }}
                  >
                    {selectedOption.value}
                  </Text>
                ) : (
                  <Text
                    style={{
                      width: "calc(100% - 24px)",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      display: "inline-block",
                    }}
                    color="t4"
                  >
                    {placeholder || t("Select an option")}
                  </Text>
                )}
              </>
            )}

            <RenderOptions
              asyncMode={asyncMode}
              disabled={disabled}
              enableClear={enableClear}
              filteredOptions={filteredOptions}
              open={open}
              required={required}
              selectedOption={selectedOption}
              setSelectedOption={onChange}
            />
          </div>
        </FlexWrapper>
      </Flex>
    </Tippy>
  );
};

export const Dropdown = ({
  disabled = false,
  enableClear = false,
  endpointFilter,
  label,
  onSelect,
  options,
  optionsHeight,
  order,
  placeholder,
  required = false,
  selected = null,
  endpoint,
  ...props
}) => {
  const inputRef = useRef();

  return (
    <ClickToEdit
      enableCounter={false}
      value=""
      placeholder={placeholder || t("Select an option")}
    />
  );
};
