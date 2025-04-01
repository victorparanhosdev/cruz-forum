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
      'relative w-full rounded-lg border bg-stone-950 transition focus-within:ring-1',
    icon: ''
  },
  variants: {
    state: {
      default: {
        container:
          'focus-within:border-green-200 focus-within:ring-green-400 hover:border-green-200 hover:bg-hover-btn-menu_card',
        icon: 'text-white'
      },
      negative: {
        container:
          'border-red-900 bg-error-200 focus-within:bg-error-100 focus-within:ring-red-500 hover:bg-error-100',
        icon: 'text-red-500'
      },
    },
    disabled: {
      true: {
        container: 'cursor-not-allowed border-gray-700 opacity-60 focus-within:border-gray-700 focus-within:ring-0 hover:border-gray-700 hover:bg-stone-950',
        icon: 'opacity-60'
      },
    },
  },
  compoundVariants: [
    {
      disabled: true,
      state: 'default',
      class: {
        container: 'hover:border-gray-700',
      },
    },
    {
      disabled: true,
      state: 'negative',
      class: {
        container: 'hover:border-red-900 hover:bg-error-200',
      },
    },
  ],
  defaultVariants: {
    state: 'default',
    disabled: false,
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
  state?: 'default' | 'negative'
}

export const Input = forwardRef<HTMLInputElement, InputTextProps>(
  ({ state = 'default', className, withIcon, disabled, ...props }, ref) => {
    const styles = InputStyleVariants({ state, disabled })

    return (
      <div className={twMerge(styles.container(), className)}>
        <input
          {...props}
          disabled={disabled}
          className='w-full truncate bg-transparent py-2.5 pl-4 pr-9 outline-none'
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