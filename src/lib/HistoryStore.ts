import type { ICommand } from "../type";

export class HistoryStore {
    protected history: ICommand[];
    protected pointer: number;

    constructor(initialHistory: ICommand[] = [], pointer: number = -1) {
        this.history = initialHistory;
        this.pointer = pointer;
    }

    // Mutation ------------
    
    push(command: ICommand) {
        if (this.pointer < this.history.length - 1) {
            this.history = this.history.slice(0, this.pointer + 1);
        }

        this.history.push(command);

        this.pointer++;
    }

    undo(): ICommand | null {
        if (this.pointer < 0) return null;
        
        const command = this.history[this.pointer];
        this.pointer--;
        return command;
    }

    redo(): ICommand | null {
        if (this.pointer >= this.history.length - 1) return null;
        
        this.pointer++;
        const command = this.history[this.pointer];
        return command;
    }

    // helpers -----------

    peek() {
        return this.history[this.pointer]
    }

    clear() {
        this.history = [];
        this.pointer = -1;
    }

    getState() {
        return {
            history: this.history,
            pointer: this.pointer
        };
    }
}