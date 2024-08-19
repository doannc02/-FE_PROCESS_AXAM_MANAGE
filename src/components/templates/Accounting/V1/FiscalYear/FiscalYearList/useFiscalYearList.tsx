import { useDialog } from '@/components/hooks/dialog/useDialog'
import { ColumnProps } from '@/components/organism/CoreTable'
import { useFormCustom } from '@/lib/form'
import { useQueryGetFiscalYear } from '@/service/accounting/fiscalYear/getList'
import { RequestBody } from '@/service/accounting/fiscalYear/getList/type'
import { Typography } from '@mui/material'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'

const defaultValues = {
  search: '',
  page: 0,
  size: 20,
}

const useFiscalYearList = () => {
  const { t } = useTranslation('accounting/fiscal-year')
  const methodForm = useFormCustom<RequestBody['GET']>({
    defaultValues,
  })

  const { showDialog } = useDialog()
  const router = useRouter()

  const columns = useMemo(
    () =>
      [
        {
          header: t('table.name'),
          fieldName: 'name',
        },
        {
          header: t('table.startDate'),
          fieldName: 'startDate',
        },
        {
          header: t('table.endDate'),
          fieldName: 'endDate',
        },
        // {
        //   header: 'action',
        //   fieldName: 'action',
        // },
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

  const {
    isLoading: isLoadingTable,
    data,
    refetch,
  } = useQueryGetFiscalYear(queryPage)

  const tableData = (data?.data?.content ?? []).map((item) => {
    return {
      name: <Typography variant='subtitle1'>{item.name}</Typography>,
      startDate: item.startDate,
      endDate: item.endDate,
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
    { onSubmit, onReset, onChangePageSize, refetch },
  ] as const
}

export default useFiscalYearList
