import { COLORS } from "../defaults";
import { useEditor } from "../hooks/useEditor";
import { RangeRow } from "./atoms/RangeRow";
import { SectionHeader } from "./atoms/SectionHeader";
import { SwitchRow } from "./atoms/SwitchRow";


export const SettingSidebar = () => {
    const { state, editor } = useEditor();
    const { resolution, tool, color: selectedColor, brushSize, selected, mode } = state;

    const handleChangeColor = (color: string) => {
        editor.changeColor(color);
        if (tool == "select" && selected && selected.length > 0) {
            editor.draw([...selected])
        }
    }

    return (
        <aside className="w-80 bg-white border-l border-slate-200 flex flex-col shrink-0 overflow-y-auto">
            <SectionHeader title={"Settings"}/>
            <div className="px-4 pb-4 space-y-3">
                <SwitchRow label="Symmetry Mode" value={mode == "symmetry"} onChange={(checked) => {
                    if (checked) {
                        editor.changeMode("symmetry")
                    } else {
                        editor.changeMode("default")
                    }
                }}/>
                <RangeRow label={"Pixel Size"} value={brushSize} onChange={(val) => editor.changeBrushSize(val)} min={"1"} max={"24"}/>
            </div>
            <SectionHeader title={"Resolution"}/>
            <div className="px-4 pb-4 space-y-3">
                <RangeRow label={"Rows"} value={resolution.rows} onChange={(val) => editor.changeResolution({ rows: Number(val) })}/>
                <RangeRow label={"Columns"} value={resolution.columns} onChange={(val) => editor.changeResolution({ columns: Number(val) })}/>
            </div>
            <SectionHeader title={"Colors"}/>
            <div className="grid grid-cols-7 gap-2 px-4 pb-4">
                {COLORS.map((color) => (
                    <button
                        key={color}
                        onClick={() => {
                            handleChangeColor(color);
                            if (tool === 'eraser') editor.changeTool('brush');
                        }}
                        className={`w-full aspect-square rounded-md transition-all ${
                            selectedColor === color && tool !== 'eraser'
                                ? 'ring-2 ring-blue-500 ring-offset-1 scale-110'
                                : 'hover:scale-105'
                            }`
                        }
                        style={{
                            backgroundColor: color,
                            border: color === '#FFFFFF' || color === '#FFFFD2' ? '1px solid #e5e7eb' : 'none',
                        }}
                        title={color}
                    />
                ))}
            </div> 
            <div className="space-x-3 px-4 ">
                <div className="bg-slate-100 flex items-center gap-2 p-2 rounded-xl">
                    <input 
                        type="color" 
                        value={selectedColor} 
                        onChange={(e) => handleChangeColor(e.target.value)}
                        className="w-10 h-10 bg-transparent border-none appearance-none cursor-pointer overflow-hidden"
                    />
                    <input 
                        type="text" 
                        value={selectedColor.toUpperCase()} 
                        onChange={(e) => handleChangeColor(e.target.value)}
                        className="text-sm font-mono w-full outline-none text-slate-800"
                    />
                </div>
            </div>      
        </aside>
    )

}