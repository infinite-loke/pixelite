export type ToolType = "brush" | "eraser" | "reset" | "flood-fill" | "select"
export type ModeType = "default" | "symmetry";

export type Directions = "Left" | "Right" | "Top" | "Bottom";

export type Tool = {
    id: ToolType;
    label: string;
    icon: React.ReactNode
    cursor?: string;
}

export interface ICommand {
    execute: (pixels: any[]) => Partial<EditorState>;
    undo: (pixels: any[]) => Partial<EditorState>;
}

export type PixelChange = {
    index: number;
    newColor: string;
    oldColor: string;
}

// Editor Types


export type Resolution = { rows: number, columns: number }

export type EditorState = {
    resolution: Resolution,
    pixels: string[],
    selected?: number[],
    brushSize: number,
    tool: ToolType,
    mode?: ModeType,
    color: string
}

export interface EditorConfig extends Omit<EditorState, 'resolution' | 'pixels' | 'mode'>{
    rows: number,
    columns: number,
    history?: ICommand[]
    pointer?: number,
    defaultMode?: ModeType
}

export type Coordinates = { x: number, y: number }

export interface Interaction {
    scale: number;
    offset: Coordinates;
    changeCoordinates: (x: number, y: number) => void;
    fitContent: () => void;
}