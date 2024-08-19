import { ColumnProps } from '@/components/organism/CoreTable'
import { subjectType } from '@/enum'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import { useQueryGetSubjectCostConfigList } from '@/service/accounting/subjectCostConfig/getList'
import { RequestBody } from '@/service/accounting/subjectCostConfig/getList/type'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'

const defaultValues = {
  subjectType: 'COEFFICIENTS_RATIOS_PRODUCTION',
}

const useSaveConfigSubject = () => {
  const { t } = useTranslation(TRANSLATE.THCP)

  const methodForm = useFormCustom<RequestBody['GET']>({
    defaultValues,
  })

  const router = useRouter()

  const columns = useMemo(
    () =>
      [
        {
          header: t('table.subject'),
          fieldName: 'subject.name',
        },
        {
          header: t('table.processCategories'),
          fieldName: 'processCategories',
        },
      ] as ColumnProps[],
    [t]
  )

  const [queryPage, setQueryPage] = useState<any>(
    _.omitBy(defaultValues, _.isNil)
  )

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
  } = useQueryGetSubjectCostConfigList(queryPage)

  const getTitleFieldFn = (value: string) => {
    return subjectType.find((ele) => ele.value === value)?.label
  }

  return [
    {
      tableData: data ? data.data : [],
      router,
      queryPage,
      methodForm,
      columns,
      isLoadingTable,
    },
    { t, onSubmit, onReset, refetch, getTitleFieldFn },
  ] as const
}

export default useSaveConfigSubject
