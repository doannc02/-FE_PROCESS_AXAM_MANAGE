import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import defaultValue from '../defaultValue'
import { CompanyConfig } from '../type'

const companyConfigSlice = createSlice({
  name: 'companyConfig',
  initialState: defaultValue.companyConfig,
  reducers: {
    setCompanyConfig(state, action: PayloadAction<CompanyConfig>) {
      state.id = action.payload.id
      state.code = action.payload.code
      state.name = action.payload.name
      state.countryId = action.payload.countryId
      state.country = action.payload.country
      state.languageId = action.payload.languageId
      state.language = action.payload.language
      state.languageCode = action.payload.languageCode
      state.timezone = action.payload.timezone
      state.activated = action.payload.activated
      state.domain = action.payload.domain
      state.parentId = action.payload.parentId
      state.parent = action.payload.parent
      state.description = action.payload.description
      state.currencyId = action.payload.currencyId
      state.currency = action.payload.currency
      state.symbol = action.payload.symbol
      state.position = action.payload.position
      state.thousandSeparator = action.payload.thousandSeparator
      state.decimalSeparator = action.payload.decimalSeparator
      state.floatRounding = action.payload.floatRounding
      state.logo = action.payload.logo
      state.phone = action.payload.phone
      state.email = action.payload.email
      state.taxCode = action.payload.taxCode
      state.address = action.payload.address
      state.username = action.payload.username
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
    },
  },
})

const { actions, reducer } = companyConfigSlice
export const { setCompanyConfig } = actions
export default reducer
