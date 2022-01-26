import { t } from "../../i18n";

/**
  Mapeamento dos identificadores de tipos de campos personalizados para o
  widget responsável por sua rendenização.
 **/

// const FIELDS_TYPES = {
//   1: "Text", // TEXT
//   2: "Number", // NUMBER
//   3: "DateTime", // DATETIME
//   4: "Radio", // RADIO
//   5: "Checkbox", // CHECKBOX
//   6: "Dropdown", // DROPDOWN
//   7: "TextArea", // TEXTAREA
//   8: "DropdownColor", // DROPDOWN_COLOR
//   9: "Color", // COLOR
//   10: "Value", // VALUE
//   11: "FieldSet" // FIELDSET
// };

// const ATTRIBUTES_TYPES = {
//   "1": t("Text"),
//   "2": t("Number"),
//   "3": t("Date")
// };

const ATTRIBUTES_PRESENTATIONS = {
  1: t("Text"),
  2: t("Number"),
  3: t("Datetime"),
  // "4": t("Radio"),
  5: t("Checkbox"),
  6: t("Dropdown"),
  7: t("Text Area"),
  // "8": t("Color Dropdown"),
  // "9": t("Color"),
  // "10": t("Value"),
  // "11": t("Fieldset")
};

export const CUSTOM_FIELDS = {
  //   FIELDS_TYPES,
  //   ATTRIBUTES_TYPES,
  ATTRIBUTES_PRESENTATIONS,
};
