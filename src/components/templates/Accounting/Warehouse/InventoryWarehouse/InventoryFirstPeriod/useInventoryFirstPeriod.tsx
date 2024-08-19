import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { Action } from '@/components/molecules/Action'
import { ColumnProps } from '@/components/organism/CoreTable'
import { MAX_VALUE } from '@/helper/contain'
import { useFormCustom } from '@/lib/form'
import moment from 'moment'
import { useTranslation } from 'next-i18next'
import { useMemo, useState } from 'react'
import { useQueryGetInventoryFirstPeriodList } from '@/service/warehouse/inventoryFirstPeriod/list'
import { RequestBody } from '@/service/warehouse/inventoryFirstPeriod/list/type'
import { TRANSLATE } from '@/routes'

const defaultValues = {
  page: 0,
  size: 20,
  search: '',
  warehouseId: null,
}

export const useInventoryFirstPeriod = () => {
  const { t } = useTranslation(TRANSLATE.WARE_HOUSE)
  const [queryPage, setQueryPage] = useState<RequestBody['GET']>(defaultValues)
  const { showDialog } = useDialog()

  const { control, handleSubmit, reset } = useFormCustom<RequestBody['GET']>({
    defaultValues,
  })

  const { isLoading, data, refetch } =
    useQueryGetInventoryFirstPeriodList(queryPage)

  // const { data: warehouseSelect, isLoading: isLoadingWarehouse } =
  //   useQueryGetWarehouseList({
  //     page: 0,
  //     size: MAX_VALUE,
  //   })

  const onSubmit = handleSubmit(async (input) => {
    setQueryPage({ ...input })
  })

  const onChangePageSize = (val: any) => {
    const { page, size } = val
    setQueryPage({ ...queryPage, page, size })
  }

  const onReset = () => {
    reset(defaultValues)
    setQueryPage({ ...queryPage, ...defaultValues })
    refetch()
  }

  const columns = useMemo(
    () =>
      [
        {
          header: t('tableInventoryFirstPeriod.createdAt'),
          fieldName: 'createdAt',
        },
        {
          header: t('tableInventoryFirstPeriod.importer'),
          fieldName: 'employee',
        },
        {
          header: t('tableInventoryFirstPeriod.warehouse'),
          fieldName: 'warehouseName',
        },
        {
          header: t('tableInventoryFirstPeriod.quantity'),
          fieldName: 'quantity',
        },
        {
          header: 'Tổng tiền',
          fieldName: '',
        },
      ] as ColumnProps[],
    [t]
  )

  const rowInventoryFirstPeriod = (data?.data.content ?? []).map(
    (item, index) => {
      return {
        id: item.id,
        createdAt: moment(item?.createdAt).format('L'),
        warehouseName: item?.warehouseName,
        quantity: <CurrencyFormatCustom amount={item?.quantity} />,
        employee: `${item?.employee?.code && `${item?.employee?.code} - `}${
          item?.employee?.name
        }`,
        // action: (
        //   <Action
        //     actionList={['watch']}
        //     onWatchAction={() =>
        //       showDialog(
        //         <DialogViewDetailInventoryFirstPeriod id={item?.id} />
        //       )
        //     }
        //   />
        // ),
      }
    }
  )

  return [
    {
      control,
      columns,
      isLoading,
      rowInventoryFirstPeriod,
      data,
      t,
      // warehouseSelect: warehouseSelect?.content ?? [],
      // isLoadingWarehouse,
    },
    {
      refetch,
      onReset,
      onChangePageSize,
      onSubmit,
    },
  ] as const
}
