import type { EditorState, ICommand, PixelChange, ToolType } from "../../type";

export class DrawCommand implements ICommand {

    private changes: PixelChange[] 
    private tool: ToolType;

    constructor(changes: PixelChange[], tool: ToolType) {
        this.changes = changes;
        this.tool = tool;
    }

    execute(pixels: string[]): Partial<EditorState> {
        const newPixels = [...pixels]
        this.changes.forEach(change => {
            newPixels[change.index] = change.newColor 
        })
        return { pixels: newPixels };
    };

    undo(pixels: string[]): Partial<EditorState> {
        const newPixels = [...pixels]
        this.changes.forEach(change => {
            newPixels[change.index] = change.oldColor;
        })
        return { pixels: newPixels }
    };  

    getTool(): ToolType {
        return this.tool;
    }

}
