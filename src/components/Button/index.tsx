import React, { ElementType, forwardRef } from "react"
import { twMerge } from "tailwind-merge"
import { tv, type VariantProps } from "tailwind-variants"

const buttonStyles = tv({
  base: "transition rounded-lg text-base font-medium gap-2 data-[state=true]:bg-green-900 data-[state=true]:font-bold items-center flex justify-center",
  variants: {
    state: {
      default: "disabled:text-gray-700 disabled:bg-gray-400 bg-green-950 enabled:hover:bg-green-800",
      outline: "bg-none ring-1 ring-green-200 enabled:hover:bg-hover-btn-menu_card disabled:bg-gray-950 disabled:text-gray-800 disabled:ring-gray-900",
      transparent: "bg-none hover:bg-hover-btn-menu_card",
      text: ''
    },
    size: {
      sm: "py-2 px-4",
      md: "py-2.5 px-4",
      lg: "py-3 px-4",
    },
  },
  defaultVariants: {
    size: "md",
    state: "default",
  },
})

interface ButtonProps extends VariantProps<typeof buttonStyles>, React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean
  children: React.ReactNode
  iconLeft?: ElementType,
  iconRight?: ElementType
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ state, isActive = false, size, children, className, disabled, iconLeft: IconLeft, iconRight: IconRight, ...props }, ref) => {

    const styles = buttonStyles({ state, size })
    return (
      <button
        ref={ref}
        data-state={isActive}
        aria-pressed={isActive}
        aria-disabled={disabled} 
        disabled={disabled}
        className={twMerge(styles, className)}
        {...props}
      >
        {IconLeft && <IconLeft size={24} weight={isActive ? 'bold': 'regular'}/>}
        {children}
        {IconRight && <IconRight size={24} weight={isActive ? 'bold': 'regular'}/>}
      </button>
    )
  }
)

Button.displayName = "Button"

