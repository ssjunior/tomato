module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["@babel/preset-env", "@babel/preset-react", "airbnb"],
    plugins: [
      [
        "@babel/plugin-transform-runtime",
        {
          regenerator: true,
        },
      ],
      [
        "@babel/plugin-transform-react-jsx",
        {
          importSource: "theme-ui",
          runtime: "automatic",
          throwIfNamespace: false,
        },
      ],
    ],
    sourceType: "unambiguous",
  };
};
