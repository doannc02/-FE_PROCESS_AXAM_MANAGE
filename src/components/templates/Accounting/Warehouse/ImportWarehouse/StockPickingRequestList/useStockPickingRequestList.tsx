import { useDialog } from '@/components/hooks/dialog/useDialog'
import { ColumnProps } from '@/components/organism/CoreTable'
import { useFormCustom } from '@/lib/form'
import { MENU_URL, TRANSLATE } from '@/routes'
import { useQueryGetStockPickingRequestInList } from '@/service/warehouse/importWarehouse/stockPickingRequest/getInList'
import { RequestBody } from '@/service/warehouse/importWarehouse/stockPickingRequest/getInList/type'
import { ButtonBase, Typography } from '@mui/material'
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
    label: 'Chờ ký',
    value: 'WAITING_SIGNATURE',
  },
  {
    label: 'Bị hủy',
    value: 'REJECTED',
  },
  {
    label: 'Hủy',
    value: 'CANCELED',
  },
]

const defaultValues = {
  page: 0,
  size: 20,
  date: null,
  search: '',
}

export const useStockPickingRequestList = () => {
  const { t } = useTranslation(TRANSLATE.WARE_HOUSE)
  const { showDialog, hideDialog } = useDialog()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    setError,
    control,
    formState,
    getValues,
    trigger,
    reset,
  } = useFormCustom<RequestBody['GET']>({
    defaultValues,
  })

  const [queryPage, setQueryPage] = useState<any>(
    _.omitBy(defaultValues, _.isNil)
  )

  const onChangePageSize = (val: any) => {
    const { page, size } = val
    const input = { ...queryPage, page, size }
    const result = _.omitBy(input, (v) => _.isNil(v) || v === '')
    setQueryPage(result)
  }

  const onReset = () => {
    reset(defaultValues)
    const result = _.omitBy(defaultValues, (v) => _.isNil(v))
    setQueryPage(result)
  }

  const onSubmit = handleSubmit(async (input) => {
    const result = _.omitBy(input, (v) => _.isNil(v) || v === '')
    setQueryPage(result)
  })

  const columns = useMemo(
    () =>
      [
        {
          header: t('tableStockPickingRequest.content'),
          fieldName: 'content',
        },
        {
          header: t('tableStockPickingRequest.scheduledDate'),
          fieldName: 'scheduledDate',
        },
        {
          header: t('tableStockPickingRequest.doneDate'),
          fieldName: 'doneDate',
        },
        {
          header: t('tableStockPickingRequest.stock'),
          fieldName: 'stock',
        },
        {
          header: t('tableStockPickingRequest.status'),
          fieldName: 'state',
        },
      ] as ColumnProps[],
    [t]
  )

  const { isLoading, data, refetch } =
    useQueryGetStockPickingRequestInList(queryPage)

  const tableData = (data?.data.content ?? []).map((item) => {
    let state: any
    if (item.state === 'WAITING') {
      state = <span className='text-[#F89E19]'>Chờ xử lý</span>
    } else if (item.state === 'PROCESSING') {
      state = <span className='text-[#F89E19]'>Đang xử lý</span>
    } else if (item.state === 'REJECTED') {
      state = <span className='text-[#FF4956]'>Bị hủy</span>
    } else if (item.state === 'DONE') {
      state = <span className='text-[#00CC6A]'>Hoàn thành</span>
    } else if (item.state === 'DONE_PART')
      state = <span className='text-[#F89E19]'>Đã nhập một phần</span>
    else if (item.state === 'CANCELED') {
      state = <span className='text-[#FF4956]'>Hủy</span>
    } else if (item.state === 'WAITING_SIGNATURE')
      state = <span className='text-[#A584FF]'>Chờ ký</span>

    return {
      id: (item.stockPickings ?? []).map((v: any) => v.id),
      code: item.sourceDocument,
      content: item.description,
      scheduledDate:
        item.scheduledDate && moment(item.scheduledDate).format('DD/MM/YYYY'),
      doneDate: item.doneDate && moment(item.doneDate).format('DD/MM/YYYY'),
      stock:
        stateSelect.find((state) => state.value === item.state)?.label ===
        'WAITING' ? (
          'Chờ xử lý'
        ) : (
          <div className='flex flex-col gap-5'>
            {(item.stockPickings ?? []).map((v, index) => (
              <div key={index} className='flex items-center gap-2'>
                <Typography sx={{ fontWeight: '600' }}>{v.code}</Typography>
              </div>
            ))}
          </div>
        ),
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
      getValues,
      page: data?.data.page ?? 0,
      size: data?.data.size ?? 20,
      totalPages: data?.data.totalPages,
    },
    { onSubmit, onReset, onChangePageSize },
  ] as const
}
