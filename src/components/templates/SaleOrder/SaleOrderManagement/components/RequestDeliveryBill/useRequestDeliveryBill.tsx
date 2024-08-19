import CoreInput from '@/components/atoms/CoreInput'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { DeliveryBill as DeliveryBillType } from '@/service/salesOrder/salesOrder/getSalesOrderLine/type'
import { rejectBill } from '@/service/salesOrder/salesOrder/rejectBill'
import {
  createSaleOrderLine,
  updateSaleOrderLine,
} from '@/service/salesOrder/salesOrder/updateSalesOrderLine'
import { Request } from '@/service/salesOrder/salesOrder/updateSalesOrderLine/type'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import RequestExportTooltip from './RequestExportTooltip'

interface Map {
  [key: string]: {
    label: string
    colorCode: string
  }
}

export const stateDelivery: Map = {
  CANCELED: {
    label: 'Hủy',
    colorCode: '##FF3B30',
  },
  WAITING: {
    label: 'Đang chờ',
    colorCode: '#F89E19',
  },
  WAITING_SIGNATURE: {
    label: 'Đang chờ ký',
    colorCode: '#F89E19',
  },
  PROCESSING: {
    label: 'Đang xử lý',
    colorCode: '#F89E19',
  },
  DONE: {
    label: 'Hoàn thành',
    colorCode: '#00CC6A',
  },
  DRAFT: {
    label: 'Nháp',
    colorCode: '#F89E19',
  },
}

type Props = {
  id: number
  type: string
  data: DeliveryBillType
  defaultOpen?: boolean
  handleFetchData: any
}

export const useRequestDeliveryBill = (
  type: string,
  data: DeliveryBillType,
  props: Props
) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const router = useRouter()
  const { hideDialog } = useDialog()
  const {
    register,
    handleSubmit,
    watch,
    setError,
    control,
    formState,
    trigger,
    setValue,
    reset,
    getValues,
  } = useFormCustom<Request['PUT']>({
    defaultValues: {
      // id: undefined,
      // code: undefined,
      // applyDate: undefined,
      // saleOrderLine: data.saleOrderRequestStockLines,
      // status: data.status,
      // pickingIds: [],
      ...data,
      type: 'WAREHOUSE',
    },
  })

  const watchSaleOrderLine = watch('saleOrderLine')

  const handleRejectBill = async () => {
    try {
      await rejectBill(props.id)
      hideDialog()
      successMsg('Thành công')
    } catch (error) {
      errorMsg(error)
    }
  }

  const dataTable = (watchSaleOrderLine ?? []).map(
    (item: any, index: number) => {
      return {
        ...item,
        sku: item.productInfo.sku,
        productName: item.productInfo?.name,
        quantity: `${item.quantity} ${item.productInfo?.uomName}`,
        quantityFunc: item?.quantity,
        quantityReq: `${item.quantityReq ?? 0} ${item.productInfo?.uomName}`,
        remainAmount: `${item.quantity - item.quantityReq} ${
          item.productInfo?.uomName
        }`,
        ...(isEdit || data.status === 'DRAFT'
          ? {
              quantityInput: (
                <CoreInput
                  control={control}
                  name={`saleOrderLine.${index}.requestedQty`}
                  placeholder='Nhập số lượng'
                  type='number'
                  rules={{
                    validate: {
                      max: (val: number) => {
                        const n = item.quantity - item.quantityReq
                        return val <= n || `Không được lớn hơn ${n}`
                      },
                      min: (val: number) => {
                        return val >= 0 || `Không được nhỏ hơn 0`
                      },
                    },
                  }}
                />
              ),
            }
          : {}),
      }
    }
  )

  const columns = useMemo(
    () => [
      // {
      //   header: 'SKU',
      //   fieldName: 'sku',
      // },
      {
        header: 'Tên sản phẩm',
        fieldName: 'productName',
      },
      {
        header: 'Số lượng theo đơn hàng',
        fieldName: 'quantity',
      },

      ...((type === 'FASTER' && isEdit) || data.status === 'DRAFT'
        ? [
            {
              header: 'Số lượng đã yêu cầu xuất',
              fieldName: 'quantityReq',
            },
            {
              header: 'Số lượng còn lại cần xuất',
              fieldName: 'remainAmount',
            },
            {
              header: 'Số lượng cần xuất kho',
              fieldName: 'quantityInput',
            },
            {
              header: 'Tổng trọng lượng',
              render: (val: any) => {
                return <RequestExportTooltip value={val} />
              },
            },
            {
              header: (
                <span
                  onClick={() => handleExportAll()}
                  style={{ color: '213660' }}
                  className='underline cursor-pointer'
                >
                  Xuất toàn bộ
                </span>
              ),
            },
          ]
        : [
            {
              header: 'Số lượng cần xuất kho',
              fieldName: 'requestedQty',
            },
          ]),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [type, isEdit, data.status]
  )

  const handleExportAll = () => {
    const saleOrderLine = getValues('saleOrderLine')
    const newSaleOrderLine = saleOrderLine.map((item: any) => ({
      ...item,
      // quantity: item.quantityOrder - item.requestedQty,
    }))
    reset({
      ...watch(),
      saleOrderLine: newSaleOrderLine,
    })
  }

  const onSubmit = handleSubmit(async (data: any) => {
    try {
      if (data.status === 'DRAFT') {
        data.saleOrderLine = data.saleOrderLine.map((item: any) => ({
          ...item,
          id: item.saleOrderLineId,
        }))
      }
      // data.id = id
      if (type === 'FULL_DELIVERY') {
        data.saleOrderLine = data.saleOrderLine.map((item: any) => ({
          ...item,
          // quantity: item.quantityOrder - item.requestedQty,
        }))
      } else {
        data.saleOrderLine = data.saleOrderLine.filter(
          (item: any) => !!item.requestedQty
        )
      }
      data.status === 'DRAFT'
        ? await createSaleOrderLine(data, {})
        : await updateSaleOrderLine(data, {})
      props.handleFetchData()
      // router.push('/salesOrder/saleOrderManagement')
      // hideDialog()
      successMsg('Yêu cầu thành công')
    } catch (error) {
      errorMsg(error)
    }
  })

  const handleEdit = () => {
    if (data.status !== 'DONE') {
      setIsEdit(!isEdit)
    }
  }

  return [
    {
      control,
      watch,
      columns,
      dataTable,
      data,
      isLoading,
      formState,
      stateDelivery,
      isEdit,
    },
    { onSubmit, setIsLoading, setIsEdit, handleEdit, handleRejectBill },
  ] as const
}
