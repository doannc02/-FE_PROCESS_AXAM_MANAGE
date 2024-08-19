export type Request = {
  POST: {
    orderId: number
    receiver?: string
    content?: string
    title?: string
  }
}
