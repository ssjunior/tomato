import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { Menu } from "../../components";

import { ACTIONS } from "../../store";

const RenderCustomFieldsMenu = ({ module }) => {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const activeOption = useSelector((state) => state[module.id].filter);
  const custom_attributes = useSelector(
    (state) => state[module.id].object.custom_attributes
  );

  const fieldsets = custom_attributes ? Object.values(custom_attributes) : null;

  if (!fieldsets || fieldsets.length === 0) return null;

  const menuOptions = fieldsets
    .filter((fieldset) => {
      if (
        (fieldset.name === "Default" && fieldset.fields.length === 0) ||
        (fieldset.hide_if_empty && fieldset.fields.length === 0)
      )
        return false;
      return true;
    })
    .map((fieldSet, index) => {
      return {
        id: `${index}`,
        value: fieldSet.name || t("Default"),
        fieldSet,
      };
    });

  return (
    <Menu
      mt="2rem"
      title={t("Custom Data")}
      selected={activeOption}
      options={menuOptions}
      onSelect={(selected) => {
        dispatch(ACTIONS[module.id].changeState({ filter: selected }));
      }}
    />
  );
};

const RenderMenu = ({ config, module }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const activeOption = useSelector((state) => state[module.id].filter);
  const filters = config.filters;

  return (
    <Menu
      title={t("All Data")}
      selected={activeOption || filters[0]}
      options={filters}
      onSelect={(selected) => {
        console.log(selected);
        dispatch(ACTIONS[module.id].changeState({ filter: selected }));
      }}
    />
  );
};

export const Filters = ({ config, module }) => {
  return (
    <>
      <RenderMenu config={config} module={module} />

      <RenderCustomFieldsMenu config={config} module={module} />
    </>
  );
};
