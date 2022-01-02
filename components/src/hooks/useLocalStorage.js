import { useEffect, useState } from "react";

const getInitialState = (localStorageKey, initialValue) => {

  let initValue = localStorage.getItem(localStorageKey);

  if (initValue) {
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
  }, [value]);

  return [value, setValue];
};
