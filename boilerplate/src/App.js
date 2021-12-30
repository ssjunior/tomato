import { ThemeProvider } from "@tomato/components";
import { theme } from "./theme";

import { Routes } from "./routes";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
};

export default App;
