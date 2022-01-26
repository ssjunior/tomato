var fs = require("fs");

module.exports = {
  input: ["src/**/*.{js,jsx}"],
  output: "./",
  options: {
    debug: false,
    func: {
      list: ["i18next.t", "i18n.t", "t"],
      extensions: [".js", ".jsx"],
    },
    trans: {
      component: "Trans",
      i18nKey: "i18nKey",
      defaultsKey: "defaults",
      extensions: [".js", ".jsx"],
      fallbackKey: function (ns, value) {
        return value;
      },
      acorn: {
        ecmaVersion: 10,
        sourceType: "module",
      },
    },
    lngs: ["pt-BR"],
    ns: ["locale"],
    defaultLng: "en-US",
    defaultNs: "locale",
    defaultValue: "",
    resource: {
      loadPath: "src/translations/{{lng}}/{{ns}}.json",
      savePath: "src/translations/{{lng}}/{{ns}}.json",
      jsonIndent: 2,
      lineEnding: "\n",
    },
    nsSeparator: false,
    keySeparator: false,
    interpolation: {
      prefix: "{{",
      suffix: "}}",
    },
  },

  transform: function customTransform(file, enc, done) {
    const parser = this.parser;
    const content = fs.readFileSync(file.path, enc);

    parser.parseFuncFromString(
      content,
      { list: ["i18next._", "i18next.__"] },
      (key, options) => {
        parser.set(
          key,
          Object.assign({}, options, {
            nsSeparator: false,
            keySeparator: false,
          })
        );
      }
    );

    done();
  },
};
