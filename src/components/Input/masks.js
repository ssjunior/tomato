import IMask from "imask";
import { format, parse } from "date-fns";

export const MASKS = {
  "pt-BR": {
    number: {
      mask: Number,
      thousandsSeparator: " ",
      radix: ",",
      lazy: false,
    },
    integer: {
      mask: Number,
      thousandsSeparator: " ",
      radix: ",",
      lazy: false,
    },
    string: { mask: String },
    email: { mask: String },
    text: { mask: String },
    password: { mask: String },
    float: {},
    date: {
      mask: Date,
      pattern: "dd/MM/yyyy",
      blocks: {
        dd: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 31,
          maxLength: 2,
        },
        MM: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 12,
          maxLength: 2,
        },
        yyyy: {
          maxLength: 4,
          mask: IMask.MaskedRange,
          from: 1900,
          to: 2050,
        },
      },
      // define date -> str convertion
      format: function (date) {
        let newDate = "";
        if (date) newDate = format(new Date(date), "dd/MM/yyyy");
        return newDate;
      },
      // define str -> date convertion
      parse: function (str) {
        return parse(str, "dd/MM/yyyy", new Date());
      },
      // autofix: true,
      // lazy: false,
      // overwrite: true
    },
    datetime: {
      mask: Date,
      pattern: "dd/MM/yyyy HH:mm",
      blocks: {
        dd: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 31,
          maxLength: 2,
        },
        MM: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 12,
          maxLength: 2,
        },
        yyyy: {
          maxLength: 4,
          mask: IMask.MaskedRange,
          from: 1900,
          to: 2050,
        },
        HH: {
          maxLength: 2,
          mask: IMask.MaskedRange,
          from: 0,
          to: 23,
        },
        mm: {
          maxLength: 2,
          mask: IMask.MaskedRange,
          from: 0,
          to: 59,
        },
      },
      // define date -> str convertion
      format: function (date) {
        console.log("DATE", date);
        let newDate = "";
        if (date) newDate = format(new Date(date), "dd/MM/yyyy HH:mm");
        return newDate;
      },
      // define str -> date convertion
      parse: function (str) {
        return parse(str, "dd/MM/yyyy HH:mm", new Date());
      },
      // autofix: true,
      // lazy: false,
      // overwrite: true
    },
  },
};
