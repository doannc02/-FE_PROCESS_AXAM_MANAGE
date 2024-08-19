import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { Action } from '@/components/molecules/Action'
import { ColumnProps } from '@/components/organism/CoreTable'
import { RED } from '@/helper/colors'
import { useAppSelector } from '@/redux/hook'
import { MENU_URL } from '@/routes'
import { useQueryGetProductsByWarehouseInventory } from '@/service/warehouse/inventoryFirstPeriod/viewInventoryByWarehouse/listWarehouseProduct'
import { RequestParams } from '@/service/warehouse/inventoryFirstPeriod/viewInventoryByWarehouse/listWarehouseProduct/type'
import { Typography } from '@mui/material'
import moment from 'moment'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

export const useProductsInWarehouse = () => {
  const { showDialog } = useDialog()
  const { currency } = useAppSelector((state) => state.companyConfigData)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const checkingTypeOptions = [
    { value: 'ALL', label: 'Tất cả' },
    {
      value: 'LOTS',
      label: 'Xem theo lô',
    },
    {
      value: 'SERIAL',
      label: 'Xem theo serial',
    },
  ]

  const router = useRouter()

  const { id, name } = router.query
  const warehouseId = Number(id)
  const defaultValues = {
    startDate: moment().startOf('month').format('YYYY-MM-DDTHH:mm:ssZ'),
    endDate: moment().endOf('month').format('YYYY-MM-DDTHH:mm:ssZ'),
    page: 0,
    size: 20,
    warehouseId: Number(id),
  }
  const [queryPage, setQueryPage] =
    useState<RequestParams['GET']>(defaultValues)

  const { isLoading, data, refetch } = useQueryGetProductsByWarehouseInventory(
    queryPage,
    { enabled: !!Number(id) }
  )

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

  const columns = [
    {
      header: 'SKU',
      fieldName: 'sku',
    },
    {
      header: 'Tên sản phẩm',
      fieldName: 'name',
    },
    {
      header: 'Số lượng',
      fieldName: 'firstPeriodQty',
    },
    {
      header: `Giá trị tồn (${currency})`,
      fieldName: 'firstPeriodPrice',
    },
    {
      header: 'Số lượng',
      fieldName: 'receiveQty',
    },
    {
      header: `Giá trị tồn (${currency})`,
      fieldName: 'receivePrice',
    },
    {
      header: 'Số lượng',
      fieldName: 'deliveryQty',
    },
    {
      header: `Giá trị tồn (${currency})`,
      fieldName: 'deliveryPrice',
    },
    {
      header: 'Số lượng',
      fieldName: 'finalPeriodQty',
    },
    {
      header: `Giá trị tồn (${currency})`,
      fieldName: 'finalPeriodPrice',
    },
    // {
    //   header: `Giá trị tồn (${currency})`,
    //   fieldName: 'productTotalPrice',
    // },
    // {
    //   header: 'Xem tồn kho',
    //   fieldName: 'view',
    // },
    ,
  ] as ColumnProps[]

  const rowData = data
    ? (data?.data?.content ?? []).map((item) => {
        return {
          id: item?.product?.id,
          sku: item?.product?.sku,
          name: item?.product?.name,
          firstPeriodQty: (
            <>
              <Typography sx={{ display: 'flex', justifyContent: 'center' }}>
                <CurrencyFormatCustom
                  amount={item?.firstPeriodQty}
                  className='contents'
                />
              </Typography>

              {/* {item?.uomName ?? ''} */}
            </>
          ),
          firstPeriodPrice: (
            <>
              <Typography sx={{ display: 'flex', justifyContent: 'center' }}>
                <CurrencyFormatCustom
                  color={RED}
                  amount={item?.firstPeriodPrice}
                  className='contents'
                />
              </Typography>
              {/* {item?.uomName ?? ''} */}
            </>
          ),
          deliveryQty: (
            <>
              <Typography sx={{ display: 'flex', justifyContent: 'center' }}>
                <CurrencyFormatCustom
                  amount={item?.deliveryQty}
                  className='contents'
                />
              </Typography>
              {/* {item?.uomName ?? ''} */}
            </>
          ),
          deliveryPrice: (
            <>
              <Typography sx={{ display: 'flex', justifyContent: 'center' }}>
                <CurrencyFormatCustom
                  color={RED}
                  amount={item?.deliveryPrice}
                  className='contents'
                />
              </Typography>
              {/* {item?.uomName ?? ''} */}
            </>
          ),
          receiveQty: (
            <>
              <Typography sx={{ display: 'flex', justifyContent: 'center' }}>
                <CurrencyFormatCustom
                  amount={item?.receiveQty}
                  className='contents'
                />
              </Typography>
              {/* {item?.uomName ?? ''} */}
            </>
          ),
          receivePrice: (
            <>
              <Typography sx={{ display: 'flex', justifyContent: 'center' }}>
                <CurrencyFormatCustom
                  color={RED}
                  amount={item?.receivePrice}
                  className='content'
                />
              </Typography>
              {/* {item?.uomName ?? ''} */}
            </>
          ),
          finalPeriodQty: (
            <>
              <Typography sx={{ display: 'flex', justifyContent: 'center' }}>
                <CurrencyFormatCustom
                  amount={
                    item?.firstPeriodQty + item?.receiveQty - item?.deliveryQty
                  }
                  className='contents'
                />
              </Typography>
              {/* {item?.uomName ?? ''} */}
            </>
          ),
          finalPeriodPrice: (
            <>
              <Typography sx={{ display: 'flex', justifyContent: 'center' }}>
                <CurrencyFormatCustom
                  color={RED}
                  amount={
                    item?.firstPeriodPrice +
                    item?.receivePrice -
                    item?.deliveryPrice
                  }
                  className='contents'
                />
              </Typography>
              {/* {item?.uomName ?? ''} */}
            </>
          ),
        }
      })
    : []

  return [
    {
      data,
      methodForm,
      isLoading,
      columns,
      rowData,
      checkingTypeOptions,
      queryPage,
      open,
      anchorEl,
      titlePage: name as string,
      warehouseId,
    },
    {
      onChangePageSize,
      onSubmit,
      onReset,
      setQueryPage,
      handleClick,
      handleClose,
    },
  ] as const
}
