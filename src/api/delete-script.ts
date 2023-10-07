import axios from "axios"

const deleteScript = async (scriptId: string) => {
  const url = `${import.meta.env.VITE_BASE_URL}/script/${scriptId}`
  let message
  try {
    message = await axios.delete(url)
  } catch (error) {
    console.error("Error:", error)
  }
  return message
}

export default deleteScript
