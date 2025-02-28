import { createContext } from "react";
import { UseStorageDispatch } from "../hooks/useStorage.js";

const StorageContext = createContext<UseStorageDispatch<unknown> | []>([]);

export default StorageContext;
