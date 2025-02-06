import { LabelHTMLAttributes, ReactNode } from "react"
import { twMerge } from "tailwind-merge"

interface InputLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
    children: ReactNode
}

export const Label = ({className, children, ...rest }: InputLabelProps) => {
    return (
        <label {...rest} className={twMerge('mb-2 text-xs block', className)}>{children}</label>
    )
}