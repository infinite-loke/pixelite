import type { EditorState, ICommand, Resolution } from "../../type";
import { getTransparentPixel } from "../../helper";


export class ResizeCommand implements ICommand {
    private resolution: Resolution;
    private oldResolution: Resolution;


    constructor(newResolution: Resolution, oldResolution: Resolution) {
        this.resolution = newResolution;
        this.oldResolution = oldResolution;
    }

    execute(pixels: string[]): Partial<EditorState> {
        const { rows: newR, columns: newC } = this.resolution;
        const { rows: oldR, columns: oldC } = this.oldResolution;

        const newPixels = Array.from({ length: newR * newC }, (_, index) => {
            const x = index % newC;
            const y = Math.floor(index / newC);

            if (x < oldC && y < oldR) {
                const oldIndex = y * oldC + x;
                return pixels[oldIndex];
            }

            return getTransparentPixel(newC, index);
        });

        return ({
            pixels: newPixels,
            resolution: this.resolution
        })
    }

    undo(pixels: string[]): Partial<EditorState> {
        const { rows: newR, columns: newC } = this.resolution;
        const { rows: oldR, columns: oldC } = this.oldResolution;

        const newPixels = Array.from({ length: oldR * oldC }, (_, index) => {
            const x = index % oldC;
            const y = Math.floor(index / oldC);

            if (x < newC && y < newR) {
                const oldIndex = y * newC + x;
                return pixels[oldIndex];
            }

            return getTransparentPixel(oldC, index);
        });
        return {
            pixels: newPixels,
            resolution:this.oldResolution
        }
    }
}