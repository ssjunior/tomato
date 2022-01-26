import { Fragment } from "react";

import { Flex, Icon, Text } from "./";

export const Pagination = ({
  enabled = true,
  pagesCount,
  currentPage,
  onChange,
  ...props
}) => {
  const range = [];

  for (let i = 1; i < pagesCount + 1; ++i) {
    range.push(i);
  }

  const firstActive = currentPage !== 1;
  const nextActive = currentPage < pagesCount;
  const previousActive = currentPage > 1;
  const lastActive = currentPage < pagesCount;

  const getPage = (page) => {
    if (enabled) onChange(page);
  };

  if (!pagesCount) return null;

  const style = {
    py: "0.125rem",
    px: "0.5rem",
    mx: "0.125rem",
  };

  return (
    <Flex style={{ alignItems: "center" }} {...props}>
      <Flex
        color={firstActive ? "t1" : "t4"}
        style={{ cursor: "pointer" }}
        onClick={() => getPage(1, firstActive)}
      >
        <Icon.ChevronLeft />
        <Icon.ChevronLeft ml="-12px" />
      </Flex>

      <Flex
        color={previousActive ? "t1" : "t4"}
        style={{ cursor: "pointer" }}
        onClick={() => getPage(currentPage - 1, previousActive)}
      >
        <Icon.ChevronLeft />
      </Flex>

      {range.map((page, index) => {
        return (
          <Fragment key={index}>
            {pagesCount < 10 && (
              <Text
                {...style}
                bg={page === currentPage ? "blue" : "l0"}
                onClick={() => getPage(page)}
                sx={{
                  height: "fit-content",
                  color: page === currentPage ? "white" : "t3",
                  cursor: "pointer",
                  borderRadius: "0.375rem",
                  fontSize: "0.9375rem",
                  fontWeight: page === currentPage ? "semibold" : "",
                }}
              >
                {page}
              </Text>
            )}

            {pagesCount >= 10 && page === 11 && <Flex mx="0.5rem">...</Flex>}

            {pagesCount >= 10 && page < 4 && (
              <Text
                {...style}
                bg={page === currentPage ? "blue" : "l0"}
                onClick={() => getPage(page)}
                sx={{
                  height: "fit-content",
                  color: page === currentPage ? "white" : "t3",
                  cursor: "pointer",
                  borderRadius: "0.375rem",
                  fontSize: "0.9375rem",
                  fontWeight: page === currentPage ? "semibold" : "",
                }}
              >
                {page}
              </Text>
            )}

            {pagesCount >= 10 && page > pagesCount - 3 && (
              <Text
                {...style}
                bg={page === currentPage ? "blue" : "l0"}
                onClick={() => getPage(page)}
                sx={{
                  height: "fit-content",
                  color: page === currentPage ? "white" : "t3",
                  cursor: "pointer",
                  borderRadius: "0.375rem",
                  fontSize: "0.9375rem",
                  fontWeight: page === currentPage ? "semibold" : "",
                }}
              >
                {page}
              </Text>
            )}
          </Fragment>
        );
      })}

      <Flex
        color={nextActive ? "t1" : "t4"}
        style={{ cursor: "pointer" }}
        onClick={() => getPage(currentPage + 1, nextActive)}
      >
        <Icon.ChevronRight />
      </Flex>

      <Flex
        color={lastActive ? "t1" : "t4"}
        style={{ cursor: "pointer" }}
        onClick={() => getPage(pagesCount, lastActive)}
      >
        <Icon.ChevronRight />
        <Icon.ChevronRight ml="-12px" />
      </Flex>
    </Flex>
  );
};
