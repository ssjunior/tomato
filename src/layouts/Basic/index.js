import React from "react";

import { Flex } from "../../components";
import { getShadow } from "../../themes/util";
import { UI } from "../../constants/ui";

const MainWindow = ({ View, ...props }) => {
  return (
    <Flex
      id="main-wrapper"
      height="100%"
      flexGrow="1"
      minWidth={0} // evita expandir parent
      bg="l1"
      {...getShadow("s0")}
      borderLeft={UI.BORDER}
      {...UI.PANELS_BORDER_RADIUS}
      pl="2em"
    >
      <View {...props} />
    </Flex>
  );
};

export const BasicLayout = ({ View, MainMenu, SecondaryMenu, ...props }) => {
  // console.log("V", View);
  // console.log("M", MainMenu);
  // console.log("S", SecondaryMenu);

  return (
    <Flex id="app-wrapper" width={1} height="100%" bg="l3">
      {MainMenu && (
        <Flex
          id="main-menu-wrapper"
          height="100%"
          flexDirection="column"
          py={4}
          width="15em"
          maxWidth="15em"
          minWidth="15em"
          overflow="auto"
        >
          <MainMenu {...props} />
        </Flex>
      )}

      {SecondaryMenu ? (
        <Flex id="main-secondary-menu-wrapper" flexGrow="1" height="100%">
          <Flex
            id="secondary-menu-wrapper"
            p={4}
            height="100%"
            flexGrow="1"
            bg="l1"
            maxWidth="15em"
            minWidth="15em"
            boxShadow={UI.BOX_SHADOW}
            {...UI.PANELS_BORDER_RADIUS}
            borderLeft={UI.BORDER}
          >
            <SecondaryMenu {...props} />
          </Flex>

          <MainWindow View={View} {...props} />
        </Flex>
      ) : (
        <MainWindow View={View} {...props} />
      )}
    </Flex>
  );
};

export default BasicLayout;
