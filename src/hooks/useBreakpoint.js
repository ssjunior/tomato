import { useState, useEffect, useMemo } from "react";

export const useBreakpoint = (options) => {
  const breakpoints = useMemo(() => {
    return options || ["40em", "52em", "64em"];
  }, [options]);

  const [value, setValue] = useState(0);

  useEffect(() => {
    const getIndex = () =>
      breakpoints.filter(
        (bp) => window.matchMedia(`screen and (min-width: ${bp})`).matches
      ).length;

    const onResize = () => {
      const newValue = getIndex();
      if (value !== newValue) {
        setValue(newValue);
      }
    };

    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoints, value]);

  return value;
};
