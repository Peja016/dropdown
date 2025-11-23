import React from "react"

import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "./lib/utils"

// define cva css system
const textVariants = cva(
  "whitespace-pre-wrap transition-all duration-300ms text-wistron-blue-500",
  {
    variants: {
      variant: {
        body1: "",
        body2: "text-sm",
        caption: "text-xs",
      },
      locale: {
        en: "leading-[1.5]",
        zh: "leading-[1.6] tracking-[0.02em]",
      },
      weight: {
        semibold: "font-semibold",
        regular: "font-normal",
      },
    },
    compoundVariants: [
      {
        variant: "body2",
        locale: "zh",
        className: "tracking-[0.01em]",
      },
      {
        variant: "body1",
        locale: "zh",
        className: "leading-[1.5]",
      },
    ],
    defaultVariants: {
      variant: "body1",
      locale: "zh",
      weight: "regular",
    },
  }
)

// 型別組合：取出 cva 產生的 variant props
export type TextVariants = VariantProps<typeof textVariants>

interface TextProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    TextVariants {
  as?: React.ElementType
  children?: React.ReactNode
  dangerouslySetInnerHTML?: { __html: string }
}

const Text = ({ className, variant, weight, as, ...props }: TextProps) => {
  const Component = as || "p"
  // const locale = lang.startsWith("zh") ? "zh" : "en"
  return (
    <Component
      className={cn(textVariants({ variant, locale: "en", weight, className }))}
      {...props}
    />
  )
}

export default Text
