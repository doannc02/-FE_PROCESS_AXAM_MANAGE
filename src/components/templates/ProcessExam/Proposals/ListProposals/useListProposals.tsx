import DisplayStatus from '@/components/molecules/DisplayStatus'
import { ColumnProps } from '@/components/organism/CoreTable'
import { BLACK, GREEN, ORANGE, RED } from '@/helper/colors'
import { useFormCustom } from '@/lib/form'
import { useQueryGetProposalsList } from '@/service/proposals'
import { convertToDate } from '@/utils/date/convertToDate'
import _ from 'lodash'
import moment from 'moment'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'

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
  const isProposal = router.asPath.includes('/proposal')
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
          header: 'Mã kế hoạch',
          fieldName: 'code',
          styleCell: {
            style: {
              minWidth: '90px',
            },
          },
        },
        // {
        //   header: 'Người phê duyệt',
        //   fieldName: 'instructorName',
        // },
        {
          header: 'Học kỳ',
          fieldName: 'semester',
          styleCell: {
            style: {
              minWidth: '60px',
            },
          },
        },
        {
          header: 'Ngày bắt đầu',
          fieldName: 'start_date',
        },
        {
          header: 'Ngày kết thúc',
          fieldName: 'end_date',
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
      id: item?.id,
      userName: item?.user?.name ?? '-',
      end_date: convertToDate(item?.end_date),
      start_date: convertToDate(item?.start_date),
      status: (
        <DisplayStatus
          text={
            item?.status === 'pending_approval'
              ? 'Chờ phê duyệt'
              : item?.status === 'in_progress'
              ? 'Đang thực hiện'
              : item?.status === 'approved'
              ? 'Đã phê duyệt'
              : 'Bị từ chối'
          }
          color={
            item?.status === 'pending_approval'
              ? ORANGE
              : item?.status === 'in_progress'
              ? BLACK
              : item?.status === 'approved'
              ? GREEN
              : RED
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
      isProposal,
    },
    { t, onSubmit, onReset, onChangePageSize },
  ] as const
}

export default useListProposals
