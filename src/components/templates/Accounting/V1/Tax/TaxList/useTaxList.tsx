import { ColumnProps } from '@/components/organism/CoreTable'
import { scopeTypeWithAllSelect, taxTypeList } from '@/enum'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import { useQueryGetTaxList } from '@/service/accounting/tax/getList'
import { RequestBody } from '@/service/accounting/tax/getList/type'
import { Typography } from '@mui/material'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useMemo, useState } from 'react'

const defaultValues = {
  search: '',
  page: 0,
  size: 20,
}

const useTaxList = () => {
  const { t } = useTranslation(TRANSLATE.TAX)
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
          header: t('table.scopeType'),
          fieldName: 'scopeType',
        },
        {
          header: t('table.type'),
          fieldName: 'type',
        },
        {
          header: t('table.description'),
          fieldName: 'description',
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
  } = useQueryGetTaxList(queryPage)

  const tableData = (data?.data?.content ?? []).map((item) => {
    return {
      ...item,
      name: <Typography variant='subtitle1'>{item.name}</Typography>,
      scopeType: scopeTypeWithAllSelect.find(
        (ele) => ele.value === item.scopeType
      )?.label,
      type: taxTypeList.find((ele) => ele.value === item.type)?.label,
      isActive: item.isActive ? 'Active' : 'Inactive',
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

export default useTaxList
