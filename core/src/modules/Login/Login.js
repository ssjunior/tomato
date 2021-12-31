import { useState } from "react";
import { Button, Column, Flex, Input, Text } from "@tomato/components";

export const Login = ({ authUrl }) => {
  const [email, setEmail] = useState("emails");
  const [password, setPassword] = useState("");

  return (
    <Flex sx={{ height: "100vh", alignItems: "center" }}>
      <Column sx={{ width: "50%", p: 4, alignItems: "center" }}>
        <Column
          sx={{
            maxWidth: 480,
            width: "100%",
            border: "1px solid grey",
            borderRadius: 8,
            padding: "32px",
            alignItems: "center",
          }}
        >
          <Input
            label="Email"
            placeholder="email"
            width="100%"
            onChange={setEmail}
          />
          <Input
            label="Password"
            placeholder="password"
            type="password"
            mt={4}
            onChange={setPassword}
          />
          <Button
            mr={2}
            mt={4}
            sx={{ width: "100%" }}
            onClick={() => console.log("click")}
          >
            Login
          </Button>
          <Text sx={{ marginTop: "32px" }}>Forget Password?</Text>
        </Column>
      </Column>
      <Column
        sx={{ background: "#efefef", width: "50%", height: "100vh" }}
      ></Column>
    </Flex>
  );
};
