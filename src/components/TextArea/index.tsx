import React, { TextareaHTMLAttributes } from 'react'
import { forwardRef, HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

const TextAreaStyleVariants = tv({
  slots: {
    container:
      'block min-h-28 w-full resize-none overflow-hidden rounded-lg border bg-stone-950 px-4 py-2.5 outline-none focus:ring-1',
  },
  variants: {
    state: {
      default: {
        container:
          'hover:border-green-200 hover:bg-hover-btn-menu_card focus:border-green-200 focus:ring-green-400',
      },
      negative: {
        container:
          'border-red-900 bg-error-200 hover:bg-error-100 focus:bg-error-100 focus:ring-red-500',
      },
    },
  },

  defaultVariants: {
    state: 'default',
  },
})

interface TextAreaMsgErroProps extends HTMLAttributes<HTMLParagraphElement> {
  text: string
}

export const TextAreaMsgErro = ({ text, ...rest }: TextAreaMsgErroProps) => {
  return (
    <p
      {...rest}
      className={twMerge(
        'mt-1 text-xs font-normal text-red-500',
        rest.className,
      )}
    >
      {text}
    </p>
  )
}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  state: 'default' | 'negative'
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ state = 'default', className, ...props }, ref) => {
    const styles = TextAreaStyleVariants({ state })

    return (
      <textarea
        ref={ref}
        className={twMerge(styles.container(), className)}
        {...props}
      />
    )
  },
)

TextArea.displayName = 'TextArea'
