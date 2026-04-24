
export const getPixels = (rows: number, columns: number) => {
    return Array.from({ length: rows * columns }, () => "#00000000")
}

export const getTransparentPixel = (_columns: number, _index: number) => {
    return "#00000000"
}

export const getAdjacentSquareIndices = (rows: number, columns: number, pointerIndex: number, brushSize: number) => {
    if (brushSize <= 1) return [pointerIndex];

    const adjacentSquareIndices: number[] = [];
    
    const centerX = pointerIndex % columns;
    const centerY = Math.floor(pointerIndex / columns);

    const offset = Math.floor(brushSize / 2);

    for (let yOffset = -offset; yOffset <= offset; yOffset++) {
        for(let xOffset = -offset; xOffset <= offset; xOffset++) {
            const targetX = centerX + xOffset;
            const targetY = centerY + yOffset;

            if (targetX >= 0 && targetX < columns && targetY >= 0 && targetY < rows) {
                const targetIndex = (targetY * columns) + targetX;
                adjacentSquareIndices.push(targetIndex);
            }

        }
    }

    return adjacentSquareIndices;
}

export const getSymmetricSquareIndex = (_rows: number, columns: number, pointerIndex: number): number => {
    const x = pointerIndex % columns;
    const y = Math.floor(pointerIndex / columns);

    const symmetricX = (columns - 1) - x;

    return y * columns + symmetricX;
};

type Edge = "left" | "right" | "top" | "bottom"

export const getSelectedIndexNonAdjacentEdges = (
    index: number, 
    selectedIndices: number[], 
    rows: number, 
    columns: number
): Edge[] => {
    let nonAdjacentEdges: Edge[] = []
    const x = index % columns;
    const y = Math.floor(index / columns);

    const neighbors: {x: number, y: number, edge: Edge}[] = [
        { x: x + 1, y: y, edge: "right" },
        { x: x - 1, y: y, edge: "left" }, // Left
        { x: x, y: y + 1, edge: "bottom" }, // Bottom
        { x: x, y: y - 1, edge: "top" }, // Top
    ];

    for (let neighbor of neighbors) {
        if (neighbor.x >= 0 && neighbor.x < columns && neighbor.y >= 0 && neighbor.y < rows) {
            const neighborIndex = neighbor.y * columns + neighbor.x;
            
            // Only add to queue if not visited to prevent infinite loops
            if (!selectedIndices.includes(neighborIndex)) {
                nonAdjacentEdges.push(neighbor.edge)
            }
        }
    }

    return nonAdjacentEdges
}

export const getFloodFillIndices = (pixels: string[], startIndex: number, newColor: string, rows: number, columns: number) => {
    let targetColors = [pixels[startIndex]];
    if (targetColors.includes(newColor)) return [];

    if (["#e2e8f0", "#00000000"].includes(targetColors[0])) {
        targetColors = ["#e2e8f0", "#00000000"];
    }
    
    const floodedIndices = [];
    const indexQueue = [startIndex];
    const visited = new Set<number>();

    while (indexQueue.length > 0) {
        const currentIndex = indexQueue.shift();

        if (currentIndex == undefined || visited.has(currentIndex)) continue
        visited.add(currentIndex);

        if (!targetColors.includes(pixels[currentIndex])) continue;

        floodedIndices.push(currentIndex);

        const x = currentIndex % columns;
        const y = Math.floor(currentIndex / columns);

        const neighbors = [
            { x: x + 1, y: y }, // Right
            { x: x - 1, y: y }, // Left
            { x: x, y: y + 1 }, // Bottom
            { x: x, y: y - 1 }, // Top
        ];

        for (let neighbor of neighbors) {
            if (neighbor.x >= 0 && neighbor.x < columns && neighbor.y >= 0 && neighbor.y < rows) {
                const neighborIndex = neighbor.y * columns + neighbor.x;
                
                // Only add to queue if not visited to prevent infinite loops
                if (!visited.has(neighborIndex)) {
                    indexQueue.push(neighborIndex);
                }
            }
        }

    }

    return floodedIndices;
}
