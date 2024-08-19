export type RequestParams = {
  GET: {
    page?: number
    size: number
    accountLedgerId: number | null
    start: string
    date: string
  }
}
