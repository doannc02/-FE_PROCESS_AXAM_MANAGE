import DisplayStatus from '@/components/molecules/DisplayStatus'
import { Tooltip } from '@/components/molecules/Tooltip'
import { ColumnProps } from '@/components/organism/CoreTable'
import { getRole } from '@/config/token'
import { BLACK, GREEN, ORANGE, RED } from '@/helper/colors'
import { useFormCustom } from '@/lib/form'
import { useQueryGetAcademicYearList } from '@/service/academicYear'
import { useQueryGetExamList } from '@/service/exam'
import { Exam } from '@/service/examSet/type'
import { useQueryGetMajorList } from '@/service/major'
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
const useListAcademicYear = () => {
  const methodForm = useFormCustom<any>({ defaultValues })
  const role = getRole()
  const [queryPage, setQueryPage] = useState<any>(
    _.omitBy(defaultValues, _.isNil)
  )

  const { data, isLoading } = useQueryGetAcademicYearList({
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
    setQueryPage({ ...input, departmentId: input?.department?.id })
  })
  const { getValues, control, setValue } = methodForm

  const columns = useMemo(
    () =>
      [
        {
          header: 'Tên niên khóa',
          fieldName: 'name',
        },
        {
          header: 'Thời gian bắt đầu',
          fieldName: 'start_year',
        },
        {
          header: 'Thời gian kết thúc',
          fieldName: 'end_year',
        },
      ] as ColumnProps[],
    []
  )

  const tableData = (data?.data?.content ?? []).map((item) => {
    return {
      ...item,
      start_year: (
        <Typography>{item?.start_year ? item?.start_year : 0}</Typography>
      ),
      end_year: <Typography>{item?.end_year ? item?.end_year : 0}</Typography>,
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

export default useListAcademicYear
