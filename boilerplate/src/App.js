import MODULES from "./modules";

import { getRoutes, GlobalProvider, Routes } from "@tomato/components";

const App = () => {
  const modulesRoutes = getRoutes(MODULES);
  const manualRoutes = [];
  const routes = [...modulesRoutes, ...manualRoutes];

  return (
    <GlobalProvider locale="pt-BR" tz="America/Sao_Paulo" theme={"light"}>
      <Routes routes={routes} />
    </GlobalProvider>
  );
};

export default App;
