export type RequestBody = {
  SAVE: {
    id?: number | null
    name: string
    startDate: string
    endDate: string
    activated: boolean
  }
}
