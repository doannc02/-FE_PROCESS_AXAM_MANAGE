import { ColumnProps } from '@/components/organism/CoreTable'
import { PRIMARY } from '@/helper/colors'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import { useQueryGetTaxReturnList } from '@/service/accounting/taxReturn/taxReturn/getList'
import { RequestBody } from '@/service/accounting/taxReturn/taxReturn/getList/type'
import { Typography } from '@mui/material'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { ButtonSetTaxReturn } from './ButtonSetTaxReturn'

const defaultValues = {
  search: '',
  fiscalYear: null,
  period: 'MONTH',
}

const useTaxReturnList = () => {
  const { t } = useTranslation(TRANSLATE.TAX_RETURN)

  const methodForm = useFormCustom<RequestBody['GET']>({
    defaultValues,
  })

  const router = useRouter()

  const [monthTableData, setMonthTableData] = useState<any>([])
  const [quarterlyTableData, setQuarterlyTableData] = useState<any>([])
  const [yearTableData, setYearTableData] = useState<any>([])

  const columns = useMemo(
    () =>
      [
        {
          header: t('table2.time'),
          fieldName: 'time',
        },
        {
          header: t('table2.numberAddendum'),
          fieldName: 'numberAddendum',
        },
        {
          header: t('table2.state'),
          fieldName: 'state',
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
  } = useQueryGetTaxReturnList({
    ...queryPage,
    fiscalYearId: queryPage?.fiscalYear?.id,
    fiscalYear: null,
  })

  useEffect(() => {
    if (data?.data) {
      if (data?.data?.months) {
        setMonthTableData(
          data?.data?.months.map((ele) => ({
            ...ele,
            codeAndName:
              ele.taxReturnConfig.code + ' - ' + ele.taxReturnConfig.name,
            taxReturns: ele.taxReturns.map((t) => ({
              ...t,
              numberAddendum: t.numberAddendum ?? 0,
              time: (
                <Typography color={PRIMARY}>{`Tháng ${t.time}`}</Typography>
              ),
              state: (
                <ButtonSetTaxReturn
                  taxReturn={t}
                  fiscalYearId={data?.data?.fiscalYear?.id}
                  taxReturnConfig={ele.taxReturnConfig}
                />
              ),
            })),
          }))
        )
      }

      if (data?.data?.quarterlies) {
        setQuarterlyTableData(
          data?.data?.quarterlies.map((ele) => ({
            ...ele,
            codeAndName:
              ele.taxReturnConfig.code + ' - ' + ele.taxReturnConfig.name,
            taxReturns: ele.taxReturns.map((t) => ({
              ...t,
              numberAddendum: t.numberAddendum ?? 0,
              time: <Typography color={PRIMARY}>{`Quý ${t.time}`}</Typography>,
              state: (
                <ButtonSetTaxReturn
                  taxReturn={t}
                  fiscalYearId={data?.data?.fiscalYear?.id}
                  taxReturnConfig={ele.taxReturnConfig}
                />
              ),
            })),
          }))
        )
      }

      if (data?.data?.years) {
        setYearTableData(
          data?.data?.years.map((ele) => ({
            ...ele,
            codeAndName:
              ele.taxReturnConfig.code + ' - ' + ele.taxReturnConfig.name,
            taxReturns: ele.taxReturns.map((t) => ({
              ...t,
              numberAddendum: t.numberAddendum ?? 0,
              time: <Typography color={PRIMARY}>{`Năm ${t.time}`}</Typography>,
              state: (
                <ButtonSetTaxReturn
                  taxReturn={t}
                  fiscalYearId={data?.data?.fiscalYear?.id}
                  taxReturnConfig={ele.taxReturnConfig}
                />
              ),
            })),
          }))
        )
      }
    }
  }, [data?.data])

  return [
    {
      router,
      queryPage,
      methodForm,
      columns,
      isLoadingTable,
      monthTableData,
      quarterlyTableData,
      yearTableData,
    },
    { t, onSubmit, onReset, refetch },
  ] as const
}

export default useTaxReturnList
