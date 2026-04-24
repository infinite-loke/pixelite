import { getPixels, getTransparentPixel } from "../helper";
import type { EditorConfig, EditorState, ICommand, PixelChange, Resolution } from "../type";
import { HistoryStore } from "./HistoryStore";
import { ReactStore } from "./ReactStore";
import { DrawCommand } from "./commands/DrawCommand";
import { ResizeCommand } from "./commands/ResizeCommand";

export class EditorStore extends ReactStore<EditorState> {
    private historyStore: HistoryStore;
    private initialState: EditorState;

    constructor(options: EditorConfig) {
        const {rows, columns, tool, color, history = [], pointer = -1, brushSize, selected = [], defaultMode} = options;
        const initialState: EditorState = {
            resolution: {rows, columns},
            pixels: getPixels(rows, columns),
            selected: selected,
            brushSize,
            mode: defaultMode,
            tool,
            color,
        };
        super(initialState);
        this.initialState = initialState;
        this.historyStore = new HistoryStore(history, pointer);
    }

    changeResolution(newResolution: Partial<Resolution>) {
        const oldResolution = this.state.resolution;
        const nextResolution = {
            ...oldResolution,
            ...newResolution
        };
        const ereaseCommand = new ResizeCommand(nextResolution, oldResolution);
        this.executeCommand(ereaseCommand)
    }

    changeTool(tool: Partial<EditorState["tool"]>) {
        this.setState(prev => ({ ...prev, tool }));
    }

    changeMode(mode: Partial<EditorState["mode"]>) {
        this.setState(prev => ({ ...prev, mode }));
    }

    changeBrushSize(brushSize: Partial<EditorState["brushSize"]>) {
        this.setState(prev => ({ ...prev, brushSize }));
    }

    changeColor(color: Partial<EditorState["color"]>) {
        this.setState(prev => ({ ...prev, color }));
    }

    // Tool Methods --------------* 

    private executeCommand(command: ICommand) {
        this.historyStore.push(command);
        this.setState(prev => {
            const commandState = command.execute(prev.pixels);
            return ({
                ...prev,
                ...commandState
            })
        });
    }

    select(indices: number[]) {
        const oldSelected = this.state.selected;
        if (!oldSelected) return;
        let newSelected = [...oldSelected, ...indices];
        oldSelected.forEach((idx) => {
            if (indices.includes(idx)) {
                newSelected = newSelected.filter(id => id !== idx);
            } else {
                newSelected.push(idx);
            }
        });
        this.setState(prev => ({ ...prev, selected: newSelected }))
    }

    unselectAll() {
        this.setState((prev) => ({ ...prev, selected: [] }))
    }

    draw(indices: number[]) {
        const pixels = this.state.pixels;
        const currentColor = this.state.color;
        const pixelChanges: PixelChange[] = indices.map(index => ({
            index,
            oldColor: pixels[index],
            newColor: currentColor
        }))
        const drawCommand = new DrawCommand([...pixelChanges], "brush");
        this.executeCommand(drawCommand)
    }

    autoDraw() {
        // Future implementation 
    }

    erase(indices: number[]) {
        const currentColor = this.state.color;
        const pixelChanges: PixelChange[] = indices.map(index => ({
            index,
            oldColor: currentColor,
            newColor: getTransparentPixel(this.state.resolution.columns, index)
        }))
        const ereaseCommand = new DrawCommand([...pixelChanges], "eraser");
        this.executeCommand(ereaseCommand)
    }

    floodFill(indices: number[]) {
        const pixels = this.state.pixels;
        const currentColor = this.state.color;
        const pixelChanges: PixelChange[] = indices.map(index => ({
            index,
            oldColor: pixels[index],
            newColor: currentColor
        }))
        const drawCommand = new DrawCommand([...pixelChanges], "flood-fill");
        this.executeCommand(drawCommand)
    }

    clear() {
        this.setState(() => this.initialState);
        this.historyStore.clear();
    }

    // History actions ---------------*

    undo() {
        const commandToUndo = this.historyStore.undo();
        if (!commandToUndo) return;
        this.setState(prev => ({
            ...prev,
            ...commandToUndo.undo(prev.pixels) // Always returns a Partial<EditorState>
        }));
    }

    redo() {
        const commandToRedo = this.historyStore.redo();
        if (!commandToRedo) return;
        this.setState(prev => ({
            ...prev,
            ...commandToRedo.execute(prev.pixels) // Always returns a Partial<EditorState>
        }));
    }

    // Export actions ----------------*
    
    exportAsPNG() {
        const { pixels, resolution } = this.state
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const { rows, columns } = resolution

        canvas.width = columns * 16;
        canvas.height = rows * 16;

        pixels.forEach((color, i) => {
            const row = Math.floor(i / columns);
            const col = i % columns;
            const checkedPixel = getTransparentPixel(columns, i);
            const pixelColor = color !== checkedPixel ? color : "#00000000"

            ctx.fillStyle = pixelColor;
            ctx.fillRect(col * 16, row * 16, 16, 16);
        });

        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'pixelite_art.png'
        link.click();
    }

}