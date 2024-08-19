import { GREEN } from '@/helper/colors'
import { ColumnProps } from '@/components/organism/CoreTable'
import { useFormCustom } from '@/lib/form'
import { useGetAccountLedger } from '@/service/accounting/accountLedger/getList'
import { RequestBody } from '@/service/accounting/accountLedger/getList/type'
import { Typography } from '@mui/material'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useMemo, useState } from 'react'

const defaultValues = {
  search: '',
  page: 0,
  size: 20,
}

const useAccountLedger = () => {
  const { t } = useTranslation('accounting/account-ledger')
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
          header: '',
          fieldName: 'isDefault',
        },
        {
          header: t('table.description'),
          fieldName: 'description',
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
  } = useGetAccountLedger(queryPage)

  const tableData = (data?.data?.content ?? []).map((item) => {
    return {
      ...item,
      code: <Typography variant='subtitle1'>{item.code}</Typography>,
      name: item.name,
      isDefault: item.isDefault ? (
        <Typography sx={{ color: GREEN }}>Mặc định</Typography>
      ) : (
        ''
      ),
      description: item.description,
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

export default useAccountLedger
