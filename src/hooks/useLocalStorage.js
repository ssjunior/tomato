import { useEffect, useState } from "react";

const getInitialState = (localStorageKey, initialValue) => {
  let initValue = localStorage.getItem(localStorageKey);

  if (initValue !== "undefined") {
    initValue = JSON.parse(initValue);
  } else {
    initValue = null;
  }

  if (initValue === false || initValue) return initValue;

  return initialValue;
};

export const useLocalStorage = (localStorageKey, initialValue) => {
  const [value, setValue] = useState(
    getInitialState(localStorageKey, initialValue)
  );

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(value));
  }, [localStorageKey, value]);

  return [value, setValue];
};
