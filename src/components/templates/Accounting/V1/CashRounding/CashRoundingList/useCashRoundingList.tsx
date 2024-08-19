import { ColumnProps } from '@/components/organism/CoreTable'
import { useFormCustom } from '@/lib/form'
import { useQueryGetCashRoundingList } from '@/service/accounting/cashRounding/getList'
import { RequestBody } from '@/service/accounting/cashRounding/getList/type'
import { Typography } from '@mui/material'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useMemo, useState } from 'react'

const defaultValues = {
  search: '',
  page: 0,
  size: 20,
}

const useCashRoundingList = () => {
  const { t } = useTranslation('accounting/cash-rounding')
  const methodForm = useFormCustom<RequestBody['GET']>({
    defaultValues,
  })

  const columns = useMemo(
    () =>
      [
        {
          header: t('table.name'),
          fieldName: 'name',
        },
        {
          header: t('table.roundingPrecision'),
          fieldName: 'roundingPrecision',
        },
        {
          header: t('table.roundingMethod'),
          fieldName: 'roundingMethod',
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

  const {
    isLoading: isLoadingTable,
    data,
    refetch,
  } = useQueryGetCashRoundingList(queryPage)

  const tableData = (data?.data?.content ?? []).map((item) => {
    return {
      ...item,
      name: <Typography variant='subtitle1'>{item.name}</Typography>,
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

export default useCashRoundingList
