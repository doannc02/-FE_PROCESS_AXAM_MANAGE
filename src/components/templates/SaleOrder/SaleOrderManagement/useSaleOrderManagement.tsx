import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { Action } from '@/components/molecules/Action'
import { useFormCustom } from '@/lib/form'
import { useQueryGetListSaleOrder } from '@/service/salesOrder/salesOrder/list'
import { Request } from '@/service/salesOrder/salesOrder/list/type'
import moment from 'moment'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { Typography } from '@mui/material'
import { ColumnProps } from '@/components/organism/CoreTable'
import { MENU_URL } from '@/routes'
import { useAppSelector } from '@/redux/hook'
import { GREEN, ORANGE } from '@/helper/colors'
import { useCheckPath } from '@/path'
import { ViewDetailSaleOrderDialog } from './dialog/ViewDetailSaleOrderDialog'

const defaultValues = {
  page: 0,
  size: 20,
}

interface Map {
  [key: string]: {
    label: string
    colorCode: string
  }
}

export const StateSalesOrder: Map = {
  DRAFT: {
    label: 'Báo giá',
    colorCode: '#F89E19',
  },
  SENT: {
    label: 'Đã gửi báo giá',
    colorCode: '#A584FF',
  },
  SALE: {
    label: 'Đặt hàng',
    colorCode: '#213660',
  },
  DONE: {
    label: 'Hoàn thành',
    colorCode: '#00CC6A',
  },
  CANCEL: {
    label: 'Hủy',
    colorCode: '#FF4956',
  },
  // for case state is undefine
  DEFAULT: {
    label: '',
    colorCode: '#FF4956',
  },
}

export const saleOrderType: { [key: string]: string } = {
  BACK_DATE: 'Đơn back date',
  NORMAL: 'Đơn thường',
  NONE: 'Đơn thường',
}

export const stateFilter = [
  {
    label: 'Báo giá',
    value: 'DRAFT',
  },
  {
    label: 'Đã gửi báo giá',
    value: 'SENT',
  },
  {
    label: 'Đặt hàng',
    value: 'SALE',
  },
  {
    label: 'Hoàn thành',
    value: 'DONE',
  },
  {
    label: 'Hủy',
    value: 'CANCEL',
  },
]

export const invoiceStatusType: Map = {
  NO: {
    label: 'Chưa xuất',
    colorCode: ORANGE,
  },
  TO_INVOICE: {
    label: 'Chờ xuất',
    colorCode: '#A584FF',
  },
  PARTIAL_INVOICE: {
    label: 'Xuất 1 phần',
    colorCode: '#A584FF',
  },
  INVOICED: {
    label: 'Hoàn thành',
    colorCode: GREEN,
  },
  DEFAULT: {
    label: '',
    colorCode: GREEN,
  },
}

export const useSaleOrderManagement = () => {
  const router = useRouter()
  const [queryPage, setQueryPage] = useState<Request['GET']>(defaultValues)
  const { currency } = useAppSelector((state) => state.companyConfigData)
  const { register, handleSubmit, watch, setError, control, formState, reset } =
    useFormCustom<Request['GET']>({
      defaultValues,
    })

  const { showDialog } = useDialog()
  const { typePathSale } = useCheckPath()
  const PATH_URL = ''
  const {
    isLoading,
    data: dataListSalesOrder,
    refetch,
  } = useQueryGetListSaleOrder(queryPage)

  const columns = useMemo(
    () =>
      [
        {
          header: 'Mã đơn hàng',
          fieldName: 'code',
          styleCell: {
            style: {
              width: '128px',
            },
          },
        },
        {
          header: 'Loại đơn',
          fieldName: 'type',
          styleCell: {
            style: {
              width: '128px',
            },
          },
        },
        {
          header: 'Ngày tạo báo giá',
          fieldName: 'quoteCreationDate',
        },
        {
          header: 'Ngày gửi báo giá',
          fieldName: 'quotationDate',
        },
        {
          header: 'Ngày đặt hàng',
          fieldName: 'orderDate',
        },
        {
          header: 'Khách hàng',
          fieldName: 'partner',
          styleCell: {
            style: {
              width: '180px',
            },
          },
        },
        {
          header: `Giá trị đơn hàng(${currency})`,
          fieldName: 'totalPrice',
          styleCell: {
            style: {
              width: '150px',
            },
          },
        },
        {
          header: 'Trạng thái chứng từ',
          fieldName: 'invoiceStatusType',
        },
        {
          header: 'Trạng thái',
          fieldName: 'state',
          styleCell: {
            style: {
              width: '128px',
            },
          },
        },
        {
          header: 'Hành động',
          fieldName: 'action',
        },
      ] as ColumnProps[],
    [currency]
  )
  const dataRows =
    Array.isArray(dataListSalesOrder?.data?.content) && dataListSalesOrder
      ? dataListSalesOrder?.data?.content?.map((item, index) => {
          const totalAmount =
            item?.computeTaxInfo?.taxLines?.reduce((total, val) => {
              return total + (val.untaxedAmount * 100 + val.amount * 100) / 100
            }, 0) ?? 0

          return {
            ...item,
            type: saleOrderType[item.type],
            totalPrice: (
              <CurrencyFormatCustom
                showCurrencyName={false}
                amount={totalAmount}
              />
            ),
            code: (
              <p
                className='cursor-pointer font-medium'
                onClick={() =>
                  showDialog(
                    <ViewDetailSaleOrderDialog
                      hideInfo={false}
                      id={item.id}
                      code={item.code}
                    />
                  )
                }
              >
                {/* {!item.isValidInventoryQty ? (
                  <LightTooltip
                    placement='bottom-start'
                    title={
                      <div>
                        {!item.isValidInventoryQty && (
                          <Typography variant='body2'>
                            Đơn hàng có chứa sản phẩm phòng mua hàng đã yêu cầu
                            hoàn trả nhà cung cấp. Bạn vui lòng update lại đơn
                            đặt hàng.
                          </Typography>
                        )}
                      </div>
                    }
                  >
                    <div className='flex items-center'>
                      {item.code}
                      {'  '}
                      <Image
                        src={require('@/assets/svg/info.svg')}
                        alt='eye'
                        width={16}
                        height={16}
                      />
                    </div>
                  </LightTooltip>
                ) : ( */}
                {item.code}
                {/* )} */}
              </p>
            ),
            quoteCreationDate: moment(item.quoteCreationDate).format(
              'DD/MM/YYYY'
            ),
            quotationDate: item.quotationDate
              ? moment(item.quotationDate).format('DD/MM/YYYY')
              : '',
            orderDate: item.orderDate
              ? moment(item.orderDate).format('DD/MM/YYYY')
              : '',
            partner: item.partner?.name,
            invoiceStatusType: (
              <span
                style={{
                  color:
                    invoiceStatusType[
                      `${
                        item?.invoiceStatusType
                          ? item.invoiceStatusType
                          : 'DEFAULT'
                      }`
                    ]?.colorCode,
                }}
              >
                {
                  invoiceStatusType[
                    `${
                      item?.invoiceStatusType
                        ? item.invoiceStatusType
                        : 'DEFAULT'
                    }`
                  ]?.label
                }
              </span>
            ),
            state: (
              <span
                style={{
                  color:
                    StateSalesOrder[`${item?.state ?? 'DEFAULT'}`].colorCode,
                }}
              >
                {StateSalesOrder[`${item?.state ?? 'DEFAULT'}`].label}
              </span>
            ),
            action: (
              <Action actionList={['watch']} />
              //   <Action
              //     titleTooltipUpload='Yêu cầu xuất kho'
              //     actionList={actionList}
              //     onSplitAction={() =>
              //       router.push(`${PATH_URL}/splitOrder/${item.id}`)
              //     }
              //     onEditAction={() => router.push(`${PATH_URL}/${item.id}`)}
              //     onDeleteAction={() =>
              //       showDialog(
              //         <DeleteSaleOrderDialog id={item.id} refetch={refetch} />
              //       )
              //     }
              //     onNewsAction={() => {
              //       showDialog(
              //         <WareHouseRequestDialog
              //           id={item.id}
              //           type={item.deliveryPolicy}
              //           code={item.code}
              //         />
              //       )
              //     }}
              //     onUploadAction={() =>
              //       showDialog(
              //         <WareHouseRequestDialog
              //           id={item.id}
              //           type={item.deliveryPolicy}
              //           code={item.code}
              //         />
              //       )
              //     }
              //   />
            ),
          }
        })
      : []

  const onChangePageSize = (val: any) => {
    const { page, size } = val
    setQueryPage({ ...queryPage, page: page, size })
  }

  const onSubmit = handleSubmit((data) => {
    setQueryPage(data)
  })

  const handleReset = () => {
    const params = { page: queryPage.page, size: queryPage.size, search: '' }
    setQueryPage(params)
    reset(params)
  }

  useEffect(() => {
    refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryPage])

  return [
    {
      control,
      isLoading,
      data: dataListSalesOrder,
      page: dataListSalesOrder?.data?.page,
      size: dataListSalesOrder?.data?.size,
      totalPages: dataListSalesOrder?.data?.totalPages,
      dataRows,
      columns,
      StateSalesOrder,
      stateFilter,
      PATH_URL,
    },
    { refetch, onChangePageSize, onSubmit, handleReset },
  ] as const
}
