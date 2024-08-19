import { useDialog } from '@/components/hooks/dialog/useDialog'
import { useFormCustom } from '@/lib/form'
import { chunk } from 'lodash'
import { useEffect, useMemo } from 'react'
import { useFieldArray } from 'react-hook-form'
import { DialogEditSerialProps } from '.'
import { SerialLotLine } from './type'
import { useQueryGetMaterialLevelConfigByProduct } from '@/service/warehouse/inventoryFirstPeriod/getListMaterialLevelConfig'
import { useQueryGetAutoGenerateSerial } from '@/service/warehouse/inventoryFirstPeriod/getListStockPicking'

export const useDialogEditSerial = (props: DialogEditSerialProps) => {
  const {
    index,
    onChangeSerialLotLines,
    data,
    productId,
    doneQty,
    setValueSerial,
  } = props
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

  let defaultData
  if (doneQty > 0 && data.length > 0) {
    if (doneQty === data.length) defaultData = data
    else if (data.length > doneQty)
      defaultData = data.slice(data.length - doneQty)
    else
      defaultData = [
        ...data,
        ...(Array(doneQty - data.length).fill(null) ?? []).map((_) => ({
          // id: null,
          // lotId: null,
          // lotType: 'SERIAL_NUMBER',
          // quantity: 1,
          // lotCode: '',
          // name: '',
          name: '',
          disable: true,
          id: null,
          serialLots: {
            id: null,
            code: '',
          },
          quantity: 1,
          receiveDate: '',
          unitPrice: 0,
          intoMoney: 0,
        })),
      ]
  } else {
    defaultData = [
      {
        name: '',
        disable: true,
        id: null,
        serialLots: {
          id: null,
          code: '',
        },
        quantity: 1,
        receiveDate: '',
        unitPrice: 0,
        intoMoney: 0,
      },
    ]
  }

  const convertData = useMemo(() => {
    let parentList: SerialLotLine[] = data?.filter(
      (item) => !item.parent?.lotSerialId
    )
    console.log(parentList, 'parentList')
    data.forEach((item) => {
      if (item.parent?.lotSerialCode) {
        parentList = parentList.map((v) => {
          const isChild = v.serialLots.code === item.parent?.lotSerialCode
          return isChild
            ? { ...v, serialChildren: (v?.serialChildren ?? []).concat(item) }
            : v
        })
      }
    })
    return parentList
  }, [data])

  const formContext = useFormCustom<any>({
    defaultValues: {
      serialLotLines: defaultData,
    },
  })
  console.log(convertData, 'convertData')
  console.log(defaultData, 'defaultData')

  const { control, handleSubmit, watch, formState, reset } = formContext

  useEffect(() => {
    convertData && reset({ serialLotLines: convertData })
  }, [convertData, reset])

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'serialLotLines',
    keyName: 'key',
  })

  console.log('fields', fields)

  const handleReturnSerialLotLineChild = (data: any) => {
    let newArr: any = []
    data.forEach((item: any) => {
      console.log(item, 'item')
      newArr.push({
        id: item.id,
        serialLots: {
          id: item.serialLots.id,
          code: item.serialLots.code,
        },
        quantity: item.quantity ?? 1,
        receiveDate: item.receiveDate,
        unitPrice: item.unitPrice,
        intoMoney: item.quantity * item.unitPrice,
      })
      item.serialChildren?.forEach((item2: any) => {
        console.log(item2, 'item2')
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
          intoMoney: item2.quantity * item2.unitPrice,
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
    console.log(newArr, 'newArr')
    return newArr
  }

  const onSubmit = handleSubmit((input) => {
    const resultData = handleReturnSerialLotLineChild(
      input.serialLotLines ?? []
    )
    console.log(resultData, 'resultData')

    onChangeSerialLotLines(resultData, index)
    hideDialog()
  })

  // const { isLoading, data: serialList } = useQueryGetSerialManagement({
  //   productId,
  //   page: 0,
  //   size: MAX_VALUE,
  //   state: 'NOT_USED',
  // })

  // const serialSelect = (serialList?.content ?? []).map((item) => ({
  //   label: item.code,
  //   value: item.id,
  // }))

  return [
    {
      // isLoading,
      // serialSelect,
      fields,
      control,
      errors: formState.errors,
      data: convertData,
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
