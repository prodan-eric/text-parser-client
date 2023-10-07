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
    <ul>
      {scripts.map((script, index) => (
        <li
          key={index}
          className={`p-4 flex justify-between items-center cursor-pointer ${
            activeScript?.id === script.id
              ? "bg-gray-100 rounded"
              : "hover:bg-gray-100 rounded"
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
          >
            {script.name}
          </div>
          <RiDeleteBin6Line
            className="hover:text-red-500"
            onClick={() => handleDeleteScript(script)}
          />
        </li>
      ))}
    </ul>
  ) : (
    <div className=" p-6 rounded-lg flex items-center justify-center text-center bg-white">
      <p className=" text-gray-500 select-none">No scripts yet</p>
    </div>
  )
}

export default ScriptList
