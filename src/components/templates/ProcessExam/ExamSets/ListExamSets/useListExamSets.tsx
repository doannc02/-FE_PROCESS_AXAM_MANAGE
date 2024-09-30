import DisplayStatus from '@/components/molecules/DisplayStatus'
import { Tooltip } from '@/components/molecules/Tooltip'
import { ColumnProps } from '@/components/organism/CoreTable'
import { BLACK, GREEN, ORANGE, RED } from '@/helper/colors'
import { useFormCustom } from '@/lib/form'
import { useQueryGetExamSetList } from '@/service/examSet'
import { Stack, Typography } from '@mui/material'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'

const defaultValues = {
  search: '',
  page: 1,
  size: 20,
  //   startDate: convertToDate(moment().startOf('month'), 'YYYY-MM-DD'),
  //   endDate: convertToDate(moment().endOf('month'), 'YYYY-MM-DD'),
}

const useListExamSets = () => {
  const { t } = useTranslation('')

  const router = useRouter()

  const methodForm = useFormCustom<any>({
    defaultValues,
  })

  const [queryPage, setQueryPage] = useState<any>(
    _.omitBy(defaultValues, _.isNil)
  )

  const { data, isLoading: isLoadingTable } = useQueryGetExamSetList({
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
          header: 'Bộ đề',
          fieldName: 'exam_set_name',
        },
        {
          header: 'Ngành',
          fieldName: 'department',
        },
        {
          header: 'Chuyên ngành',
          fieldName: 'major',
        },
        {
          header: 'Số đề đang thực hiện',
          fieldName: 'total_exams',
        },
        {
          header: 'Số đề yêu cầu',
          fieldName: 'exam_quantity',
        },
        {
          header: 'Mô tả',
          fieldName: 'description',
        },
        {
          header: 'Giảng viên thực hiện',
          fieldName: 'userName',
        },
        {
          header: 'Học phần',
          fieldName: 'courseName',
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
      id: item?.exam_set_id,
      courseName: item?.course?.code + ' - ' + item?.course?.name,
      userName: item?.user?.name ?? '-',
      description: item?.description && (
        <Stack direction='row' justifyContent='space-between'>
          <Typography>{item?.description.slice(0, 19)}</Typography>
          {item?.description?.length > 20 ? (
            <div className='w-1/3'>
              <Tooltip
                isShowIcon
                showText
                tooltips={[{ title: item?.description ?? '' }]}
              ></Tooltip>
            </div>
          ) : (
            <div className='w-1/3'></div>
          )}
        </Stack>
      ),
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
    },
    { t, onSubmit, onReset, onChangePageSize },
  ] as const
}

export default useListExamSets
