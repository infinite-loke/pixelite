import type React from "react";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { InteractionContext } from "../context/InteractionContext";
import type { Interaction } from "../type";
import { Fullscreen, Minus, Plus } from "lucide-react";
import { Button } from "./atoms/Button";

const SCROLLWHEEL_FACTOR = 0.2; 

interface InteractionPaneProps extends React.PropsWithChildren {}

export const InteractionPane = ({ children, ...rest }: InteractionPaneProps) => {
    const [scale, setScale] = useState(1);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [dragPositionStart, setDragPositionStart] = useState({ x: 0, y: 0 });
    const [dragPositionOffsetStart, setDragPositionOffsetStart] = useState({ x: 0, y: 0});
    const [coordinates, setCoordinates] = useState({ x: 0, y: 0})
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null!);
    const contentRef = useRef<HTMLDivElement>(null!);

    useLayoutEffect(() => {
        const resize = () => {
            const container = containerRef.current.getBoundingClientRect();
            const content = contentRef.current.getBoundingClientRect();

            setOffset({
                x: (container.width - content.width) / 2,
                y: (container.height - content.height) / 2
            });
        }
        resize();
        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(containerRef.current);
        return () => {
            resizeObserver.unobserve(containerRef.current);
        }
    }, []);

    function handleWheel(event: React.WheelEvent) {
        const initialScale = scale;
        const initialOffset = { ...offset };
        
        const delta = event.deltaY > 0 ? (1 - SCROLLWHEEL_FACTOR) : (1 + SCROLLWHEEL_FACTOR);
        const newScale = Math.min(Math.max(initialScale * delta, 0.1), 20); // Added clamping
        
        // Your existing "Zoom to Mouse" math is actually correct!
        // It maintains the point under the cursor regardless of where the canvas is.
        const imageCoordinateX = (event.clientX - initialOffset.x) / initialScale;
        const imageCoordinateY = (event.clientY - initialOffset.y) / initialScale;

        const newOffsetX = initialOffset.x + (initialScale - newScale) * imageCoordinateX;
        const newOffsetY = initialOffset.y + (initialScale - newScale) * imageCoordinateY;

        setScale(newScale);
        setOffset({ x: newOffsetX, y: newOffsetY });
    }

     const handlePointerDown = (event: React.MouseEvent<HTMLDivElement>) => {
         if (event.buttons !== 4) return;
        const startPosition = { x: event.clientX, y: event.clientY };
        setDragPositionStart(startPosition);
        setDragPositionOffsetStart({...offset})
        setIsDragging(true)
    }

    const handlePointerMove = (event: React.MouseEvent) => {
        if (!isDragging) return;
        const dragPositionEnd = { x: event.clientX, y: event.clientY };
        const deltaX = dragPositionEnd.x - dragPositionStart.x;
        const deltaY = dragPositionEnd.y - dragPositionStart.y;
        setOffset({
            x: Math.round(dragPositionOffsetStart.x + deltaX),
            y: Math.round(dragPositionOffsetStart.y + deltaY),
        });
    }

    const handlePointerUp = () => {
        setIsDragging(false);
    }

    const handleChangeCoordinates = (x: number, y: number) => {
        setCoordinates({ x, y })
    }
    const getContainerCenter = () => {
        if (!containerRef.current) return { x: 0, y: 0 };
        const rect = containerRef.current.getBoundingClientRect();
        return { x: rect.width / 2, y: rect.height / 2 };
    };

    const adjustScale = (factor: number) => {
        const center = getContainerCenter();
        const newScale = Math.min(Math.max(scale * factor, 0.1), 20);
        
        // Zoom toward the center of the viewport
        const imageCoordinateX = (center.x - offset.x) / scale;
        const imageCoordinateY = (center.y - offset.y) / scale;

        const newOffsetX = offset.x + (scale - newScale) * imageCoordinateX;
        const newOffsetY = offset.y + (scale - newScale) * imageCoordinateY;

        setScale(newScale);
        setOffset({ x: newOffsetX, y: newOffsetY });
    };

    const handleFitContent = () => {
        if (!containerRef.current || !contentRef.current) return;
        
        const container = containerRef.current.getBoundingClientRect();
        const content = contentRef.current.getBoundingClientRect();
        
        // Calculate unscaled content dimensions
        const contentWidth = content.width / scale;
        const contentHeight = content.height / scale;

        // Find the scale that fits the content with a bit of padding (0.9)
        const newScale = Math.min(
            (container.width / contentWidth) * 0.9,
            (container.height / contentHeight) * 0.9,
            1 // Don't scale up past 100% unless desired
        );

        setScale(newScale);
        setOffset({
            x: (container.width - contentWidth * newScale) / 2,
            y: (container.height - contentHeight * newScale) / 2
        });
    };

    const interactionContextVal: Interaction = useMemo(() => ({
            scale,
            offset,
            changeCoordinates: handleChangeCoordinates,
            fitContent: handleFitContent,
        }), 
        [scale, offset, handleChangeCoordinates, handleFitContent ]
    )

    return (
        <InteractionContext.Provider value={interactionContextVal}>
            <div
                ref={containerRef}
                id="interaction-pane"
                onWheel={handleWheel}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                className={`relative w-full h-full overflow-hidden ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
                style={{ touchAction: 'none', transform: "translateZ(0)" }}
                {...rest}
            >
                <div className="fixed top-4 left-4 text-sm z-10 bg-white text-slate-700 leading-4 px-3 py-2 rounded-sm shadow-sm flex flex-col">
                    <span>X: {coordinates.x}</span>
                    <span>Y: {coordinates.y}</span> 
                </div>
                <div
                    ref={contentRef}
                    className="content"
                    style={{
                        position: "absolute",
                        left: `${offset.x}px`,
                        top: `${offset.y}px`,
                        transform: `scale(${scale})`,
                        transformOrigin: "0 0",
                        // Use will-change to keep the rendering on the GPU
                        willChange: "transform, left, top" 
                    }}
                >
                    {children}
                </div>
                <div className="fixed left-4 bottom-4 z-10 flex items-center gap-1 bg-white p-1 rounded-md shadow-md border border-slate-200">
                    <Button 
                        onClick={handleFitContent}
                        className="p-1 hover:bg-slate-100 rounded" 
                        icon={<Fullscreen size={18} className="text-slate-600"/>}
                    />
                    
                    <div className="h-4 w-px bg-slate-200 mx-1" />
                    
                    <div className="flex items-center">
                        <Button 
                            onClick={() => adjustScale(1 - SCROLLWHEEL_FACTOR)}
                            className="p-1 hover:bg-slate-100 rounded" 
                            icon={<Minus size={18} className="text-slate-600"/>}
                        />                        
                        <span className="w-12 text-center font-bold text-slate-700 tabular-nums text-[11px]">
                            {Math.round(scale * 100)}%
                        </span>
                        <Button 
                            onClick={() => adjustScale(1 + SCROLLWHEEL_FACTOR)}
                            className="p-1 hover:bg-slate-100 rounded" 
                            icon={<Plus size={18} className="text-slate-600"/>}
                        />
                    </div>
                </div>
            </div>
        </InteractionContext.Provider>
    );
};