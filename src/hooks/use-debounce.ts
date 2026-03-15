'use client';

import { useState, useEffect } from 'react';

// delays updating a value until the caller stops changing it
// the input field stays responsive while expensive operations (filtering, fetching) wait
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);

    // if value changes before the timer fires, clear it and start over
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
