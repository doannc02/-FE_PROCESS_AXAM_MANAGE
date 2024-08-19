export type RequestBodyInviteCompany = {
  branchId: number
  phone: string
  email: string
  sendType: 'PHONE_NUMBER' | 'EMAIL'
  roleIds: number[]
  roles: {
    id: number
    name: string
  }[]
}
