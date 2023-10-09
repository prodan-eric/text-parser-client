import { ChangeEvent, useRef } from "react"
import { BiCopy } from "react-icons/bi"
import { MdOutlineCancel } from "react-icons/md"

type TextPanelProps = {
  label?: string
  placeholder: string
  value: string
  icon?: string | null
  onChange: (value: string) => void
  clearText?: () => void
}

const TextPanel = ({
  label,
  placeholder,
  value,
  onChange,
  icon = null,
  clearText,
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
    <div className="m-4 pr-5 md:pr-0 md:w-1/2 w-full">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <div className="relative border rounded-md overflow-hidden">
        <textarea
          ref={textareaRef}
          className="w-full h-[400px] px-3 py-2 text-gray-700 focus:outline-none focus:border-blue-500 resize-none"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
        {icon && value && (
          <div
            className="absolute top-2 right-2 cursor-pointer font-thin"
            title="Copy to clipboard"
          >
            {icon === "remove" ? (
              <MdOutlineCancel onClick={clearText} />
            ) : (
              <BiCopy onClick={handleCopy} />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default TextPanel
