import { useRef } from "react";

interface PixelCanvasProps {
    color: string;
    size?: number;
}

export default function PixelCanvas({ 
    color, 
    size = 256 
}: PixelCanvasProps) {

    const canvasRef = useRef<HTMLDivElement>(null);
    const isDrawing = useRef(false);
    const lastPixelId = useRef("");

    const gridData = new Array(size).fill(1);    
    const gridSize = Math.sqrt(size)

    const drawPixel = (e) => {
        const pixelId = e.target.id
        if (pixelId != lastPixelId.current) {
            e.target.style.backgroundColor = color;
            lastPixelId.current = pixelId
        }
    }

    const handleInputStart: React.MouseEventHandler<HTMLDivElement> = (e) => {
        isDrawing.current = true;
        drawPixel(e);
    }

    const handleInput: React.MouseEventHandler<HTMLDivElement> = (e) => {
        if (!isDrawing.current) return;
        drawPixel(e);
    }

    return (
        <div
            ref={canvasRef}
            id="canvas"
            onMouseDown={handleInputStart}
            onMouseMove={handleInput}
            onMouseUp={() => isDrawing.current = false}
            style={{
                display: "grid",
                gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                gridTemplateRows: `repeat(${gridSize}, 1fr)`
            }}
        >
            {gridData.map((pix, index) => 
                <div 
                    key={index}
                    id={`pixel-${index}`}
                    className='border border-gray-400 cursor-alias select-none touch-none px-2'  
                >
                    {pix}
                </div>
            )}
        </div>
    )
}