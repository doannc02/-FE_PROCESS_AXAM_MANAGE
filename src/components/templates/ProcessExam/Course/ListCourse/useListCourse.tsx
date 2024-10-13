import { ColumnProps } from '@/components/organism/CoreTable'
import { getRole } from '@/config/token'
import { useFormCustom } from '@/lib/form'
import { useQueryGetListCourse } from '@/service/course'
import _ from 'lodash'
import { useMemo, useState } from 'react'

const defaultValues = {
  search: '',
  page: 1,
  size: 20,
} as any
const useListCourse = () => {
  const methodForm = useFormCustom<any>({ defaultValues })
  const role = getRole()
  const [queryPage, setQueryPage] = useState<any>(
    _.omitBy(defaultValues, _.isNil)
  )

  const { data, isLoading } = useQueryGetListCourse({
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
    setQueryPage({ ...input, majorId: input?.major?.id })
  })
  const { getValues, control, setValue } = methodForm

  const columns = useMemo(
    () =>
      [
        {
          header: 'Tên học phần',
          fieldName: 'name',
        },
        {
          header: 'Mã đề',
          fieldName: 'code',
          styleCell: {
            style: {
              minWidth: '90px',
            },
          },
        },
        {
          header: 'Số tín chỉ',
          fieldName: 'credit',
        },
        {
          header: 'Chuyên ngành áp dụng',
          fieldName: 'apply',
          styleCell: {
            style: {
              minWidth: '115px',
            },
          },
        },
      ] as ColumnProps[],
    []
  )

  const tableData = (data?.data?.content ?? []).map((item) => {
    return {
      ...item,
      apply: item?.major?.name,
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

export default useListCourse
