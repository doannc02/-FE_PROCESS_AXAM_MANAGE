import useCheckPath from '@/components/hooks/path/useCheckPath'
import { ColumnProps } from '@/components/organism/CoreTable'
import { useFormCustom } from '@/lib/form'
import { useAppSelector } from '@/redux/hook'
import {
  useQueryGetDebtReceivableListNew,
  useQueryGetDebtReceivableListNewNormalTab,
} from '@/service/accounting/debtReceivable/getList'
import { RequestBody } from '@/service/accounting/debtReceivable/getList/type'
import {
  useQueryGetTotalReceivableDebtNew,
  useQueryGetTotalReceivableDebtNewNormalTab,
} from '@/service/accounting/debtReceivable/getTotal'
import { useQueryGetFiscalYearConfig } from '@/service/common/company/getFiscalYearConfig'
import { PageResponse } from '@/service/type'
import { convertToOffsetDateTime } from '@/utils/date/convertToDate'
import { getEndDateOfMonth, getStartDateOfMonth } from '@/utils/date/date'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'

const defaultValues = {
  page: 0,
  size: 20,
  tabNumber: 0,
  start: getStartDateOfMonth(true),
  end: getEndDateOfMonth(true),
}

const typeForIndex = {
  1: 'EXTERNAL',
  2: 'STAFF',
  3: 'INTERNAL',
}

const useDebtReceivableList = () => {
  const { t } = useTranslation('accounting/debt-receivable')
  const methodForm = useFormCustom<RequestBody['GET_DEBT']>({
    defaultValues,
  })

  const { typeDebt } = useCheckPath()

  const { id: idLedger } = useAppSelector((state) => state.ledgerRefData)

  const { reset, handleSubmit, setValue, watch } = methodForm

  const { data: fiscalYearConfig } = useQueryGetFiscalYearConfig()

  const [queryPage, setQueryPage] = useState<any>(
    _.omitBy(defaultValues, _.isNil)
  )

  const { id } = useAppSelector((state) => state.ledgerRefData)

  useEffect(() => {
    if (fiscalYearConfig) {
      setQueryPage({
        ...queryPage,
        start: convertToOffsetDateTime(fiscalYearConfig.data.startFiscalYear),
        end: convertToOffsetDateTime(fiscalYearConfig.data.endFiscalYear),
      })
      setValue(
        'start',
        convertToOffsetDateTime(fiscalYearConfig.data.startFiscalYear)
      )
      setValue(
        'end',
        convertToOffsetDateTime(fiscalYearConfig.data.endFiscalYear)
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fiscalYearConfig, setValue, queryPage.type, queryPage.typeQueryTab])

  const columns = useMemo(
    () =>
      [
        {
          fieldName: 'account.code',
        },
        {
          fieldName: 'openBalanceDebit',
        },
        {
          fieldName: 'openBalanceCredit',
        },

        {
          fieldName: 'ariseDebit',
        },
        {
          fieldName: 'ariseCredit',
        },
        {
          fieldName: 'endingBalanceDebit',
        },
        {
          fieldName: 'endingBalanceCredit',
        },
      ] as ColumnProps[],
    []
  )

  const onChangePageSize = (val: any) => {
    const { page, size } = val
    const input = { ...queryPage, page, size }
    setQueryPage(input)
  }

  console.log('quer', queryPage)

  const onReset = () => {
    reset(defaultValues)
    const input = _.omitBy(defaultValues, (v) => _.isNil(v))
    setQueryPage(input)
  }

  const onSubmit = handleSubmit(async (input) => {
    setQueryPage(input)
  })

  const {
    isLoading: isLoadingTable,
    data: dataExternal,
    refetch,
  } = useQueryGetDebtReceivableListNew(
    {
      ...queryPage,
      start: convertToOffsetDateTime(queryPage.start),
      end: convertToOffsetDateTime(queryPage.end),
      partnerId: queryPage?.partner?.id,
      accountId: queryPage?.account?.id,
      accountLedgerId: id,
      typeDebt,
    },
    {
      enabled:
        !!queryPage?.start &&
        !!queryPage?.end &&
        !!(queryPage?.tabNumber === 0),
    }
  )

  const { isLoading: isLoadingGetTotalDebt, data: totalDebt } =
    useQueryGetTotalReceivableDebtNew(
      {
        ...queryPage,
        start: convertToOffsetDateTime(queryPage.start),
        end: convertToOffsetDateTime(queryPage.end),
        partnerId: queryPage?.partner?.id,
        accountId: queryPage?.account?.id,
        accountLedgerId: idLedger,
        typeDebt,
      },
      {
        enabled:
          !!queryPage?.start &&
          !!queryPage?.end &&
          !!(queryPage?.tabNumber === 0),
      }
    )

  //----  dữ liệu query khi ở 3tab Nhân viên, Nội bộ, khách hàng
  const {
    isLoading: isLoadingTableNormalTab,
    data: dataNormal,
    refetch: refetchNormal,
  } = useQueryGetDebtReceivableListNewNormalTab(
    {
      ...queryPage,
      type: typeForIndex[queryPage.tabNumber as 1 | 2 | 3],
      start: convertToOffsetDateTime(queryPage.start),
      end: convertToOffsetDateTime(queryPage.end),
      partnerId: queryPage?.partner?.id,
      accountId: queryPage?.account?.id,
      accountLedgerId: id,
      typeDebt,
    },
    {
      enabled:
        !!queryPage?.start && !!queryPage?.end && !!(queryPage?.tabNumber > 0),
    }
  )

  const {
    isLoading: isLoadingGetTotalDebtNormalTab,
    data: totalDebtNormalTab,
  } = useQueryGetTotalReceivableDebtNewNormalTab(
    {
      ...queryPage,
      type: typeForIndex[queryPage.tabNumber as 1 | 2 | 3],
      start: convertToOffsetDateTime(queryPage.start),
      end: convertToOffsetDateTime(queryPage.end),
      partnerId: queryPage?.partner?.id,
      accountId: queryPage?.account?.id,
      accountLedgerId: idLedger,
      typeDebt,
    },
    {
      enabled:
        !!queryPage?.start && !!queryPage?.end && !!(queryPage?.tabNumber > 0),
    }
  )

  return [
    {
      typeDebt,
      dataExternal,
      dataNormal,
      idLedger,
      queryPage,
      methodForm,
      isLoadingGetTotalDebt:
        queryPage?.tabNumber === 0
          ? isLoadingGetTotalDebt
          : isLoadingGetTotalDebtNormalTab,
      totalDebt:
        queryPage?.tabNumber === 0
          ? totalDebt
            ? totalDebt.data
            : null
          : totalDebtNormalTab
          ? totalDebtNormalTab.data
          : null,
      columns,
      isLoadingTable,
      tableData: [],
      page:
        queryPage?.tabNumber === 0
          ? dataExternal?.data?.page
          : dataNormal?.data?.page,
      size:
        queryPage?.tabNumber === 0
          ? dataExternal?.data?.size
          : dataNormal?.data?.size,
      totalPages:
        queryPage?.tabNumber === 0
          ? dataExternal?.data?.totalPages
          : dataNormal?.data?.totalPages,
    },
    {
      onSubmit,
      onReset,
      onChangePageSize,
      refetch,
      watch,
      setValue,
      setQueryPage,
    },
  ] as const
}

export default useDebtReceivableList
