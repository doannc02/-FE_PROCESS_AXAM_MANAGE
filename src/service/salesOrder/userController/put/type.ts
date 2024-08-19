export type Request = {
  PUT: {
    userId: number | null
    attachIds?: Array<number>
    detachIds?: any
  }
}

export type Response = {
  PUT: any
}
