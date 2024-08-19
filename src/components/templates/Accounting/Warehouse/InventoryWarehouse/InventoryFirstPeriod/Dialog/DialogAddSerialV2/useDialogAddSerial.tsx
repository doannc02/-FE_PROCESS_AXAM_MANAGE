import { useDialog } from '@/components/hooks/dialog/useDialog'
import { MAX_VALUE } from '@/helper/contain'
import { useFormCustom } from '@/lib/form'
import { chunk } from 'lodash'
import { useEffect, useMemo } from 'react'
import { useFieldArray } from 'react-hook-form'
import { DialogAddSerialProps } from '.'
import { useQueryGetMaterialLevelConfigByProduct } from '@/service/warehouse/inventoryFirstPeriod/getListMaterialLevelConfig'
import { useQueryGetAutoGenerateSerial } from '@/service/warehouse/inventoryFirstPeriod/getListStockPicking'
import { useQueryGetSerialManagement } from '@/service/warehouse/inventoryFirstPeriod/getListSerial'

export const useDialogAddSerial = (props: DialogAddSerialProps) => {
  const { index, onChangeSerialLotLines, productId, doneQty, setValueSerial } =
    props

  const { hideDialog, showDialog } = useDialog()

  const { data: billData } = useQueryGetMaterialLevelConfigByProduct({
    productId,
  })

  const {
    data: dataAutoGenerateSerial,
    isLoading: isLoadingAutoGenerateSerial,
  } = useQueryGetAutoGenerateSerial(
    { numberSerial: doneQty },
    { enabled: !!Number(doneQty) }
  )

  const totalSerialChildren = doneQty * billData?.billOfMaterialLine?.length

  const {
    data: dataAutoGenerateSerialChildren,
    isLoading: isLoadingAutoGenerateSerialChildren,
  } = useQueryGetAutoGenerateSerial(
    { numberSerial: Number(totalSerialChildren) },
    { enabled: !!Number(totalSerialChildren) }
  )

  const handleSerialChildren = (val: any[]) => {
    let newArr: any[] = []
    val.forEach((item) => {
      const arr = (Array(item.quantity).fill(null) ?? []).map((v) => {
        return {
          id: null,
          serialLots: {
            id: null,
            code: '',
          },
          quantity: 0,
          receiveDate: '',
          unitPrice: 0,
          name: '',
          disable: false,
          productId: item.productId,
        }
      })
      newArr = newArr.concat(arr)
    })
    return newArr
  }

  const data = useMemo(
    () =>
      (Array(doneQty).fill(null) ?? []).map((_) => {
        return {
          id: null,
          serialLots: {
            id: null,
            code: '',
          },
          quantity: 1,
          receiveDate: '',
          unitPrice: 0,
          disable: false,
          productId: productId,
          name: '',
          serialChildren: billData?.billOfMaterialLine
            ? handleSerialChildren(billData?.billOfMaterialLine)
            : undefined,
        }
      }),
    [billData?.billOfMaterialLine, doneQty, productId]
  )

  const formContext = useFormCustom<any>({
    defaultValues: {
      serialLotLines: data,
    },
  })

  const { control, handleSubmit, reset, watch } = formContext

  const { fields } = useFieldArray({
    control,
    name: 'serialLotLines',
    keyName: 'key',
  })

  useEffect(() => {
    data && reset({ serialLotLines: data })
  }, [data, reset])

  const handleReturnSerialLotLineChild = (data: any) => {
    let newArr: any = []
    data.forEach((item: any) => {
      newArr.push({
        id: item.id,
        serialLots: {
          id: item.serialLots.id,
          code: item.serialLots.code,
        },
        quantity: item.quantity ?? 1,
        receiveDate: item.receiveDate,
        unitPrice: item.unitPrice,
      })
      item.serialChildren?.forEach((item2: any) => {
        newArr.push({
          ...item2,
          id: item2.id,
          serialLots: {
            id: item2.serialLots.id,
            code: item2.serialLots.code,
          },
          quantity: item2.quantity ?? 1,
          receiveDate: item2.receiveDate,
          unitPrice: item2.unitPrice,
          parent: {
            lotSerialId: item?.serialLots.id,
            lotSerialCode: item?.serialLots.code,
          },
          product: {
            id: productId,
            name: '',
          },
        })
      })
    })
    
    const sumMoney = newArr.reduce(function (a: any, b: any) {
      return a + b.unitPrice * b.quantity
    }, 0)
    if (sumMoney) {
      setValueSerial(`stockPickingLines.${index}.sumMoney`, sumMoney)
    }
    return newArr
  }

  const onSubmit = handleSubmit((input) => {
    const resultData = handleReturnSerialLotLineChild(
      input.serialLotLines ?? []
    )
    onChangeSerialLotLines(resultData, index)
    hideDialog()
  })

  const { isLoading, data: serialList } = useQueryGetSerialManagement({
    productId,
    page: 0,
    size: MAX_VALUE,
    state: 'NOT_USED',
  })

  const serialSelect = (serialList?.data.content ?? []).map((item: any) => ({
    label: item.code,
    value: item.id,
  }))

  return [
    {
      isLoading,
      serialSelect,
      fields,
      control,
      data,
      formContext,
      billData,
      dataAutoGenerateSerial: dataAutoGenerateSerial?.data,
      isLoadingAutoGenerateSerial,
      isLoadingAutoGenerateSerialChildren,
      dataAutoGenerateSerialChildren: Array.isArray(
        dataAutoGenerateSerialChildren?.data
      )
        ? chunk(
            dataAutoGenerateSerialChildren?.data,
            billData?.billOfMaterialLine?.length
          )
        : [],
    },
    { onSubmit },
  ] as const
}
