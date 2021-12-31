import { useEffect, useRef, useState } from "react";
import { format, parse } from "date-fns";
import IMask from "imask";
import { Input as InputBase } from "theme-ui";
import { useTranslation } from "react-i18next";
import Tippy from "@tippyjs/react";

import { useDebounce } from "@tomato/core";

import { Column } from "../Column";
import { Flex } from "../Flex";
import { Icon } from "../Icon";
import { Label } from "../Label";
import { MASKS } from "./masks";
import { Text } from "../Text";
import { Tooltip } from "../Tooltip";

export const Input1 = ({ label, placeholder, value = "", ...props }) => {
  return (
    <Column sx={{ width: "100%", ...props }}>
      {label && <Label>{label}</Label>}
      <InputBase
        value={value}
        placeholder={placeholder}
        onKeyUp={(e) => console.log(e)}
      />
    </Column>
  );
};

export const Input = ({
  debounceTime = 0,
  description,
  disabled,
  label,
  locale = "pt-BR",
  mask,
  maxLength,
  minLength,
  // minValue,
  // maxValue,
  autoExpand,
  clearOnEnter,
  // enableClear,
  // focus,
  onBlur,
  // onClear,
  onEnter,
  onEsc,
  onChange,
  onFocus,
  onKeyDown,
  onSave,
  setFocus,

  showErrors = true,
  placeholder,
  required,
  setIsTyping,
  tooltip,
  type = "text",
  value = "",
  variant = "default",
  ...props
}) => {
  const { t } = useTranslation();

  const ref = useRef(null);

  const [error, setError] = useState(
    required && !value ? t("missing value") : false
  );
  const [maxStyle, setMaxStyle] = useState({});
  const [typing, setTyping] = useState(false);

  const [initialValue, setInitialValue] = useState(
    String(value || value === 0 ? value : "")
  );
  // Imask mask
  const [maskedInput, setMask] = useState({});
  // valor sem máscara
  const [unMaskedValue, setUnmaskedValue] = useState(initialValue);
  // valor salvo
  const [savedValue, setSavedValue] = useState(initialValue);

  const debouncedValue = useDebounce(unMaskedValue, debounceTime);

  const disableInput = disabled ? { disabled: true } : {};
  const dataType = type.toLowerCase();

  useEffect(() => {
    // console.log(locale, dataType);
    const options = MASKS[locale][dataType];
    const maskOptions = { ...options };

    if (mask && mask.mask) {
      maskOptions.mask = mask.mask;
      // maskOptions.maxLength = mask.maxLength;
    }
    const input = IMask(ref.current, maskOptions);

    if (["date", "datetime"].includes(dataType)) {
      const newDate = new Date(value);
      const valid = newDate instanceof Date && !isNaN(newDate);
      if (valid) {
        input.typedValue = initialValue;
      } else setError(t("invalid date") + ": " + value);
    } else {
      input.value = initialValue;
    }
    setMask(input);
    setUnmaskedValue(initialValue);
  }, [locale, mask, value]);

  useEffect(() => {
    if (debounceTime) {
      setSavedValue(debouncedValue);
    }
  }, [debouncedValue]);

  const getValue = () => {
    if (["date"].includes(dataType)) {
      if (maskedInput.value && maskedInput.typedValue) {
        return format(
          parse(maskedInput.value, maskedInput.masked.pattern, new Date()),
          "Y-MM-dd"
        );
      }
      return null;
    } else if (["datetime"].includes(dataType)) {
      if (maskedInput.value && maskedInput.typedValue) {
        return format(
          parse(maskedInput.value, maskedInput.masked.pattern, new Date()),
          "Y-MM-dd HH:mm"
        );
      }
      return null;
    } else {
      return maskedInput.unmaskedValue;
    }
  };

  const validate = () => {
    setError();
    if (maxLength) {
      const valueLen = maskedInput.unmaskedValue.length / maxLength;
      if (valueLen > 1) {
        ref.current.value = maskedInput.unmaskedValue.slice(0, maxLength);
        maskedInput.unmaskedValue = ref.current.value;
        maskedInput.updateValue();
      } else if (valueLen >= 0.8) {
        setMaxStyle({ color: "red", fontWeight: "bold" });
      } else {
        setMaxStyle({ color: "green", fontWeight: "semibold" });
      }
    }

    // Valida datas
    if (required && !maskedInput.unmaskedValue.length) {
      setError(t("missing value"));
    } else if (minLength) {
      if (maskedInput.unmaskedValue.length < minLength) {
        setError(t("minimum of") + " " + minLength + " " + t("characteres"));
      } else setError();
    } else if (["date", "datetime"].includes(dataType)) {
      if (maskedInput.value && !maskedInput.typedValue) {
        setError(t(`invalid ${dataType}`));
      }
    }
  };

  useEffect(() => {
    // ref.current.blur();
    setTyping(false);
    setIsTyping && setIsTyping(false);

    setFocus && setFocus(false);

    if (savedValue === initialValue) return;

    setInitialValue(savedValue);

    if (error) return;

    const value = getValue();
    onSave ? onSave(value) : onEnter ? onEnter(value) : null;
  }, [savedValue]);

  const changeValue = (e) => {
    setTyping(true);
    setIsTyping && setIsTyping(true);

    validate();

    onChange && onChange(maskedInput.unmaskedValue);

    const keyCode = e.keyCode || e.charCode;
    onKeyDown && onKeyDown(e);

    if (keyCode === 27) {
      onEsc && setSavedValue(initialValue);
      onEsc && onEsc();
    }

    if (keyCode === 13) {
      if (clearOnEnter) {
        ref.current.value = "";
        maskedInput.updateValue();
      }

      if (onEnter && unMaskedValue !== savedValue && !error) {
        const value = getValue();
        console.log(value);
        onEnter(value);
        setSavedValue(maskedInput.unmaskedValue);
        setInitialValue(maskedInput.unmaskedValue);
      }
    }

    setUnmaskedValue(maskedInput.unmaskedValue);
  };

  const setOnBlur = () => {
    setTyping(false);
    setIsTyping && setIsTyping(false);
    setFocus && setFocus(false);

    if (onBlur && unMaskedValue !== savedValue && !error) {
      onBlur(unMaskedValue);
      setSavedValue(unMaskedValue);
      setInitialValue(unMaskedValue);
    }
  };

  const style = {};
  if (autoExpand) {
    const valueLen = unMaskedValue ? unMaskedValue.length : 0;
    const size = valueLen > placeholder.length ? valueLen : placeholder.length;
    style["size"] = `${size}`;
  }

  if (dataType === "password") {
    style.type = "password";
  }

  return (
    <Column
      zIndex={10}
      height="fit-content"
      m={label ? 0 : "1px"}
      position="relative"
      sx={{ width: "100%", ...props }}
      {...props}
    >
      {label && (
        <Flex
          mb="0.125rem"
          mx="0.25rem"
          alignItems="center"
          justifyContent="space-between"
          minHeight="1.125rem"
        >
          <Flex alignItems="center">
            <Label>{t(label)}</Label>

            {!disabled && required && (
              <Label ml="0.125rem">{t("(required)")}</Label>
            )}

            {false && tooltip && (
              <Tippy content={t(tooltip)}>
                <Icon.Info ml="0.25rem" size="0.675rem" />
              </Tippy>
            )}
          </Flex>

          {typing && maxLength && !disabled && (
            <Text fontSize="0.75rem" {...maxStyle}>
              {maxLength - unMaskedValue.length}
            </Text>
          )}
        </Flex>
      )}

      {description && (
        <Text fontSize="0.75rem" mx="0.25rem" mb="0.25rem" color="t3">
          {description}
        </Text>
      )}

      <InputBase
        {...disableInput}
        variant={variant}
        placeholder={disabled ? t("no data") : t(placeholder) || ""}
        ref={ref}
        onBlur={setOnBlur}
        onKeyUp={(e) => changeValue(e)}
        onFocus={onFocus}
        // bg={getColor("white")}
        {...style}
      />

      {showErrors && (
        <Flex position="absolute" bottom={-18} alignItems="center" width={1}>
          {error && (
            <Text
              px="0.25rem"
              width={1}
              bg={error ? "lightRed" : ""}
              borderRadius="0.25rem"
              fontSize="0.75rem"
              color="red"
              fontWeight="semibold"
            >
              {error}
            </Text>
          )}
        </Flex>
      )}
    </Column>
  );
};
