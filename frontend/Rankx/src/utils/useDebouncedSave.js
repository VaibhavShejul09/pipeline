import { useRef } from "react";

export const useDebouncedSave = (saveFn, delay = 600) => {
  const timerRef = useRef(null);

  return (payload) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      saveFn(payload);
    }, delay);
  };
};
