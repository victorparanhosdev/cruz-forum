import { IconProps } from "@phosphor-icons/react"
import { ElementType, HTMLAttributes, InputHTMLAttributes, LabelHTMLAttributes, ReactNode } from "react"
import { twMerge } from 'tailwind-merge'
import { tv } from "tailwind-variants"



const InputStyleVariants = tv({
    base: 'border transition rounded-lg focus:ring-1 focus:ring-green-400 focus:border-green-200  text-white w-full bg-stone-950 focus:outline-none  py-2.5 pl-4 pr-9 group-hover:border-green-200 hover:bg-hover-btn-menu_card',
    variants: {
        state: {
            default: 'border-white',
            negative: 'border-red-500 bg-red-error hover:bg-stone-950 focus:bg-stone-950'
        }
    },

    defaultVariants: {
        state: 'default'
    }
})

interface InputIconProps extends IconProps {
    icon: ElementType
}

const InputIcon = ({ icon: Icon, size = 20, weight = 'regular', ...rest }: InputIconProps) => {
    return (
        <Icon {...rest} size={size} weight={weight} className={twMerge('absolute right-2 top-3 group-hover:text-green-200', rest.className)} />
    )
}


interface InputLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
    text: string
}

const InputLabel = ({ text, ...rest }: InputLabelProps) => {
    return (
        <label {...rest} className={twMerge('mb-2 text-xs block', rest.className)}>{text}</label>
    )
}

interface InputMsgErroProps extends HTMLAttributes<HTMLParagraphElement> {
    text: string
}

const InputMsgErro = ({ text, ...rest }: InputMsgErroProps) => {
    return (
        <p {...rest} className={twMerge('text-red-500 text-xs font-normal mt-1', rest.className)}>{text}</p>
    )
}


interface InputTextProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode
}

const InputTextRoot = ({ children, ...rest }: InputTextProps) => {
    return (
        <div {...rest} className={twMerge('w-full', rest.className)}>
            {children}
        </div>

    )
}

interface InputTextContentProps extends InputHTMLAttributes<HTMLInputElement> {
    children?: ReactNode,
    state: 'default'| 'negative'
}


const InputTextContent = ({ children, state = 'default', ...rest }: InputTextContentProps) => {

    const styles = InputStyleVariants({state})
    return (
        <div className='relative focus-within:text-green-200 group'>
            <input {...rest} className={twMerge(styles, rest.className)} />
            {children}
        </div>
    )
}

export const Input = {
    Root: InputTextRoot,
    Icon: InputIcon,
    Content: InputTextContent,
    MsgError: InputMsgErro,
    Label: InputLabel
}