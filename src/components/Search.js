import { useTranslation } from "react-i18next";

import { Input } from "./Input";

export const Search = ({ onSearch, ...props }) => {
  const { t } = useTranslation();

  return (
    <Input
      enableClear={true}
      placeholder={t("Search")}
      style={{ width: "10rem" }}
      {...props}
      debounceTime={750}
      icon="Search"
      variant="search"
      onSave={(content) => {
        onSearch && onSearch;
        console.log(content);
      }}
    />
  );
};
