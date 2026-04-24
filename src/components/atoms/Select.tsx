import type { SelectHTMLAttributes } from "react"

type ChoiceType = { 
    name: string, 
    label: string, 
    [int:string]: any 
}

interface SelectProps extends Omit<SelectHTMLAttributes<any>, "onSelect"> {
    label: string,
    choices: ChoiceType[],
    onSelect: (value: string, e: React.ChangeEvent) => void,
}

export const Select = ({
    value,
    label,
    choices,
    onSelect
}: SelectProps) => (
    <select 
        className="py-3 px-4 pe-9 block w-full bg-layer border-layer-line rounded-lg text-sm text-foreground focus:border-primary-focus focus:ring-primary-focus disabled:opacity-50 disabled:pointer-events-none cursor-pointer bg-slate-200 outline-none border border-slate-100 focus:border-slate-500"
        onChange={(e) => onSelect(e.target.value, e)}
        value={value}
    >
        <option value="" disabled>Select {label}</option>
        {choices.map((res) => (
            <option key={res.name} value={res.name}>
                {res.name.charAt(0).toUpperCase() + res.name.slice(1)} ({res.label})
            </option>
        ))}
    </select>
)