export type bankBranchesDTO = {
  id?: number
  code?: string
  name?: string
}

export type RequestParam = {
  PUT: {
    id: number
  }
}

export type RequestBody = {
  PUT: {
    id?: number
    isPartner?: boolean
    data: {
      bankId: number
      bankBranchId: number | null
      accountNumber: string
      accountHolder: string
    }
  }
}
