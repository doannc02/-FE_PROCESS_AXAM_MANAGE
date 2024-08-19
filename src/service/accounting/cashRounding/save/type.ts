export type RequestBody = {
  SAVE: {
    id?: number | null
    name: string
    roundingPrecision: number
    roundingStrategy: string
    profitAccountId: number | null
    lossAccountId: number | null
    roundingMethod: string
    description: string
    activated: boolean
  }
}
