import { LabelHTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

interface InputLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
    text: string
}

export const Label = ({ text, className, ...rest }: InputLabelProps) => {
    return (
        <label {...rest} className={twMerge('mb-2 text-xs block', className)}>{text}</label>
    )
}