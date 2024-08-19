import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import useCheckPath from '@/components/hooks/path/useCheckPath'
import { ColumnProps } from '@/components/organism/CoreTable'
import { MAX_VALUE } from '@/helper/contain'
import { convertToDate } from '@/utils/date/convertToDate'
import { useFormCustom } from '@/lib/form'
import { useAppSelector } from '@/redux/hook'
import { useQueryGetTrackingAssetList } from '@/service/accounting/fixedAsset/monitoring/getListTracking'
import { useQueryGetTotalTrackingEscAsset } from '@/service/accounting/fixedAsset/monitoring/getTotalTracking'
import { useQueryGetTrackingToolList } from '@/service/accounting/increaseTools/monitoring/getListTracking'
import { useQueryGetTotalTrackingEscTool } from '@/service/accounting/increaseTools/monitoring/getTotalTracking'
import _ from 'lodash'
import moment from 'moment'
import { useMemo, useState } from 'react'

const defaultValues = {
  search: '',
  page: 0,
  size: MAX_VALUE,
  start: convertToDate(moment().startOf('month'), 'YYYY-MM-DD'),
  end: convertToDate(moment().endOf('month'), 'YYYY-MM-DD'),
}
const useMonitoringList = () => {
  const { id: accountLedgerId } = useAppSelector((state) => state.ledgerRefData)

  const { typeToolAsset } = useCheckPath()

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

  const { data: dataAssets, isLoading: isLoadingAssets } =
    useQueryGetTrackingAssetList(
      {
        ...queryPage,
        accountLedgerId: accountLedgerId,
      },
      {
        enabled: !!(typeToolAsset === 'ASSET'),
      }
    )

  const { data: totalAmountAsset, isLoading: isLoadingTotalAmountAsset } =
    useQueryGetTotalTrackingEscAsset(
      {
        ...queryPage,
        accountLedgerId: accountLedgerId,
      },
      {
        enabled: !!(typeToolAsset === 'ASSET'),
      }
    )

  //---------- tracking tool
  const {
    data: dataTools,
    refetch,
    isLoading: isLoadingTool,
  } = useQueryGetTrackingToolList(
    {
      ...queryPage,
      accountLedgerId: accountLedgerId,
    },
    {
      enabled: !!(typeToolAsset === 'TOOL'),
    }
  )

  const { data: totalAmountTool, isLoading: isLoadingTotalAmountTool } =
    useQueryGetTotalTrackingEscTool(
      {
        ...queryPage,
        accountLedgerId: accountLedgerId,
      },
      {
        enabled: !!(typeToolAsset === 'TOOL'),
      }
    )

  const { currency } = useAppSelector((state) => state.companyConfigData)

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
          header: 'Ngày chứng từ',
          fieldName: 'documentDate',
        },
        {
          header: 'Mã ghi tăng',
          fieldName: 'increaseCode',
        },
        {
          header: `Mã ${typeToolAsset === 'ASSET' ? ' tài sản' : ' CCDC'} `,
          fieldName: 'productSku',
        },
        {
          header: `Tên ${typeToolAsset === 'ASSET' ? ' tài sản' : ' CCDC'} `,
          fieldName: 'productName',
        },
        {
          header: `${
            typeToolAsset === 'ASSET' ? 'Phiếu khấu hao' : 'Phiếu phân bổ'
          }`,
          fieldName: 'allocationNote',
        },
        {
          header: 'Diễn giải',
          fieldName: 'explain',
        },
        {
          header: `${
            typeToolAsset === 'ASSET'
              ? 'Tổng số tiền khấu hao'
              : 'Tổng số tiền phân bổ'
          }`,
          fieldName: 'amount',
        },
      ] as ColumnProps[],
    [typeToolAsset]
  )

  const dataTableAsset = (dataAssets?.data?.content ?? []).map((i) => {
    return {
      accountingDate: i?.accountingDate,
      documentDate: i?.documentDate,
      increaseCode: i?.increaseCode,
      productSku: i?.productSku,
      productName: i?.productName,
      allocationNote: i?.allocationNote,
      explain: i?.explain,
      amount: (
        <CurrencyFormatCustom
          amount={i?.amount}
          showCurrencyName
        ></CurrencyFormatCustom>
      ),
    }
  })

  const dataTableTools = (dataTools?.data?.content ?? []).map((i) => {
    return {
      accountingDate: i?.accountingDate,
      documentDate: i?.documentDate,
      increaseCode: i?.increaseCode,
      productSku: i?.productSku,
      productName: i?.productName,
      allocationNote: i?.allocationNote,
      explain: i?.explain,
      amount: (
        <CurrencyFormatCustom
          amount={i?.amount}
          showCurrencyName
        ></CurrencyFormatCustom>
      ),
    }
  })

  const dataTable = useMemo(() => {
    return typeToolAsset === 'ASSET' ? dataTableAsset : dataTableTools
  }, [dataTableAsset, dataTableTools, typeToolAsset])
  return [
    {
      totalAmount:
        typeToolAsset === 'ASSET' ? totalAmountAsset : totalAmountTool,
      typeToolAsset,
      methodForm,
      columns: assetColumns,
      tableData: dataTable,
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

export default useMonitoringList
