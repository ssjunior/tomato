import { Global } from "@emotion/react";

export const GlobalStyle = (props) => (
  <Global
    styles={(theme) => ({
      body: {
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
      },
      p: { margin: 0 },
    })}
  />
);
