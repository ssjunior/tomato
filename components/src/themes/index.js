import { base, deep, dark, swiss, tailwind } from "@theme-ui/presets";

import { getColors } from "./colors";

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
    backgroundColor: "l0",
    // border: `1px solid ${
    //   COLORS(variant, primaryColor, defaultSaturation).t5
    // }`,
    // color: COLORS(variant, primaryColor, defaultSaturation).t1,
    // cursor: "pointer",
    // ":focus": {
    //   border: `1px solid ${
    //     COLORS(variant, primaryColor, defaultSaturation).focus
    //   }`,
    //   boxShadow: "0px 0px 0px 1px hsla(230, 100%, 47%)",
    //   transition: "all 250ms"
    // },
    // "::placeholder": {
    //   color: COLORS(variant, primaryColor, defaultSaturation).t4
    // },
    // ":hover": {
    //   backgroundColor: COLORS(variant, primaryColor, defaultSaturation).l1
    // },
    // wordWrap: "break-word",
    // outline: 0,
    // whiteSpace: "normal",
    // display: "inline-block",
    // boxShadow: "none",
    // transition: "all .3s ease"
  },

  clickToEdit: {
    // backgroundColor: "transparent",
    // padding: 0,
    // border: "1px solid transparent",
    // color: COLORS(variant, primaryColor, defaultSaturation).t1,
    // cursor: "pointer",
    // ":focus": {
    //   border: `2px solid ${
    //     COLORS(variant, primaryColor, defaultSaturation).focus
    //   }`,
    //   transition: "all 250ms",
    // },
    // ":hover": {
    //   backgroundColor: COLORS(variant, primaryColor, defaultSaturation).l1,
    // },
    // wordWrap: "break-word",
    // whiteSpace: "normal",
    // display: "inline-block",
    // boxShadow: "none",
    // transition: "all .1s ease",
  },

  enabled: {
    transition: "all 250ms",
    border: (theme) => `1px solid ${theme.colors.t5}`,
    "::placeholder": {
      color: "t4",
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

const tags = {
  // backgroundColor: "transparent",
  // height: "fit-content",
  // minHeight: "fit-content",
  // border: 0,
  // fontSize: fontSizes.tag,
  // outline: 0,
  // "::placeholder": {
  //   color: COLORS(variant, primaryColor, defaultSaturation).t4,
  // },
};

export const THEMES = {
  dark: {
    ...dark,
    colors: { ...base.colors, ...getColors("dark") },
    styles: {
      ...dark.styles,
    },
  },
  deep: {
    ...deep,
    colors: { ...base.colors, ...getColors("light") },
    styles: {
      ...deep.styles,
    },
  },
  light: {
    ...base,
    colors: { ...base.colors, ...getColors("light") },
    fontSizes,
    styles: {
      ...base.styles,
    },
    text: {
      label: {
        color: "t1",
        fontSize: "label",
        fontWeight: "semibold",
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
    },
    forms,
  },
  swiss: {
    ...swiss,
    colors: { ...base.colors, ...getColors("light") },
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
