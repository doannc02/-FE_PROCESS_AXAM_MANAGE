import { useDialog } from '@/components/hooks/dialog/useDialog'
import { ColumnProps } from '@/components/organism/CoreTable'
import { statusPolicyType } from '@/enum'
import { convertToDate } from '@/utils/date/convertToDate'
import { useFormCustom } from '@/lib/form'
import { RequestBody } from '@/service/accounting/debtGrantingPolicies/getList/type'
import { useQueryGetDebtApprove } from '@/service/accounting/debtGrantingPolicies/getListManager'
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

const useDebtApproveList = () => {
  const { t } = useTranslation('accounting/debt-approve')
  const router = useRouter()
  const methodForm = useFormCustom<RequestBody['GET']>({
    defaultValues,
  })

  const { showDialog } = useDialog()

  const columns = useMemo(
    () =>
      [
        {
          header: t('table.name'),
          fieldName: 'name',
        },
        {
          header: t('table.timeApplyPolicy'),
          fieldName: 'timeApplyPolicy',
        },
        {
          header: t('table.timeEndPolicy'),
          fieldName: 'timeEndPolicy',
        },
        {
          header: t('table.approvalDate'),
          fieldName: 'approvalDate',
        },
        {
          header: t('table.approvalPerson'),
          fieldName: 'approvalPerson',
        },
        {
          header: t('table.statusPolicy'),
          fieldName: 'statusPolicy',
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
  } = useQueryGetDebtApprove(queryPage)

  const tableData = (data?.data?.content ?? []).map((item) => {
    return {
      ...item,
      name: <Typography variant='subtitle1'>{item.name}</Typography>,
      approvalDate: convertToDate(item.approvalDate),
      timeApplyPolicy: convertToDate(item.timeApplyPolicy),
      timeEndPolicy: convertToDate(item.timeEndPolicy),
      statusPolicy: statusPolicyType.find(
        (ele) => ele.value === item.statusPolicy
      )?.label,
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

export default useDebtApproveList
