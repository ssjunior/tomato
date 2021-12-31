import { GlobalStyle, ThemeProvider } from "@tomato/components";
import { theme } from "./theme";

import { Routes } from "./routes";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Routes />
    </ThemeProvider>
  );
};

export default App;
