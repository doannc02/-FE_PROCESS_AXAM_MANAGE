import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import InvoiceStatus from '@/components/atoms/InvoiceStatus'
import PaymentStatus from '@/components/atoms/PaymentStatus'
import { ColumnProps } from '@/components/organism/CoreTable'
import { RED } from '@/helper/colors'
import { convertToDate } from '@/utils/date/convertToDate'
import { useFormCustom } from '@/lib/form'
import { useCheckPath } from '@/path'
import { useAppSelector } from '@/redux/hook'
import { TRANSLATE } from '@/routes'
import { Typography } from '@mui/material'
import _ from 'lodash'
import moment from 'moment'
import { useTranslation } from 'next-i18next'
import { useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { useQueryGetProposalsList } from '@/service/proposals'
import { MAX_VALUE } from '@/helper/contain'

const defaultValues = {
  search: '',
  page: 0,
  size: 20,
  startDate: convertToDate(moment().startOf('month'), 'YYYY-MM-DD'),
  endDate: convertToDate(moment().endOf('month'), 'YYYY-MM-DD'),
}

const useListProposals = () => {
  const { t } = useTranslation('')

  const router = useRouter()

  const methodForm = useFormCustom<any>({
    defaultValues,
  })

  const { data, isLoading: isLoadingTable } = useQueryGetProposalsList({
    page: 0,
    size: MAX_VALUE,
  })

  const columns = useMemo(
    () =>
      [
        {
          header: 'Mã số phân công',
          fieldName: 'code',
        },
        {
          header: 'Học kỳ',
          fieldName: 'semester',
        },
        {
          header: 'Deadline',
          fieldName: 'endDate',
        },

        {
          header: 'Trạng thái',
          fieldName: 'status',
        },
        {
          header: t('table.amountTotal'),
          fieldName: 'amountTotal',
        },
        {
          header: t('table.paymentStatus'),
          fieldName: 'paymentStatus',
        },

        {
          header: t('table.state'),
          fieldName: 'state',
        },
      ] as ColumnProps[],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t]
  )

  const [queryPage, setQueryPage] = useState<any>(
    _.omitBy(defaultValues, _.isNil)
  )
  const onChangePageSize = (val: any) => {
    const { page, size } = val
    const input = { ...queryPage, page, size }

    setQueryPage(input)
  }

  const onReset = () => {
    methodForm.reset(defaultValues)
    const input = _.omitBy(defaultValues, (v) => _.isNil(v))
    setQueryPage(input)
  }

  const onSubmit = methodForm.handleSubmit(async (input) => {
    setQueryPage(input)
  })

  const tableData = [].map((item) => {
    return {}
  })

  return [
    {
      methodForm,
      columns,
      isLoadingTable,
      tableData,
      page: data?.data?.page,
      size: data?.data?.size,
      totalPages: data?.data?.totalPages,
    },
    { t, onSubmit, onReset, onChangePageSize },
  ] as const
}

export default useListProposals
