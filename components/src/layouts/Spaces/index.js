import React, { useEffect, useState } from "react";
import { matchPath } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import actions from "store/reducers/actions";
// import { API_ROOT, ROOT_URL } from "config/constants";
import Avatar from "components/Avatar";
import { ChangeTheme } from "themes";
import Box from "components/Box";
import Flex from "components/Flex";
import Icon from "components/Icon";
import Image from "components/Image";
import Link from "components/Link";
import { orderObjects } from "util/order";
import Pill from "components/Pill";
import Spaces from "modules/spaces/Space/Edit";
// import { UI } from "config/constants";
import Text from "components/Text";

const MenuItem = ({ icon, link, option }) => {
  let RenderIcon = Icon[icon];

  let active = matchPath(window.location.pathname, {
    path: link
  });

  return (
    <Link to={link}>
      <Flex alignItems="center" flexDirection="column" mt={8}>
        <Flex
          borderRadius={16}
          hoverColor={active ? "transparent" : "l4"}
          bg={active ? "blue" : "l4"}
          p={4}
          boxShadow={active ? "2px 3px 8px -2px rgba(0,0,0,0.40)" : ""}
        >
          <RenderIcon
            stroke={active ? "white" : "blue"}
            width={22}
            height={22}
          />
        </Flex>

        <Text
          mt={2}
          color={active ? "blue" : "t4"}
          fontSize={14}
          fontWeight="bold"
        >
          {option}
        </Text>
      </Flex>
    </Link>
  );
};

const Item = ({ icon, link, option }) => {
  let RenderIcon = Icon[icon];

  let active = matchPath(window.location.pathname, {
    path: link
  });

  return (
    <Box>
      <Link to={link}>
        <Flex
          minWidth={100}
          alignItems="center"
          borderRadius={6}
          hoverColor={active ? "transparent" : "l3"}
          bg={active ? "lightBlue" : "transparent"}
          my={2}
          p={2}
          flexDirection="column"
        >
          <RenderIcon stroke="black" width={28} height={28} />
          <Text mt={2} color={active ? "t1" : "t4"} fontSize={15}>
            {option}
          </Text>
        </Flex>
      </Link>
    </Box>
  );
};

export const ShowSpaces = () => {
  const dispatch = useDispatch();

  const selectedSpaceId = useSelector(
    (state) => state["space"].selectedSpaceId
  );
  const spaces = useSelector((state) => state["space"].spaces);
  let orderedSpaces = orderObjects(spaces, "order", "desc");

  const [showSpaces, setShowSpaces] = useState(false);

  useEffect(() => {
    let url = `${API_ROOT}/space`;
    dispatch(actions.fetch.get("space", url, actions.space.loadSpaces));
  }, []);

  if (Object.keys(spaces).length === 0) return null;

  if (!selectedSpaceId) return null;

  const space = spaces[selectedSpaceId];

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      onMouseEnter={() => setShowSpaces(true)}
      onMouseLeave={() => setShowSpaces(false)}
      position="relative"
      style={{ cursor: "pointer" }}
      height={32}
      width={1}
    >
      <Flex
        ml={1}
        fontWeight="bold"
        style={{ whiteSpace: "nowrap" }}
        alignItems="baseline"
      >
        {space.name}
        <Icon.ChevronUpDown width={16} height={16} stroke="black" />
      </Flex>

      {showSpaces && (
        <Flex
          left="0px"
          top={28}
          bg="l0"
          position="absolute"
          minWidth={280}
          borderRadius={4}
          border="1px solid lightGrey"
          flexDirection="column"
          boxShadow="2px 3px 8px -2px rgba(0,0,0,0.40)"
          py={1}
          zIndex="1000"
        >
          {orderedSpaces.map((space) => (
            <Text
              mx={2}
              borderRadius={4}
              fontSize={15}
              key={space.id}
              hoverColor="lightBlue"
              style={{ cursor: "pointer" }}
              px={4}
              py={2}
              onClick={() => {
                dispatch(actions.space.selectSpaceId(space.id));
              }}
            >
              {space.name}
            </Text>
          ))}
        </Flex>
      )}
    </Flex>
  );
};

const VerticalMainMenu = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const selectedSpaceId = useSelector(
    (state) => state["space"].selectedSpaceId
  );
  const unreadConversationTotal = useSelector(
    (state) => state["conversation"].unreadTotal
  );
  const updates = useSelector((state) => state["task"].updates);
  const user = useSelector((state) => state["account"].user);

  const [showApps, setShowApps] = useState(false);

  const restart = () => {
    dispatch(actions.space.selectSpaceId(null));
    // dispatch(actions.task.restart());
  };

  const doLogout = () => {
    dispatch(
      actions.fetch.get(
        "account",
        `${ROOT_URL}/logout/`,
        actions.account.logout
      )
    );
  };

  const favicon = document.getElementById("favicon");
  if (unreadConversationTotal !== 0) {
    let count =
      unreadConversationTotal > 10 ? "+10" : `-${unreadConversationTotal}`;
    favicon.href = `/images/favicon/elefante${count}.png`;
  } else {
    favicon.href = "/favicon-32x32.png";
  }

  let show = true;
  // <MenuItem icon="User" link="/contacts" option={t("Contacts")} />
  //
  return (
    <>
      <Image
        borderRadius={16}
        style={{ cursor: "pointer" }}
        height={54}
        width={54}
        src="/images/logo/face.jpg"
        onClick={restart}
        mb={2}
      />

      <Flex minHeight={32} height={32} width={1}>
        <ShowSpaces />
      </Flex>

      {show && selectedSpaceId && (
        <Flex alignItems="center" flexDirection="column">
          {false && (
            <MenuItem
              icon="Dashboard"
              link="/mydashboard"
              option={t("My Dashboard")}
            />
          )}

          {false && <MenuItem icon="Spaces" option={t("Spaces")} />}

          <Box position="relative">
            <MenuItem icon="Task" link="/tasks" option={t("Tasks")} />
            {updates && updates.length !== 0 && (
              <Pill
                position="absolute"
                left={3}
                bottom="18px"
                count={updates.length}
              />
            )}
          </Box>

          {false && (
            <>
              <Box position="relative">
                <MenuItem
                  icon="MessageSquare"
                  link="/conversation"
                  option={t("Chat")}
                />
                {unreadConversationTotal !== 0 && (
                  <Pill
                    position="absolute"
                    right={-4}
                    top={-2}
                    count={unreadConversationTotal}
                  />
                )}
              </Box>

              <MenuItem icon="Note" link="/notes" option={t("Notes")} />

              <MenuItem icon="Link" link="/links" option={t("Links")} />
            </>
          )}

          <MenuItem icon="MessageBoard" link="/topics" option={t("Messages")} />
        </Flex>
      )}

      <Flex alignItems="center">
        {false && (
          <>
            <Icon.Bell
              mr={4}
              width={16}
              height={16}
              onClick={() => {
                dispatch(actions.space.selectMode("TASKS"));
              }}
              style={{ cursor: "pointer" }}
            />

            <ChangeTheme />

            <Avatar ml={4} width="20px" height="20px" src={user.avatar} />

            <Icon.Config
              ml={4}
              width={20}
              minWidth={20}
              height={20}
              minHeight={20}
              onClick={() => {}}
              style={{ cursor: "pointer" }}
            />
          </>
        )}

        {!show && (
          <Flex
            mr={4}
            position="relative"
            onMouseEnter={() => setShowApps(true)}
            onMouseLeave={() => setShowApps(false)}
            style={{ cursor: "pointer" }}
          >
            <Icon.Apps my={1} />

            {showApps && (
              <Flex
                right={0}
                top={24}
                bg="l0"
                py={2}
                px={2}
                position="absolute"
                minWidth={240}
                maxWidth={240}
                borderRadius={4}
                border="1px solid lightGrey"
                boxShadow="2px 3px 8px -2px rgba(0,0,0,0.40)"
                flexWrap="wrap"
                justifyContent="space-around"
              >
                <Item
                  icon="Dashboard"
                  link="/mydashboard"
                  option={t("My Dashboard")}
                />

                <Item icon="Task" link="/tasks" option={t("Tasks")} />

                <Item
                  icon="MessageBoard"
                  link="/topics"
                  option={t("Messages")}
                />

                <Item icon="Note" link="/notes" option={t("Notes")} />

                <Item
                  icon="MessageSquare"
                  link="/conversation"
                  option={t("Chat")}
                />

                <Item icon="Link" link="/links" option={t("Links")} />
              </Flex>
            )}
          </Flex>
        )}

        <Icon.Off
          position="absolute"
          bottom={20}
          width={30}
          minWidth={30}
          height={30}
          minHeight={30}
          onClick={doLogout}
          style={{ cursor: "pointer" }}
        />
      </Flex>
    </>
  );
};

const MainMenu = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const selectedSpaceId = useSelector(
    (state) => state["space"].selectedSpaceId
  );
  const unreadConversationTotal = useSelector(
    (state) => state["conversation"].unreadTotal
  );
  const updates = useSelector((state) => state["task"].updates);
  const user = useSelector((state) => state["account"].user);

  const [showApps, setShowApps] = useState(false);

  const restart = () => {
    dispatch(actions.space.selectSpaceId(null));
    // dispatch(actions.task.restart());
  };

  const doLogout = () => {
    dispatch(
      actions.fetch.get(
        "account",
        `${ROOT_URL}/logout/`,
        actions.account.logout
      )
    );
  };

  const favicon = document.getElementById("favicon");
  if (unreadConversationTotal !== 0) {
    let count =
      unreadConversationTotal > 10 ? "+10" : `-${unreadConversationTotal}`;
    favicon.href = `/images/favicon/elefante${count}.png`;
  } else {
    favicon.href = "/favicon-32x32.png";
  }

  let show = false;
  // <MenuItem icon="User" link="/contacts" option={t("Contacts")} />
  //
  return (
    <Flex
      py={2}
      px={4}
      height={56}
      maxHeight={56}
      minHeight={56}
      bg="l0"
      alignItems="center"
      zIndex="10"
      justifyContent="space-between"
      boxShadow="2px 3px 8px -2px rgba(0,0,0,0.10)"
    >
      <Flex px={4} alignItems="center" width={240}>
        <Image
          borderRadius="50%"
          style={{ cursor: "pointer" }}
          height={32}
          src="/images/logo/face.jpg"
          onClick={restart}
          mr={1}
        />

        <ShowSpaces />
      </Flex>

      {show && selectedSpaceId && (
        <Flex alignItems="center">
          {false && <MenuItem icon="Home" option={t("Home")} />}

          <Box position="relative">
            <MenuItem icon="Task" link="/tasks" option={t("Tasks")} />
            {updates && updates.length !== 0 && (
              <Pill
                position="absolute"
                left={3}
                bottom="18px"
                count={updates.length}
              />
            )}
          </Box>

          <Box position="relative">
            <MenuItem
              icon="MessageSquare"
              link="/conversation"
              option={t("Chat")}
            />
            {unreadConversationTotal !== 0 && (
              <Pill
                position="absolute"
                right={-4}
                top={-2}
                count={unreadConversationTotal}
              />
            )}
          </Box>

          <MenuItem icon="Note" link="/notes" option={t("Notes")} />

          <MenuItem icon="Link" link="/links" option={t("Links")} />

          <MenuItem icon="MessageBoard" link="/topics" option={t("Messages")} />
        </Flex>
      )}

      <Flex alignItems="center">
        {false && (
          <>
            <Icon.Bell
              mr={4}
              width={16}
              height={16}
              onClick={() => {
                dispatch(actions.space.selectMode("TASKS"));
              }}
              style={{ cursor: "pointer" }}
            />

            <ChangeTheme />

            <Avatar ml={4} width="20px" height="20px" src={user.avatar} />

            <Icon.Config
              ml={4}
              width={20}
              minWidth={20}
              height={20}
              minHeight={20}
              onClick={() => {}}
              style={{ cursor: "pointer" }}
            />
          </>
        )}

        {!show && (
          <Flex
            mr={4}
            position="relative"
            onMouseEnter={() => setShowApps(true)}
            onMouseLeave={() => setShowApps(false)}
            style={{ cursor: "pointer" }}
          >
            <Icon.Apps my={1} />

            {showApps && (
              <Flex
                right={0}
                top={24}
                bg="l0"
                py={2}
                px={2}
                position="absolute"
                minWidth={240}
                maxWidth={240}
                borderRadius={4}
                border="1px solid lightGrey"
                boxShadow="2px 3px 8px -2px rgba(0,0,0,0.40)"
                flexWrap="wrap"
                justifyContent="space-around"
              >
                <Item
                  icon="Dashboard"
                  link="/mydashboard"
                  option={t("My Dashboard")}
                />

                <Item icon="Task" link="/tasks" option={t("Tasks")} />

                <Item
                  icon="MessageBoard"
                  link="/topics"
                  option={t("Messages")}
                />

                <Item icon="Note" link="/notes" option={t("Notes")} />

                <Item
                  icon="MessageSquare"
                  link="/conversation"
                  option={t("Chat")}
                />

                <Item icon="Link" link="/links" option={t("Links")} />
              </Flex>
            )}
          </Flex>
        )}
        <Icon.Off
          width={20}
          minWidth={20}
          height={20}
          minHeight={20}
          onClick={doLogout}
          style={{ cursor: "pointer" }}
          mx={4}
        />
      </Flex>
    </Flex>
  );
};

const Layout = ({ View }) => {
  const selectedSpaceId = useSelector(
    (state) => state["space"].selectedSpaceId
  );

  return (
    <>
      <Flex
        height="100%"
        alignItems="center"
        flexDirection="column"
        p={4}
        maxWidth={200}
        minWidth={200}
      >
        <VerticalMainMenu />
      </Flex>

      <Flex
        height="100%"
        flexGrow="1"
        minWidth={0} // evita task expandir parent
        bg="l2"
        {...UI.PANELS_BORDER_RADIUS}
      >
        {selectedSpaceId ? <View /> : <Spaces.Spaces />}
      </Flex>
    </>
  );
};

export default Layout;
