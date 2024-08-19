import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { displayWarehouse, state, stateInventory, warehouseType } from '@/enum'
import { useCheckPath } from '@/path'
import { AccountMoveDetail } from '@/service/accounting/accountMove/getDetail/type'
import { getListWarehouse } from '@/service/salesOrder/returnOrderController/createUpdate'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import CustomCollapseAPI from '../../Utils/CustomCollapseAPI'

const useInventoryReceiving = () => {
  const { watch, control } = useFormContext<AccountMoveDetail>()
  const { typePath } = useCheckPath()
  const router = useRouter()

  const { actionType } = router.query

  const { fields } = useFieldArray({
    control,
    name: 'invoiceLines',
    keyName: 'key',
  })

  const { fields: fieldPurchase } = useFieldArray({
    control,
    name: 'pickingPurchases',
    keyName: 'key',
  })

  const columns = useMemo(
    () => [
      {
        header: 'Mã SKU',
        fieldName: 'code',
      },
      {
        header: 'Tên sản phẩm ',
        fieldName: 'productName',
      },
      {
        header: 'Số lượng theo đơn hàng',
        fieldName: 'quantityInv',
      },
      {
        header: 'Số lượng yêu cầu',
        fieldName: 'quantityRequest',
      },
      {
        header: 'Loại kho ',
        fieldName: 'warehouseType',
      },
      {
        header: 'Kho',
        fieldName: 'warehouse',
      },
    ],
    []
  )

  const tableDataDefaults = (fields ?? [])?.map((item, index) => {
    return {
      code: item?.product?.sku,
      productName: item?.product?.name,
      quantityInv: item?.quantity,
      quantityRequest: item?.quantity,
      warehouseType:
        actionType === 'VIEW' ? (
          displayWarehouse[item?.warehouseType]
        ) : (
          <CoreAutocomplete
            label=''
            control={control}
            name={`invoiceLines.${index}.warehouseType`}
            options={warehouseType}
          />
        ),

      warehouse: watch(`invoiceLines.${index}.warehouseType`) && (
        <CoreAutoCompleteAPI
          control={control}
          isViewProp={actionType === 'VIEW'}
          params={{
            warehouseType: watch(`invoiceLines.${index}.warehouseType`),
          }}
          name={`invoiceLines.${index}.warehouse`}
          label=''
          labelPath='name'
          valuePath='id'
          placeholder='Chọn kho'
          fetchDataFn={getListWarehouse}
        />
      ),
    }
  })

  const tableDataPurchaseOrSales = useMemo(() => {
    if (typePath === 'PROVIDER' && watch('state') !== 'DRAFT') {
      return (fieldPurchase ?? []).map((item, index) => {
        return (
          <CustomCollapseAPI
            stateInventory={item.state}
            key={item.key}
            code={item.code}
            id={item.id}
            index={index}
            typeInventory='IN'
          />
        )
      })
    } else return []
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typePath, watch('state')])

  return [
    {
      tableData: tableDataDefaults,
      tableDataPurchaseOrSales,
      columns,
    },
    {},
  ] as const
}

export default useInventoryReceiving
