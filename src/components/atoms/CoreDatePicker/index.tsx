import { FormHelperText, TextField } from '@mui/material'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import moment, { Moment } from 'moment'
import { useRouter } from 'next/router'
import * as React from 'react'
import { Control, Controller } from 'react-hook-form'

export type CoreDatePickerProps = {
  locale?: string
  className?: string
  disabled?: boolean
  readOnly?: boolean
  disableFuture?: boolean
  acceptRegex?: any
  closeOnSelect?: boolean
  disableHighlightToday?: boolean
  disableMaskedInput?: boolean
  disableOpenPicker?: boolean
  disablePast?: boolean
  inputFormat?: string
  shouldDisableDate?: any
  shouldDisableMonth?: any
  shouldDisableYear?: any
  title?: React.ReactNode
  placeholder?: string
  value?: any
  error?: boolean
  helperText?: string
  control: Control<any>
  name: string
  format?: string
  rules?: object
  required?: boolean
  trigger?: any
  minDate?: any
  maxDate?: any
  variant?: 'outlined' | 'filled' | 'standard'
  isViewProp?: boolean
  views?: any
  isHasMessageError?: boolean
  onChange?: (value: any) => void
}

export const CoreDatePicker = (props: CoreDatePickerProps) => {
  const router = useRouter()
  const { actionType } = router.query

  const {
    className,
    locale = 'en-US',
    value,
    title,
    placeholder = 'dd/mm/yyyy',
    inputFormat = 'DD/MM/YYYY',
    error,
    control,
    name,
    format,
    helperText,
    rules,
    required,
    trigger,
    readOnly,
    variant = 'standard',
    isViewProp,
    isHasMessageError = true,
    onChange,
    views,
    ...rest
  } = props

  const isView = isViewProp !== undefined ? isViewProp : actionType === 'VIEW'

  return (
    <div className={className}>
      <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={locale}>
        <Controller
          control={control}
          name={name}
          render={({
            field: { onChange, value, ref },
            fieldState: { error },
          }) => (
            <DatePicker
              disableOpenPicker={isView ? true : false}
              label={title}
              value={value ? (format ? moment(value, format) : value) : null}
              onChange={(newValue: Moment | null) => {
                if (newValue) {
                  if (format) {
                    onChange(newValue.format(format))
                  } else {
                    onChange(newValue.isValid() ? newValue.format() : newValue)
                  }
                } else {
                  onChange(null)
                }
                trigger && trigger()
              }}
              inputRef={ref}
              readOnly={isView || readOnly}
              inputFormat={inputFormat}
              {...rest}
              renderInput={(params: any) => (
                <>
                  <TextField
                    {...params}
                    fullWidth
                    variant={variant}
                    onBlur={(e) => {
                      const value = e.target.value

                      if (value) {
                        const date = moment(value, inputFormat)

                        if (date.isValid()) {
                        } else {
                          onChange(null)
                        }
                      }
                    }}
                    required={required}
                    error={!!error}
                    helperText={error && isHasMessageError && error.message}
                    value={
                      value
                        ? format && moment(value, format).isValid()
                          ? moment(value, format)
                          : value
                        : null
                    }
                    inputProps={{
                      ...params.inputProps,
                      readOnly: isView || readOnly,
                      placeholder: isView ? '' : placeholder,
                    }}
                    InputProps={{
                      disableUnderline: isView ? true : false,
                      ...params.InputProps,
                      required: false,
                    }}
                  />
                  {helperText && <FormHelperText>{helperText}</FormHelperText>}
                </>
              )}
              views={views}
            />
          )}
          rules={!isView ? rules : {}}
        />
      </LocalizationProvider>
    </div>
  )
}
