import { ColumnProps } from '@/components/organism/CoreTable'
import { useFormCustom } from '@/lib/form'
import { useQueryGetAccountList } from '@/service/accounting/account/getList'
import { RequestBody } from '@/service/accounting/account/getList/type'
import { Typography } from '@mui/material'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useMemo, useState } from 'react'

const defaultValues = {
  search: '',
  page: 0,
  size: 20,
}

const useAccountingSystemConfigList = () => {
  const { t } = useTranslation('accounting/accounting-system-config')
  const methodForm = useFormCustom<RequestBody['GET']>({
    defaultValues,
  })

  const columns = useMemo(
    () =>
      [
        {
          header: t('table.code'),
          fieldName: 'code',
        },
        {
          header: t('table.name'),
          fieldName: 'name',
        },
        {
          header: 'Kiểu',
          fieldName: 'type',
        },
        {
          header: 'Trạng thái',
          fieldName: 'isActive',
        },
      ] as ColumnProps[],
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

  const { isLoading, data, refetch } = useQueryGetAccountList(queryPage)

  const tableData = (data?.data?.content ?? []).map((item) => {
    return {
      ...item,
      code: <Typography variant='subtitle1'>{item.code}</Typography>,
      name: item.name,
      type: item?.accountType?.name,
      isActive: item?.isActive ? 'Active' : 'Inactive',
    }
  })

  return [
    {
      methodForm,
      columns,
      isLoading,
      tableData,
      page: data?.data?.page ?? 0,
      size: data?.data?.size ?? 20,
      totalPages: data?.data?.totalPages,
    },
    { onSubmit, onReset, onChangePageSize, refetch },
  ] as const
}

export default useAccountingSystemConfigList
