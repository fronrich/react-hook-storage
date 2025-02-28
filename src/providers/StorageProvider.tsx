import React, { FC, ReactNode } from "react";
import { UseStorageDispatch } from "../hooks/useStorage.js";
import StorageContext from "../contexts/StorageContext.js";

interface StorageProviderProps<T> {
  getter: UseStorageDispatch<T>[0];
  setter: UseStorageDispatch<T>[1];
  children: ReactNode;
}

/**
 * Provides a context for cross-component state management using the value
 * from a storage hook. It is recommended that you include only one instance of
 * this provider per application, and use it for complex, cross-component data,
 * such as a JSON object representing the entire application state or a game save state.
 *
 * @template T
 * @param {Object} props - The component props.
 * @param {T} props.getter - The current value from the storage hook.
 * @param {(value: T) => void} props.setter - The setter function from the storage hook.
 * @param {ReactNode} props.children - The child components that will have access to the storage context.
 *
 * @example
 * // Example: Wrapping your application with StorageProvider
 * import React from "react";
 * import ReactDOM from "react-dom";
 * import App from "./App";
 * import useStorage from "@fronrich/react-hook-storage";
 * import StorageProvider from "react-hook-storage/providers/StorageProvider";
 * import AppStateType from "../types/AppStateType"
 *
 * function Root() {
 *   // Initialize storage with a complex object (e.g., application state or game save state)
 *   const [appState, setAppState] = useStorage<AppStateType>({
 *     name: "appState",
 *     defaultValue: { score: 0, level: 1, userSettings: {} }
 *   });
 *
 *   return (
 *     <StorageProvider getter={appState} setter={setAppState}>
 *       <App />
 *     </StorageProvider>
 *   );
 * }
 *
 * ReactDOM.render(<Root />, document.getElementById("root"));
 *
 * @example
 * // Example: Accessing the storage context in a child component
 * import React, { useContext } from "react";
 * import StorageContext from "react-hook-storage/contexts/StorageContext";
 *
 * function DisplayScore() {
 *   const [appState, setAppState] = useContext(StorageContext);
 *   return <div>Current Score: {appState.score}</div>;
 * }
 *
 * export default DisplayScore;
 */
const StorageProvider: FC<StorageProviderProps<unknown>> = (props) => {
  const { getter, setter, children } = props;

  return (
    <StorageContext.Provider value={[getter, setter]}>
      {children}
    </StorageContext.Provider>
  );
};

export default StorageProvider;
