import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Button, Column, Input, Text } from "@tomato/components";

export const Login = ({ authUrl }) => {
  const { t } = useTranslation();

  const [email, setEmail] = useState("emails");
  const [password, setPassword] = useState("");

  return (
    <Column
      sx={{
        minWidth: 360,
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
        placeholder={t("email@domain.com")}
        width="100%"
        onChange={setEmail}
      />
      <Input
        label={t("Password")}
        placeholder={t("at least 8 characteres")}
        type="password"
        mt={4}
        onChange={setPassword}
      />
      <Button
        variant="secondary"
        mt={4}
        sx={{ width: "100%" }}
        onClick={() => console.log("click")}
      >
        Login
      </Button>
      <Text sx={{ marginTop: "32px" }}>Forget Password?</Text>
    </Column>
  );
};
