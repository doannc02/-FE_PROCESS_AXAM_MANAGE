import { useDialog } from '@/components/hooks/dialog/useDialog'
import { useFormCustom } from '@/lib/form'
import { StockPickingLine } from '@/service/warehouse/inventoryFirstPeriod/save/type'
import { useFieldArray } from 'react-hook-form'
import { DialogDefaultDateProps } from '.'

const defaultValues = {
  serialLotLines: [
    {
      id: 0,
      serialLots: {
        id: 0,
        code: '',
      },
      quantity: 0,
      receiveDate: '',
      unitPrice: 0,
    },
  ],
}

export const useDialogDefaultDate = (props: DialogDefaultDateProps) => {
  const { index, onChangeSerialLotLines, productId, doneQty, setValueLo } =
    props

  const { hideDialog, showDialog } = useDialog()

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState,
    setValue,
    getValues,
    setError,
    trigger,
  } = useFormCustom<StockPickingLine>({
    defaultValues,
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'serialLotLines',
    keyName: 'key',
  })

  const onSubmit = handleSubmit((input) => {
    const sumMoney = input.serialLotLines.reduce(function (a, b) {
      return a + b.intoMoney
    }, 0)

    if (sumMoney) {
      setValueLo(`stockPickingLines.${index}.sumMoney`, sumMoney)
    }
    onChangeSerialLotLines(input.serialLotLines, index)
    hideDialog()
  })

  return [
    {
      fields,
      append,
      remove,
      register,
      control,
      errors: formState.errors,
      watch,
      setValue,
      getValues,
      trigger,
      hideDialog,
      showDialog,
      defaultValues,
    },
    { onSubmit },
  ] as const
}
