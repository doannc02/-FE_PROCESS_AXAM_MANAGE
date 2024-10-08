import DisplayStatus from '@/components/molecules/DisplayStatus'
import { Tooltip } from '@/components/molecules/Tooltip'
import { ColumnProps } from '@/components/organism/CoreTable'
import { getRole } from '@/config/token'
import { BLACK, GREEN, ORANGE, RED } from '@/helper/colors'
import { useFormCustom } from '@/lib/form'
import { useQueryGetExamList } from '@/service/exam'
import { Exam } from '@/service/examSet/type'
import { convertToDate } from '@/utils/date/convertToDate'
import { Typography } from '@mui/material'
import { Stack } from '@mui/system'
import _ from 'lodash'
import { useMemo, useState } from 'react'
import { useFieldArray } from 'react-hook-form'

const defaultValues = {
  // status: 'pending_approval',
  page: 1,
  size: 20,
} as any
const useListExams = () => {
  const methodForm = useFormCustom<any>({ defaultValues })
  const role = getRole()
  const [queryPage, setQueryPage] = useState<any>(
    _.omitBy(defaultValues, _.isNil)
  )

  const { data, isLoading } = useQueryGetExamList({
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
  const { getValues, control, setValue } = methodForm

  const columns = useMemo(
    () =>
      [
        {
          header: 'Tên đề chi tiết',
          fieldName: 'name',
        },
        {
          header: 'Mã đề',
          fieldName: 'code',
        },
        ...(role === 'Admin'
          ? [
              {
                header: 'Người thực hiện',
                fieldName: 'user',
              },
            ]
          : []),
        {
          header: 'Mô tả',
          fieldName: 'description',
        },
        {
          header: 'Nhận xét',
          fieldName: 'comment',
        },
        {
          header: 'Năm học áp dụng',
          fieldName: 'academic_year',
        },
        {
          header: 'Ngày upload',
          fieldName: 'upload_date',
        },
        {
          header: 'Trạng thái',
          fieldName: 'status',
        },
      ] as ColumnProps[],
    [role]
  )

  const tableData = (data?.data?.content ?? []).map((item, index) => {
    return {
      ...item,
      academic_year: item?.academic_year?.name,
      upload_date: convertToDate(item?.upload_date),
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
      comment: item?.comment && (
        <Stack direction='row' justifyContent='space-between'>
          <Typography>{item?.comment.slice(0, 19)}</Typography>
          {item?.comment?.length > 20 ? (
            <div className='w-1/3'>
              <Tooltip
                isShowIcon
                showText
                tooltips={[{ title: item?.comment ?? '' }]}
              ></Tooltip>
            </div>
          ) : (
            <div className='w-1/3'></div>
          )}
        </Stack>
      ),
      user: item?.user?.name,
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
      isLoadingTable: isLoading,
      tableData,
      page: data?.data?.page,
      size: data?.data?.size,
      totalPages: data?.data?.totalPages,
    },
    { onChangePageSize, onSubmit, onReset },
  ] as const
}

export default useListExams
