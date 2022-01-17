import { Text } from "../components";

import { Menu } from "./Menu";

export const Default = ({ children }) => (
  <>
    <aside
      sx={{
        flexDirection: "column",
        borderRight: "1px solid #ededed",
        width: 224,
        minWidth: 224,
        display: "flex",
        height: "100%",
        px: 3,
        backgroundColor: "l2",
        overflow: "auto",
      }}
    >
      <Text variant="title">Sidemenu</Text>
      <Menu />
    </aside>

    <div
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
      }}
    >
      <main
        sx={{
          width: "100%",
          maxWidth: 768,
          mx: "auto",
          overflow: "auto",
        }}
      >
        <Text>Main</Text>
        {children}
      </main>
    </div>
  </>
);
