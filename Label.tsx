import React from "react"

import Text from "./Text"

interface Props extends React.LabelHTMLAttributes<HTMLInputElement> {
  label?: string
  required?: boolean
  id?: string
}
const Label = ({ label, id, required }: Props) => {
  return (
    <label htmlFor={id}>
      <Text as="span" variant={"body2"} className="text-wistron-blue-700">
        {label}
      </Text>
      <Text as="span" variant={"body2"} className="text-grey-300">
        {required ? "" : ` (optional)`}
      </Text>
    </label>
  )
}

export default Label
