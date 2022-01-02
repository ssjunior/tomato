import { base, deep, dark, swiss, tailwind } from "@theme-ui/presets";

export const THEMES = {
  dark: {
    ...dark,
    styles: {
      ...dark.styles,
    },
  },
  deep: {
    ...deep,
    styles: {
      ...deep.styles,
    },
  },
  light: {
    ...base,
    styles: {
      ...base.styles,
    },
  },
  swiss: {
    ...swiss,
    styles: {
      ...swiss.styles,
    },
    buttons: {
      secondary: {
        fontWeight: "bold",
        color: "white",
        bg: "primary",
        "&:hover": {
          bg: "dark",
        },
      },
    },
    text: {
      caps: {
        textTransform: "uppercase",
        letterSpacing: ".2em",
      },
      heading: {
        fontFamily: "heading",
        fontWeight: "heading",
        lineHeight: "heading",
      },
      display: {
        // extends the text.heading styles
        variant: "text.heading",
        fontSize: [6, 7, 8],
        fontWeight: "display",
      },
    },
    cards: {
      primary: {
        padding: 2,
        borderRadius: 4,
        boxShadow: "0 0 4px 1px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  tailwind: {
    ...tailwind,
    styles: {
      ...tailwind.styles,
    },
  },
};
