import React, { TextareaHTMLAttributes } from "react"
import { forwardRef, HTMLAttributes } from "react"
import { twMerge } from 'tailwind-merge'
import { tv } from "tailwind-variants"


const TextAreaStyleVariants = tv({
    slots: {
        container: 'w-full bg-stone-950 border block focus:ring-1 py-2.5 px-4 overflow-hidden outline-none rounded-lg min-h-28 resize-none outline-none',
    },
    variants: {
        state: {
            default: {
                container: 'focus:ring-green-400 focus:border-green-200 hover:border-green-200 hover:bg-hover-btn-menu_card',

            },
            negative: {
                container: 'border-red-900 bg-error-200 hover:bg-error-100 focus:bg-error-100 focus:ring-red-500'
            }
        }
    },

    defaultVariants: {
        state: 'default'
    }
})


interface TextAreaMsgErroProps extends HTMLAttributes<HTMLParagraphElement> {
    text: string
}

export const TextAreaMsgErro = ({ text, ...rest }: TextAreaMsgErroProps) => {
    return (
        <p {...rest} className={twMerge('text-red-500 text-xs font-normal mt-1', rest.className)}>{text}</p>
    )
}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    state: 'default'| 'negative'
}


export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({state = 'default', className, ...props}, ref) => {
 
    const styles = TextAreaStyleVariants({state})

    return (
        <textarea ref={ref} className={twMerge(styles.container(), className)} {...props}/>
        
    )
})

TextArea.displayName = 'TextArea'

