import {
  FormHelperText,
  OutlinedTextFieldProps,
  TextField,
} from '@mui/material'
import { useRouter } from 'next/router'
import React, { ReactNode } from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import NumberFormatCustom from './NumberFormatCustom'

interface Props
  extends Omit<OutlinedTextFieldProps, 'variant' | 'label' | 'placeholder'> {
  className?: string
  control: any
  name: string
  label?: ReactNode
  placeholder?: string | null
  InputLabelProps?: any
  inputProps?: any
  InputProps?: any
  required?: boolean
  readOnly?: boolean
  type?: string
  multiline?: boolean
  minRows?: number
  disabled?: boolean
  hidden?: boolean
  helperText?: any
  rules?: any
  variant?: 'outlined' | 'filled' | 'standard'
  disableDecimal?: boolean
  disableNegative?: boolean
  onKeyPress?: any
  decimalScale?: number
  isHasMessageError?: boolean
  onAfterChangeValue?: any
  isViewProp?: boolean
  onChangeValue?: (val: any) => void
}

const CoreInput = (props: Props) => {
  const {
    className,
    control,
    name,
    label,
    placeholder,
    InputLabelProps,
    inputProps,
    InputProps,
    required,
    readOnly,
    type,
    multiline,
    minRows = 5,
    hidden,
    helperText,
    disabled,
    rules,
    variant = 'standard',
    onBlur: onBlurAction,
    disableDecimal,
    disableNegative,
    onAfterChangeValue,
    decimalScale,
    isHasMessageError = true,
    isViewProp,
    onChangeValue,
    ...restProps
  } = props

  const { t } = useTranslation('common')

  const router = useRouter()
  const { actionType } = router.query
  const isView = isViewProp !== undefined ? isViewProp : actionType === 'VIEW'

  let transform: any
  if (type === 'number') {
    transform = {
      input: (value: any) => value,
      output: (e: any) => {
        const output = e.target.value
        if (output === 0) return 0
        if (output === '' || output === null || output === undefined)
          return null
        else return Number.isNaN(output) ? null : Number(output)
      },
    }
  }

  return (
    <div className={className}>
      <Controller
        control={control}
        name={name}
        render={({
          field: { onChange, onBlur, value, ref },
          fieldState: { error },
        }) => (
          <>
            <TextField
              fullWidth
              type={type === 'number' ? 'text' : type}
              label={label}
              placeholder={
                !isView
                  ? placeholder ||
                    t('form.input.placeholder', {
                      label: String(label)?.toLowerCase(),
                    }) ||
                    ''
                  : ''
              }
              variant={variant}
              onChange={(e) => {
                onChange(transform ? transform?.output(e) : e)
                if (onChangeValue) {
                  onChangeValue(e.target.value)
                }
                if (onAfterChangeValue) onAfterChangeValue()
              }}
              onBlur={(e) => {
                onBlur()
                onBlurAction && onBlurAction(e)
              }}
              value={transform ? transform?.input(value) : value}
              inputRef={ref}
              multiline={multiline}
              minRows={minRows}
              disabled={disabled}
              error={!!error}
              helperText={error && isHasMessageError && error.message}
              InputLabelProps={{
                shrink: placeholder ? true : undefined,
                required,
                ...InputLabelProps,
              }}
              inputProps={{
                readOnly: isView || readOnly,
                disabledecimal: disableDecimal,
                disablenegative: disableNegative,
                decimalscale: decimalScale,
                ...inputProps,
              }}
              InputProps={{
                disableUnderline: isView ? true : false,
                ...InputProps,
                ...(type === 'number' && {
                  inputComponent: NumberFormatCustom,
                }),
              }}
              {...restProps}
            />
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
          </>
        )}
        rules={!isView ? rules : {}}
      />
    </div>
  )
}

export default React.memo(CoreInput)
