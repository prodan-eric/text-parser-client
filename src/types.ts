export type Script = {
  userId: string
  id: string
  instruction: string
  name: string
  fn: string
}
export type ParseFunction = (text: string) => string

export interface ClientScript extends Script {
  parse: ParseFunction
}

export interface ScriptRequest {
  userId: string | null
  name: string
  instruction: string
}
