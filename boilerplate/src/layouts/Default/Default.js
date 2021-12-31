import { Column, Flex, Heading } from "@tomato/components";

export const Default = ({ children }) => (
  <Flex
    sx={{
      minHeight: "100vh",
      overflow: "auto",
    }}
  >
    <Column
      sx={{
        minHeight: "100vh",
        width: 224,
        minWidth: 224,
        p: 3,
        background: "#f4f4f4",
      }}
    >
      <Heading>Sidemenu</Heading>
    </Column>

    <Column
      sx={{
        width: "100%",
        pt: 3,
      }}
    >
      <Column
        sx={{
          maxWidth: 768,
          mx: "auto",
          width: "100%",
        }}
      >
        <Heading>Main</Heading>

        {children}
      </Column>
    </Column>
  </Flex>
);
