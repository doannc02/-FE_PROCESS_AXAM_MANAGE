import { useDialog } from '@/components/hooks/dialog/useDialog'
import { Action } from '@/components/molecules/Action'
import { ColumnProps } from '@/components/organism/CoreTable'
import { DialogCustom } from '@/components/organism/DialogCustom'
import { RED } from '@/helper/colors'
import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { Box, ButtonBase, Checkbox, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { CoreButton } from '@/components/atoms/CoreButton'
import { useQueryGetStockPickingOutList } from '@/service/warehouse/exportWarehouse/factoryWarehouse/getList'
import { RequestBody } from '@/service/warehouse/exportWarehouse/factoryWarehouse/getList/type'

interface FilterProps {
  page: number
  size: number
  search?: string
  warehouseId?: number
  state?: string
  scheduleDate?: string
  doneDate?: string
  code?: string
}

const defaultValues: FilterProps = {
  page: 0,
  size: 20,
  search: '',
  code: '',
}

export const sourceListOption = [
  {
    value: 'SALE_ORDER',
    label: 'Đơn bán',
  },
  {
    value: 'PURCHASE_ORDER',
    label: 'Đơn mua',
  },
  {
    value: 'POS_ORDER',
    label: 'Điểm bán hàng',
  },
  {
    value: 'MANUFACTURE_ORDER',
    label: 'Đơn hàng sẳn xuất',
  },
  {
    value: 'MANUFACTORY',
    label: 'Yêu cầu sản xuất',
  },
  {
    value: 'MANUAL',
    label: 'Manual',
  },
  { value: 'RETURN_ORDER', label: 'Đơn hàng trả' },
]

export const useFactoryWarehouseList = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    setError,
    control,
    formState,
    trigger,
    reset,
  } = useFormCustom<RequestBody['GET']>({
    defaultValues,
  })

  const { showDialog, hideDialog } = useDialog()

  const [queryPage, setQueryPage] = useState<RequestBody['GET']>(defaultValues)

  const onChangePageSize = (val: any) => {
    const { page, size } = val
    setQueryPage({ ...queryPage, page, size })
  }

  const onReset = () => {
    reset(defaultValues)
    setQueryPage({ ...defaultValues })
  }

  const onSubmit = handleSubmit(async (input) => {
    setQueryPage({ ...input })
  })

  const columns = useMemo(
    () =>
      [
        // {
        //   header: <Checkbox />,
        //   fieldName: 'checkbox',
        // },
        {
          header: 'Mã phiếu xuất kho',
          fieldName: 'code',
        },
        {
          header: 'Nguồn đơn',
          fieldName: 'source',
        },
        {
          header: 'Ngày xuất kho dự kiến',
          fieldName: 'scheduledDate',
        },
        {
          header: 'Ngày xuất kho',
          fieldName: 'doneDate',
        },

        {
          header: 'Người xuất kho',
          fieldName: 'employeeName',
        },

        {
          header: 'Xuất từ kho',
          fieldName: 'warehouseName',
          styleCell: {
            style: {
              minWidth: '250px',
            },
          },
        },
        {
          header: 'Người nhận hàng',
          fieldName: 'customerName',
        },

        {
          header: 'SP xuất kho',
          fieldName: 'quantity',
          styleCell: {
            style: {
              minWidth: '150px',
            },
          },
        },

        {
          header: 'Trạng thái ',
          fieldName: 'status',
        },
      ] as ColumnProps[],
    []
  )

  const {
    isLoading,
    data: warehouseDataTable,
    refetch,
  } = useQueryGetStockPickingOutList(queryPage)

  // const deleteRow = async (id: number) => {
  //   try {
  //     await delelteStockPickingOut({ id })
  //     successMsg('Thành công')
  //     refetch()
  //   } catch (e) {
  //     errorMsg(e)
  //   }
  // }

  // const { data: listWareHouse } = useQueryGetWarehouseList({
  //   page: 0,
  //   size: 1000,
  // })

  // const { data: generalConfig } = useQueryGetWarehouseConfig()

  const tableData = (warehouseDataTable?.data.content ?? []).map(
    (item: any) => {
      const scheduledDate = item.scheduledDate
      const formattedDate = item.scheduledDate
        ? new Date(scheduledDate).toLocaleDateString('en-GB')
        : ''

      const doneDate = item.doneDate
      const formattedDate2 = doneDate
        ? new Date(doneDate).toLocaleDateString('en-GB')
        : ''
      let status = <></>

      if (item.state === 'PROCESSING') {
        status = (
          <Typography className='text-[#F89E19] font-normal text-sm'>
            Đang xử lý
          </Typography>
        )
      } else if (item.state === 'DONE') {
        status = (
          <Typography className='text-[#00CC6A] font-normal text-sm whitespace-nowrap'>
            Hoàn thành
          </Typography>
        )
      } else if (item.state === 'WAITING') {
        status = (
          <Typography className='text-[#F89E19] font-normal text-sm'>
            Chờ xử lý
          </Typography>
        )
      } else if (item.state === 'REJECTED' || item.state === 'CANCELED') {
        status = (
          <Typography className={`font-normal text-sm`} style={{ color: RED }}>
            {item.state === 'CANCELED' ? 'Huỷ' : 'Bị Huỷ'}
          </Typography>
        )
      } else if (item.state === 'CANCELED') {
        status = (
          <Typography className={`font-normal text-sm`} style={{ color: RED }}>
            Bị hủy
          </Typography>
        )
      } else if (item.state === 'WAITING_SIGNATURE') {
        status = (
          <Typography
            className={`font-normal text-sm`}
            style={{ color: '#A584FF' }}
          >
            Chờ ký
          </Typography>
        )
      }
      return {
        // checkbox: <Checkbox />,
        id: item?.id,
        code: item?.code,
        scheduledDate: formattedDate,
        doneDate: formattedDate2,
        employeeName: item.employee?.name,
        warehouseName: item.warehouseName,
        customerName: item.customer?.name,
        quantity: <span> {item.quantity}</span>,
        // actionEnd,
        status,
        source: sourceListOption.find((v) => v.value === item.sourceDocument)
          ?.label,
      }
    }
  )

  // get select warehouse
  // const warehouseSelect: any[] = listWareHouse?.content || []

  return [
    {
      isLoading,
      register,
      handleSubmit,
      watch,
      setError,
      control,
      formState,
      trigger,
      columns,
      tableData,
      page: warehouseDataTable?.data.page ?? 0,
      size: warehouseDataTable?.data.size ?? 20,
      totalPages: warehouseDataTable?.data.totalPages,
      // generalConfig: generalConfig?.data,
    },
    { onSubmit, onReset, onChangePageSize },
  ] as const
}
