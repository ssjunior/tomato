import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";

import { Text } from "theme-ui";

import { Flex } from "./";
import { useDebounce } from "../hooks";

const TextEdit = styled(Text)(
  {
    display: "flex",
    outline: 0,
    backgroundColor: "transparent",
  },
  (props) => {
    return {
      "&:hover": {
        backgroundColor:
          props.enabled && props.editing
            ? ""
            : props.theme.colors[props.hoverColor || "l2"],
      },
    };
  },
  (props) => {
    if (props.enabled && props.editing) {
      return "border: 1px solid #0055E6;";
    }

    if (props.value || !props.enabled) {
      return "border: 1px solid transparent;";
    } else {
      return "border: 1px solid lightGrey;";
    }
  }
);

export const ClickToEdit = ({
  autoSave = false,
  onSave,
  debounceTime = 5000,
  value = "",
  autoFocus = false,
  onEnter,
  onFocus,
  onBlur,
  onChange,
  maxLength = 191,
  enabled = true,
  enableEmpty = true,
  enableCounter = true,
  placeholder,
  ...props
}) => {
  const editable = useRef();

  const [content, setContent] = useState(value);
  const [editing, setEditing] = useState(false);
  const [remaining, setRemaining] = useState("");

  const debouncedValue = useDebounce(content, debounceTime);

  useEffect(() => {
    if (!(autoSave && enabled && onSave)) return;
    if (value === debouncedValue) return;
    onSave(debouncedValue);
  }, [autoSave, debouncedValue, enabled, onSave, value]);

  useEffect(() => {
    console.log(value);
    if (value) {
      editable.current.innerText = value;
    } else editable.current.innerText = placeholder;
    setRemaining(maxLength - value.length);
  }, [maxLength, placeholder, value]);

  useEffect(() => {
    enabled && autoFocus && editable.current.focus();
  }, [autoFocus, enabled]);

  useEffect(() => {
    if (editing) {
      editable.current.focus();
    } else editable.current.blur();
  }, [editing]);

  const startEdit = (e) => {
    e.stopPropagation();
    if (enabled) {
      setEditing(true);
    }
  };

  const cancelEdit = () => {
    setEditing(false);
    editable.current.innerText = value;
  };

  const saveEdit = () => {
    setEditing(false);

    if (!enableEmpty && !editable.current.innerText)
      editable.current.innerText = value;

    if (editable.current.innerText != value) {
      onBlur && onBlur(editable.current.innerText);
      onEnter && onEnter(editable.current.innerText);
    }
  };

  const handleKeyDown = (e) => {
    e.stopPropagation();

    const { key } = e;

    switch (key) {
      case "Enter":
        saveEdit();
        break;
      case "Escape":
        cancelEdit();
        return;
    }

    const isSpecialKey = [
      "Backspace",
      "Shift",
      "Control",
      "Meta",
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
    ].includes(key);

    const len = e.target.innerText.trim().length;

    if (!isSpecialKey && len < maxLength) setRemaining(remaining - 1);
    if (key === "Backspace" && remaining <= maxLength)
      setRemaining(remaining + 1);
    if (len >= maxLength) {
      if (isSpecialKey || ["Backspace"].includes(key)) return;

      e.preventDefault();
    }
  };

  const handleKeyUp = (e) => {
    e.stopPropagation();
    const len = e.target.innerText.trim().length;
    setRemaining(maxLength - len);
    onChange && onChange(editable.current.innerText);
    // autoSave && enabled && setContent(editable.current.innerText);
  };

  const style = {};
  if (remaining === maxLength) style.color = "t4";

  return (
    <Flex style={{ alignItems: "center" }}>
      <TextEdit
        ref={editable}
        enabled={enabled}
        value={value}
        editing={editing}
        contentEditable={editing}
        px="5rem"
        style={{
          borderRadius: "0.25rem",
          minWidth: "1rem",
          // maxWidth: "3rem",
          overflow: "hidden",
        }}
        onBlur={saveEdit}
        onFocus={() => onFocus && onFocus}
        onClick={(e) => startEdit(e)}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        {...props}
        {...style}
      />

      {editing && enableCounter && (
        <Text
          style={{
            marginLeft: "0.25rem",
            marginRight: "0.25rem",
            fontSize: "0.75rem",
            minWidth: "2.25rem",
          }}
        >
          {remaining}
        </Text>
      )}
    </Flex>
  );
};
