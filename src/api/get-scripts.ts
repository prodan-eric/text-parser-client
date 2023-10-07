import axios from "axios"
import { ClientScript, ParseFunction, Script } from "../types"

const getScripts = async (userId: string): Promise<ClientScript[]> => {
  const url = `${import.meta.env.VITE_BASE_URL}/script/${userId}`
  let scripts: Script[] | null = null
  try {
    const res = await axios.get(url)
    scripts = res.data
  } catch (error) {
    console.error("Error:", error)
  }
  const clientScripts = scripts?.map((script) => {
    const parse = new Function(script.fn)() as ParseFunction
    return { ...script, parse } as ClientScript
  })
  return clientScripts || []
}

export default getScripts
