import { useDialog } from '@/components/hooks/dialog/useDialog'
import { Action } from '@/components/molecules/Action'
import { ColumnProps } from '@/components/organism/CoreTable'
import { MAX_VALUE } from '@/helper/contain'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import { useQueryGetWarehouseList } from '@/service/warehouse/getList'
import { useQueryGetStockPickingList } from '@/service/warehouse/importWarehouse/stockPicking/getList'
import { RequestBody } from '@/service/warehouse/importWarehouse/stockPicking/getList/type'
import { zodResolver } from '@hookform/resolvers/zod'
import { ButtonBase, Checkbox, Typography } from '@mui/material'
import _ from 'lodash'
import moment from 'moment'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'

// state select
const stateSelect = [
  {
    label: 'Chờ xử lý',
    value: 'WAITING',
  },
  {
    label: 'Đang xử lý',
    value: 'PROCESSING',
  },
  {
    label: 'Hoàn thành',
    value: 'DONE',
  },
  {
    label: 'Bị huỷ',
    value: 'REJECTED',
  },
  {
    label: 'Huỷ',
    value: 'CANCELED',
  },
  {
    label: 'Chờ ký',
    value: 'WAITING_SIGNATURE',
  },
]

export const sourceDocumentList = [
  { label: 'Manual', value: 'MANUAL' },
  { label: 'Đơn mua', value: 'PURCHASE_ORDER' },
  {
    label: 'Đơn trả',
    value: 'RETURN_ORDER',
  },
  {
    label: 'Đơn đổi',
    value: 'EXCHANGE',
  },
  {
    label: 'Đơn bảo hành',
    value: 'WARRANTY',
  },
  {
    label: 'Sản xuất',
    value: 'INTERNAL_INPUT',
  },
  {
    label: 'Sản xuất',
    value: 'FACTORY_INPUT',
  },
  {
    label: 'Sản xuất',
    value: 'INTERNAL_WAREHOUSE',
  },
]

const defaultValues = {
  search: '',
  page: 0,
  size: 20,
}

export const useStockPickingList = () => {
  const { t } = useTranslation(TRANSLATE.WARE_HOUSE)
  const { showDialog } = useDialog()
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

  const [queryPage, setQueryPage] = useState<any>(defaultValues)

  const onChangePageSize = (val: any) => {
    const { page, size } = val
    const input = { ...queryPage, page, size }
    const result = _.omitBy(input, (v) => _.isNil(v) || v === '')
    setQueryPage(result)
  }

  const onReset = () => {
    reset(defaultValues)
    const input = _.omitBy(defaultValues, (v) => _.isNil(v) || v === '')
    setQueryPage(input)
  }

  const onSubmit = handleSubmit(async (input) => {
    const result = _.omitBy(input, (v) => _.isNil(v) || v === '')
    setQueryPage({ ...result, page: 0 })
  })

  // get select warehouse
  const { data: warehouseData } = useQueryGetWarehouseList({
    page: 0,
    size: MAX_VALUE,
  })

  const warehouseSelect = (warehouseData?.data.content ?? []).map((item) => ({
    label: item.name,
    value: item.id,
  }))

  const columns: any = useMemo(
    () =>
      [
        {
          header: t('tableStockPickingList.code'),
          fieldName: 'code',
        },
        {
          header: t('tableStockPickingList.sourceDocument'),
          fieldName: 'sourceDocument',
        },
        {
          header: t('tableStockPickingList.scheduledDate'),
          fieldName: 'scheduledDate',
        },
        {
          header: t('tableStockPickingList.doneDate'),
          fieldName: 'doneDate',
        },
        {
          header: t('tableStockPickingList.employee'),
          fieldName: 'employee',
        },
        {
          header: t('tableStockPickingList.warehouse'),
          fieldName: 'warehouse',
        },
        {
          header: t('tableStockPickingList.status'),
          fieldName: 'state',
        },
      ] as ColumnProps[],
    [t]
  )

  // get select warehouse
  // const { data: warehouseData } = useQueryGetWarehouseList({
  //   page: 0,
  //   size: MAX_VALUE,
  // })

  // const { data: generalConfig } = useQueryGetWarehouseConfig()

  // const warehouseSelect = (warehouseData?.content ?? []).map((item) => ({
  //   label: item.name,
  //   value: item.id,
  // }))

  const { isLoading, data, refetch } = useQueryGetStockPickingList(queryPage)

  const tableData = (data?.data.content ?? []).map((item, index) => {
    let actionList: any = ['watch']
    let state: any

    if (item.state === 'WAITING') {
      actionList = ['delete', 'edit', 'add']
      state = <span className='text-[#F89E19]'>Chờ xử lý</span>
    } else if (item.state === 'PROCESSING') {
      actionList = ['delete', 'edit']
      state = <span className='text-[#F89E19]'>Đang xử lý</span>
    } else if (item.state === 'DONE') {
      actionList = []
      state = <span className='text-[#00CC6A]'>Hoàn thành</span>
    } else if (item.state === 'DONE_PART')
      state = <span className='text-[#F89E19]'>Đã nhập một phần</span>
    else if (item.state === 'REJECTED') {
      state = <span className='text-[#FF4956]'>Bị huỷ</span>
    } else if (item.state === 'CANCELED') {
      state = <span className='text-[#FF4956]'>Hủy</span>
    } else if (item.state === 'WAITING_SIGNATURE') {
      state = <span className='text-[#A584FF]'>Chờ ký</span>
      actionList = ['image', 'edit']
    }

    return {
      id: item.id,
      sourceDocument: sourceDocumentList.find(
        (state) => state.value === item.sourceDocument
      )?.label,
      code: item.code,
      scheduledDate:
        item.scheduledDate && moment(item.scheduledDate).format('DD/MM/YYYY'),
      doneDate: item.doneDate && moment(item.doneDate).format('DD/MM/YYYY'),
      employee: item.employee && item.employee.name,
      warehouse: item.warehouseName,
      state,
    }
  })

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
      stateSelect,
      tableData,
      page: data?.data?.page ?? 0,
      size: data?.data?.size ?? 20,
      totalPages: data?.data?.totalPages,
      warehouseSelect,
      // generalConfig: generalConfig?.data,
    },
    { onSubmit, onReset, onChangePageSize },
  ] as const
}
