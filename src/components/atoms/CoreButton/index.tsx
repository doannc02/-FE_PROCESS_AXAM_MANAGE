import { useAppSelector } from '@/redux/hook'
import { LoadingButton, LoadingButtonProps } from '@mui/lab'
import _ from 'lodash'
import { forwardRef } from 'react'

type Props = {
  fontSize?: number
  fontWeight?: number
  textTransform?: string
  height?: number
  width?: number
  theme?: 'submit' | 'cancel' | 'reset' | 'draft' | 'add'
} & LoadingButtonProps

export const CoreButton = forwardRef<HTMLButtonElement, Props>(
  function ButtonBase(
    {
      height = 32,
      width = 60,
      fontSize = 12,
      fontWeight = 400,
      textTransform = 'none',
      theme = 'submit',
      sx,
      variant,
      ...props
    },
    ref
  ) {
    const buttonConfig = useAppSelector((state) => state.buttonData)

    const { submitButton, rejectButton, resetButton, draftButton } =
      buttonConfig

    const color = () => {
      if (theme === 'submit') return submitButton.textColor
      else if (theme === 'draft') return draftButton.textColor
      else if (theme === 'cancel') return rejectButton.textColor
      else if (theme === 'reset') return resetButton.textColor
      else if (theme === 'add') return '#1D4FA3'
    }

    const hoverColor = () => {
      if (theme === 'submit') return submitButton.hoverTextColor
      else if (theme === 'draft') return draftButton.hoverTextColor
      else if (theme === 'cancel') return rejectButton.hoverTextColor
      else if (theme === 'reset') return resetButton.hoverTextColor
      else if (theme === 'add') return '#1D4FA3'
    }

    const backgroundColor = () => {
      if (theme === 'submit') return submitButton.backgroundColor
      else if (theme === 'draft') return draftButton.backgroundColor
      else if (theme === 'cancel') return rejectButton.backgroundColor
      else if (theme === 'reset') return resetButton.backgroundColor
      else if (theme === 'add') return '#fff'
    }

    const backgroundHoverColor = () => {
      if (theme === 'submit') return submitButton.backgroundHoverColor
      else if (theme === 'draft') return draftButton.backgroundHoverColor
      else if (theme === 'cancel') return rejectButton.backgroundHoverColor
      else if (theme === 'reset') return resetButton.backgroundHoverColor
      else if (theme === 'add') return '#fff'
    }

    const borderColor = () => {
      if (theme === 'submit') return submitButton.borderColor
      else if (theme === 'draft') return draftButton.borderColor
      else if (theme === 'cancel') return rejectButton.borderColor
      else if (theme === 'reset') return resetButton.borderColor
      else if (theme === 'add') return '#1D4FA3'
    }

    const borderHoverColor = () => {
      if (theme === 'submit') return submitButton.borderHoverColor
      else if (theme === 'draft') return draftButton.borderHoverColor
      else if (theme === 'cancel') return rejectButton.borderHoverColor
      else if (theme === 'reset') return '#1D4FA3'
    }

    return (
      <LoadingButton
        ref={ref}
        variant={variant}
        style={{
          borderRadius: '4px',
        }}
        sx={_.merge(
          {
            ...{
              borderRadius: '4px',
              transition: 'all 0.2s linear',
              lineHeight: '20px',
              backgroundColor: backgroundColor(),
              color: color(),
              border: `1px solid ${borderColor()}`,
              '&:hover': {
                color: hoverColor(),
                backgroundColor: backgroundHoverColor(),
                border: `1px solid ${borderHoverColor()}`,
              },
              '&:disabled': {
                opacity: 0.7,
                cursor: 'not-allowed',
              },
              fontWeight,
              fontSize,
              minWidth: width,
              height,
              textTransform,
            },
          },
          sx
        )}
        {...props}
      />
    )
  }
)
