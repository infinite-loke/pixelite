import React, { useRef, useState, type CSSProperties } from "react";
import { TOOLS } from "../defaults";
import {
    getAdjacentSquareIndices, getFloodFillIndices, getSelectedIndexNonAdjacentEdges,
    getSymmetricSquareIndex, getTransparentPixel
} from "../helper";
import { useEditor } from "../hooks/useEditor";
import { useInteractionPane } from "../hooks/useInteractionPane";
import type { Directions } from "../type";

// TODO: This code grows big need to refactor.
export default function PixelCanvas() {
    const isDrawing = useRef(false);
    const isHovering = useRef(false);
    const currentStrokeIndices = useRef<number[]>([]);
    const [hoveredAdjacentSquaresIndices, setHoveredAdjacentSquaresIndices] = useState<number[]>([])
    const { changeCoordinates } = useInteractionPane()
    const { state, editor } = useEditor();
    const {pixels, resolution, color, tool, brushSize, selected, mode} = state;
    const { columns } = resolution;

    // Helper functions ----------------*

    const updateCanvas = (el: HTMLElement, event: "move" | "down") => {
        if (tool == "brush") {
            paint(el);
        } else if (tool == "eraser") {
            erase(el)
        } else if (tool == "flood-fill" && event == "down") {
            floodfill(el)
        } else if (tool == "select") {
            select(el)
        }
    }

    const updatePixelStyle = (pixelIndex: number, style: any) => {
        const symmetricSquareElement = document.getElementById(`pixel-${pixelIndex}`);
        if (!symmetricSquareElement) return;
        Object.keys(style).forEach((attr: any) => {
            symmetricSquareElement.style[attr] = style[attr];
        })
    }

    const paint = (el: HTMLElement) => {
        if (!el.id.startsWith("pixel-")) return;
        
        const pixelId = Number(el.id.match(/(\d+)/g));
        const adjacentSquares = getAdjacentSquareIndices(resolution.rows, resolution.columns, pixelId, brushSize);
        const isSymmetricMode = mode == "symmetry";
        adjacentSquares.forEach((adjIndex) => {
            if (currentStrokeIndices.current.some(c => c === adjIndex)) return;
            currentStrokeIndices.current.push(adjIndex);
            currentStrokeIndices.current.push(adjIndex);
            updatePixelStyle(adjIndex, { backgroundColor: color})
            if (isSymmetricMode) {
                const symmetricSquareIndex = getSymmetricSquareIndex(resolution.rows, resolution.columns, adjIndex);
                currentStrokeIndices.current.push(symmetricSquareIndex);
                updatePixelStyle(symmetricSquareIndex, { backgroundColor: color})
            }
        })
    };

    const erase = (el: HTMLElement) => {
        if (!el.id.startsWith("pixel-")) return;

        const pixelId = Number(el.id.match(/(\d+)/g));
        const adjacentSquares = getAdjacentSquareIndices(resolution.rows, resolution.columns, pixelId, brushSize);
        const isSymmetricMode = mode == "symmetry";

        adjacentSquares.forEach((adjIndex) => {
            if (currentStrokeIndices.current.some(c => c === adjIndex)) return;
            currentStrokeIndices.current.push(adjIndex);
            updatePixelStyle(adjIndex, { backgroundColor: getTransparentPixel(columns, adjIndex) })
            if (isSymmetricMode) {
                const symmetricSquareIndex = getSymmetricSquareIndex(resolution.rows, resolution.columns, adjIndex);
                currentStrokeIndices.current.push(symmetricSquareIndex);
                updatePixelStyle(symmetricSquareIndex, { backgroundColor: getTransparentPixel(columns, symmetricSquareIndex) })
            }
        })
    }

    const floodfill = (el: HTMLElement) => {
        if (!el.id.startsWith("pixel-")) return;

        const pixelId = Number(el.id.match(/(\d+)/g));
        const floodFilledPixelIndices = getFloodFillIndices(pixels, pixelId, color, resolution.rows, resolution.columns);
        const isSymmetricMode = mode == "symmetry";
        floodFilledPixelIndices.forEach((fillIndex) => {
            if (currentStrokeIndices.current.some(c => c === fillIndex)) return;
            currentStrokeIndices.current.push(fillIndex);
            updatePixelStyle(fillIndex, { backgroundColor: getTransparentPixel(columns, fillIndex) })
            if (isSymmetricMode) {
                const symmetricSquareIndex = getSymmetricSquareIndex(resolution.rows, resolution.columns, fillIndex);
                currentStrokeIndices.current.push(symmetricSquareIndex);
                updatePixelStyle(symmetricSquareIndex, { backgroundColor: getTransparentPixel(columns, symmetricSquareIndex) })
            }
        })
    }

    const select = (el: HTMLElement) => {
        if (!el.id.startsWith("pixel-")) return;

        const pixelId = Number(el.id.match(/(\d+)/g));
        const adjacentSquares = getAdjacentSquareIndices(resolution.rows, resolution.columns, pixelId, brushSize);
        const isSymmetricMode = mode == "symmetry";
        adjacentSquares.forEach((adjIndex) => {
            updatePixelStyle(adjIndex, { outline: '1px solid blue' })
            currentStrokeIndices.current.push(adjIndex);
            if (isSymmetricMode) {
                const symmetricSquareIndex = getSymmetricSquareIndex(resolution.rows, resolution.columns, adjIndex);
                currentStrokeIndices.current.push(symmetricSquareIndex);
                updatePixelStyle(symmetricSquareIndex, { outline: '1px solid blue' })
            }
        })
    }

    // Event handlers ----------------*

    const handleMouseEnter = () => {
        isHovering.current = true;
        setHoveredAdjacentSquaresIndices([]);
    }

    const handleMouseDown = (e: React.MouseEvent) => {
        if (e.buttons !== 1) return; 
        isDrawing.current = true;
        currentStrokeIndices.current = []; // Reset for new stroke
        updateCanvas(e.target as HTMLElement, "down")
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        const element = e.target as HTMLElement
        const pixelId = Number(element.id.match(/(\d+)/g));
        const x = pixelId % columns;
        const y = Math.floor(pixelId / columns);
        changeCoordinates(x, y);

        const adjacentSquares = getAdjacentSquareIndices(resolution.rows, resolution.columns, pixelId, brushSize);
        setHoveredAdjacentSquaresIndices(adjacentSquares);
        if (!isDrawing.current) return;
        updateCanvas(element, "move")
    };

    const handleMouseUp = () => {
        if (!isDrawing.current) return;
        isDrawing.current = false;

        if (currentStrokeIndices.current.length > 0) {
            // Package the stroke into a command and save it to history
            if (tool == "brush") {
                editor.draw([...currentStrokeIndices.current])
            } else if (tool == "eraser") {
                editor.erase([...currentStrokeIndices.current])
            } else if (tool == "flood-fill") {
                editor.floodFill([...currentStrokeIndices.current])
            } else if (tool == "select") {
                editor.select([...currentStrokeIndices.current])
                currentStrokeIndices.current.forEach((adjIndex) => {
                    updatePixelStyle(adjIndex, { outline: "none"})
                })
            }
        }
    };

    const handleMouseLeave = () => {
        handleMouseUp();
        setHoveredAdjacentSquaresIndices([]);
        currentStrokeIndices.current = []
    }

    return (
        <div 
            id="canvas"
            className={`grid checked-background mode-${mode}`}
            style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
        >
            {pixels.map((pixel, i) => {
                const pixelStyle: CSSProperties = {
                    cursor: TOOLS.find(toolConfig => toolConfig.id == tool)?.cursor || "crosshair",
                    backgroundColor: pixel,
                    backgroundImage: hoveredAdjacentSquaresIndices?.includes(i) 
                        ? "linear-gradient(rgba(128, 128, 128, 0.36))" : "none",
                }
                if (selected && selected.includes(i)) {
                    const nonAdjacentEdges = getSelectedIndexNonAdjacentEdges(i, selected, resolution.rows, resolution.columns);
                    nonAdjacentEdges.forEach(edge => {
                        pixelStyle[`border${edge.slice(0,1).toUpperCase() + edge.slice(1) as Directions}`] = "2px dotted #155dfc"
                    })
                }

                return (
                    <div 
                        key={i}
                        id={`pixel-${i}`}
                        className={'h-5 w-5 select-none touch-none'}
                        style={pixelStyle}
                    />
                )
            })}
        </div>
    );
}