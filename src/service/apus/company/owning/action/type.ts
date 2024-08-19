export type RequestBodySaveCompany = {
  name: string
  domain: string
  industry: string
  sizing: string
  country: {
    id: number
    name: string
  }
  countryId: number
  platformExperience: string
}
