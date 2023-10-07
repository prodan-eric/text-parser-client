import { ChangeEvent } from "react"

type TextPanelProps = {
    label?: string
    placeholder: string
    value: string 
    onChange: (value: string) => void
}

const TextPanel = ({ label, placeholder, value, onChange }: TextPanelProps) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };
  return (
    <div className="m-4 pr-5 md:pr-0 md:w-1/2 w-full">
      <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
      <textarea
        className="w-full h-[500px] px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-blue-500 resize-none"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default TextPanel;