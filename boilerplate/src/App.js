import MODULES from "./modules";

import { getRoutes, GlobalProvider, LAYOUTS, Routes } from "@tomato/components";

const App = () => {
  const modulesRoutes = getRoutes(MODULES);
  const manualRoutes = [];
  const routes = [...modulesRoutes, ...manualRoutes];

  return (
    <GlobalProvider locale="pt-BR" tz="America/Sao_Paulo" theme={"light"}>
      <Routes routes={routes} layouts={LAYOUTS} />
    </GlobalProvider>
  );
};

export default App;
