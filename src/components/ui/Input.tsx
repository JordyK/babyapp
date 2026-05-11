import * as React from "react"

import { cn } from "@/lib/utils"

interface InputProps extends React.ComponentProps<"input"> {
  label?: string;
  error?: string | undefined;
}

function Input({ className, type, label, error, ...props }: InputProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-neutral-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
        </label>
      )}
      <input
        type={type}
        data-slot="input"
        className={cn(
          "h-12 w-full min-w-0 rounded-xl border border-neutral-300 bg-transparent px-4 py-3 text-base transition-colors outline-none placeholder:text-neutral-500 focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500/20 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:opacity-50 aria-invalid:border-error-500 aria-invalid:ring-2 aria-invalid:ring-error-500/20",
          error && "border-error-500 focus-visible:border-error-500 focus-visible:ring-error-500/20",
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-error-600">{error}</p>
      )}
    </div>
  )
}

export { Input }
