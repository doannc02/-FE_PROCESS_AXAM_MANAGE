import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import defaultValue from '../defaultValue'
import { FontConfig } from '../type'

const fontConfigSlice = createSlice({
  name: 'fontConfig',
  initialState: defaultValue.fontDefaultConfig,
  reducers: {
    setFontConfig(state, action: PayloadAction<FontConfig>) {
      state.typeFont = action.payload.typeFont

      state.h1Color = action.payload.h1Color
      state.h1Font = action.payload.h1Font
      state.h1Size = action.payload.h1Size

      state.h2Color = action.payload.h2Color
      state.h2Font = action.payload.h2Font
      state.h2Size = action.payload.h2Size

      state.h3Color = action.payload.h3Color
      state.h3Font = action.payload.h3Font
      state.h3Size = action.payload.h3Size

      state.h4Color = action.payload.h4Color
      state.h4Font = action.payload.h4Font
      state.h4Size = action.payload.h4Size

      state.h5Color = action.payload.h5Color
      state.h5Font = action.payload.h5Font
      state.h5Size = action.payload.h5Size

      state.h6Color = action.payload.h6Color
      state.h6Font = action.payload.h6Font
      state.h6Size = action.payload.h6Size

      state.subtitle1Color = action.payload.subtitle1Color
      state.subtitle1Font = action.payload.subtitle1Font
      state.subtitle1Size = action.payload.subtitle1Size

      state.subtitle2Color = action.payload.subtitle2Color
      state.subtitle2Font = action.payload.subtitle2Font
      state.subtitle2Size = action.payload.subtitle2Size

      state.body1Color = action.payload.body1Color
      state.body1Font = action.payload.body1Font
      state.body1Size = action.payload.body1Size

      state.body2Color = action.payload.body2Color
      state.body2Font = action.payload.body2Font
      state.body2Size = action.payload.body2Size

      state.captionColor = action.payload.captionColor
      state.captionFont = action.payload.captionFont
      state.captionSize = action.payload.captionSize
    },
  },
})

const { actions, reducer } = fontConfigSlice
export const { setFontConfig } = actions
export default reducer
