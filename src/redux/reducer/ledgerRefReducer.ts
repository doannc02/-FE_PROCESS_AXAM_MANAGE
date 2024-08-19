import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import defaultValue from '../defaultValue'
import { CurrentLedgerRef } from '../type'

const ledgerRefConfigSlice = createSlice({
  name: 'ledgerRefDefault',
  initialState: defaultValue.ledgerRefDefault,
  reducers: {
    setLedgerRefConfig(state, action: PayloadAction<CurrentLedgerRef>) {
      state.id = action.payload.id
      state.name = action.payload.name
      state.code = action.payload.code
    },
  },
})

const { actions, reducer } = ledgerRefConfigSlice
export const { setLedgerRefConfig } = actions
export default reducer
