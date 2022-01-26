import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { Button, Column, Flex, Icon, Input, Text } from "./";
import { useLocalStorage } from "../hooks";
import { crud } from "../crud";
import { isEmailValid } from "../util";

export const Logout = ({ url }) => {
  console.log(url);
  const loader = ({ state }) => {
    state.user = null;
    localStorage.removeItem("user");
    return state;
  };

  crud.get({
    slice: "account",
    url,
    loader,
  });

  return <Navigate to="/login" replace={true} />;
};

export const LoginForm = ({ url }) => {
  const { t } = useTranslation();

  const user = useSelector((state) => state["account"]).user;
  const doingLogin = useSelector((state) => state["network"]).isLoading;

  const [email, setEmail] = useState();
  const [emailValid, setEmailValid] = useState(false);
  const [login, setLogin] = useLocalStorage("login", { rememberLogin: false });
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // if (login.rememberLogin) setEmail(login.email);
  }, [login.email, login.rememberLogin]);
  useEffect(() => {
    validateEmail(email);
    // if (login.rememberLogin) setLogin({ ...login, email });
  }, [email, login, setLogin]);

  const validateEmail = (email) => {
    if (!email) {
      setEmailValid(false);
    } else if (isEmailValid(email)) {
      setEmailValid(false);
    } else {
      setEmailValid(true);
    }
  };

  const validatePassword = (password) => {
    setPassword(password);
    if (password.length > 4) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
  };

  const handleSubmit = () => {
    const loader = ({ state, response }) => {
      state.user = response;
      localStorage.setItem(
        "user",
        JSON.stringify({ name: response.name, email: response.email })
      );
      return state;
    };

    crud.post({
      slice: "account",
      attribute: "user",
      url,
      payload: { email, password },
      loader,
    });
  };

  const doLogin = () => {
    if (validateEmail && validatePassword) handleSubmit();
  };

  const handleRemember = () => {
    const shouldRemember = !login.rememberLogin;
    const rememberLogin = { rememberLogin: shouldRemember };
    if (shouldRemember && email) {
      rememberLogin.email = email;
    } else {
      delete rememberLogin.email;
    }
    setLogin({ ...rememberLogin });
  };

  if (user) return <Navigate to="/" replace={true} />;

  const buttonText = doingLogin ? t("Working...") : t("Login");

  return (
    <Column
      sx={{
        minWidth: "25rem",
        width: "25rem",
        maxWidth: "25rem",
        borderRadius: "1rem",
      }}
      p="2em"
      pr="1.5rem"
      bg="l0"
      style={{ boxShadow: "0 0px 16px rgba(0,0,0,.1)" }}
    >
      <form style={{ width: "100%" }}>
        <Flex
          sx={{
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Input
            label="Email"
            placeholder={t("Enter your email")}
            type="Email"
            value={email}
            onChange={setEmail}
            autoComplete="username"
            sx={{ width: "100%" }}
          />
          <Icon.Ok
            sx={{ marginLeft: "8px" }}
            stroke={emailValid ? "green" : "#dbdbdb"}
            style={{ strokeWidth: "4px" }}
          />
        </Flex>

        <Flex
          mt="1.5rem"
          sx={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <Input
            label={t("Password")}
            type={showPassword ? "text" : "password"}
            placeholder={t("Enter your password")}
            value={password}
            onChange={validatePassword}
            // rightIcon={showPassword ? "Eye" : "EyeOff"}
            // rightIconClick={() => setShowPassword(!showPassword)}
            onEnter={doLogin}
            autoComplete="current-password"
          />
          <Icon.Ok
            sx={{ marginLeft: "8px" }}
            stroke={passwordValid ? "green" : "#dbdbdb"}
            style={{ strokeWidth: "4px" }}
          />
        </Flex>
      </form>

      <Button
        mt="1.5rem"
        variant={
          (emailValid && passwordValid) || !doingLogin ? "primary" : "disabled"
        }
        onClick={handleSubmit}
        ml="auto"
        sx={{ width: "100%" }}
      >
        {buttonText}
      </Button>

      {false && (
        <Flex alignItems="center" mt={2}>
          <input
            type="checkbox"
            defaultChecked={login.email}
            onClick={handleRemember}
          />
          <Text color="t3" fontSize={14}>
            {t("Remember my login")}
          </Text>
        </Flex>
      )}
    </Column>
  );
};
