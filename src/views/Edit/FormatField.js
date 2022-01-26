import { useTranslation } from "react-i18next";

import {
  Checkbox,
  Dropdown,
  ComboBox,
  Flex,
  Input,
  TextArea,
} from "../../components";

const RenderValue = ({ value, item, options, handleSave, rootUrl }) => {
  const { t } = useTranslation();

  // console.log(item, value);
  const handleSelectChange = (result) => {
    console.log(result);
  };

  if (["Boolean", "Checkbox"].includes(item.type)) {
    const checked =
      value === true || value === "true" || value === "True" ? true : false;
    return (
      <Flex style={{ height: "100%", alignItems: "center" }}>
        <Checkbox checked={checked} onChange={handleSave} label={item.label} />
      </Flex>
    );
  }

  if (item.type === "Text Area") {
    return (
      <TextArea
        label={t(item.label)}
        value={value}
        placeholder={item.placeholder || item.label}
        minHeight="5rem"
        maxHeight="15rem"
        onSave={handleSave}
        rows={4}
      />
    );
  }

  // if (item.type === "Dropdown") {
  //   const selected = value ? { id: item.value, value } : null;

  //   const options = Object.keys(item.customFieldChoices).map((choice) => {
  //     return { id: choice, value: item.customFieldChoices[choice] };
  //   });

  //   return (
  //     <Dropdown
  //       enableClear={true}
  //       width={1}
  //       selected={selected}
  //       options={options}
  //       label={item.label}
  //       placeholder={item.label}
  //       onSelect={(selected) => {
  //         handleSave(selected ? selected.value : null);
  //       }}
  //       disabled={item.disabled}
  //     />
  //   );
  // }

  // if (item.type === "Constant") {
  //   const option = { id: value, value: item.choices[value] };
  //   const options = Object.keys(item.choices).map((choice) => {
  //     return { id: choice, value: item.choices[choice] };
  //   });

  //   return (
  //     <ComboBox
  //       width={1}
  //       selected={option}
  //       value={option}
  //       items={options}
  //       label={item.label}
  //       placeholder={item.placeholder}
  //       required={item.required}
  //       onSelect={handleSelectChange}
  //       disabled={item.disabled}
  //     />
  //   );
  // }

  // if (item.type === "ForeignKey") {
  //   let selected;

  //   if (value.id) selected = { id: value.id, value: value.name };

  //   return (
  //     <Dropdown
  //       enableClear={true}
  //       width={1}
  //       selected={selected}
  //       label={item.label}
  //       placeholder={item.label}
  //       onSelect={(selected) => {
  //         handleSave(selected ? selected.id : null);
  //       }}
  //       disabled={item.disabled}
  //       endpoint={`${rootUrl}${item.endpoint}`}
  //     />
  //   );
  // }

  value = value || "";

  const type = item.type === "Char" ? "text" : item.type;

  // console.log(value, type);
  return (
    <Input
      style={{ width: "100%" }}
      // type={type}
      // mask={{ mask: item.mask, maxLength: item.maskLength }}
      value={value}
      label={item.label}
      required={item.required}
      minLength={item.minLength}
      maxLength={item.maxLength}
      disabled={item.disabled}
      placeholder={t(item.placeholder) || t(item.label)}
      width={1}
      tooltip={item.tooltip}
      onEnter={handleSave}
      onBlur={handleSave}
      debounceTime={2500}
      retainFocusAfterEnter={false}
      clearValueAfterEnter={false}
      {...options}
    />
  );
};

export const FormatField = ({ module, item, handleSubmit, rootUrl, value }) => {
  const handleSave = (value) => {
    const changed = {};
    if (item.customField) {
      changed[item.name] = value;
      handleSubmit({ custom_attributes: changed });
    } else if (item.type === "ForeignKey") {
      handleSubmit(item.name, value);
    } else {
      changed[item.name] = value;
      handleSubmit(changed);
    }
  };

  const options = item.disabled
    ? {
        variant: "disabled",
        disabled: "disabled",
        border: 0,
      }
    : { variant: "enabled", cursor: "crosshair", icon: item.icon || false };

  return (
    <RenderValue
      module={module}
      value={value}
      item={item}
      options={options}
      handleSave={handleSave}
      rootUrl={rootUrl}
    />
  );
};
