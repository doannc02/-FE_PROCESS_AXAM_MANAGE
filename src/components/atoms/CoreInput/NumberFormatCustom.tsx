import { useAppSelector } from '@/redux/hook'
import { forwardRef, memo, useCallback } from 'react'
import { NumericFormat } from 'react-number-format'

const NumberFormatCustom = forwardRef<any, any>(function NumberFormatCustomBase(
  props,
  ref
) {
  const {
    onChange,
    disabledecimal: disableDecimal,
    disablenegative: disableNegative,
    ...other
  } = props


  const handleChange = useCallback(
    (value: any) => {
      if (onChange) {
        onChange({
          target: {
            name: props.name,
            value: value.value,
          },
        })
      }
    },
    [props.name, onChange]
  )

  return (
    <NumericFormat
      {...other}
      decimalScale={disableDecimal ? 0 : other?.decimalScale ?? undefined}
      allowNegative={!disableNegative}
      getInputRef={ref}
      onValueChange={handleChange}
    />
  )
})

export default memo(NumberFormatCustom)
