import { Global } from "@emotion/react";

export const GlobalStyle = (props) => {
  return (
    <>
      <Global
        styles={(theme) => ({
          body: {
            fontFamily:
              "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
            p: { margin: 0 },
            height: "100vh",
            margin: 0,
          },
          "body > #root": {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          },
        })}
      />
    </>
  );
};
