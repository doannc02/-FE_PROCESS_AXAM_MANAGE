export type Response = {
  GET: [
    {
      id: number
      firstName: string
      lastName: string
      email: string
      phoneNumber: string
      username: string
      imageUrl: string
      lang: string
      countryCode: string
      birthday: string
      timeZone: string
      sex: string
      tenantCode: string
      isActivated: boolean
      roles: [
        {
          id: number
          name: string
          alias: string
          productId: number
          description: string
          numberOfUsers: number
          isDefault: boolean
          isActivated: boolean
          level: number
        }
      ]
      products: [
        {
          id: number
          name: string
          alias: string
          imageUrl: string
          description: string
          isActivated: boolean
        }
      ]
    }
  ]
}

export type Request = {
  GET: {
    roleId: number | null
  }
}
