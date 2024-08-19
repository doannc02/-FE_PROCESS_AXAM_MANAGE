import { useDialog } from '@/components/hooks/dialog/useDialog'
import { MAX_VALUE } from '@/helper/contain'
import { useFormCustom } from '@/lib/form'
import { useFieldArray } from 'react-hook-form'
import { DialogAddLotProps } from '.'
import { RequestBody } from './type'

const defaultValues = {
  serialLotLines: [
    {
      id: null,
      serialLots: {
        id: null,
        code: '',
      },
      quantity: 0,
      receiveDate: '',
      unitPrice: 0,
      name: '',
      intoMoney: 0,
    },
  ],
}

export const useDialogAddLot = (props: DialogAddLotProps) => {
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
  } = useFormCustom<RequestBody['POST']>({
    defaultValues,
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'serialLotLines',
    keyName: 'key',
  })

  const onSubmit = handleSubmit((input) => {
    const sumQtt = input.serialLotLines.reduce(function (a, b) {
      return a + b.quantity
    }, 0)

    if (sumQtt != doneQty) {
      setError(`serialLotLines.${fields.length - 1}.quantity`, {
        type: 'custom',
        message: `Tổng số lượng phải bằng ${doneQty}.`,
      })
      return
    }

    const sumMoney = input.serialLotLines.reduce(function (a, b) {
      return a + b.intoMoney
    }, 0)

    if (sumMoney) {
      setValueLo(`stockPickingLines.${index}.sumMoney`, sumMoney)
    }
    const resultData = (input.serialLotLines ?? []).map((i) => ({
      id: i.id,
      serialLots: {
        id: i.serialLots.id,
        code: i.serialLots.code,
      },
      quantity: i.quantity,
      receiveDate: i.receiveDate,
      unitPrice: i.unitPrice,
      name: i.name,
      intoMoney: i.intoMoney,
    }))
    onChangeSerialLotLines(resultData, index)
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
      hideDialog,
      showDialog,
      defaultValues,
    },
    { onSubmit },
  ] as const
}
