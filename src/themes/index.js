import { base } from "@theme-ui/presets";

import { getColors } from "./colors";

const breakpoints = ["40em", "52em", "64em"];

const fontSizes = {
  title: "1.75rem", // 32px
  subtitle: "1.25rem", // 18px
  subsubtitle: "1rem", // 16px
  default: "1rem", // 16px
  primary: "1rem", // 16px
  regular: "0.875rem", // 14px
  secondary: "0.875rem", // 14px
  tertiary: "0.750rem", // 12px
  small: "0.625rem", //10px
  xsmall: "0.5rem", // 8px
  label: "0.825rem",
  tag: "0.875rem",
};

const fontWeights = {
  light: 300,
  regular: 400,
  semibold: 600,
  bold: 700,
  extrabold: 900,
};

const forms = {
  default: {
    transition: "all 250ms",
    border: (theme) => `1px solid ${theme.colors.t5}`,
    "::placeholder": {
      color: "placeholder",
    },
    color: "t1",
    ":focus": {
      outline: "none",
      border: (theme) => `1px solid ${theme.colors.focus}`,
      boxShadow: (theme) => `0px 0px 0px 2px ${theme.colors.focus}`,
    },
    ":hover": {
      backgroundColor: "l1",
    },
  },
  textarea: {
    transition: "all 250ms",
    fontSize: "1rem",
    border: (theme) => `1px solid ${theme.colors.t5}`,
    "::placeholder": {
      color: "placeholder",
    },
    color: "t1",
    ":focus": {
      outline: "none",
      border: (theme) => `1px solid ${theme.colors.focus}`,
      boxShadow: (theme) => `0px 0px 0px 2px ${theme.colors.focus}`,
    },
    ":hover": {
      backgroundColor: "l1",
    },
  },
  clickToEdit: {
    transition: "all 250ms",
    padding: 0,
    borderRadius: 0,
    border: "1px solid transparent",
    color: "t1",
    cursor: "pointer",
    ":focus": {
      borderRadius: 0,
      border: (theme) => `1px solid ${theme.colors.focus}`,
    },
    ":hover": {
      border: (theme) => `1px solid ${theme.colors.t5}`,
      backgroundColor: "l1",
    },
  },
  enabled: {
    transition: "all 250ms",
    border: (theme) => `1px solid ${theme.colors.t5}`,
    "::placeholder": {
      color: "placeholder",
    },
    color: "t1",
    ":focus": {
      outline: "none",
      border: (theme) => `1px solid ${theme.colors.focus}`,
      boxShadow: (theme) => `0px 0px 0px 2px ${theme.colors.focus}`,
    },
    ":hover": {
      backgroundColor: "l1",
    },
  },

  disabled: {
    backgroundColor: "l2",
    outline: "none",
    border: "1px solid transparent",
    cursor: "not-allowed",
    color: "t1",
  },
};

export const THEMES = {
  light: {
    ...base,
    breakpoints,
    colors: { ...base.colors, ...getColors("light") },
    styles: {
      ...base.styles,
    },
    fontSizes,
    fontWeights,
    forms,
    text: {
      label: {
        color: "t1",
        fontSize: "label",
      },
      title: {
        color: "t1",
        fontSize: "title",
        fontWeight: "bold",
      },
      subtitle: {
        color: "t1",
        fontSize: "subtitle",
        fontWeight: "bold",
      },
      subsubtitle: {
        fontSize: "subsubtitle",
        fontWeight: "bold",
        color: "t2",
      },
      caps: {
        textTransform: "uppercase",
        letterSpacing: ".2rem",
      },
      group: {
        fontSize: "12px",
        fontWeight: "semibold",
        color: "t4",
        ml: "8px",
        mb: "2px",
      },
    },
    buttons: {
      disabled: {
        fontWeight: "bold",
        color: "white",
        bg: "l3",
        "&:hover": {
          bg: "dark",
        },
      },
      primary: {
        fontWeight: "bold",
        color: "white",
        bg: "primary",
        cursor: "pointer",
        "&:hover": {
          bg: "dark",
        },
      },
      secondary: {
        fontWeight: "bold",
        color: "white",
        bg: "primary",
        "&:hover": {
          bg: "dark",
        },
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
};
