import { useCallback, useEffect, useRef } from "react";

export const Hotkeys = ({ disabled, keys, onKeysDown, onKeysUp }) => {
  const keyDownActive = typeof onKeysDown === "function" ? true : false;
  const keyUpActive = typeof onKeysUp === "function" ? true : false;

  const key = useRef();
  const keyStrokes = useRef("");
  const keyCount = useRef(0);

  const downHandler = useCallback(
    (e) => {
      if (e.repeat || disabled) return;

      key.current = e.key.toLowerCase();

      if (
        keys.length === 0 &&
        e.key !== "Escape" &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.altKey
      ) {
        onKeysDown(key);
        return;
      }

      if (e.ctrlKey && e.key !== "Control") key.current = "ctrl" + key;

      if (!keys.includes(key)) return;

      keyStrokes.current = keyStrokes.current + e.key;
      keyCount.current += 1;

      onKeysDown(key);
    },
    [disabled, keys, onKeysDown]
  );

  const upHandler = useCallback(() => {
    if (disabled) return;

    keyCount.current -= 1;
    if (keyCount > 0) return;

    if (keys.includes(keyStrokes.toLowerCase()))
      onKeysUp(keyStrokes.toLowerCase());

    keyStrokes.current = "";
  }, [disabled, keys, onKeysUp]);

  useEffect(() => {
    if (keyDownActive) window.addEventListener("keydown", downHandler);
    if (keyUpActive) window.addEventListener("keyup", upHandler);

    return () => {
      if (keyDownActive) window.removeEventListener("keydown", downHandler);
      if (keyUpActive) window.removeEventListener("keyup", upHandler);
    };
  }, [downHandler, keys, keyDownActive, keyUpActive, onKeysUp, upHandler]);

  return null;
};
