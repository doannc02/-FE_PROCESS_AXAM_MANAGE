import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import useCheckPath from '@/components/hooks/path/useCheckPath'
import { Action } from '@/components/molecules/Action'
import { ColumnProps } from '@/components/organism/CoreTable'
import { RED } from '@/helper/colors'
import { useAppSelector } from '@/redux/hook'
import { MENU_URL } from '@/routes'
import { useQueryGetInventoryByVariants } from '@/service/warehouse/inventoryFirstPeriod/viewInventoryByVariants/list'
import { RequestParams } from '@/service/warehouse/inventoryFirstPeriod/viewInventoryByVariants/list/type'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

export const useViewVariants = () => {
  const router = useRouter()
  const { currency } = useAppSelector((state) => state.companyConfigData)
  const { typeWareHouse } = useCheckPath()

  const { productTemplateName } = router.query
  const productTemplateId = Number(router.query.productTemplateId)
  const defaultValues = {
    sku: '',
    name: '',
    search: '',
    page: 0,
    size: 20,
    productTemplateId: productTemplateId,
    productTemplateName: productTemplateName,
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
          header: 'SKU',
          fieldName: 'sku',
        },
        {
          header: 'Tên biến thể',
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
        {
          header: 'Hành động',
          fieldName: 'action',
        },
      ] as ColumnProps[],
    [currency]
  )
  const { isLoading, data, refetch } = useQueryGetInventoryByVariants(queryPage)

  const rowData = data
    ? (data?.data.content ?? []).map((item) => {
        return {
          id: item?.product?.id,
          sku: item?.product?.sku,
          name: item?.product?.name,
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
          action: (
            <Action
              actionList={['watch']}
              onWatchAction={() =>
                router.push({
                  pathname: `${MENU_URL.WARE_HOUSE[typeWareHouse].INVENTORY_WAREHOUSE.DEPARTMENT.VIEW_BY_PRODUCT_TEMPLATE}/viewVariants/variantInWarehouses`,
                  query: {
                    productTemplateId,
                    productTemplateName,
                    productId: item?.product?.id,
                    productName: item?.product?.sku,
                    // checkingType: item?.checkingType,
                  },
                })
              }
            ></Action>
          ),
        }
      })
    : []

  return [
    {
      // productId,
      productName: methodForm.watch('productName'),
      methodForm,
      isLoading,
      columns,
      rowData,
      data,
      // typePath,
    },
    {
      onSubmit,
      onReset,
      refetch,
      onChangePageSize,
    },
  ] as const
}
