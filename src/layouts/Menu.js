import { useEffect } from "react";
import Tippy from "@tippyjs/react/headless";
import { Grid } from "theme-ui";

import { Link, useMatch, useResolvedPath } from "react-router-dom";

import { Column, Flex, Icon, Text } from "../components";
import { useLocalStorage } from "../hooks";

import { getModules } from "./modules";

const CustomLink = ({ children, to, ...props }) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Flex
      sx={{
        alignItems: "center",
        backgroundColor: match ? "l4" : "",
        width: "100%",
        padding: "4px 6px",
        borderRadius: "4px",
      }}
    >
      <Link style={{ textDecoration: "none" }} to={to} {...props}>
        {children}
      </Link>
    </Flex>
  );
};

const Options = ({ options, activeOption, setActiveOption }) => {
  const option = options[activeOption];

  return (
    <Tippy
      placement="bottom"
      // trigger="click"
      interactive={true}
      offset={[0, 4]}
      render={() => (
        <Flex
          p="0.5rem"
          px="0.75rem"
          sx={{
            bg: "l0",
            width: "400px",
            borderRadius: "8px",
            boxShadow: "2px 3px 16px -2px rgba(0,0,0,0.40)",
          }}
        >
          <Grid gap={2} columns={[3, "1fr 1fr 1fr"]}>
            {options.map((option, index) => (
              <Flex
                key={index}
                hoverColor="lightBlue"
                onClick={() => setActiveOption(index)}
                style={{ cursor: "pointer" }}
              >
                {option.label}
              </Flex>
            ))}
          </Grid>
        </Flex>
      )}
    >
      <Text
        sx={{
          ml: "8px",
          fontSize: "20px",
          fontWeight: "semibold",
          marginBottom: "8px",
        }}
        style={{ textStyle: "uppercase" }}
      >
        {option.label}
      </Text>
    </Tippy>
  );
};

const SubModule = ({ submodule }) => {
  const RenderIcon = submodule.icon ? Icon[submodule.icon] : "User";
  return (
    <CustomLink to={submodule.linkTo}>
      <>
        <Flex
          sx={{
            alignItems: "center",
            width: "100%",
          }}
        >
          <RenderIcon sx={{ strokeWidth: "2px" }} stroke="#2b98ff" />
          <Text sx={{ ml: 2, fontSize: "13px", color: "t2" }}>
            {submodule.label}
          </Text>
        </Flex>
      </>
    </CustomLink>
  );
};

const Module = ({ index, module }) => {
  return (
    <>
      <Text
        variant="group"
        sx={{
          mt: index ? "18px" : "",
        }}
      >
        {module.label}
      </Text>

      {module.childrens &&
        module.childrens.map((submodule, index) => (
          <SubModule
            key={index + "sm"}
            submodule={submodule}
            moduleId={module.id}
          />
        ))}
    </>
  );
};

export const Menu = () => {
  const [activeMenu, setActiveMenu] = useLocalStorage("activeMenu", 0);
  const [activeOption, setActiveOption] = useLocalStorage("activeOption", 0);

  const ACTIVE = {
    0: [
      { 1: [1, 2, 3] },
      { 2: [4, 5, 6] },
      { 3: [8, 14, 15] },
      { 4: [7] },
      { 5: [13] },
      { 6: [10] },
      // { 7: [1] },
      { 8: [12] },
      // { 9: [] },
      { 10: [9] },
      { 11: [11] },
      { 12: [9] },
    ],
    2: [{ 1: [1] }, { 2: [4, 5, 6] }],
    3: [{ 1: [1, 3] }],
    4: [{ 1: [1, 2] }],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
    10: [],
    11: [],
    12: [],
  };

  const options = getModules(ACTIVE);
  const option = options[activeOption];
  const modules = option.modules;

  useEffect(() => {
    if (!activeMenu) {
      setActiveMenu({
        module: modules[0].id,
        submodule: modules[0].childrens[0].id,
      });
    }
  }, [activeMenu, modules, setActiveMenu]);

  useEffect(() => {
    if (!activeMenu) {
      setActiveMenu({
        module: modules[0].id,
        submodule: modules[0].childrens[0].id,
      });
    }
  }, [activeMenu, modules, setActiveMenu]);

  return (
    <Column overflow="auto" pb="1rem">
      <Options
        options={options}
        activeOption={activeOption}
        setActiveOption={setActiveOption}
      />

      {modules.map((module, index) => (
        <Module key={index} index={index} module={module} />
      ))}
    </Column>
  );
};
