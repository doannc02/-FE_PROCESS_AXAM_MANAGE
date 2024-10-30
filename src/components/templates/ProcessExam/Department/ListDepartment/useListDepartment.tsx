import { ColumnProps } from '@/components/organism/CoreTable'
import { getRole } from '@/config/token'
import { useFormCustom } from '@/lib/form'
import { useQueryGetListCourse } from '@/service/course'
import { useQueryGetDepartmentList } from '@/service/department'
import _ from 'lodash'
import { useMemo, useState } from 'react'

const defaultValues = {
  search: '',
  page: 1,
  size: 20,
} as any
const useListDepartment = () => {
  const methodForm = useFormCustom<any>({ defaultValues })
  const role = getRole()
  const [queryPage, setQueryPage] = useState<any>(
    _.omitBy(defaultValues, _.isNil)
  )

  const { data, isLoading } = useQueryGetDepartmentList({
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
          header: 'Tên khoa',
          fieldName: 'name',
        },
      ] as ColumnProps[],
    []
  )

  const tableData = (data?.data?.content ?? []).map((item) => {
    return {
      ...item,
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

export default useListDepartment
