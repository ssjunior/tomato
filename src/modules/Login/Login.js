import { Column, Login as LoginForm } from "@tomato/components";

export const Login = ({ authUrl }) => {
  return (
    <>
      <Column sx={{ width: "50%", p: 4, alignItems: "center" }}>
        <LoginForm authUrl={authUrl} />
      </Column>
      <Column
        sx={{ background: "#efefef", width: "50%", height: "100vh" }}
      ></Column>
    </>
  );
};
