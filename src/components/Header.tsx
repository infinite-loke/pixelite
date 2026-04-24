import { Download, Redo2, SquareX, Undo2 } from "lucide-react";
import { useEditor } from "../hooks/useEditor";
import { Button } from "./atoms/Button";


export const Header = () => {
    const { editor } = useEditor();

    return (
        <header className="flex items-center justify-between h-12 px-4 bg-white border-b border-slate-200 shrink-0">
            <div className="flex flex-col grow">
                <div className="text-md font-black text-slate-900 tracking-tighter pr-6">
                    PIXELITE <span className="text-emerald-600">.</span>
                </div>
                <span className="text-[10px] text-slate-500 font-medium "> 
                    Enlighten your imagination with pixels
                </span>
            </div>
            <div className="flex items-center">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 border-r border-slate-200 pr-3 mr-1">
                        {/* Avoid calling onClick={editor.undo} will create binding issue with existing editor */}
                        <Button 
                            icon={<Undo2 size={18} />} 
                            tooltip={<kbd className="ml-1">Ctrl + z</kbd>} 
                            onClick={() => editor.undo()}
                        />
                        <Button 
                            icon={<Redo2 size={18} />} 
                            tooltip={<kbd className="ml-1">Ctrl + Shift + z</kbd>} 
                            onClick={() => editor.redo()}
                        />
                        <Button 
                            icon={<SquareX size={18} />} 
                            tooltip={<kbd className="ml-1">Unselect all</kbd>} 
                            onClick={() => editor.unselectAll()}
                        />
                    </div>
                    <Button
                        icon={<Download size={15}/>}
                        label="Download"
                        variant="primary"
                        onClick={() => editor.exportAsPNG()}
                    />
                </div>
            </div>
        </header>
    )
}