import IconEye from '@/assets/svg/iconEye.svg'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { ColumnProps } from '@/components/organism/CoreTable'
import { DialogCustom } from '@/components/organism/DialogCustom'
import { CustomTable } from '@/components/organism/TableCustom'
import { GREEN } from '@/helper/colors'
import { Box, ButtonBase } from '@mui/material'
import moment from 'moment'
import Image from 'next/image'
import { useCallback, useMemo, useState } from 'react'
import DialogWatchSerialLot from '../DialogWatchSerialLot'
import { RowBoxCommon } from './RowBoxCommon'
import { useDialogViewDeliveryBillInfomation } from './useDialogViewDeliveryBillInfomation'

export const sourceListOption = [
  {
    value: 'SALE_ORDER',
    label: 'Đơn hàng mua',
  },
  {
    value: 'PURCHASE_ORDER',
    label: 'Đơn hàng bán',
  },
  {
    value: 'POS_ORDER',
    label: 'Điểm bán hàng',
  },
  {
    value: 'MANUFACTURE_ORDER',
    label: 'Đơn hàng sẳn xuất',
  },
  {
    value: 'MANUAL',
    label: 'Đơn hàng thủ công',
  },
]

export interface DataViewSerialLot {
  unit?: string
  data: any[]
  type: 'SERIAL' | 'LOTS'
  productId?: number
  locationId?: number
}

export const DialogViewDeliveryBillInfomation = ({ id }: { id: number }) => {
  const { hideDialog } = useDialog()
  const [values] = useDialogViewDeliveryBillInfomation(id)

  const { data, listUnit } = values

  const [dataView, setDataView] = useState<DataViewSerialLot | null>(null)
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
          header: 'Lô',
          fieldName: 'lots',
        },
        {
          header: 'Serial',
          fieldName: 'serial',
        },
        {
          header: 'Số lượng xuất thực tế',
          fieldName: 'checkingType',
        },
      ] as ColumnProps[],
    []
  )

  const stockPickingLinesData = useCallback(() => {
    const listPickingLines = data ? data?.stockPickingLines : []
    return listPickingLines.map((i: any, index: number) => {
      const lots = (
        <div className='flex flex-1 flex-col gap-10'>
          {i.inventories.map((item2: any) => (
            <div
              key={item2.locationId}
              className='flex flex-1 items-center gap-2 min-h-[24px]'
            >
              {i.checkingType === 'LOTS' ? (
                <ButtonBase
                  onClick={() =>
                    setDataView({
                      productId: i.productId,
                      locationId: item2.locationId,
                      data: item2.serialLots ?? [],
                      type: 'LOTS',
                      unit: listUnit?.find((v: any) => v.code === i.uomCode)
                        ?.name,
                    })
                  }
                >
                  <Image
                    className='mr-2'
                    src={IconEye}
                    alt=''
                    width={16}
                    height={16}
                  />
                  <span style={{ color: GREEN }}>Xem lô</span>
                </ButtonBase>
              ) : (
                <></>
              )}
            </div>
          ))}
        </div>
      )

      const serial = (
        <div className='flex flex-1 flex-col gap-10'>
          {i.inventories.map((item2: any) => (
            <div
              key={item2.locationId}
              className='flex flex-1 items-center gap-2 min-h-[24px]'
            >
              {i.checkingType === 'SERIAL' ? (
                <ButtonBase
                  onClick={() =>
                    setDataView({
                      productId: i.productId,
                      locationId: item2.locationId,
                      data: item2.serialLots ?? [],
                      type: 'SERIAL',
                      unit: listUnit?.find((v: any) => v.code === i.uomCode)
                        ?.name,
                    })
                  }
                >
                  <Image
                    className='mr-2'
                    src={IconEye}
                    alt=''
                    width={16}
                    height={16}
                  />
                  <span style={{ color: GREEN }}>Xem Serial</span>
                </ButtonBase>
              ) : (
                <></>
              )}
            </div>
          ))}
        </div>
      )

      const inventories = (
        <div className='flex flex-1 flex-col gap-10'>
          {i.inventories.map((item2: any) => (
            <div
              key={item2.locationId}
              className='flex flex-1 items-center gap-2 min-h-[24px]'
            >
              <span style={{ wordBreak: 'break-word' }}>
                {item2.locationName}
              </span>
              <span>: </span>
              <span>{item2.quantityInventory}</span>
              <span>
                {listUnit?.find((v: any) => v.code === i.uomCode)?.name}
              </span>
            </div>
          ))}
        </div>
      )

      const checkingType = (
        <div className='flex flex-1 flex-col gap-10'>
          {i.inventories.map((item2: any) => {
            return (
              <div
                key={item2.locationId}
                className='flex flex-1 items-center gap-2 min-h-[24px]'
              >
                {i.checkingType === 'SERIAL' && (item2.serialLots?.length ?? 0)}
                {i.checkingType === 'DEFAULT' && (item2?.doneQty ?? 0)}
                {i.checkingType === 'LOTS' &&
                  item2.serialLots?.reduce(
                    (a: number, b: any) => a + (b?.doneQtyByLot || 0),
                    0
                  )}
              </div>
            )
          })}
        </div>
      )

      return {
        sku: i.sku,
        upc: i.upc,
        uomCode: listUnit.find((v: any) => v.code === i.uomCode)?.name,
        demandQty: i.demandQty,
        productName: i.productName,
        checkingType,
        lots,
        serial,
        inventories,
      }
    })
  }, [data, listUnit])

  return (
    <>
      {!!data && (
        <DialogCustom
          title={`Phiếu xuất kho ${data.code}`}
          onClose={hideDialog}
          //position='middle'
          width={1100}
        >
          <Box className='p-20'>
            <Box className='grid grid-cols-2 gap-y-5 gap-x-10'>
              <RowBoxCommon title='Mã phiếu xuất kho' data={data.code} />
              <RowBoxCommon
                title='Ngày xuất kho'
                data={
                  data.doneDate
                    ? moment(data.doneDate).format('DD/MM/YYYY')
                    : ''
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
              <RowBoxCommon
                title='Loại hoạt động'
                data={data.pickingType.name}
              />
            </Box>
            <div className='w-full mt-20'>
              <p className='py-[15px] px-12 font-bold text-[#242424] bg-[#F6F7FB] uppercase'>
                Sản phẩm xuất kho
              </p>
              <div className='overflow-x-auto rounded-t-md'>
                <CustomTable
                  columns={columns}
                  data={stockPickingLinesData()}
                  paginationHidden
                />
              </div>
            </div>

            {data.state === 'REJECTED' && (
              <div className='w-full mt-20'>
                <p className='py-[15px] px-12 font-bold text-[#242424] bg-[#F6F7FB] uppercase'>
                  Lý do từ chối
                </p>
                <div className='overflow-x-auto rounded-t-md'>
                  {data.rejectReason}
                </div>
              </div>
            )}
          </Box>
        </DialogCustom>
      )}
      {dataView && (
        <DialogWatchSerialLot
          open={!!dataView}
          data={dataView?.data}
          type={dataView?.type}
          onClose={() => setDataView(null)}
          unit={dataView?.unit}
          productId={dataView?.productId}
          locationId={dataView?.locationId}
        />
      )}
    </>
  )
}
