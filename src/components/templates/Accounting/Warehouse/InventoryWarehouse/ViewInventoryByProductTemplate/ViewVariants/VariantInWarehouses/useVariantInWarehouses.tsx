import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { Action } from '@/components/molecules/Action'
import { ColumnProps } from '@/components/organism/CoreTable'
import { RED } from '@/helper/colors'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { RequestParams } from '@/service/warehouse/inventoryFirstPeriod/viewInventoryByWarehouse/list/type'
import { useQueryGetInventoryByWarehouse } from '@/service/warehouse/inventoryFirstPeriod/viewInventoryByWarehouse/list'
import { useQueryGetWarehouseList } from '@/service/warehouse/getList'
import { useAppSelector } from '@/redux/hook'
import moment from 'moment'

export const useViewVariantInWarehouses = () => {
  const router = useRouter()
  const { currency } = useAppSelector((state) => state.companyConfigData)

  const { showDialog } = useDialog()
  const { productName, productId, productTemplateName, productTemplateId } =
    router.query

  const defaultValues = {
    search: '',
    page: 0,
    size: 20,
    productId: Number(productId) ?? null,
    productTemplateId: Number(productTemplateId) ?? null,
    warehouseId: null,
    startDate: moment().startOf('month').format('YYYY-MM-DDTHH:mm:ssZ'),
    endDate: moment().endOf('month').format('YYYY-MM-DDTHH:mm:ssZ'),
  }
  const [queryPage, setQueryPage] =
    useState<RequestParams['GET']>(defaultValues)

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
          header: 'Tên Kho',
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
        { header: `Giá trị tồn (${currency})`, fieldName: 'productTotalPrice' },
        // {
        //   header: 'Hành động',
        //   fieldName: 'action',
        // },
      ] as ColumnProps[],
    [currency]
  )

  const { isLoading, data, refetch } = useQueryGetInventoryByWarehouse(
    queryPage,
    {
      enabled: !!productTemplateId,
    }
  )

  const { isLoading: isLoadingWarehouse, data: warehouseData } =
    useQueryGetWarehouseList({ page: 0, size: 1000 })

  const rowData = data
    ? (data?.data.content ?? []).map((item) => {
        return {
          code: item.warehouse.code,
          name: item.warehouse.name,
          // availableQuantity: (
          //   <>
          //     <CurrencyFormatCustom
          //       amount={item?.availableQuantity}
          //       className='contents'
          //     />{' '}
          //     sản phẩm
          //   </>
          // ),
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
          //       showDialog(
          //         <DialogViewProductsInOneWarehouse
          //           title={item?.name}
          //           warehouseId={item?.warehouseId}
          //           productId={Number(variantId)}
          //           checkingType={checkingType?.toString()}
          //         />
          //       )
          //     }}
          //   ></Action>
          // ),
        }
      })
    : []

  return [
    {
      productName,
      methodForm,
      isLoading,
      columns,
      rowData,
      data,
      isLoadingWarehouse,
      warehouseData: warehouseData?.data.content ?? [],
    },
    {
      onSubmit,
      onReset,
      refetch,
      onChangePageSize,
    },
  ] as const
}
