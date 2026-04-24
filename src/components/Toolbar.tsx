import { HelpCircle, RefreshCcw } from "lucide-react";
import { TOOLS } from "../defaults";
import { useEditor } from "../hooks/useEditor";
import type { ToolType } from "../type";
import { Button } from "./atoms/Button";
import { Dialog } from "./atoms/Dialog";

export const Toolbar = () => {
    const { state, editor} = useEditor();
    
    const handleToolChange = (tool: ToolType) => {
        if (state.tool == "select" && tool != "select") {
            editor.unselectAll();
        }
        editor.changeTool(tool);
    }
    
    return (
        <aside className="w-16 bg-white border-r border-slate-200 flex flex-col items-center py-3 gap-3 shrink-0">
            {TOOLS.map((tool) => (
                <Button
                    key={tool.id}
                    icon={tool.icon}
                    tooltipPosition="left"
                    tooltip={tool.label}
                    active={state.tool == tool.id}
                    onClick={() => handleToolChange(tool.id)}
                />
            ))}
            <div className="w-8 h-px bg-slate-100 my-2" />
            <Button 
                icon={<RefreshCcw size={20}/>} 
                tooltip="Reset" 
                tooltipPosition="left"
                onClick={() => editor.clear()}
            />
            <div className="mt-auto mb-2">  
                <Dialog>
                    <Dialog.Trigger 
                        icon={<HelpCircle size={20}/>}
                        tooltip="Help"
                        tooltipPosition="left"
                    />
                    <Dialog.Modal>
                        <div className="space-y-6 max-w-md">
                            <h2 className="text-xl font-bold text-slate-900">Editor Help</h2>

                            <section className="space-y-3">
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Navigation</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm font-medium">Zoom</span>
                                        <kbd className="px-2 py-1 bg-slate-100 border border-slate-300 rounded text-xs w-fit">Mouse Wheel</kbd>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm font-medium">Pan Canvas</span>
                                        <kbd className="px-2 py-1 bg-slate-100 border border-slate-300 rounded text-xs w-fit">Third button + Drag</kbd>
                                    </div>
                                </div>
                            </section>

                            <section className="space-y-3">
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Hotkeys</h3>
                                <ul className="space-y-2">
                                <li className="flex justify-between items-center text-sm">
                                    <span>Undo</span>
                                    <kbd className="px-2 py-1 bg-slate-100 border border-slate-300 rounded text-xs">Ctrl + Z</kbd>
                                </li>
                                <li className="flex justify-between items-center text-sm">
                                    <span>Redo</span>
                                    <kbd className="px-2 py-1 bg-slate-100 border border-slate-300 rounded text-xs">Ctrl + Shift + Z</kbd>
                                </li>
                                </ul>
                            </section>
                            <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                                <p className="text-xs text-blue-700 leading-relaxed">
                                <strong>Tip:</strong> Symmetry settings can be found in the Right Sidebar. 
                                The grid resolution can be adjusted in the right sidebar under "Resolution".
                                </p>
                            </div>

                        </div>
                        <Dialog.Close
                            variant="primary"
                            label="Gotit"
                            className="ml-auto mt-3"
                        />
                    </Dialog.Modal>
                </Dialog>
            </div>
        </aside>
    );
};