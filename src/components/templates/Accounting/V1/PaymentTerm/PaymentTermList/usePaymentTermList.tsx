import { ColumnProps } from '@/components/organism/CoreTable'
import { useFormCustom } from '@/lib/form'
import { useCheckPath } from '@/path'
import { useQueryGetPaymentTermList } from '@/service/accounting/paymentTerm/getList'
import { RequestBody } from '@/service/accounting/paymentTerm/getList/type'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useMemo, useState } from 'react'

const defaultValues = {
  search: '',
  page: 0,
  size: 20,
}

const usePaymentTermList = () => {
  const { t } = useTranslation('accounting/payment-term')
  const { typePath } = useCheckPath()
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

  const { isLoading, data } = useQueryGetPaymentTermList({
    ...queryPage,
    type: typePath === 'PROVIDER' ? 'PURCHASE' : 'SALE',
  })

  const tableData = (data?.data?.content ?? []).map((item) => {
    return {
      id: item.id,
      name: item.name,
    }
  })

  return [
    {
      methodForm,
      columns,
      isLoading,
      tableData,
      page: data?.data?.page,
      size: data?.data?.size,
      totalPages: data?.data?.totalPages,
    },
    { onSubmit, onReset, onChangePageSize },
  ] as const
}

export default usePaymentTermList
