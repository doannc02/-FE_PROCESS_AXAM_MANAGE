import { GRAY_SCALE, GREY } from '@/helper/colors'
import { PAGE_SIZE } from '@/helper/contain'
import { errorMsg } from '@/helper/message'
import { PageResponse } from '@/service/type'
import CloseIcon from '@mui/icons-material/Close'
import {
  Autocomplete,
  AutocompleteProps,
  Chip,
  CircularProgress,
  FilterOptionsState,
  FormHelperText,
  TextField,
  Typography,
} from '@mui/material'
import { useDebounce } from '@uidotdev/usehooks'
import { get } from 'lodash'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { ReactNode, useCallback, useEffect, useState } from 'react'
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
  label: ReactNode
  placeholder: string
  rules?: any
  disabled?: boolean
  readOnly?: boolean
  labelPath?: string
  labelPath2?: string
  labelPathForAddress?: boolean
  valuePath?: string
  isHasMessageError?: boolean
  helperText?: string
  required?: boolean
  params?: any
  type?: any
  sign?: string
  variant?: 'outlined' | 'filled' | 'standard'
  isViewProp?: boolean
  exceptValues?: any[]
  fetchDataFn: (val: any, type?: any) => Promise<PageResponse<any>>
  onChangeValue?: (val: any) => void
  onAfterChangeValue?: () => void
}

const CoreAutoCompleteAPI: <
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
    labelPath2,
    labelPathForAddress,
    valuePath = 'id',
    isHasMessageError = true,
    helperText,
    required,
    params,
    type,
    sign,
    variant = 'standard',
    isViewProp,
    exceptValues,
    fetchDataFn,
    onChangeValue,
    onAfterChangeValue,
    ...restProps
  } = props

  const router = useRouter()
  const { actionType } = router.query
  const isView = isViewProp !== undefined ? isViewProp : actionType === 'VIEW'

  const [page, setPage] = useState(1)
  const [isClick, setIsClick] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [totalPages, setTotalPages] = useState(1)
  const [search, setSearch] = useState('')
  const debounceSearch = useDebounce(search, 700)
  const [data, setData] = useState<any>([])
  const [dataPage0, setDataPage0] = useState<any>([])

  const convertParam = JSON.stringify(params)
  const convertExceptValues = JSON.stringify(exceptValues)

  const handleSearchData = useCallback(async () => {
    setIsLoading(true)
    const data = await fetchDataFn(
      {
        page: 1,
        size: PAGE_SIZE,
        search: debounceSearch,
        ...(params ? params : {}),
      },
      type
    )

    if (data && Array.isArray(data.data.content)) {
      const dataValue = [
        ...data.data.content.map((item: any) => ({
          ...item,
          [labelPath]: get(item, labelPath),
          [valuePath]: get(item, valuePath),
        })),
      ]

      setData(() =>
        exceptValues
          ? dataValue.filter((obj) => {
              return !exceptValues.some(
                (item: any) => item[valuePath] === obj[valuePath]
              )
            })
          : dataValue
      )
    }

    setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceSearch, convertParam])

  const handleFetchData = useCallback(
    async (isPreApply: boolean, pageOption?: number) => {
      try {
        setIsLoading(true)
        const pageValue = pageOption ?? page

        if (pageValue !== 1 && pageValue >= totalPages) {
          setIsLoading(false)
          return
        }
        const data = await fetchDataFn(
          {
            page: pageValue,
            size: PAGE_SIZE,
            ...(params ? params : {}),
          },
          type
        )

        if (data && Array.isArray(data.data.content)) {
          const dataValue = data.data.content.map((item: any) => ({
            ...item,
            [labelPath]: get(item, labelPath),
            [valuePath]: get(item, valuePath),
          }))

          if (pageValue === 1) {
            setDataPage0(dataValue)
          }

          setData((pre: any) => {
            const newVal = [...(isPreApply ? pre : []), ...dataValue]

            return exceptValues
              ? newVal.filter((obj) => {
                  const a = exceptValues.some(
                    (item: any) => item[valuePath] === obj[valuePath]
                  )
                  return !exceptValues.some(
                    (item: any) => item[valuePath] === obj[valuePath]
                  )
                })
              : newVal
          })

          setTotalPages(data.data.totalPages)
        }

        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        errorMsg(error)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page, totalPages, convertParam]
  )

  useEffect(() => {
    try {
      if (isClick && !disabled && !readOnly) handleFetchData(false)
    } catch (error) {
      errorMsg(error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClick, convertParam, convertExceptValues])

  useEffect(() => {
    if (isClick && !disabled && !readOnly) {
      if (debounceSearch) {
        handleSearchData()
      } else {
        setPage(() => 1)
        setData(dataPage0)
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceSearch, convertParam])

  const handleSCroll = async (e: any) => {
    const listboxNode = e.currentTarget
    const currentHeight = listboxNode.scrollTop + listboxNode.clientHeight

    if (listboxNode.scrollHeight - currentHeight <= 1) {
      setPage((prev) => prev + 1)
      handleFetchData(true, page + 1)
    }
  }

  return (
    <div
      onClick={(e) => {
        e.stopPropagation()
        if (!readOnly && !disabled && !isView && !isClick) setIsClick(true)
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
              forcePopupIcon={isView ? false : true}
              multiple={multiple}
              value={value ?? null}
              options={data}
              disabled={disabled}
              readOnly={readOnly || isView}
              loading={isLoading}
              noOptionsText={t('form.autocomplete.no_options')}
              onBlur={onBlur}
              onChange={(e, value: any) => {
                e.stopPropagation()
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
                if (labelPathForAddress) {
                  return (
                    get(option, labelPath) +
                    ' - ' +
                    get(option, 'ward') +
                    ' - ' +
                    get(option, 'district') +
                    ' - ' +
                    get(option, 'city')
                  )
                }
                return (
                  (labelPath2
                    ? get(option, labelPath2) +
                      (sign ? sign : ' - ') +
                      get(option, labelPath)
                    : get(option, labelPath)) ?? ''
                )
              }}
              renderOption={(props, option: any) => {
                return (
                  <li {...props}>
                    <Typography variant='body2' title={get(option, labelPath)}>
                      {labelPathForAddress
                        ? get(option, labelPath) +
                          ' - ' +
                          get(option, 'ward') +
                          ' - ' +
                          get(option, 'district') +
                          ' - ' +
                          get(option, 'city')
                        : labelPath2
                        ? get(option, labelPath2) +
                          (sign ? sign : ' - ') +
                          get(option, labelPath)
                        : get(option, labelPath)}
                    </Typography>
                  </li>
                )
              }}
              filterOptions={(options, params: FilterOptionsState<any>) => {
                setSearch(params.inputValue)
                return options
              }}
              renderInput={(params) => (
                <>
                  <TextField
                    {...params}
                    variant={isView ? 'standard' : (variant as any)}
                    inputRef={ref}
                    label={label}
                    error={!!(error || helperText)}
                    helperText={error && isHasMessageError && error.message}
                    placeholder={
                      !isView
                        ? (multiple ? !!value?.length : !!value)
                          ? ''
                          : placeholder ||
                            t('form.autocomplete.placeholder', {
                              label,
                            }).toString()
                        : ''
                    }
                    InputLabelProps={{
                      // ...params.InputLabelProps,
                      shrink: true,
                      required,
                    }}
                    InputProps={{
                      disableUnderline: isView ? true : false,
                      ...params.InputProps,
                      endAdornment: (
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
              ListboxProps={{
                onScroll: (e) => {
                  handleSCroll(e)
                },
              }}
              {...restProps}
            />
          )
        }}
        rules={!isView ? rules : {}}
      />
    </div>
  )
}

export default React.memo(CoreAutoCompleteAPI)
