import { Dispatch, SetStateAction } from "react"
import { ClientScript, Script } from "../../types"
import { RiDeleteBin6Line } from "react-icons/ri"
import { Tooltip } from "react-tooltip"
import deleteScript from "../../api/delete-script"

interface ScriptListProps {
  scripts: ClientScript[]
  setScripts: Dispatch<SetStateAction<ClientScript[]>>
  setActiveScript: Dispatch<SetStateAction<ClientScript | undefined>>
  activeScript?: ClientScript
}

const ScriptList = ({
  scripts,
  setScripts,
  setActiveScript,
  activeScript,
}: ScriptListProps) => {
  const handleDeleteScript = async (script: Script) => {
    await deleteScript(script.id)
    const newScripts = scripts.filter((s) => s.id !== script.id)
    setScripts(newScripts)
    setActiveScript(undefined)
  }

  const handleItemClick = (script: ClientScript) => {
    if (activeScript?.id === script.id) {
      setActiveScript(undefined)
    } else setActiveScript(script)
  }

  return scripts.length > 0 ? (
    <ul className="space-y-2">
      {scripts.map((script, index) => (
        <li
          key={index}
          className={`p-4 flex justify-between items-center cursor-pointer rounded shadow-sm transform transition duration-200 hover:scale-101 ${
            activeScript?.id === script.id ? "bg-blue-50" : "hover:bg-gray-100"
          }`}
          onClick={() => handleItemClick(script)}
        >
          <Tooltip
            id={script.id}
            place="bottom"
            classNameArrow="hidden"
            className="max-w-[150px]"
          />
          <div
            data-tooltip-id={script.id}
            data-tooltip-content={script.instruction}
            className="flex-1 overflow-hidden whitespace-nowrap max-w-[80%] text-ellipsis"
          >
            {script.name}
          </div>
          <RiDeleteBin6Line
            className="text-gray-400 hover:text-red-500 flex-shrink-0 transition duration-300"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation()
              handleDeleteScript(script)
            }}
          />
        </li>
      ))}
    </ul>
  ) : (
    <div className="p-6 rounded-lg flex items-center justify-center text-center bg-gray-100 shadow-inner">
      <p className="text-gray-500 select-none font-medium">No scripts yet</p>
    </div>
  )
}

export default ScriptList
