import { GRAY_SCALE, GREY } from '@/helper/colors'
import { errorMsg } from '@/helper/message'
import { BaseResponse } from '@/service/type'
import CloseIcon from '@mui/icons-material/Close'
import {
  Autocomplete,
  AutocompleteProps,
  Chip,
  CircularProgress,
  FormHelperText,
  TextField,
  Typography,
} from '@mui/material'
import { get } from 'lodash'
import { useTranslation } from 'next-i18next'
import { useCallback, useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'

export interface FormControlAutoCompleteProps<
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
> extends Omit<
    AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>,
    'renderInput' | 'options'
  > {
  control: any
  name: string
  label: string
  placeholder: string
  rules?: any
  disabled?: boolean
  readOnly?: boolean
  labelPath?: string
  valuePath?: string
  isHasMessageError?: boolean
  helperText?: string
  required?: boolean
  params?: any
  InputProps?: any
  fetchDataFn: (val: any) => Promise<BaseResponse<any>>
  onChangeValue?: (val: any) => void
  onAfterChangeValue?: () => void
}

const UomAutocomplete: <
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
>(
  prop: FormControlAutoCompleteProps<T, Multiple, DisableClearable, FreeSolo>
) => React.ReactElement<
  FormControlAutoCompleteProps<T, Multiple, DisableClearable, FreeSolo>
> = (props) => {
  const { t } = useTranslation()

  const {
    control,
    name,
    multiple,
    placeholder,
    rules,
    label,
    disabled,
    readOnly,
    labelPath = 'name',
    valuePath = 'id',
    isHasMessageError = true,
    helperText,
    InputProps,
    required,
    params,
    fetchDataFn,
    onChangeValue,
    onAfterChangeValue,
    ...restProps
  } = props

  const [isClick, setIsClick] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<any>([])

  const handleFetchData = useCallback(async () => {
    try {
      setIsLoading(true)

      const data = await fetchDataFn({
        ...(params ? params : {}),
      })

      if (data && Array.isArray(data?.data?.uomGroup?.unitGroupLine)) {
        setData(() => [
          ...data.data.uomGroup.unitGroupLine.map((item: any) => ({
            [labelPath]: item.unitName,
            [valuePath]: item.unitId,
          })),
        ])
      }

      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      errorMsg(error)
    }
  }, [fetchDataFn, labelPath, params, valuePath])

  useEffect(() => {
    try {
      if (isClick) handleFetchData()
    } catch (error) {
      errorMsg(error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClick])

  return (
    <div
      onClick={() => {
        if (!readOnly && !disabled) setIsClick(true)
      }}
    >
      <Controller
        control={control}
        name={name}
        render={({
          field: { onChange, onBlur, value, ref },
          fieldState: { error },
        }) => {
          return (
            <Autocomplete
              multiple={multiple}
              value={value ?? null}
              options={data}
              disabled={disabled}
              readOnly={readOnly}
              loading={isLoading}
              noOptionsText={t('form.autocomplete.no_options')}
              onBlur={onBlur}
              onChange={(_, value: any) => {
                onChange(value)
                if (onChangeValue) onChangeValue(value)
                if (onAfterChangeValue) onAfterChangeValue()
              }}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant='outlined'
                    style={{
                      borderRadius: 4,
                      height: 26,
                      borderColor: GRAY_SCALE,
                      color: GREY,
                    }}
                    label={get(option, labelPath)}
                    {...getTagProps({ index })}
                    deleteIcon={<CloseIcon />}
                    key={index}
                  />
                ))
              }
              isOptionEqualToValue={(option, value) => {
                if (value instanceof Object) {
                  return get(option, valuePath) === get(value, valuePath)
                }
                return get(option, valuePath) === value
              }}
              getOptionLabel={(option) => {
                return get(option, labelPath) ?? ''
              }}
              renderOption={(props, option: any) => {
                return (
                  <li {...props}>
                    <Typography variant='body2' title={get(option, labelPath)}>
                      {get(option, labelPath)}
                    </Typography>
                  </li>
                )
              }}
              renderInput={(params) => (
                <>
                  <TextField
                    {...params}
                    inputRef={ref}
                    label={label}
                    variant='standard'
                    error={!!(error || helperText)}
                    helperText={error && isHasMessageError && error.message}
                    placeholder={
                      (multiple ? !!value?.length : !!value)
                        ? ''
                        : placeholder ||
                          t('form.autocomplete.placeholder', {
                            label,
                          }).toString()
                    }
                    InputLabelProps={{
                      ...params.InputLabelProps,
                      shrink: true,
                      required,
                    }}
                    InputProps={{
                      disableUnderline: readOnly ? true : false,
                      //notched: true,
                      ...InputProps,
                      ...params.InputProps,
                      endAdornment: readOnly ? null : (
                        <>
                          {isLoading ? (
                            <CircularProgress color='inherit' size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                  {helperText && <FormHelperText>{helperText}</FormHelperText>}
                </>
              )}
              {...restProps}
            />
          )
        }}
        rules={rules}
      />
    </div>
  )
}

export default UomAutocomplete
