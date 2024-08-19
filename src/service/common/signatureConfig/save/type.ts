export type Item = {
  id: number | null
  printedCoupons: string
  signatures: string[]
}

export type RequestBody = {
  SAVE: Item[]
}
