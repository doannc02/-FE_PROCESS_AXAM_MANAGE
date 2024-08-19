import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import defaultValue from '../defaultValue'

const tableSlice = createSlice({
  name: 'tableConfig',
  initialState: defaultValue.tableConfig,
  reducers: {
    addOneTableConfig(
      state,
      action: PayloadAction<{ tableName: string; columns: string[] }>
    ) {
      let chosenIds = state.slice()
      chosenIds = chosenIds.filter(
        (id) => id.tableName !== action.payload.tableName
      )
      chosenIds.push(action.payload)
      return [...chosenIds]
    },
  },
})

const { actions, reducer } = tableSlice
export const { addOneTableConfig } = actions
export default reducer
