import { useContext, useSyncExternalStore } from "react";
import { EditorStoreContext } from "../context/EditorStoreContext";
import type { EditorState } from "../type";

export const useEditor = () => {
    const editorInstance = useContext(EditorStoreContext);
    if (!editorInstance) {
        throw new Error("Please use `usePixelEditor` inside of PixelEditorContext");
    }
    const editorState = useSyncExternalStore<EditorState>(
        editorInstance.subscribe,
        editorInstance.getState
    );
    return {
        state: editorState,
        editor: editorInstance
    };
}