import { ThemeProvider } from "theme-ui";

import { GlobalStyle, Toast } from "./";

// import { LoadingBar } from "../LoadingBar";

export const GlobalProvider = ({ children, theme }) => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        {children}
        <Toast />
      </ThemeProvider>
    </>
  );
};
