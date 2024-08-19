import useCheckPath from '@/components/hooks/path/useCheckPath'
import { ColumnProps } from '@/components/organism/CoreTable'
import { MAX_VALUE } from '@/helper/contain'
import { useFormCustom } from '@/lib/form'
import { useAppSelector } from '@/redux/hook'
import { useQueryGetDeCreaseToolList } from '@/service/accounting/increaseTools/getList'
import { RequestBody } from '@/service/accounting/increaseTools/getList/type'
import { convertToDate } from '@/utils/date/convertToDate'
import _ from 'lodash'
import moment from 'moment'
import { useMemo, useState } from 'react'

const useToolsList = () => {
  const { id: accountLedgerId } = useAppSelector((state) => state.ledgerRefData)

  const { typeToolAsset, typeMethodAddToolAsset, typeIncreaseOrDecrease } =
    useCheckPath()

  const defaultValues = {
    search: '',
    page: 0,
    size: MAX_VALUE,
    start: convertToDate(moment().startOf('month'), 'YYYY-MM-DD'),
    end: convertToDate(moment().endOf('month'), 'YYYY-MM-DD'),
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
    data: dataTools,
    refetch: refetchTools,
    isLoading: isLoadingTool,
  } = useQueryGetDeCreaseToolList(
    {
      ...queryPage,
      accountLedgerId: accountLedgerId,
    },
    {
      enabled: !(typeToolAsset === 'ASSET'),
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

  const toolColumns = useMemo(
    () =>
      [
        {
          header: 'Ngày ghi giảm',
          fieldName: 'increaseRecordDate',
        },
        {
          header: 'Mã ghi giảm',
          fieldName: 'code',
        },
        {
          header: 'Giá trị còn lại' + ` (${currency})`,
          fieldName: 'remainAmount',
        },
        {
          header: 'Lý do ghi giảm',
          fieldName: 'reason',
        },
      ] as ColumnProps[],
    [currency]
  )
  const dataTableTools = (dataTools?.data?.content ?? []).map((i) => {
    return {
      ...i,
      increaseRecordDate: i?.increaseRecordDate,
      code: i?.code,
      remainAmount: i?.remainAmount,
      reason:
        i?.reason === 'DAMAGE_LOSS'
          ? 'Hỏng hóc, mất mát'
          : 'Xuất bán, thanh lý',
    }
  })
  return [
    {
      typeMethodAddToolAsset,
      typeToolAsset,
      methodForm,
      columns: toolColumns,
      tableData: dataTableTools,
      totalPages: dataTools?.data?.totalPages,
      size: dataTools?.data?.size,
      page: dataTools?.data?.page,
      isLoading: isLoadingTool,
    },
    { setValue, watch, onChangePageSize, onSubmit, onReset },
  ] as const
}

export default useToolsList
