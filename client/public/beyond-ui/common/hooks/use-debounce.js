/* https://usehooks.com/useDebounce/ */
import $window from "../../lib/window/window";
import { useState, useEffect } from "react";

function useDebounce(value, delay) {
  const [ debouncedValue, setDebouncedValue ] = useState(value);

  useEffect(() => {
    const handler = $window.setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      $window.clearTimeout(handler);
    };
  }, [ value, delay ]);

  return debouncedValue;
}

export default useDebounce;
