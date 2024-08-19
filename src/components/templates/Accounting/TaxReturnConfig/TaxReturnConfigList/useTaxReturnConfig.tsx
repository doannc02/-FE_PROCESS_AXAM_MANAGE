import { ColumnProps } from '@/components/organism/CoreTable'
import { periodType } from '@/enum'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import { useQueryGetTaxReturnConfigList } from '@/service/accounting/taxReturn/taxReturnConfig/getList'
import { RequestBody } from '@/service/accounting/taxReturn/taxReturnConfig/getList/type'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useMemo, useState } from 'react'

const defaultValues = {
  search: '',
  page: 0,
  size: 20,
}

const useTaxReturnConfigList = () => {
  const { t } = useTranslation(TRANSLATE.TAX_RETURN)
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
          header: t('table.circularName'),
          fieldName: 'circularName',
        },
        {
          header: t('table.periodType'),
          fieldName: 'periodType',
        },
        {
          header: t('table.isActive'),
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

  const {
    isLoading: isLoadingTable,
    data,
    refetch,
  } = useQueryGetTaxReturnConfigList({
    ...queryPage,
  })

  const tableData = (data?.data?.content ?? []).map((item) => {
    return {
      ...item,
      periodType: periodType.find((ele) => ele.value === item?.periodType)
        ?.label,
      isActive: item.isActive ? 'Active' : 'InActive',
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
    { t, onSubmit, onReset, onChangePageSize, refetch },
  ] as const
}

export default useTaxReturnConfigList
