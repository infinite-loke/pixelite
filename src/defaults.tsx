import { Brush, Eraser, MousePointer2, PaintBucket } from "lucide-react";
import type { Tool } from "./type";

export const RESOLUTIONS = [
    { name: "micro", label: "8 x 8", rows: 8, columns: 8 },      // 64 pixels (Ultra fast)
    { name: "tiny", label: "16 x 16", rows: 16, columns: 16 },   // 256 pixels
    { name: "small", label: "24 x 24", rows: 24, columns: 24 }, // 576 pixels
    { name: "medium", label: "32 x 32", rows: 32, columns: 32 },   // 1,024 pixels
    { name: "large", label: "48 x 48", rows: 48, columns: 48 },  // 2,304 pixels (Limit for DOM)
];

export const COLORS = [
    '#000000', // Black
    '#FFFFFF', // White
    '#FF0000', // Red
    '#00FF00', // Green
    '#0000FF', // Blue
    '#FFFF00', // Yellow
    '#FF00FF', // Magenta
    '#00FFFF', // Cyan
    '#FFA500', // Orange
    '#800080', // Purple
    '#FFC0CB', // Pink
    '#A52A2A', // Brown
    '#808080', // Gray
    '#FF6B6B', // Light Red
    '#4ECDC4', // Turquoise
    '#95E1D3', // Mint
    '#F38181', // Coral
    '#AA96DA', // Lavender
    '#FCBAD3', // Light Pink
    '#FFFFD2', // Cream
    '#A8D8EA', // Sky Blue
    '#FFAAA7', // Peach
    '#C7CEEA', // Periwinkle
    '#FFD3B6', // Apricot
    '#DCEDC1', // Light Green
    '#FFA8A8', // Salmon
    '#B4E7CE', // Seafoam
];

export const TOOLS: Tool[] = [
    {
        id: "select",
        label: "Select",
        icon: <MousePointer2 size={20}/>,
        cursor: `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJ3aGl0ZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1tb3VzZS1wb2ludGVyMi1pY29uIGx1Y2lkZS1tb3VzZS1wb2ludGVyLTIiPjxwYXRoIGQ9Ik00LjAzNyA0LjY4OGEuNDk1LjQ5NSAwIDAgMSAuNjUxLS42NTFsMTYgNi41YS41LjUgMCAwIDEtLjA2My45NDdsLTYuMTI0IDEuNThhMiAyIDAgMCAwLTEuNDM4IDEuNDM1bC0xLjU3OSA2LjEyNmEuNS41IDAgMCAxLS45NDcuMDYzeiIvPjwvc3ZnPg==") 0 0, auto`
    },
    {
        id: "brush",
        label: "Brush",
        icon: <Brush size={20} style={{ rotate: "90deg"}}/>,
        cursor: `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJ3aGl0ZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHlsZT0icm90YXRlOiA5MGRlZyIgY2xhc3M9Imx1Y2lkZSBsdWNpZGUtYnJ1c2gtaWNvbiBsdWNpZGUtYnJ1c2giPjxwYXRoIGQ9Im0xMSAxMCAzIDMiLz48cGF0aCBkPSJNNi41IDIxQTMuNSAzLjUgMCAxIDAgMyAxNy41YTIuNjIgMi42MiAwIDAgMS0uNzA4IDEuNzkyQTEgMSAwIDAgMCAzIDIxeiIvPjxwYXRoIGQ9Ik05Ljk2OSAxNy4wMzEgMjEuMzc4IDUuNjI0YTEgMSAwIDAgMC0zLjAwMi0zLjAwMkw2Ljk2NyAxNC4wMzEiLz48L3N2Zz4=") 0 0, auto`
    },
    // {
    //     id: "auto-draw",
    //     label: "Auto Draw",
    //     icon: <WandSparkles size={20} style={{ rotate: "270deg"}}/>,
    //     cursor: `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJ3aGl0ZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHlsZT0icm90YXRlOiAyNzBkZWciIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXdhbmQtc3BhcmtsZXMtaWNvbiBsdWNpZGUtd2FuZC1zcGFya2xlcyI+PHBhdGggZD0ibTIxLjY0IDMuNjQtMS4yOC0xLjI4YTEuMjEgMS4yMSAwIDAgMC0xLjcyIDBMMi4zNiAxOC42NGExLjIxIDEuMjEgMCAwIDAgMCAxLjcybDEuMjggMS4yOGExLjIgMS4yIDAgMCAwIDEuNzIgMEwyMS42NCA1LjM2YTEuMiAxLjIgMCAwIDAgMC0xLjcyIi8+PHBhdGggZD0ibTE0IDcgMyAzIi8+PHBhdGggZD0iTTUgNnY0Ii8+PHBhdGggZD0iTTE5IDE0djQiLz48cGF0aCBkPSJNMTAgMnYyIi8+PHBhdGggZD0iTTcgOEgzIi8+PHBhdGggZD0iTTIxIDE2aC00Ii8+PHBhdGggZD0iTTExIDNIOSIvPjwvc3ZnPg==") 0 0, auto`
    // },
    // {
    //     id: "symmetry",
    //     label: "Symmetry",
    //     icon: <SquareCenterlineDashedHorizontal size={20}/>
    // },
    {
        id: "eraser",
        label: "Eraser",
        icon: <Eraser size={20}/>,
        cursor: `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJ3aGl0ZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1lcmFzZXItaWNvbiBsdWNpZGUtZXJhc2VyIj48cGF0aCBkPSJNMjEgMjFIOGEyIDIgMCAwIDEtMS40Mi0uNTg3bC0zLjk5NC0zLjk5OWEyIDIgMCAwIDEgMC0yLjgyOGwxMC0xMGEyIDIgMCAwIDEgMi44MjkgMGw1Ljk5OSA2YTIgMiAwIDAgMSAwIDIuODI4TDEyLjgzNCAyMSIvPjxwYXRoIGQ9Im01LjA4MiAxMS4wOSA4LjgyOCA4LjgyOCIvPjwvc3ZnPg==") 0 20, auto`
    },
    {
        id: "flood-fill",
        label: "Fill",
        icon: <PaintBucket size={20} style={{ transform: "scaleX(-1)"}}/>,
        cursor: `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJ3aGl0ZSIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0eWxlPSJ0cmFuc2Zvcm06IHNjYWxlWCgtMSkiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXBhaW50LWJ1Y2tldC1pY29uIGx1Y2lkZS1wYWludC1idWNrZXQiPjxwYXRoIGQ9Ik0xMSA3IDYgMiIvPjxwYXRoIGQ9Ik0xOC45OTIgMTJIMi4wNDEiLz48cGF0aCBkPSJNMjEuMTQ1IDE4LjM4QTMuMzQgMy4zNCAwIDAgMSAyMCAxNi41YTMuMyAzLjMgMCAwIDEtMS4xNDUgMS44OGMtLjU3NS40Ni0uODU1IDEuMDItLjg1NSAxLjU5NUEyIDIgMCAwIDAgMjAgMjJhMiAyIDAgMCAwIDItMi4wMjVjMC0uNTgtLjI4NS0xLjEzLS44NTUtMS41OTUiLz48cGF0aCBkPSJtOC41IDQuNSAyLjE0OC0yLjE0OGExLjIwNSAxLjIwNSAwIDAgMSAxLjcwNCAwbDcuMjk2IDcuMjk2YTEuMjA1IDEuMjA1IDAgMCAxIDAgMS43MDRsLTcuNTkyIDcuNTkyYTMuNjE1IDMuNjE1IDAgMCAxLTUuMTEyIDBsLTMuODg4LTMuODg4YTMuNjE1IDMuNjE1IDAgMCAxIDAtNS4xMTJMNS42NyA3LjMzIi8+PC9zdmc+") 10 10, auto`

    },
]