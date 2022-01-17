import { Flex } from "../components";

export const Page404 = () => (
  <Flex
    sx={{
      width: "100%",
      height: "100vh",
      alignItems: "center",
      justifyContent: "center",
      backgroundImage: "url('/static/http/404.svg')",
      backgroundPosition: "center",
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
    }}
  >
    <Flex
      sx={{
        p: 30,
        border: "1px solid lightGrey",
        bg: "white",
        borderRadius: 8,
        cursor: "pointer",
        boxShadow: "0px 0px 16px 0px rgba(0,0,0,0.75)",
      }}
    >
      Ohh noooo! This page does not exist! Shall we go back?
    </Flex>
  </Flex>
);
