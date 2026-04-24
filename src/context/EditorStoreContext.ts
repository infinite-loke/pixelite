import { createContext } from "react";
import type { EditorStore } from "../lib/EditorStore";

export const EditorStoreContext = createContext<EditorStore | undefined>(undefined);