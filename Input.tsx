// components/ui/Input.tsx
import React from "react"
import { cn } from "./lib/utils" // 可選：如果你有 classnames helper

import Text from "./Text"
import Label from "./Label"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  iconRight?: React.ReactNode
  [key: string]: any
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, required, iconRight, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-")

    return (
      <div className="flex w-full flex-col gap-1.5">
        {label && <Label id={inputId} required={required} label={label} />}
        <div className="relative">
          <input
            id={inputId}
            ref={ref}
            className={cn(
              "[&:hover,&:focus]:border-wistron-blue-300 border-grey-100 bg-grey-100 text-wistron-blue-700 placeholder:text-grey-300 w-full rounded-sm border px-3 py-[11px] focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100",
              error && "border-wistron-danger",
              className
            )}
            {...props}
          />
          {iconRight && (
            <div
              className={`text-wistron-blue-700 pointer-events-none absolute top-[50%] right-3 -translate-y-[50%]`}
            >
              {iconRight}
            </div>
          )}
        </div>

        {error && (
          <Text variant={"caption"} className="text-wistron-danger">
            {error}
          </Text>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"

export default Input
