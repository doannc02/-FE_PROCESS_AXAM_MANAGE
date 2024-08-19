import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import useCheckPath from '@/components/hooks/path/useCheckPath'
import { ColumnProps } from '@/components/organism/CoreTable'
import { generateCode } from '@/helper/autoGen'
import { MAX_VALUE } from '@/helper/contain'
import { useFormCustom } from '@/lib/form'
import { useAppSelector } from '@/redux/hook'
import { useQueryGetAccountAllocationList } from '@/service/accounting/accountMove/allocation'
import { useQueryGetAssetGroupProduct } from '@/service/asset/getGroupProduct'
import { getEndDateOfMonth, getStartDateOfMonth } from '@/utils/date/date'
import { Checkbox } from '@mui/material'
import _ from 'lodash'
import { useMemo, useState } from 'react'

const useDialogMethodAddNew = (type: string) => {
  const { typeToolAsset: typeAddNew } = useCheckPath()

  const idLedger = useAppSelector((state) => state.ledgerRefData.id)

  const defaultValues = {
    page: 0,
    size: MAX_VALUE,
    start: getStartDateOfMonth(true),
    end: getEndDateOfMonth(true),
    type: typeAddNew === 'ASSET' ? 'ASSET' : 'TOOLS',
    accountLedgerId: Number(idLedger),
  }

  const methodForm = useFormCustom<any>({
    defaultValues,
  })

  const [queryPage, setQueryPage] = useState<any>(
    _.omitBy(defaultValues, _.isNil)
  )

  const [selectedProductId, setProductIdsSelectedId] =
    useState<number | null>(null)

  const { data: dataAsset, isLoading: isLoadingAsset } =
    useQueryGetAssetGroupProduct(
      { ...queryPage },
      {
        enabled: type === 'ASSET',
      }
    )
  const { data: dataPO, isLoading: isLoadingTool } =
    useQueryGetAccountAllocationList(
      {
        ...queryPage,
      },
      {
        enabled: type === 'PURCHASE',
      }
    )
  const isLoadingTable = isLoadingAsset || isLoadingTool
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

  const dtPO = useMemo(() => {
    return dataPO?.data?.content ?? []
  }, [dataPO?.data?.content])

  const dtAsset = useMemo(() => {
    return dataAsset?.data?.content ?? []
  }, [dataAsset?.data?.content])

  const data = useMemo(() => {
    return type === 'PURCHASE' ? dtPO : dtAsset
  }, [dtAsset, dtPO, type])

  const codeIncrease = useMemo(() => {
    return generateCode(typeAddNew === 'TOOL' ? 'GTCC' : 'GTTS')
  }, [typeAddNew])
  const handleDataGenCode = useMemo(() => {
    return data.map((i) => {
      return { ...i, code: codeIncrease }
    })
  }, [codeIncrease, data])

  const columns = useMemo(() => {
    return [
      {
        header: '',
        fieldName: 'checkbox',
        styleCell: { width: '50px' },
      },
      { header: 'Mã hàng', fieldName: 'code' },
      { header: 'Tên hàng', fieldName: 'name' },
      ...(type === 'PURCHASE'
        ? [{ header: 'Mã chứng từ', fieldName: 'orderCode' }]
        : []),
      { header: 'Đơn vị tính', fieldName: 'unitName' },
      { header: 'Số lượng', fieldName: 'quantity' },
      { header: 'Thành tiền', fieldName: 'amountTotal' },
    ] as ColumnProps[]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type])

  const tableData = handleDataGenCode?.map((i) => {
    let isDisabled
    isDisabled = i?.id
      ? selectedProductId !== null && selectedProductId !== i?.id
      : selectedProductId !== null && selectedProductId !== i?.productId
    return {
      checkbox: (
        <Checkbox
          checked={
            !!(i?.id
              ? selectedProductId === i?.id
              : selectedProductId === i?.productId)
          }
          onChange={(_, checked) => {
            if (checked) {
              setProductIdsSelectedId(() => {
                return i?.id ? Number(i?.id) : Number(i?.productId)
              })
            } else {
              setProductIdsSelectedId(null)
            }
          }}
          disabled={isDisabled || i.isHiding}
        />
      ),
      name: i?.name,
      code: i?.sku,
      orderCode: i?.orderCode,
      unitName: i?.unit?.name,
      quantity: i?.quantity,
      amountTotal: <CurrencyFormatCustom amount={i?.amountTotal} />,
    }
  })

  return [
    {
      methodForm,
      tableData,
      codeIncrease,
      columns,
      selectedProductId,
      isLoadingTable,
    },
    { onSubmit, onReset, onChangePageSize, setProductIdsSelectedId },
  ] as const
}

export default useDialogMethodAddNew
