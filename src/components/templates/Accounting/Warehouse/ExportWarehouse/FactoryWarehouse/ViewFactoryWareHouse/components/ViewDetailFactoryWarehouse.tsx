import LoadingPage from '@/components/atoms/LoadingPage'
import { Grid } from '@mui/material'
import moment from 'moment'
import { ColumnProps, CoreTable } from '@/components/organism/CoreTable'
import { RowBoxCommon } from '../../../../WarehouseManagement/ViewWarehouse/components/BoxCustom'
import { useCallback, useMemo } from 'react'
import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import { sourceListOption } from '../../useFactoryWarehouseList'
import { useAppSelector } from '@/redux/hook'
import { Action } from '@/components/molecules/Action'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import DialogItemPrices from './DialogItemPrices'

export type Props = {
  data: any
  isLoading: any
}

export const ViewDetailFactoryWarehouse = ({ data, isLoading }: Props) => {
  const { currency } = useAppSelector((state) => state.companyConfigData)
  const { showDialog } = useDialog()

  const columns = useMemo(
    () =>
      [
        {
          header: 'SKU',
          fieldName: 'sku',
        },
        {
          header: 'Tên sản phẩm',
          fieldName: 'productName',
        },
        {
          header: 'UPC Code',
          fieldName: 'upc',
        },
        {
          header: 'Đơn vị tính',
          fieldName: 'uomCode',
        },
        {
          header: 'Số lượng yêu cầu ',
          fieldName: 'demandQty',
        },
        {
          header: 'Tồn kho theo vị trí',
          fieldName: 'inventories',
        },
        {
          header: 'Số lượng xuất thực tế',
          fieldName: 'checkingType',
        },
        {
          header: 'Đơn giá',
          fieldName: 'unitPrice',
        },
        {
          header: 'Thành tiền' + ` (${currency})`,
          fieldName: 'intoMoney',
        },
      ] as ColumnProps[],
    [currency]
  )

  const stockPickingLinesData = useCallback(() => {
    const listPickingLines = data ? data?.stockPickingLines : []

    return listPickingLines.map((i: any, index: number) => {
      const uomName = i?.productResponse?.uomName ?? ''

      const inventories = (
        <div className='flex flex-col flex-1 gap-10'>
          {i.inventories.map((item2: any) => (
            <div
              key={item2.locationId}
              className='flex flex-1 items-center gap-2 min-h-[24px]'
            >
              <span style={{ wordBreak: 'break-word' }}>
                {item2.locationName}
              </span>
              <span>: </span>
              <CurrencyFormatCustom
                amount={item2.quantityInventory}
                className='contents'
              />
              <span>
                {i.productResponse?.uomName ?? ''}
                {/* {listUnit?.find((v) => v.code === i.uomCode)?.name} */}
              </span>
            </div>
          ))}
        </div>
      )

      const checkingType = (
        <div className='flex flex-col flex-1 gap-10'>
          {i.inventories.map((item2: any) => {
            return (
              <div
                key={item2.locationId}
                className='flex flex-1 items-center gap-2 min-h-[24px]'
              >
                {i.checkingType === 'SERIAL' && (item2.serialLots?.length ?? 0)}
                {i.checkingType === 'DEFAULT' &&
                  (`${item2?.doneQty} ${uomName}` ?? 0)}
                {i.checkingType === 'LOTS' &&
                  item2.serialLots?.reduce(
                    (a: number, b: any) => a + (b?.doneQtyByLot || 0),
                    0
                  ) +
                    ' ' +
                    uomName}
              </div>
            )
          })}
        </div>
      )

      const unitPrice = (
        <Action
          actionList={['watch']}
          onWatchAction={() =>
            showDialog(
              <DialogItemPrices
                tableData={i.itemPrices ?? []}
                isLoadingTable={isLoading}
              />
            )
          }
        />
      )

      const intoMoney = i.itemPrices.reduce(function (a: any, b: any) {
        return a + b.quantity * b.unitPrice
      }, 0)

      return {
        sku: i.sku,
        upc: i.upc,
        uomCode: uomName,
        demandQty: `${i.demandQty} ${uomName}`,
        productName: i.productName,
        checkingType,
        inventories,
        unitPrice,
        intoMoney,
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])
  return (
    <>
      {isLoading && (
        <div className='min-h-[300px] mt-22'>
          <LoadingPage />
        </div>
      )}

      {!!data && (
        <>
          <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
            <RowBoxCommon title='Mã phiếu xuất kho' data={data.code} />
            <RowBoxCommon
              title='Ngày xuất kho'
              data={
                data.doneDate ? moment(data.doneDate).format('DD/MM/YYYY') : ''
              }
            />
            <RowBoxCommon
              title='Nguồn đơn'
              data={
                sourceListOption.find((v) => v.value === data.sourceDocument)
                  ?.label
              }
            />
            <RowBoxCommon title='Đơn hàng' data={data.code} />
            <RowBoxCommon title='Xuất từ kho' data={data.warehouseName} />
            <RowBoxCommon
              title='Người xuất kho'
              data={`${data?.employee?.name ?? ''}`}
            />
            <RowBoxCommon
              title='Người nhận hàng'
              data={`${data?.customer?.name ?? ''}`}
            />
            <RowBoxCommon
              title='Ngày xuất kho dự kiến'
              data={
                data.scheduledDate
                  ? moment(data.scheduledDate).format('DD/MM/YYYY')
                  : ''
              }
            />
            <RowBoxCommon title='Ghi chú' data={data.note} />
            <RowBoxCommon title='Loại hoạt động' data={data.pickingType.name} />
          </Grid>
          <p className='py-[15px] px-12 font-bold text-[#242424] bg-[#F6F7FB] uppercase'>
            Sản phẩm xuất kho
          </p>
          <div className='overflow-x-auto rounded-t-md'>
            <CoreTable
              columns={columns}
              data={stockPickingLinesData()}
              paginationHidden
            />
          </div>
          {/* <div className=''>
            {!!data?.imageUrls && data?.imageUrls?.length > 0 && (
              <>
                <p className='py-6 px-12 font-bold text-[#242424] bg-[#F6F7FB] uppercase'>
                  Biên bản có chữ ký xác nhận
                </p>
                <div className=''>
                  <Image
                    alt='signature'
                    width={200}
                    height={200}
                    src={!!data?.imageUrls?.length ? data?.imageUrls[0] : ''}
                  />
                </div>
              </>
            )}
          </div> */}
        </>
      )}
    </>
  )
}
