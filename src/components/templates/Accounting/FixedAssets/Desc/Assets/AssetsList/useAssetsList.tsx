import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import useCheckPath from '@/components/hooks/path/useCheckPath'
import { TruncatedText } from '@/components/molecules/TruncatedText'
import { ColumnProps } from '@/components/organism/CoreTable'
import { MAX_VALUE } from '@/helper/contain'
import { convertToDate } from '@/utils/date/convertToDate'
import { useFormCustom } from '@/lib/form'
import { useAppSelector } from '@/redux/hook'
import { useQueryGetDeCreaseAssetList } from '@/service/accounting/fixedAsset/getList/getIncreaseAsset'
import { useQueryGetDeCreaseToolList } from '@/service/accounting/increaseTools/getList'
import { RequestBody } from '@/service/accounting/increaseTools/getList/type'
import _ from 'lodash'
import moment from 'moment'
import { useMemo, useState } from 'react'
import { displayReasonDescToolsAsset, optionReason } from '@/enum'

const useAssetList = () => {
  const { id: accountLedgerId } = useAppSelector((state) => state.ledgerRefData)

  const { typeToolAsset, typeMethodAddToolAsset, typeIncreaseOrDecrease } =
    useCheckPath()

  const defaultValues = {
    search: '',
    page: 0,
    size: MAX_VALUE,
    ...(typeToolAsset !== 'ASSET'
      ? {
          start: convertToDate(moment().startOf('month'), 'YYYY-MM-DD'),
          end: convertToDate(moment().endOf('month'), 'YYYY-MM-DD'),
        }
      : {}),
    increaseType: typeIncreaseOrDecrease,
  }

  const [queryPage, setQueryPage] = useState<any>(
    _.omitBy(defaultValues, _.isNil)
  )

  const onChangePageSize = (val: any) => {
    const { page, size } = val
    const input = { ...queryPage, page, size, accountLedgerId: accountLedgerId }
    setQueryPage(input)
  }

  const methodForm = useFormCustom<RequestBody['GET']>({
    defaultValues,
  })

  const {
    data: dataAsset,
    refetch: refetchTools,
    isLoading: isLoadingAssetLst,
  } = useQueryGetDeCreaseAssetList(
    {
      ...queryPage,
      accountLedgerId: accountLedgerId,
    },
    {
      enabled: !(typeToolAsset === 'TOOL'),
    }
  )

  const { control, setValue, watch } = methodForm

  const onReset = () => {
    methodForm.reset(defaultValues)
    const input = _.omitBy(defaultValues, (v) => _.isNil(v))
    setQueryPage(input)
  }

  const onSubmit = methodForm.handleSubmit(async (input) => {
    const formatData = {
      ...input,
      accountLedgerId: accountLedgerId,
    }
    setQueryPage(formatData)
  })

  const assetColumns = useMemo(
    () =>
      [
        {
          header: 'Ngày hạch toán',
          fieldName: 'accountingDate',
        },
        {
          header: 'Mã ghi giảm',
          fieldName: 'code',
        },
        {
          header: 'Ngày ghi giảm',
          fieldName: 'increaseRecordDate',
        },
        {
          header: 'Lý do ghi giảm',
          fieldName: 'reason',
        },
      ] as ColumnProps[],
    []
  )
  const dataAssetLst = (dataAsset?.data?.content ?? []).map((i) => {
    return {
      ...i,
      increaseRecordDate: i?.increaseRecordDate,
      code: i?.code,
      remainAmount: i?.remainAmount,
      reason: i?.reason ? displayReasonDescToolsAsset[i.reason] : null,
    }
  })
  return [
    {
      typeMethodAddToolAsset,
      typeToolAsset,
      methodForm,
      columns: assetColumns,
      tableData: dataAssetLst,
      totalPages: dataAsset?.data?.totalPages,
      size: dataAsset?.data?.size,
      page: dataAsset?.data?.page,
      isLoading: isLoadingAssetLst,
    },
    { setValue, watch, onChangePageSize, onSubmit, onReset },
  ] as const
}

export default useAssetList
