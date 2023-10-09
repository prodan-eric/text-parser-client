import { ChangeEvent, useRef } from "react"
import { BiCopy } from "react-icons/bi"

type TextPanelProps = {
  label?: string
  placeholder: string
  value: string
  hasCopyButton?: boolean
  onChange: (value: string) => void
}

const TextPanel = ({
  label,
  placeholder,
  value,
  onChange,
  hasCopyButton = false,
}: TextPanelProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
  }
  const handleCopy = () => {
    if (textareaRef.current) {
      textareaRef.current.select()
      document.execCommand("copy")
    }
  }

  return (
    <div className="m-4 pr-5 md:pr-0 md:w-1/2 w-full relative">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <textarea
        ref={textareaRef}
        className="w-full h-[400px] px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-blue-500 resize-none"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
      {hasCopyButton && value && (
        <div
          onClick={handleCopy}
          className="absolute top-4 right-2 cursor-pointe cursor-pointer font-thin"
          title="Copy to clipboard"
        >
          <BiCopy size={20} />
        </div>
      )}
    </div>
  )
}

export default TextPanel
