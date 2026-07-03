import { useEffect, useState } from "react";

/** Returns `value`, delayed by `delayMs`. Delay of 0 returns `value` immediately. */
export function useDebouncedValue<T>(value: T, delayMs = 0): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    if (delayMs <= 0) {
      setDebounced(value);
      return;
    }
    const timer = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);

  return debounced;
}
