import React, { ElementType, forwardRef } from "react"
import { twMerge } from "tailwind-merge"
import { tv, type VariantProps } from "tailwind-variants"

const buttonStyles = tv({
  base: "transition rounded-lg text-base font-medium gap-2 flex items-center justify-center",
  variants: {
    state: {
      default: "disabled:text-gray-700 disabled:bg-gray-400 bg-green-950 enabled:hover:bg-green-800 py-2.5 px-4",
      'outline-negative': "bg-none border border-red-900 enabled:hover:bg-error-100 disabled:bg-gray-950 disabled:text-gray-800 disabled:border-gray-900 py-2 px-4",
      menu: "bg-none hover:bg-hover-btn-menu_card w-full data-[state=true]:bg-green-900 data-[state=true]:font-bold px-4 py-2 text-start justify-start",
      transparent: 'py-2 gap-1 hover:enabled:text-green-200'
    }
  },
  defaultVariants: {
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
  ({ state, isActive = false, children, className, disabled, iconLeft: IconLeft, iconRight: IconRight, ...props }, ref) => {

    const styles = buttonStyles({state})
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
        <span className="whitespace-nowrap text-base">{children}</span>
        {IconRight && <IconRight size={24} weight={isActive ? 'bold': 'regular'}/>}
      </button>
    )
  }
)

Button.displayName = "Button"

