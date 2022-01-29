// import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  Box,
  Column,
  Grid,
  Button,
  Checkbox,
  Flex,
  Input,
  Text,
  TextArea,
} from "../";

export const RenderFormItem = ({
  properties,
  setFormState,
  data,
  value = "",
}) => {
  let options =
    properties.disabled || properties.readonly
      ? {
          variant: "disabled",
          disabled: "disabled",
          border: 0,
          borderBottom: "1px solid #e2e2e2",
        }
      : { variant: "enabled" };

  const { t } = useTranslation();

  const handleChange = (value, maxLength, type) => {
    if (type === "integer" && isNaN(value)) return;
    setFormState(properties.name, value);
  };

  const handleCheckBoxChange = (e) => {
    setFormState(properties.name, e.target.checked);
  };

  const reducer = (result, condition) => {
    return result && data[condition.key] === condition.value;
  };

  if (properties.conditions) {
    let condition = properties.conditions.reduce(reducer, true);
    if (!condition) return null;
  }

  if (properties.type === "boolean") {
    return (
      <Flex ml={2} height="30px" my="25px" alignItems="center">
        <Checkbox
          label={t(properties.label)}
          checked={value}
          onChange={handleCheckBoxChange}
        />
        <Text ml={2}>{}</Text>
      </Flex>
    );
  }

  return (
    <Input
      {...options}
      autoFoces={true}
      width={1}
      mb={4}
      maxWidth={450}
      type={properties.type}
      name={properties.label}
      value={value}
      required={properties.required}
      maxLength={properties.maxLength}
      label={properties.label}
      placeholder={properties.placeholder}
      onChange={(value) =>
        handleChange(value, properties.maxLength, properties.type)
      }
    />
  );
};

const RenderItem = ({ object, item, handleSave, rootUrl }) => {
  const { t } = useTranslation();

  const handleSelectChange = (result) => {
    console.log(result);
  };

  if (item.type === "title") return <Text variant="section">{item.value}</Text>;

  const value = object[item.name];

  if (["Boolean", "Checkbox"].includes(item.type)) {
    const checked =
      value === true || value === "true" || value === "True" ? true : false;
    return (
      <Flex style={{ height: "100%", alignItems: "center" }}>
        <Checkbox checked={checked} onChange={handleSave} label={item.label} />
      </Flex>
    );
  }

  if (item.type === "textarea") {
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
      //    {...options}
    />
  );
};

const Row = ({ object, row }) => {
  return (
    <Grid
      mt="1.25rem"
      style={{
        gridRowGap: "1rem",
        gridColumnGap: "2rem",
        width: "100%",
        gridTemplateColumns: "repeat(auto-fill, minmax(16rem, 1fr))",
      }}
    >
      {Array.isArray(row) ? (
        row.map((column, index) => (
          <RenderItem key={index} item={column} object={object} />
        ))
      ) : (
        <RenderItem item={row} object={object} />
      )}
    </Grid>
  );
};

const Section = ({ index, object, section }) => {
  return (
    <Column
      mt={index ? "3rem" : "0"}
      style={{ width: "100%", maxWidth: "50rem" }}
    >
      <Text>{section.name}</Text>

      {section.rows &&
        section.rows.map((row, index) => (
          <Row key={index} object={object} row={row} />
        ))}
    </Column>
  );
};

export const Form = ({ filterSections = false, object, schema, ...props }) => {
  return (
    <Column
      style={{ width: "100%", height: "100%", overflow: "auto" }}
      {...props}
    >
      {Object.values(schema.sections).map((section, index) => (
        <Section key={index} index={index} object={object} section={section} />
      ))}
    </Column>
  );
};
