export type bankBranchesDTO = {
  id?: number
  code?: string
  name?: string
}

export type RequestBody = {
  GET: {
    bankId: number
  }
  PUT: {
    id?: number
    code?: string
    name: string
    description?: string
    activated?: boolean
    bankBranches?: Array<bankBranchesDTO>
    deleteBankBranches?: Array<number>
  }
}

export type Response = {
  PUT: any
  GET: {
    code?: string
    name: string
    description?: string
    activated?: boolean
    bankBranches?: Array<bankBranchesDTO>
  }
}
