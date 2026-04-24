import React, { Children, useState } from "react"
import { Button as BaseButton, type ButtonProps } from "./Button";

type DialogControllProps = {
    isOpen?: boolean;
    setIsOpen?: (open: boolean) => void;
}

export const Dialog = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);

    const orientedChildren = Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        // Inject state into children
        return React.cloneElement<any>(child, { isOpen, setIsOpen })
    })

    return (
        <div className="relative">
            {orientedChildren}
        </div>
    )
}

// Rename to Trigger to be more descriptive in Dialog context
const Trigger = (props: ButtonProps & DialogControllProps) => {
    return (
        <BaseButton
            {...props}
            onClick={() => props.setIsOpen?.(true)}
        />
    )
}

const Modal = ({ children, isOpen, setIsOpen }: { children: React.ReactNode } & DialogControllProps) => {
    console.log(isOpen)
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative animate-in fade-in zoom-in duration-200">
                {/* Passing control props down so children can have a "Close" button */}
                {React.Children.map(children, child => 
                    React.isValidElement(child) 
                        ? React.cloneElement(child as React.ReactElement<any>, { setIsOpen }) 
                        : child
                )}
            </div>
        </div>
    )
}

// Helper component to close the modal from within
const Close = (props: ButtonProps & DialogControllProps) => {
    return (
        <BaseButton
            {...props}
            onClick={() => props.setIsOpen?.(false)}
        />
    )
}

// Attach components to Dialog for clean API: <Dialog.Trigger />
Dialog.Trigger = Trigger;
Dialog.Modal = Modal;
Dialog.Close = Close;