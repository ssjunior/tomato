import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom";
import { Provider } from "react-redux";

import App from "./App";
import { STORE } from "@tomato/core";

createRoot(document.getElementById("root")).render(
  <Provider store={STORE}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
