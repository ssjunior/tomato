export * from "./array";
export * from "./chain";
export * from "./date";
export * from "./email";
export * from "./number";
export * from "./object";
export * from "./order";
export * from "./uuidv4";
export * from "./url";

export const strip = (str) => {
  return str.replace(/^\s+|\s+$/g, "");
};

export const isEmptyContent = (content) => {
  const emptyContent = [
    {
      type: "paragraph",
      children: [{ text: "" }]
    }
  ];

  return !content || JSON.stringify(content) === JSON.stringify(emptyContent);
};
