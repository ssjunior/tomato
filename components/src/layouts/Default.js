import { Text } from "../components";
import { NavLink } from "theme-ui";

const Menu = ({ optionss = [] }) => {
  const options = [1, 2, 3, 4];

  return (
    <nav>
      <NavLink href="/" p={2}>
        Home
      </NavLink>
      <NavLink href="/" p={2}>
        Home
      </NavLink>
      {options.map((option, index) => {
        return (
          <div
            key={index}
            sx={{
              borderRadius: "4px",
              color: "t2",
              padding: "4px",
              fontSize: "14px",
              backgroundColor: "#c4c4c4",
            }}
          >
            {option}
          </div>
        );
      })}
    </nav>
  );
};

export const Default = ({ children, ...props }) => (
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
        }}
      >
        <Text>Main</Text>
        {children}
      </main>
    </div>
  </>
);
