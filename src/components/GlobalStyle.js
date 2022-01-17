import { Global } from "@emotion/react";

export const GlobalStyle = (props) => {
  return (
    <>
      <Global
        styles={(theme) => ({
          body: {
            p: { margin: 0 },
            height: "100vh",
            margin: 0,
          },
          "body > #root": {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            overflow: "auto",
          },
        })}
      />
    </>
  );
};
