import React, { ComponentType, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { tv, type VariantProps } from 'tailwind-variants'
import { type IconProps } from '@phosphor-icons/react'

const buttonStyles = tv({
  base: 'flex items-center justify-center gap-2 rounded-lg text-base font-medium transition',
  variants: {
    state: {
      default:
        'bg-green-950 px-4 py-2.5 enabled:hover:bg-green-800 disabled:opacity-70',
      'outline-negative':
        'border border-red-900 bg-none px-4 py-2 enabled:hover:bg-error-100 disabled:opacity-70 disabled:bg-error-200',
      menu: 'w-full justify-start bg-none px-4 py-2 text-start hover:bg-hover-btn-menu_card data-[state=true]:bg-green-900 data-[state=true]:font-bold',
      transparent: 'gap-1 py-2 hover:enabled:text-green-200',
    },
  },
  defaultVariants: {
    state: 'default',
  },
})

interface ButtonProps
  extends VariantProps<typeof buttonStyles>,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean
  children: React.ReactNode
  iconLeft?: ComponentType<IconProps> | undefined
  iconRight?: ComponentType<IconProps> | undefined
  classNameIcon?: string
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      state,
      isActive = false,
      children,
      className,
      disabled,
      iconLeft: IconLeft,
      iconRight: IconRight,
      classNameIcon,
      ...props
    },
    ref,
  ) => {
    const styles = buttonStyles({ state })
    return (
      <button
        ref={ref}
        data-state={isActive ? 'true' : undefined}
        aria-pressed={isActive ? 'true' : undefined}
        aria-disabled={disabled ? 'true' : undefined}
        disabled={disabled ? true : undefined}
        className={twMerge(styles, className)}
        {...props}
      >
        {IconLeft ? (
          <IconLeft
            data-testid="icon-left"
            aria-hidden="true"
            data-weight={isActive ? 'bold' : 'regular'}
            size={24}
            weight={isActive ? 'bold' : 'regular'}
            className={classNameIcon}
          />
        ) : undefined}
        <span className="whitespace-nowrap text-base">{children}</span>
        {IconRight ? (
          <IconRight
            data-testid="icon-right"
            aria-hidden="true"
            data-weight={isActive ? 'bold' : 'regular'}
            size={24}
            weight={isActive ? 'bold' : 'regular'}
            className={classNameIcon}
          />
        ) : undefined}
      </button>
    )
  },
)

Button.displayName = 'Button'
