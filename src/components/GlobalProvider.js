import React, { useContext } from "react";
import { ThemeProvider } from "theme-ui";

import { GlobalStyle, Toast } from "./";
import { THEMES } from "../themes";

// import { LoadingBar } from "../LoadingBar";

const Context = React.createContext({
  locale: "pt-BR",
  tz: "America/Sao_Paulo",
  theme: "light",
});

export const useProvider = () => useContext(Context);

const ThemeWrapper = ({ children }) => {
  const context = useProvider();
  const theme = THEMES[context.theme];

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export const GlobalProvider = ({ children, ...props }) => {
  const previousContext = useProvider();
  const context = { ...previousContext, ...props };

  // <LoadingBar />

  return (
    <Context.Provider value={context}>
      <GlobalStyle />
      <ThemeWrapper>{children}</ThemeWrapper>
      <Toast />
    </Context.Provider>
  );
};
