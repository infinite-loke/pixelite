
interface SwitchRowProps extends Omit<React.InputHTMLAttributes<any>, "value"> {
    label: string;
    value: boolean;
    onChange: (value: any) => void;
}

export const SwitchRow = ({ 
    label, 
    value, 
    onChange,
}: SwitchRowProps) => {
    return (
        <div className="flex items-center justify-between py-1 text-xs">
            <span className="text-slate-400">{label}</span>
            <label htmlFor="hs-basic-usage" className="relative inline-block w-10 h-3 cursor-pointer">
                <input type="checkbox" id="hs-basic-usage" className="peer sr-only" checked={value} onChange={(e) => onChange(e.target.checked)}/>
                <span className="absolute inset-0 bg-gray-200 dark:bg-neutral-600 rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-blue-400 dark:peer-checked:bg-blue-500 peer-disabled:opacity-50 peer-disabled:pointer-events-none"></span>
                <span className="absolute top-1/2 -translate-y-1/2 size-5 bg-slate-500 rounded-full shadow-sm transition-transform duration-200 ease-in-out peer-checked:translate-x-full"></span>
            </label>
        </div>
    )
}