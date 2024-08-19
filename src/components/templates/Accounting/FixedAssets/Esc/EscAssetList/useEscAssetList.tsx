import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import useCheckPath from '@/components/hooks/path/useCheckPath'
import { TruncatedText } from '@/components/molecules/TruncatedText'
import { ColumnProps } from '@/components/organism/CoreTable'
import { MAX_VALUE } from '@/helper/contain'
import { convertToDate } from '@/utils/date/convertToDate'
import { useFormCustom } from '@/lib/form'
import { useAppSelector } from '@/redux/hook'
import { useQueryGetIncreaseAssetList } from '@/service/accounting/fixedAsset/getList/getIncreaseAsset'
import { useQueryGetTotal } from '@/service/accounting/fixedAsset/increaseAssetTotal'
import { useQueryGetIncreaseToolList } from '@/service/accounting/increaseTools/getList'
import _ from 'lodash'
import moment from 'moment'
import { useMemo, useState } from 'react'

const useEscAssetList = () => {
  const { id: accountLedgerId } = useAppSelector((state) => state.ledgerRefData)

  const { typeToolAsset, typeMethodAddToolAsset, typeIncreaseOrDecrease } =
    useCheckPath()

  const defaultValues = {
    search: '',
    page: 0,
    size: MAX_VALUE,
    // start: convertToDate(moment().startOf('month'), 'YYYY-MM-DD'),
    // end: convertToDate(moment().endOf('month'), 'YYYY-MM-DD'),
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

  const methodForm = useFormCustom<any>({
    defaultValues,
  })

  const {
    data: dataTools,
    refetch: refetchTools,
    isLoading: isLoadingTool,
  } = useQueryGetIncreaseToolList(
    {
      ...queryPage,
      accountLedgerId: accountLedgerId,
    },
    {
      enabled: !(typeToolAsset === 'ASSET'),
    }
  )

  const {
    data: dataAssets,
    refetch: refetchAssets,
    isLoading: isLoadingAssets,
  } = useQueryGetIncreaseAssetList(
    {
      ...queryPage,
      accountLedgerId: accountLedgerId,
    },
    {
      enabled: !!(typeToolAsset === 'ASSET'),
    }
  )

  // call func get total increase asset
  const {
    data: increaseAssetTotal,
    isLoading: isLoadingIncreaseAssetTotal,
    refetch: fetchTotal,
  } = useQueryGetTotal({
    ...queryPage,
    accountLedgerId: accountLedgerId,
    toolsAsset: typeToolAsset === 'TOOL' ? 'TOOLS' : 'ASSET',
  })

  const { currency } = useAppSelector((state) => state?.companyConfigData)

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
          header: 'Mã ghi tăng',
          fieldName: 'code',
        },
        {
          header: 'Ngày ghi tăng',
          fieldName: 'increaseRecordDate',
        },
        {
          header: 'Mã tài sản',
          fieldName: 'toolsCode',
        },
        {
          header: 'Tên tài sản cố định',
          fieldName: 'name',
        },
        {
          header: 'Lý do ghi tăng',
          fieldName: 'reason',
        },
        {
          header: 'Phòng ban quản lý',
          fieldName: 'department',
        },
        {
          header: 'Giá trị' + ` (${currency})`,
          fieldName: 'recordValue',
        },
        {
          header: 'Giá trị còn lại' + ` (${currency})`,
          fieldName: 'remainAmount',
        },
        {
          header: 'Thời gian sử dụng' + ` (Tháng)`,
          fieldName: 'timesUsed',
        },
        {
          header: 'Giá trị KH tháng' + ` (${currency})`,
          fieldName: 'periodicAllocation',
        },
        {
          header: 'TK nguyên giá',
          fieldName: 'account',
        },
        {
          header: 'TK khấu hao',
          fieldName: 'depreciationAccount',
        },
        {
          header: 'Ngày bắt đầu tính KH',
          fieldName: 'startDepreciation',
        },
      ] as ColumnProps[],
    [currency]
  )

  const toolColumns = useMemo(
    () =>
      [
        {
          header: 'Mã ghi tăng',
          fieldName: 'code',
        },
        {
          header: 'Ngày ghi tăng',
          fieldName: 'increaseRecordDate',
        },
        {
          header: 'Mã CCDC',
          fieldName: 'toolsCode',
        },
        {
          header: 'Tên CCDC',
          fieldName: 'name',
        },
        {
          header: 'Loại CCDC',
          fieldName: 'typeToolsName',
        },
        {
          header: 'Lý do ghi tăng',
          fieldName: 'reason',
        },
        {
          header: 'ĐVT',
          fieldName: 'unitName',
        },
        {
          header: 'SL ghi tăng',
          fieldName: 'quantity',
        },
        {
          header: 'Giá trị ghi tăng' + ` (${currency})`,
          fieldName: 'recordedValue',
        },
        {
          header: 'Số kỳ phân bổ',
          fieldName: 'numberOfAllocationPeriods',
        },
        {
          header: 'Số tiền PBHK' + ` (${currency})`,
          fieldName: 'periodicAllocation',
        },
      ] as ColumnProps[],
    [currency]
  )

  const dataTableAssets = (dataAssets?.data?.content ?? []).map((i) => {
    return {
      id: i?.id,
      department: i?.department?.name,
      code: i?.code,
      increaseRecordDate: i?.increaseRecordDate,
      toolsCode: i?.product?.sku ?? '',
      name: i?.product?.name ?? '',
      reason: <TruncatedText text={i?.reason} />,
      remainAmount: <CurrencyFormatCustom amount={i?.remainAmount ?? 0} />,
      typeToolsName: i?.typeTools?.name ?? '',
      unitName: i?.unit?.name ?? '',
      periodicAllocation: (
        <CurrencyFormatCustom amount={i?.periodicAllocation ?? 0} />
      ),
      recordedValue: <CurrencyFormatCustom amount={i?.recordedValue ?? 0} />,
      numberOfAllocationPeriods: i?.numberOfAllocationPeriods,
      recordValue: <CurrencyFormatCustom amount={i?.recordedValue ?? 0} />,
      timesUsed: i?.numberOfAllocationPeriods,
      startDepreciation: i?.startDepreciation,
      depreciationAccount: i?.depreciationAccount?.name ?? '',
      account: i?.account?.name ?? '',
    }
  })

  const dataTableTools = (dataTools?.data?.content ?? []).map((i) => {
    return {
      ...i,
      code: i?.code,
      increaseRecordDate: i?.increaseRecordDate,
      toolsCode: i?.product?.sku,
      name: i?.product?.name,
      reason: <TruncatedText text={i?.reason} />,
      typeToolsName: i?.typeTools?.name,
      unitName: i?.unit?.name,
      periodicAllocation: (
        <CurrencyFormatCustom amount={i?.periodicAllocation ?? 0} />
      ),
      recordedValue: <CurrencyFormatCustom amount={i?.recordedValue ?? 0} />,
      numberOfAllocationPeriods: i?.numberOfAllocationPeriods,
      quantity: i?.quantity,
    }
  })
  return [
    {
      increaseAssetTotal,
      isLoadingIncreaseAssetTotal,
      typeMethodAddToolAsset,
      typeToolAsset,
      methodForm,
      columns: typeToolAsset === 'ASSET' ? assetColumns : toolColumns,
      tableData: typeToolAsset === 'ASSET' ? dataTableAssets : dataTableTools,
      totalPages:
        typeToolAsset === 'ASSET'
          ? dataAssets?.data?.totalPages
          : dataTools?.data?.totalPages,
      size:
        typeToolAsset === 'ASSET'
          ? dataAssets?.data?.size
          : dataTools?.data?.size,
      page:
        typeToolAsset === 'ASSET'
          ? dataAssets?.data?.page
          : dataTools?.data?.page,
      isLoadingTable:
        typeToolAsset === 'ASSET' ? isLoadingAssets : isLoadingTool,
    },
    { setValue, watch, onChangePageSize, onSubmit, onReset },
  ] as const
}

export default useEscAssetList
