import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../auth/Auth"
import Navbar from "./Navbar"
import TextPanel from "./UI/TextPanel"
import Dialog from "./Dialog"
import AddScript from "./Script/AddScript"
import { ClientScript } from "../types"
import ScriptList from "./Script/ScriptList"
import useScripts from "../hooks/useScripts"
import Footer from "./Footer"

export interface Status {
  state: "pending" | "failed" | "success" | "default"
  message: string
}

const Home = () => {
  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const [scripts, setScripts] = useScripts(currentUser?.uid)
  const [dialogState, setDialogState] = useState(false)
  const [initialText, setInitialText] = useState("")
  const [processedText, setProcessedText] = useState("")
  const [activeScript, setActiveScript] = useState<ClientScript | undefined>()
  const [status, setStatus] = useState<Status>({
    state: "default",
    message: "",
  })

  const handleInitialPanelChange = (newText: string) => {
    setInitialText(newText)
    if (activeScript?.parse) {
      const newProcessedText = activeScript.parse(newText)
      setProcessedText(newProcessedText)
    }
  }
  const clearText = () => {
    setInitialText('')
    setProcessedText('')
  }
  
  useEffect(() => {
    if (!currentUser) {
      navigate("/login")
    }
  }, [currentUser, navigate])

  useEffect(() => {
    setInitialText("")
    setProcessedText("")
  }, [activeScript])
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 ">
        <div className="container mx-auto py-8 flex flex-col lg:flex-row">
          <div className="lg:w-1/4 lg:min-h-[500px] bg-white shadow p-4 rounded-lg">
            <div className="flex justify-center items-center">
              <button
                className="p-3 my-4 bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-300 hover:to-blue-400 text-white rounded transition duration-300"
                onClick={() => setDialogState(true)}
              >
                New Script
              </button>
            </div>
            <ScriptList
              scripts={scripts}
              setScripts={setScripts}
              activeScript={activeScript}
              setActiveScript={setActiveScript}
            />
          </div>

          <div className="lg:w-3/4 mx-4 rounded-lg bg-white shadow p-4 mt-4 lg:mt-0 flex flex-col lg:flex-row lg:justify-evenly">
            {activeScript ? (
              <>
                {" "}
                <TextPanel
                  icon="remove"
                  value={initialText}
                  onChange={handleInitialPanelChange}
                  placeholder="Your input text..."
                  clearText={clearText}
                />
                <TextPanel
                  icon="copy"
                  value={processedText}
                  onChange={(newText) => setProcessedText(newText)}
                  placeholder="Your output text..."
                />{" "}
              </>
            ) : (
              <div className=" w-3/4 mx-4 p-6 rounded-lg flex items-center justify-center text-center bg-white">
                <p className=" text-gray-500 select-none">
                  Select a script to parse your text with...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Dialog
        title="Add a new script"
        isOpen={dialogState}
        onClose={() => setDialogState(false)}
        isLoading={status.state === "pending"}
        loadingMessage="Generating your script"
      >
        <AddScript
          status={status}
          setStatus={setStatus}
          scripts={scripts}
          setScripts={setScripts}
          onSubmit={() => {
            setDialogState(false)
          }}
        />
      </Dialog>
      <Footer />
    </>
  )
}

export default Home
