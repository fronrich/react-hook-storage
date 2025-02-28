import { useMemo, useEffect, useState } from "react";

export type UseStorageConfig<T> = {
  name: string;
  defaultValue?: T;
};

export type UseStorageDispatch<T> = [T, (value: T) => void];

export type UseStorageHook = <T>(
  config: UseStorageConfig<T>
) => UseStorageDispatch<T>;

const parseString = (input: string): unknown => {
  try {
    // Check if the string is a valid JSON object
    const parsedObject = JSON.parse(input);
    if (typeof parsedObject === "object" && parsedObject !== null) {
      return parsedObject;
    }
  } catch (error) {
    // If JSON parsing fails, proceed to the next check
  }

  // Check if the string is a valid number
  const parsedNumber = parseFloat(input);
  if (!isNaN(parsedNumber)) {
    return parsedNumber;
  }

  // Check if the string is a valid boolean
  if (input === "true" || input === "false") {
    return input === "true";
  }

  // If none of the above checks pass, return the original string
  return input;
};

/**
 * A custom React hook to synchronize a state variable with localStorage.
 *
 * This hook reads an initial value from localStorage based on the provided key.
 * If no value exists, it sets a default value if provided. The hook returns a tuple
 * containing the current value (parsed from localStorage) and a setter function to update it.
 *
 * **Note:** If the state in memory (RAM) does not match the value in localStorage (e.g., due
 * to external modifications), an error is thrown. In such cases, consider using a context-based
 * solution (like `useStorageContext`) to keep multiple components in sync.
 *
 * @template T
 * @param {Object} config - Configuration options for the hook.
 * @param {string} config.name - The key to use in localStorage.
 * @param {T} [config.defaultValue] - The default value to store if the key is not present.
 * @returns {[T, (value: T) => void]} A tuple where the first element is the current value
 * from localStorage and the second is a setter function to update the value.
 *
 * @example
 * // Example: Using useStorage in a counter component
 * import React from "react";
 * import { useStorage } from "@fronrich/react-hook-storage";
 *
 * function Counter() {
 *   // The hook will use 'counter' as the key in localStorage and initialize to 0 if not set.
 *   const [count, setCount] = useStorage<number>({ name: "counter", defaultValue: 0 });
 *
 *   return (
 *     <div>
 *       <h1>Counter: {count}</h1>
 *       <button onClick={() => setCount(count + 1)}>Increment</button>
 *       <button onClick={() => setCount(0)}>Reset</button>
 *     </div>
 *   );
 * }
 *
 * export default Counter;
 *
 * @example
 * // Example: Using useStorage for a string value
 * import React from "react";
 * import { useStorage } from "@fronrich/react-hook-storage";
 *
 * function UsernameInput() {
 *   // Uses 'username' as the key in localStorage with a default value of an empty string.
 *   const [username, setUsername] = useStorage<string>({ name: "username", defaultValue: "" });
 *
 *   return (
 *     <div>
 *       <label htmlFor="username">Username: </label>
 *       <input
 *         id="username"
 *         type="text"
 *         value={username}
 *         onChange={(e) => setUsername(e.target.value)}
 *       />
 *     </div>
 *   );
 * }
 *
 * export default UsernameInput;
 */
const useStorage: UseStorageHook = <T>(
  config: UseStorageConfig<T>
): UseStorageDispatch<T> => {
  const { name, defaultValue } = config;

  // raw is used to make sure hook local state and localStorage are in sync
  const [raw, setRaw] = useState<string>();

  // On first render, if the value does not exist in localStorage,
  // create it using the defaultValue if provided.
  useEffect(() => {
    const currVal = localStorage.getItem(name);
    if (currVal) {
      setRaw(currVal);
      return;
    }
    const rawDefault = String(defaultValue) ?? "";
    localStorage.setItem(name, rawDefault);
    setRaw(rawDefault);
  }, [name, defaultValue]);

  // Use memoization to ensure the getter is only recomputed when necessary.
  const getter: T = useMemo(() => {
    const rawLS: string = localStorage.getItem(name) ?? "";
    // If there is an unexpected value mismatch between local state and localStorage,
    // throw an error and suggest using a context provider for synchronization.
    if (!Object.is(raw, rawLS)) {
      throw new Error(
        "State inconsistencies between RAM and localStorage. Consider using `useStorageContext` for states shared by multiple components."
      );
    }
    const processedLS: T = parseString(rawLS) as T;
    return processedLS;
  }, [raw, name]);

  const setter = (value: T) => {
    const rawValue: string = String(value);
    localStorage.setItem(name, rawValue);
    setRaw(rawValue);
  };

  return [getter, setter];
};

export default useStorage;
