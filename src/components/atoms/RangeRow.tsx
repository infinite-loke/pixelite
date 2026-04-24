import { useCallback, useEffect, useState } from "react";

interface RangeRowProps extends React.InputHTMLAttributes<any> {
    label: string;
    onChange: (value: any) => void;
    timeout?: number
}

export const RangeRow = ({ 
    label, 
    value, 
    onChange, 
    min = "8", 
    max = "64",
    timeout = 650
}: RangeRowProps) => {
    const [rangeValue, setRangeValue] = useState(value);

    useEffect(() => {
        setRangeValue(value);
    }, [value])

    const debounceUpdate = useCallback(debounce(onChange, timeout), []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rangeValue = e.target.value

        setRangeValue(rangeValue);
        debounceUpdate(rangeValue);
    }

    return (
        <div className="flex items-center justify-between py-1 text-xs">
            <span className="text-slate-400">{label}</span>
            <span className="font-bold flex-1 text-right mr-4">
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={rangeValue}
                    onChange={handleChange}
                    className="w-28 h-1 bg-gray-200 square-slider-thumb rounded-lg appearance-none cursor-pointer accent-gray-800 dark:accent-gray-200"
                />
            </span>
            <input 
                type="number" 
                value={rangeValue} 
                min={min}
                max={max}
                onChange={handleChange}
                className="font-bold w-10 text-right bg-transparent text-sm font-mono border border-slate-300 rounded-sm outline-none text-slate-800"
            />
        </div>
    )
}

const debounce = (func: (...args: any) => void, delay: number) => {
    let timeoutId: number;
    return (...args: any) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
};