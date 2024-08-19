import {
  FormControlLabel,
  Radio,
  RadioGroup,
  RadioGroupProps,
  styled,
} from '@mui/material'
import { ReactNode, forwardRef } from 'react'

type Option = {
  value: string | number | boolean
  label: ReactNode
}

type RadioCustomProps = {
  options: Option[]
  defaultValue?: string | number
  type: 'primary' | 'secondary'
  disabled?: boolean
  readOnly?: boolean
} & RadioGroupProps

const RadioGroupCommon = styled(RadioGroup)(({ type }: { type: string }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '30px',
  justifyContent: 'center',
  cursor: 'pointer',
  [type === 'primary' ? '.active-radio' : '']: {
    padding: '0 14px',
    border: '1px solid #213660',
    boxShadow: '0px 2px 5px rgba(113, 113, 113, 0.25)',
    borderRadius: '4px',
  },
}))

export const RadioGroupCustom = forwardRef<HTMLDivElement, RadioCustomProps>(
  function RadioCustom(
    {
      value,
      options,
      defaultValue,
      type,
      disabled = false,
      readOnly = false,
      ...props
    },
    ref
  ) {
    return (
      <RadioGroupCommon type={type} {...props} ref={ref}>
        {options.map((option, index) => (
          <div
            key={index}
            className={option.value === value ? 'active-radio' : ''}
          >
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
              checked={option.value == value}
              defaultValue={defaultValue}
            />
          </div>
        ))}
      </RadioGroupCommon>
    )
  }
)
