import { ColumnProps } from '@/components/organism/CoreTable'
import { getRole } from '@/config/token'
import { useFormCustom } from '@/lib/form'
import { useQueryGetMajorList } from '@/service/major'
import _ from 'lodash'
import { useMemo, useState } from 'react'

const defaultValues = {
  page: 1,
  size: 20,
} as any
const useListMajor = () => {
  const methodForm = useFormCustom<any>({ defaultValues })
  const role = getRole()
  const [queryPage, setQueryPage] = useState<any>(
    _.omitBy(defaultValues, _.isNil)
  )

  const { data, isLoading } = useQueryGetMajorList({
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

  const columns = useMemo(
    () =>
      [
        {
          header: 'Tên chuyên ngành',
          fieldName: 'name',
        },
        {
          header: 'Trực thuộc khoa',
          fieldName: 'departmentName',
        },
      ] as ColumnProps[],
    []
  )

  const tableData = (data?.data?.content ?? []).map((item) => {
    return {
      ...item,
      departmentName: item?.department?.name,
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

export default useListMajor
