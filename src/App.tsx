import { useState } from 'react';
import './App.css';
import PixelCanvas from './PixelCanvas';

function App() {
    const [color, setColor] = useState("orange");

    return (
        <div className="App">
            <header className='text-center text-4xl border-b-2 py-3'>Pixelite</header>
            <div className='flex flex-col items-center'>
                <PixelCanvas color={color} size={400}/>
                change Color default: "orange"
                <input type='color' value={color} onChange={e => setColor(e.target.value)}/>
            </div>
        </div>
    )
}

export default App
