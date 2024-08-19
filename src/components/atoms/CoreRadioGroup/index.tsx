import {
  FormControlLabel,
  Radio,
  RadioGroup,
  RadioGroupProps,
  styled,
} from '@mui/material'
import { ReactNode, forwardRef } from 'react'
import { Controller } from 'react-hook-form'

type Option = {
  value: string | number | boolean
  label: ReactNode
}

type CoreRadioGroupProps = {
  name: string
  control: any
  options: Option[]
  defaultValue?: string | number
  disabled?: boolean
  readOnly?: boolean
  onChangeValue?: (val: any) => void
} & RadioGroupProps

const RadioGroupCommon = styled(RadioGroup)(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '30px',
  justifyContent: 'center',
  cursor: 'pointer',
}))

const CoreRadioGroup = forwardRef<HTMLDivElement, CoreRadioGroupProps>(
  function RadioCustom({
    control,
    name,
    value,
    options,
    defaultValue,
    disabled = false,
    readOnly = false,
    onChangeValue,
    ...props
  }) {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, ...rest } }) => (
          <RadioGroupCommon {...props} onChange={(e) => {
            onChange(e.target.value)
            if (onChangeValue) {
              onChangeValue(e.target.value)
            }

          }} {...rest}>
            {options.map((option, index) => (
              <FormControlLabel
                key={index}
                value={option.value}
                control={
                  <Radio
                    inputProps={{
                      disabled: disabled || readOnly,
                      readOnly,
                    }}
                  />
                }
                label={option.label}
              />
            ))}

          </RadioGroupCommon>
        )}
      />
    )
  }
)

export default CoreRadioGroup
