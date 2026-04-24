import { createContext } from "react";
import type { Interaction } from "../type";

export const InteractionContext = createContext<Interaction>({
    scale: 1,
    offset: { x: 0, y: 0 },
    changeCoordinates: (x: number, y: number) => ({ x, y }),
    fitContent: () => {},
});