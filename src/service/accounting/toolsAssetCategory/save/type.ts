type SaveAssetCategory = {
  code: string
  name: string
  parent?: {
    id: number
    code: string
    name: string
  }
  originalAccount: {
    id: number
    code: string
    name: string
  }
  depreciationAccount: {
    id: number
    code: string
    name: string
  }
  type: 'TOOLS' | 'ASSET'
  accountLedger: {
    id: number | null
    code: string | null
    name: string | null
  }
  description: string
  isActive: boolean
  accountLedgerId: number | null
}
export type RequestBody = {
  SAVE: SaveAssetCategory
}
