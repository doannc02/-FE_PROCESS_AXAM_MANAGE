import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import defaultValue from '../defaultValue'
import { ButtonConfig } from '../type'

const buttonConfigSlice = createSlice({
  name: 'buttonConfig',
  initialState: defaultValue.buttonDefaultConfig,
  reducers: {
    setButtonConfig(state, action: PayloadAction<ButtonConfig>) {
      const { submitButton, draftButton, rejectButton, resetButton } =
        action.payload

      state.submitButton.textColor = submitButton.textColor
      state.submitButton.hoverTextColor = submitButton.hoverTextColor
      state.submitButton.backgroundColor = submitButton.backgroundColor
      state.submitButton.backgroundHoverColor =
        submitButton.backgroundHoverColor
      state.submitButton.borderColor = submitButton.borderColor
      state.submitButton.borderHoverColor = submitButton.borderHoverColor

      state.draftButton.textColor = draftButton.textColor
      state.draftButton.hoverTextColor = draftButton.hoverTextColor
      state.draftButton.backgroundColor = draftButton.backgroundColor
      state.draftButton.backgroundHoverColor = draftButton.backgroundHoverColor
      state.draftButton.borderColor = draftButton.borderColor
      state.draftButton.borderHoverColor = draftButton.borderHoverColor

      state.rejectButton.textColor = rejectButton.textColor
      state.rejectButton.hoverTextColor = rejectButton.hoverTextColor
      state.rejectButton.backgroundColor = rejectButton.backgroundColor
      state.rejectButton.backgroundHoverColor =
        rejectButton.backgroundHoverColor
      state.rejectButton.borderColor = rejectButton.borderColor
      state.rejectButton.borderHoverColor = rejectButton.borderHoverColor

      state.resetButton.textColor = resetButton.textColor
      state.resetButton.hoverTextColor = resetButton.hoverTextColor
      state.resetButton.backgroundColor = resetButton.backgroundColor
      state.resetButton.backgroundHoverColor = resetButton.backgroundHoverColor
      state.resetButton.borderColor = resetButton.borderColor
      state.resetButton.borderHoverColor = resetButton.borderHoverColor
    },
  },
})

const { actions, reducer } = buttonConfigSlice
export const { setButtonConfig } = actions
export default reducer
