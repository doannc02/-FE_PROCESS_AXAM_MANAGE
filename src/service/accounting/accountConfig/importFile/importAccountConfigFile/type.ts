export interface RequestBody {
  POST: any
}

export interface ResponseBody {
  POST: {
    successRecording: number
    totalRecording: number
    urlResult: string
  }
}
