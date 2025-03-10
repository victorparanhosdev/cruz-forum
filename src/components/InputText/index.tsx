import React from 'react'
import {
  forwardRef,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
} from 'react'
import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

const InputStyleVariants = tv({
  slots: {
    container:
      'relative transition border rounded-lg focus-within:ring-1 bg-stone-950 w-full',
    icon: '',
  },
  variants: {
    state: {
      default: {
        container:
          'focus-within:ring-green-400 focus-within:border-green-200 hover:border-green-200 hover:bg-hover-btn-menu_card',
        icon: 'text-white',
      },
      negative: {
        container:
          'border-red-900 bg-error-200 hover:bg-error-100 focus-within:bg-error-100 focus-within:ring-red-500',
        icon: 'text-red-500',
      },
    },
  },

  defaultVariants: {
    state: 'default',
  },
})

interface InputMsgErroProps extends HTMLAttributes<HTMLParagraphElement> {
  text: string
}

export const InputMsgErro = ({ text, ...rest }: InputMsgErroProps) => {
  return (
    <p
      {...rest}
      className={twMerge(
        'text-red-500 text-xs font-normal mt-1',
        rest.className,
      )}
    >
      {text}
    </p>
  )
}

interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  withIcon?: ReactNode | undefined
  state: 'default' | 'negative'
}

export const Input = forwardRef<HTMLInputElement, InputTextProps>(
  ({ state = 'default', className, withIcon, ...props }, ref) => {
    const styles = InputStyleVariants({ state })

    return (
      <div className={twMerge(styles.container(), className)}>
        <input
          style={{ background: 'transparent' }}
          {...props}
          className="outline-none py-2.5 pl-4 pr-9 w-full"
          ref={ref}
        />
        {withIcon && (
          <span
            className={twMerge(
              styles.icon(),
              'absolute right-2 top-2/4 -translate-y-2/4',
            )}
          >
            {withIcon}
          </span>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'
