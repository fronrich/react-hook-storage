import { useContext } from "react";
import StorageContext from "../contexts/StorageContext.js";
import { UseStorageDispatch } from "./useStorage.js";

/**
 * Custom hook to access the shared storage context.
 *
 * This hook returns the current state value and the updater function from the
 * `StorageProvider` context, enabling components to share and modify complex, cross-component state.
 *
 * **Note:** Ensure that your component is wrapped in a `StorageProvider`. Without the provider,
 * the context will be undefined, which may lead to unexpected behavior.
 *
 * @returns {UseStorageDispatch} A tuple containing the shared state value and its setter function.
 *
 * @example
 * // Example: Accessing and updating shared state in a component
 * import React from "react";
 * import useStorageContext from "react-hook-storage/hooks/useStorageContext";
 * import AppStateType from "../types/AppStateType"
 *
 * const Dashboard = () => {
 *   // Destructure the shared state and updater function from the context
 *   const [appState, setAppState] = useStorageContext<AppStateType>();
 *
 *   // Example function to update a specific property in the state
 *   const updateTheme = () => {
 *     setAppState({
 *       ...appState,
 *       userSettings: { ...appState.userSettings, theme: "dark" }
 *     });
 *   };
 *
 *   return (
 *     <div>
 *       <h2>Dashboard</h2>
 *       <pre>{JSON.stringify(appState, null, 2)}</pre>
 *       <button onClick={updateTheme}>Set Dark Theme</button>
 *     </div>
 *   );
 * };
 *
 * export default Dashboard;
 */
const useStorageContext = <T>(): UseStorageDispatch<T> => {
  const dispatch = useContext(StorageContext) as UseStorageDispatch<T>;

  return dispatch as UseStorageDispatch<T>;
};

export default useStorageContext;
