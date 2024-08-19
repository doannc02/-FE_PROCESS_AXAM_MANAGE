import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import defaultValue from '../defaultValue'
import { ThemeColorConfig } from '../type'

const themeColorSlice = createSlice({
  name: 'themeColorConfig',
  initialState: defaultValue.themeColorDefaultConfig,
  reducers: {
    setThemeColor(state, action: PayloadAction<ThemeColorConfig>) {
      state.theme = action.payload.theme
      state.firstMainColor = action.payload.firstMainColor
      state.secondMainColor = action.payload.secondMainColor
      state.thirdMainColor = action.payload.thirdMainColor
      state.fourthMainColor = action.payload.fourthMainColor
      state.successColor = action.payload.successColor
      state.errorColor = action.payload.errorColor
      state.warningColor = action.payload.warningColor
    },
  },
})

const { actions, reducer } = themeColorSlice
export const { setThemeColor } = actions
export default reducer
