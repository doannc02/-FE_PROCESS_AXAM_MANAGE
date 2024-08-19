import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import useCheckPath from '@/components/hooks/path/useCheckPath'
import { ColumnProps } from '@/components/organism/CoreTable'
import { RED } from '@/helper/colors'
import { useAppSelector } from '@/redux/hook'
import { useQueryGetWarehouseList } from '@/service/warehouse/getList'
import { useQueryGetInventoryByWarehouse } from '@/service/warehouse/inventoryFirstPeriod/viewInventoryByWarehouse/list'
import { RequestParams } from '@/service/warehouse/inventoryFirstPeriod/viewInventoryByWarehouse/list/type'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

export const useViewInventoryByWarehouse = () => {
  const router = useRouter()
  const { currency } = useAppSelector((state) => state.companyConfigData)

  const defaultValues = {
    startDate: moment().startOf('month').format('YYYY-MM-DDTHH:mm:ssZ'),
    endDate: moment().endOf('month').format('YYYY-MM-DDTHH:mm:ssZ'),
    page: 0,
    size: 20,
    search: '',
    productTemplateId: null,
    productId: null,
  }
  const [queryPage, setQueryPage] =
    useState<RequestParams['GET']>(defaultValues)
  const { typeWareHouse } = useCheckPath()

  const { isLoading, data, refetch } =
    useQueryGetInventoryByWarehouse(queryPage)

  const { isLoading: isLoadingWarehouse, data: warehouseData } =
    useQueryGetWarehouseList({ page: 0, size: 1000 })

  const methodForm = useForm<RequestParams['GET']>({
    defaultValues,
  })

  const onSubmit = methodForm.handleSubmit(async (data) => {
    setQueryPage({ ...queryPage, ...data })
  })

  const onReset = () => {
    methodForm.reset()
    setQueryPage(defaultValues)
  }

  const onChangePageSize = (val: any) => {
    const { page, size } = val
    setQueryPage({ ...queryPage, page: page, size })
  }

  const columns = useMemo(
    () =>
      [
        {
          header: 'Mã kho',
          fieldName: 'code',
        },
        {
          header: 'Tên kho',
          fieldName: 'name',
        },
        {
          header: 'Tồn trong kho',
          fieldName: 'quantity',
        },
        // {
        //   header: 'Tồn bán hàng',
        //   fieldName: 'availableQuantity',
        // },
        // {
        //   header: 'Tồn giữ hàng',
        //   fieldName: 'reservedQuantity',
        // },
        {
          header: `Giá trị tồn (${currency})`,
          fieldName: 'productTotalPrice',
        },
        ,
      ] as ColumnProps[],
    [currency]
  )

  const rowData = data
    ? (data?.data.content ?? []).map((item) => {
        return {
          id: item.warehouse.id,
          code: item.warehouse.code,
          name: item.warehouse.name,
          quantity: (
            <>
              <CurrencyFormatCustom
                amount={
                  item?.firstPeriodQty + item?.receiveQty - item?.deliveryQty
                }
                className='contents'
              />
              &nbsp;sản phẩm
            </>
          ),
          productTotalPrice: (
            <CurrencyFormatCustom
              amount={
                item?.firstPeriodPrice +
                item?.receivePrice -
                item?.deliveryPrice
              }
              color={RED}
            />
          ),
          // action: (
          //   <Action
          //     actionList={['watch']}
          //     onWatchAction={() => {
          //       router.push({
          //         pathname: `${MENU_URL.WARE_HOUSE[typeWareHouse].INVENTORY_WAREHOUSE.DEPARTMENT.VIEW_BY_WAREHOUSE}/productsInWarehouse`,
          //         query: {
          //           id: item.warehouse.id,
          //         },
          //       })
          //     }}
          //   ></Action>
          // ),
        }
      })
    : []

  return [
    {
      methodForm,
      data,
      isLoading,
      columns,
      rowData,
      isLoadingWarehouse,
      warehouseData: warehouseData?.data.content ?? [],
    },
    {
      onChangePageSize,
      onSubmit,
      onReset,
    },
  ] as const
}
