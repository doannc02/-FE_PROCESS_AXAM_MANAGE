import { useDialog } from '@/components/hooks/dialog/useDialog'
import { ColumnProps } from '@/components/organism/CoreTable'
import { useFormCustom } from '@/lib/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ButtonBase, Typography } from '@mui/material'
import { useMemo, useState } from 'react'
import { RequestBody } from '@/service/warehouse/exportWarehouse/stockPickingList/getOutList/type'
import { useQueryGetStockPickingRequestOutList } from '@/service/warehouse/exportWarehouse/stockPickingList/getOutList'
import { MENU_URL } from '@/routes'
import { useRouter } from 'next/router'
import useCheckPath from '@/components/hooks/path/useCheckPath'

const defaultValues = {
  page: 0,
  size: 20,
  search: '',
  createdAt: null,
  scheduledDate: null,
  state: null,
}

export const useStockPickingList = () => {
  const [visibleItems, setVisibleItems] = useState(1)
  const [showMoreText, setShowMoreText] = useState('Xem thêm')
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    setError,
    control,
    formState,
    trigger,
    reset,
  } = useFormCustom<RequestBody['GET']>({
    defaultValues,
  })
  const { typeWareHouse } = useCheckPath()

  const [queryPage, setQueryPage] = useState<RequestBody['GET']>(defaultValues)

  const onChangePageSize = (val: any) => {
    const { page, size } = val
    setQueryPage({ ...queryPage, page, size })
  }

  const onReset = () => {
    reset(defaultValues)
    setQueryPage({ ...queryPage, ...defaultValues })
  }

  const onSubmit = handleSubmit(async (input) => {
    setQueryPage({ ...input })
  })

  const columns = useMemo(
    () =>
      [
        {
          header: 'Loại yêu cầu xuất kho',
          fieldName: 'description',
        },
        // {
        //   header: 'Số lượng sản phẩm',
        //   fieldName: 'number',
        // },
        {
          header: 'Ngày gửi yêu cầu',
          fieldName: 'dateRequest',
        },
        {
          header: 'Ngày xuất dự kiến',
          fieldName: 'dateExpected',
        },

        {
          header: 'Phiếu xuất kho',
          fieldName: 'deliveryBill',
        },
        {
          header: 'Trạng thái ',
          fieldName: 'status',
        },
      ] as ColumnProps[],
    []
  )

  const { isLoading, data: warehouseDataTable } =
    useQueryGetStockPickingRequestOutList(queryPage)

  const { showDialog } = useDialog()

  const tableData = (warehouseDataTable?.data.content ?? []).map((item) => {
    const createdAt = item.createdAt
    const formattedDate = new Date(createdAt).toLocaleDateString('en-GB')
    const scheduledDate = item.scheduledDate
    const formattedDate2 =
      scheduledDate && new Date(scheduledDate).toLocaleDateString('en-GB')

    let status = <></>

    if (item.state === 'WAITING') {
      status = (
        <p className='text-[#F89E19] font-normal text-sm'>Chờ xuất kho</p>
      )
    } else if (item.state === 'PROCESSING') {
      status = (
        <p className='text-[#F89E19] font-normal text-sm'>Chờ xuất kho</p>
      )
    } else if (item.state === 'DONE') {
      status = <p className='text-[#00CC6A] font-normal text-sm'>Đã xuất kho</p>
    } else if (item.state === 'REJECTED') {
      status = <p className='text-[#FF4956] font-normal text-sm'>Từ chối</p>
    } else if (item.state === 'DONE_PART') {
      status = <p className='text-[#F89E19] font-normal text-sm'>Xuất 1 phần</p>
    }

    const handleShowMoreClick = () => {
      setVisibleItems(visibleItems + 1)
      if (visibleItems + 1 >= item.stockPickings.length) {
        setShowMoreText('Rút gọn')
      }
    }

    const handleShowLessClick = () => {
      setVisibleItems(1)
      setShowMoreText('Xem thêm')
    }

    const visibleItemElements = item.stockPickings
      ?.slice(0, visibleItems)
      .map((item2) => (
        <div key={item2.id} className='flex items-center gap-2 my-2'>
          <ButtonBase
            onClick={() => {
              router.push({
                pathname: `${MENU_URL.WARE_HOUSE[typeWareHouse].EXPORT_WAREHOUSE.STOCK_PICKING_LIST}/[id]`,
                query: {
                  id: item2.id,
                },
              })
            }}
          >
            <Typography sx={{ fontWeight: '600' }}>{item2.code}</Typography>
          </ButtonBase>
        </div>
      ))

    const showMoreButton =
      visibleItems < item.stockPickings?.length ? (
        <p
          className='text-[#213660] text-sm italic font-normal cursor-pointer'
          onClick={handleShowMoreClick}
        >
          {showMoreText}
        </p>
      ) : (
        <p
          className='text-[#213660] text-sm italic cursor-pointer font-normal'
          onClick={handleShowLessClick}
        >
          {item.stockPickings?.length > 0 ? 'Rút gọn' : ''}
        </p>
      )

    return {
      id: item.stockPickings?.slice(0, visibleItems).map((item2) => item2.id),
      description: <Typography> {item.description}</Typography>,
      number: <Typography> {item.quantity}</Typography>,
      dateRequest: formattedDate,
      dateExpected: formattedDate2,
      deliveryBill: (
        <>
          {visibleItemElements}
          {showMoreButton}
        </>
      ),
      status,
    }
  })

  return [
    {
      isLoading,
      register,
      handleSubmit,
      watch,
      setError,
      control,
      formState,
      trigger,
      columns,
      tableData,
      page: warehouseDataTable?.data.page ?? 0,
      size: warehouseDataTable?.data.size ?? 20,
      totalPages: warehouseDataTable?.data.totalPages,
    },
    { onSubmit, onReset, onChangePageSize },
  ] as const
}
