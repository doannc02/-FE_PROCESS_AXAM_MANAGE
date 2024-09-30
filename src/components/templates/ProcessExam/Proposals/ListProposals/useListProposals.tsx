import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import InvoiceStatus from '@/components/atoms/InvoiceStatus'
import PaymentStatus from '@/components/atoms/PaymentStatus'
import { ColumnProps } from '@/components/organism/CoreTable'
import { BLACK, GREEN, ORANGE, RED } from '@/helper/colors'
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
import DisplayStatus from '@/components/molecules/DisplayStatus'

const defaultValues = {
  search: '',
  page: 1,
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

  const [queryPage, setQueryPage] = useState<any>(
    _.omitBy(defaultValues, _.isNil)
  )

  const { data, isLoading: isLoadingTable } = useQueryGetProposalsList({
    ...queryPage,
  })

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
  const columns = useMemo(
    () =>
      [
        {
          header: 'GV thực hiện',
          fieldName: 'userName',
        },
        {
          header: 'Người phê duyệt',
          fieldName: 'instructorName',
        },
        {
          header: 'Học kỳ',
          fieldName: 'semester',
        },
        {
          header: 'Học phần',
          fieldName: 'courseName',
        },
        {
          header: 'Số lượng đề cương',
          fieldName: 'number',
        },
        {
          header: 'Deadline',
          fieldName: 'deadline',
        },
        {
          header: 'Trạng thái',
          fieldName: 'status',
        },
      ] as ColumnProps[],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t]
  )
  const tableData = (data?.data?.content ?? []).map((item) => {
    return {
      ...item,
      courseName: item?.course?.code + ' - ' +  item?.course?.name,
      number: item?.number_of_assignment,
      userName: item?.user?.name ?? '-',
      instructorName: item?.instructor?.name ?? '-',
      deadline: convertToDate(item?.deadline),
      status: (
        <DisplayStatus
          text={
            item?.status === 'AWAIT'
              ? 'Chờ phê duyệt'
              : item?.status === 'DRAFT'
              ? 'Nháp'
              : 'Đã phê duyệt'
          }
          color={
            item?.status === 'AWAIT'
              ? ORANGE
              : item?.status === 'DRAFT'
              ? BLACK
              : GREEN
          }
        />
      ),
    }
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
