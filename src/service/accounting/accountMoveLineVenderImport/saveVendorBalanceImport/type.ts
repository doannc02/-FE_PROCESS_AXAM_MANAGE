import { BaseResponse } from "@/service/type"

type DeclareImport = {
    successRecording: number,
    totalRecording: number,
    urlResult: string
}

export type Response = {
  SAVE: DeclareImport
}
