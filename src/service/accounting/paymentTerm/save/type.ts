export type RequestBody = {
  SAVE: {
    id?: number | null
    name: string
    type: 'PURCHASE' | 'SALE'
    hasEarlyDiscount: boolean
    discountAmount: number
    discountComputeType: string
    withinDays: number
    description: string
    lines: {
      id: number | null
      amountDue: number
      computeType: string
      afterDays: number
      anchorDate: string
    }[]
    deleteLineIds?: any
  }
}
