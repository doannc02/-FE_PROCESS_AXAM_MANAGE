import { useDialog } from '@/components/hooks/dialog/useDialog'
import { MAX_VALUE } from '@/helper/contain'
import { useFormCustom } from '@/lib/form'
import { StockPickingLine } from '@/service/warehouse/inventoryFirstPeriod/save/type'
import { useFieldArray } from 'react-hook-form'
import { DialogDefaultDateEditProps } from '.'
// import { useQueryGetLotManagement } from '@/service/warehouse/inventoryFirstPeriod/getListLo'

export const useDialogDefaultDateEdit = (props: DialogDefaultDateEditProps) => {
  const {
    index,
    onChangeSerialLotLines,
    data,
    productId,
    doneQty,
    setValueLo,
  } = props

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
    defaultValues: {
      serialLotLines: data,
    },
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

  // const { isLoading, data: lotList } = useQueryGetLotManagement({
  //   productId,
  //   page: 0,
  //   size: MAX_VALUE,
  //   state: 'NOT_USED',
  // })

  // const lotSelect = (lotList?.content ?? []).map((item) => ({
  //   label: item.code,
  //   value: item.quantity,
  //   id: item.id,
  // }))
  return [
    {
      // isLoading,
      // lotSelect,
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
      index,
      hideDialog,
      showDialog,
      data,
    },
    { onSubmit },
  ] as const
}
