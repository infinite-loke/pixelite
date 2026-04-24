import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import PixelCanvas from "./components/PixelCanvas";
import { SettingSidebar } from "./components/SettingSidebar";
import { Toolbar } from "./components/Toolbar";
import { EditorStoreContext } from "./context/EditorStoreContext";
import { EditorStore } from "./lib/EditorStore";
import type { EditorConfig } from "./type";
import { InteractionPane } from "./components/InteractionPane";

const defaultEditorConfig: EditorConfig = {
    rows: 24,
    columns: 24,
    tool: "brush",
    color: "#000000",
    history: [],
    brushSize: 1
}

function App() {
    const [instance] = useState(() => new EditorStore(defaultEditorConfig))

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const isCtrl = e.ctrlKey || e.metaKey;
            if (!isCtrl) return;

            if (e.key.toLowerCase() === "z") {
                e.preventDefault();

                if (e.shiftKey) { // ctrl + shift + z
                    instance.redo();
                } else {
                    instance.undo();
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [instance]);

    return (
        <div className="flex h-screen w-full">
            <EditorStoreContext.Provider value={instance}>
                <div className="grow flex-col flex">
                    <Header />
                    <div className="flex flex-1">
                        <Toolbar />
                        <InteractionPane>
                            <PixelCanvas />
                        </InteractionPane>
                    </div>
                </div>
                <SettingSidebar />
            </EditorStoreContext.Provider>
        </div>
    )
}

export default App