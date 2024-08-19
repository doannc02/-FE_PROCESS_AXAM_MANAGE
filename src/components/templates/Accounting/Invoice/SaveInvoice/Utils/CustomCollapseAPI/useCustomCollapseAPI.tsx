import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { Action } from '@/components/molecules/Action'
import { ColumnProps } from '@/components/organism/CoreTable'
import DialogItemPrices from '@/components/templates/Accounting/Warehouse/ExportWarehouse/FactoryWarehouse/ViewFactoryWareHouse/components/DialogItemPrices'
import { sourceListOption } from '@/components/templates/Accounting/Warehouse/ExportWarehouse/FactoryWarehouse/useFactoryWarehouseList'
import { useFormCustom } from '@/lib/form'
import { useAppSelector } from '@/redux/hook'
import {
  useQueryGetStockPickingInDetail,
  useQueryGetStockPickingOutDetailV2,
} from '@/service/warehouse/stockPickingOut/getDetail'
import { StockPickingOutDetail } from '@/service/warehouse/stockPickingOut/getDetail/type'
import { useEffect, useMemo } from 'react'

const useCustomCollapseAPI = ({
  id,
  typeInventory,
  isCallItem,
}: {
  id: number
  typeInventory: 'IN' | 'OUT'
  isCallItem: boolean
}) => {
  const methodForm = useFormCustom<StockPickingOutDetail>({
    defaultValues: {},
  })

  const { reset, watch } = methodForm

  const { currency } = useAppSelector((state) => state.companyConfigData)
  const { showDialog } = useDialog()

  const { data: dataOut, isLoading: isLoadingOut } =
    useQueryGetStockPickingOutDetailV2(
      {
        id: id,
      },
      {
        enabled: !!id && typeInventory === 'OUT' && isCallItem,
      }
    )

  const { data: dataIn, isLoading: isLoadingIn } =
    useQueryGetStockPickingInDetail(
      {
        id: id,
      },
      {
        enabled: !!id && typeInventory === 'IN' && isCallItem,
      }
    )

  const data = useMemo(() => {
    return typeInventory === 'IN' ? dataIn : dataOut
  }, [dataIn, dataOut, typeInventory])

  const isLoading = useMemo(() => {
    return typeInventory === 'IN' ? isLoadingIn : isLoadingOut
  }, [isLoadingIn, isLoadingOut, typeInventory])

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
        ...(typeInventory === 'IN'
          ? [
              {
                header: 'Số lượng thực tế',
                fieldName: 'quantity',
              },
              {
                header: 'Số lượng yêu cầu ',
                fieldName: 'demandQty',
              },
              {
                header: 'Vị trí kho',
                fieldName: 'checkingTypeIn',
              },
            ]
          : []),
        ...(typeInventory === 'OUT'
          ? [
              {
                header: 'Đơn vị tính',
                fieldName: 'uomCode',
              },
              {
                header: 'Số lượng yêu cầu ',
                fieldName: 'demandQty',
              },
              {
                header: 'Số lượng xuất thực tế',
                fieldName: 'checkingType',
              },
            ]
          : []),

        {
          header: 'Đơn giá' + ` (${currency})`,
          fieldName: 'unitPrice',
        },
        {
          header: 'Thành tiền' + ` (${currency})`,
          fieldName: 'intoMoney',
        },
      ] as ColumnProps[],
    [currency, typeInventory]
  )

  const stockPickingLinesData = useMemo(() => {
    if (data?.data?.stockPickingLines) {
      const listPickingLines = data ? data?.data?.stockPickingLines : []

      return listPickingLines.map((i: any, index: number) => {
        console.log(i.toLocationData, 'local')
        const uomName = i?.productResponse?.uomName ?? ''

        const inventories = (
          <div className='flex flex-col flex-1 gap-10'>
            {(i?.inventories ?? []).map((item2: any) => (
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
            {i?.inventories?.map((item2: any) => {
              return (
                <div
                  key={item2.locationId}
                  className='flex flex-1 items-center gap-2 min-h-[24px]'
                >
                  {i.checkingType === 'SERIAL' &&
                    (item2.serialLots?.length ?? 0)}
                  {i.checkingType === 'DEFAULT' &&
                    (`${item2?.doneQty} ${uomName}` ?? 0)}
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

        const checkingTypeIn = <div>{i?.toLocationData?.name}</div>

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

        const intoMoney = i?.itemPrices?.reduce(function (a: any, b: any) {
          return a + b.quantity * b.unitPrice
        }, 0)

        return {
          sku: i?.sku ?? i?.productSku,
          upc: i.upc,
          uomCode: uomName,
          productName: i.productName,
          checkingTypeIn: checkingTypeIn,
          ...(i?.state === 'AWAITING'
            ? {}
            : {
                quantity: `${i?.doneQty} ${uomName}`,
                demandQty: `${i.demandQty} ${uomName}`,
                inventories,
                checkingType: checkingType,
                unitPrice:
                  typeInventory === 'OUT' ? (
                    unitPrice
                  ) : (
                    <CurrencyFormatCustom amount={Number(i?.unitPrice)} />
                  ),
                intoMoney:
                  typeInventory === 'OUT' ? (
                    intoMoney
                  ) : (
                    <CurrencyFormatCustom
                      amount={Number(i?.unitPrice) * Number(i.doneQty)}
                    />
                  ),
              }),
        }
      })
    }
    return []
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  useEffect(() => {
    if (data) {
      reset({
        ...data?.data,
        orderType: sourceListOption.find(
          (v) => v.value === data?.data?.sourceDocument
        )?.label,
        employeeName:
          typeInventory === 'OUT'
            ? data?.data?.employee?.name
            : data?.data?.employee?.firstName
            ? data?.data?.employee?.firstName + data?.data?.employee?.lastName
            : '',
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.data])
  return [
    {
      columns,
      isLoading: typeInventory === 'OUT' ? isLoadingOut : isLoadingIn,
      methodForm,
    },
    { stockPickingLinesData },
  ] as const
}
export default useCustomCollapseAPI
