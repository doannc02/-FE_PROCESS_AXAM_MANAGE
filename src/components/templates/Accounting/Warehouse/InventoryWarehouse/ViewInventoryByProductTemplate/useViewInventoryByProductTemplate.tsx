import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import useCheckPath from '@/components/hooks/path/useCheckPath'
import { Action } from '@/components/molecules/Action'
import { ColumnProps } from '@/components/organism/CoreTable'
import { RED } from '@/helper/colors'
import { useAppSelector } from '@/redux/hook'
import { MENU_URL } from '@/routes'
import { useQueryGetInventoryByProductTemplate } from '@/service/warehouse/inventoryFirstPeriod/viewInventoryByProductTemplate/list'
import { RequestParams } from '@/service/warehouse/inventoryFirstPeriod/viewInventoryByProductTemplate/list/type'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

const defaultValues = {
  search: '',
  sku: '',
  name: '',
  productTemplateId: null,
  page: 0,
  size: 20,
  startDate: moment().startOf('month').format('YYYY-MM-DDTHH:mm:ssZ'),
  endDate: moment().endOf('month').format('YYYY-MM-DDTHH:mm:ssZ'),
}

export const listType = [
  {
    value: 'ALL',
    label: 'Tất cả',
  },
  {
    value: 'LOTS',
    label: 'Theo lô',
  },
  {
    value: 'SERIAL',
    label: 'Theo serial',
  },
]

export const useViewInventoryByProductTemplate = () => {
  const router = useRouter()
  const { currency } = useAppSelector((state) => state.companyConfigData)
  const { typeWareHouse } = useCheckPath()
  const [queryPage, setQueryPage] =
    useState<RequestParams['GET']>(defaultValues)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const { isLoading, data, refetch } =
    useQueryGetInventoryByProductTemplate(queryPage)

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
          header: 'Tên sản phẩm',
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
        {
          header: 'Hành động',
          fieldName: 'action',
        },
      ] as ColumnProps[],
    [currency]
  )

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
          action: item?.product?.sku && (
            <Action
              actionList={['watch']}
              onWatchAction={() =>
                router.push({
                  pathname: `${MENU_URL.WARE_HOUSE[typeWareHouse].INVENTORY_WAREHOUSE.DEPARTMENT.VIEW_BY_PRODUCT_TEMPLATE}/viewVariants`,
                  query: {
                    productTemplateId: item.product.id,
                    productTemplateName: item?.product?.name,
                  },
                })
              }
            />
          ),
        }
      })
    : []

  return [
    {
      methodForm,
      isLoading,
      columns,
      rowData,
      data,
      open,
      anchorEl,
      queryPage,
    },
    {
      onSubmit,
      onReset,
      refetch,
      onChangePageSize,
      handleClick,
      handleClose,
      setQueryPage,
    },
  ] as const
}
