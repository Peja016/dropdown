// components/SearchableDropdown.tsx
import React, { useState, useRef, useEffect } from "react"
import { ChevronDown, Search } from "lucide-react"
import Text from "./Text"
import Input from "./Input"

interface Option {
  name: string
}

interface SearchableDropdownProps {
  options: Option[]
  placeholder?: string
  className?: string
  label?: string
  required: boolean
  onChange: (value: Option["name"]) => void
  value: string
  error?: string
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  options = [],
  placeholder,
  value,
  onChange,
  label,
  error,
  className = "",
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options)
  const containerRef = useRef<HTMLDivElement>(null)
  // click outside to close the menu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // search in the options
  useEffect(() => {
    setFilteredOptions(
      options.filter((opt) =>
        opt.name.toLowerCase().includes(search.toLowerCase())
      )
    )
  }, [search, options])

  const handleSelect = (option: Option) => {
    onChange(option.name)
    setIsOpen(false)
    setSearch("")
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <Input
        label={label}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        value={value}
        iconRight={<ChevronDown />}
        error={error}
        className={`normaltext bg-grey-100 w-full cursor-pointer rounded-sm p-3 text-left hover:border-gray-400 focus:outline-none ${
          value ? "text-wistron-blue-700" : "text-grey-300"
        }`}
        {...props}
      />

      {isOpen && (
        <div className="border-grey-100 absolute z-10 mt-1 flex w-full flex-col gap-1 rounded-md border bg-white px-3 py-2 shadow-[0_2px_10px_0_rgba(73,80,82,0.08)] shadow-lg">
          <div className="relative">
            <input
              type="text"
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={"e.g. Ireland"}
              className={`normaltext ${
                search ? "text-wistron-blue-700" : "text-grey-300"
              } focus:text-wistron-blue-700 w-full rounded-md bg-gray-200 px-3 py-2 focus:outline-none`}
            />
            <div
              className={`text-wistron-blue-700 absolute top-[50%] right-3 -translate-y-[50%]`}
            >
              <Search />
            </div>
          </div>

          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.name}
                  onClick={() => handleSelect(option)}
                  className="hover:bg-wistron-blue-100 cursor-pointer px-3 py-2"
                >
                  <Text className="font-normal">{option.name}</Text>
                </div>
              ))
            ) : (
              <div className="px-3 py-2">
                <Text className="font-normal">Result is not founded</Text>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

SearchableDropdown.displayName = "Dropdown"

export default SearchableDropdown
