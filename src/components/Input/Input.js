import { useCallback, useEffect, useRef, useState } from "react";
import { format, parse } from "date-fns";
import IMask from "imask";
import { Input as InputBase } from "theme-ui";
import { useTranslation } from "react-i18next";
import Tippy from "@tippyjs/react";

import { Column, Flex, Icon, Label, Text } from "../";
import { MASKS } from "./masks";
import { useDebounce } from "../../hooks";

export const Input = ({
  autoComplete,
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
  const maskLoaded = useRef(false);

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

  const disableInput =
    disabled || variant === "disabled" ? { disabled: true } : {};

  const dataType = type.toLowerCase();

  useEffect(() => {
    if (maskLoaded.current) return;
    maskLoaded.current = true;

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
  }, [dataType, initialValue, locale, mask, t, value]);

  useEffect(() => {
    if (debounceTime) {
      setSavedValue(debouncedValue);
    }
  }, [debounceTime, debouncedValue]);

  const getValue = useCallback(() => {
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
  }, [dataType, maskedInput]);

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

    if (onSave) {
      onSave(value);
    } else if (onEnter) {
      onEnter(value);
    }
  }, [
    initialValue,
    error,
    getValue,
    onEnter,
    onSave,
    savedValue,
    setFocus,
    setIsTyping,
  ]);

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

  if (autoComplete) style.autoComplete = autoComplete;

  return (
    <Column
      zIndex={10}
      height="fit-content"
      m={label ? 0 : "1px"}
      sx={{ width: "100%", position: "relative", ...props }}
      {...props}
    >
      {label && (
        <Flex
          mb="0.125rem"
          px="0.25rem"
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
            minHeight: "1.125rem",
          }}
        >
          <Flex style={{ alignItems: "center" }}>
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
            <Text style={{ fontSize: "0.675rem", ...maxStyle }}>
              {maxLength - unMaskedValue.length}
            </Text>
          )}
        </Flex>
      )}

      {description && (
        <Text
          style={{ fontSize: "0.75rem" }}
          mx="0.25rem"
          mb="0.25rem"
          color="t3"
        >
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
        <Flex
          style={{
            position: "absolute",
            bottom: -20,
            alignItems: "center",
          }}
        >
          {error && (
            <Text
              px="0.25rem"
              width={1}
              bg={error ? "lightRed" : ""}
              sx={{
                width: "100%",
                borderRadius: "0.25rem",
                fontSize: "0.75rem",
                color: "red",
                fontWeight: "semibold",
              }}
            >
              {error}
            </Text>
          )}
        </Flex>
      )}
    </Column>
  );
};
