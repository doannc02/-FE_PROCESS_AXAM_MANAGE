export type bankBranchesDTO = {
  id?: number
  code?: string
  name?: string
}

export type RequestBody = {
  POST: {
    code?: string
    name: string
    description?: string
    activated?: boolean
    bankBranches?: Array<bankBranchesDTO>
    deleteBankBranches?: number[]
  }
}
