export type RequestBody = {
  SAVE: {
    id: number | null
    code: string
    name: string
    accountType: {
      id: number
      name: string
      code: string
    }
    isAllowedReconcile: boolean
  }
}
