import type { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<any> {
    icon?: React.ReactNode | React.ReactElement;
    label?: string;
    tooltip?: string | React.ReactNode;
    active?: boolean;
    onClick?: () => void;
    variant?: "primary" | "default"
    tooltipPosition?: "bottom" | "left"
}

export const Button = ({ 
    icon, 
    label,
    onClick,
    active = false, 
    variant = "default",
    tooltip,
    tooltipPosition = "bottom",
    className,
    ...rest
}: ButtonProps) => (
    <div className="relative group/tooltip flex">
        <button 
            onClick={onClick}
            className={`p-2 rounded cursor-pointer transition-all duration-200 flex items-center gap-2 
                active:scale-90 active:bg-slate-200/70
                ${
                    active
                        ? 'bg-gray-200 text-black outline outline-slate-200' 
                        : 'text-slate-400 hover:text-slate-600'
                } 
                ${
                    variant == "primary"
                        ? 'active:bg-slate-900 bg-black text-white hover:text-white font-bold text-sm hover:bg-slate-800 px-4 py-1.5'
                        : 'hover:bg-slate-100 rounded text-slate-600 text-sm font-medium'
                }
                ${className}
                `
            }
            {...rest}
        >
            {icon}
            {label}
        </button>
        {tooltip && (
            <div className={`absolute  mb-2 px-2 py-1 
                bg-slate-700 text-white text-[10px] font-bold rounded opacity-0 
                group-hover/tooltip:opacity-100 pointer-events-none transition-opacity
                whitespace-nowrap z-50 shadow-xl 
                ${
                    tooltipPosition == "bottom"
                        ? "top-full mt-1 left-1/2 -translate-x-1/2"
                        : "left-full ml-1 top-1/2 -translate-y-1/2"
                }
            `}
            >
                {tooltip}
            </div>
        )}
    </div>
);