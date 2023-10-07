import axios from "axios"
import { ClientScript, ScriptRequest } from "../types"

const postScript = async (scriptRequest: ScriptRequest) => {
  const url = `${import.meta.env.VITE_BASE_URL}/script`
  let newClientScript: ClientScript | null = null
  try {
    const data = (await axios.post(url, scriptRequest)).data
    const parse = new Function(data.fn)()
    newClientScript = { ...data, parse }
  } catch (error) {
    console.error("Error:", error)
  }
  return newClientScript
}

export default postScript
