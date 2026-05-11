import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-fast focus-ring disabled:pointer-events-none disabled:opacity-50 min-h-[44px]",
  {
    variants: {
      variant: {
        default: "bg-primary-500 text-white hover:bg-primary-600 hover:-translate-y-px active:translate-y-0",
        secondary: "bg-white text-primary-500 border border-primary-200 hover:bg-primary-50 hover:border-primary-300",
        ghost: "bg-transparent text-neutral-600 hover:bg-neutral-100 hover:text-neutral-800",
        destructive: "bg-error-500 text-white hover:bg-error-600",
        link: "text-primary-500 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-3 text-base",
        sm: "h-9 px-4 py-2 text-sm",
        lg: "h-13 px-8 py-4 text-lg",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
