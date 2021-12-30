import { Flex, Heading } from "@tomato/components";

export const Default = ({ children, ...props }) => (
  <Flex
    sx={{
      minHeight: "100vh",
      overflow: "auto",
      ...props,
    }}
  >
    <div
      sx={{
        flexDirection: "column",
        // borderRight: "1px solid #ededed",
        width: 224,
        minWidth: 224,
        display: "flex",
        px: 3,
        background: "#f4f4f4",
      }}
    >
      <Heading>Sidemenu</Heading>
    </div>

    <div
      sx={{
        width: "100%",
        display: "flex",
      }}
    >
      <div
        sx={{
          width: "100%",
          maxWidth: 768,
          mx: "auto",
        }}
      >
        <Heading>Main</Heading>
        {children}
      </div>
    </div>
  </Flex>
);
