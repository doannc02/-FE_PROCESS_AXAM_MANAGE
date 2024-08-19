export type RequestParams = {
  DELETE: {
    id: number
  }
}

export type RequestBody = {
  BULK_DELETE: {
    deletedUserIds: Number[]
    reason: string
    deletedType: string
    companyId?: number | null
    branchId?: number | null
    reasonDelete?: string | null
  }
}
