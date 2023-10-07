import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import { ClientScript, ScriptRequest } from "../../types"
import { AuthContext } from "../../auth/Auth"
import postScript from "../../api/post-script"
import { Status } from "../Home"
import getScriptSuggestion from "./getScriptSuggestion"
import getStatusColor from "./getStatusColor"

interface AddScriptProps {
  onSubmit?: () => void
  scripts: ClientScript[]
  setScripts: Dispatch<SetStateAction<ClientScript[]>>
  status: Status
  setStatus: Dispatch<SetStateAction<Status>>
}

const AddScript = ({
  onSubmit,
  scripts,
  setScripts,
  status,
  setStatus,
}: AddScriptProps) => {
  const { currentUser } = useContext(AuthContext)

  const scriptSuggestion = useRef<string>()
  useEffect(() => {
    scriptSuggestion.current = getScriptSuggestion()
  }, [])

  const [scriptRequest, setScriptRequest] = useState<ScriptRequest>({
    name: "",
    instruction: "",
    userId: currentUser?.uid || null,
  })

  const isButtonDisabled  = !scriptRequest.name || !scriptRequest.instruction

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setScriptRequest({
      ...scriptRequest,
      [name]: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus({ ...status, state: "pending" })
    const newScript = await postScript(scriptRequest)
    if (!newScript) {
      setStatus({
        ...status,
        state: "failed",
        message:
          "There was an issue with generating your script. Please try again.",
      })
      return
    }
    setStatus({ ...status, state: "success" })
    setScripts([...scripts, newScript])
    setScriptRequest({...scriptRequest, name: '', instruction: ''})
    onSubmit?.()
  }

  return (
    <div className="container mx-auto mt-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Script Name"
            name="name"
            value={scriptRequest.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="instruction"
          >
            Instruction
          </label>
          <textarea
            className="h-[200px] shadow resize-none appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="instruction"
            placeholder={scriptSuggestion.current}
            name="instruction"
            value={scriptRequest.instruction}
            onChange={handleChange}
          />
        </div>
        <div
          className={`text-xs flex justify-center mb-4 ${getStatusColor(
            status.state
          )}`}
        >
          {status.message}
        </div>
        <div className="flex items-center justify-end">
          <button
            className={`font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline 
                ${
                  isButtonDisabled
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-700 text-white"
                }`}
            type="submit"
            disabled={isButtonDisabled}
          >
            Generate
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddScript
