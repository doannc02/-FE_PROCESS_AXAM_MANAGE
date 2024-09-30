import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import defaultValue from '../defaultValue'
import { CurrentBranch } from '../type'

const userConfigSlice = createSlice({
  name: 'userConfig',
  initialState: defaultValue.branchDefault,
  reducers: {
    setBranchConfig(state, action: PayloadAction<CurrentBranch>) {
      state.id = action.payload.id
      state.name = action.payload.name
      state.type = action.payload.type
    },
  },
})

const { actions, reducer } = userConfigSlice
export const { setBranchConfig } = actions
export default reducer
