import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { displayWarehouse, warehouseType } from '@/enum'
import { AccountMoveDetail } from '@/service/accounting/accountMove/getDetail/type'
import { Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'

const useInventoryReceiving = () => {
  const { control } = useFormContext<AccountMoveDetail>()
  const router = useRouter()
  const { actionType } = router.query
  const { fields } = useFieldArray({
    control,
    name: 'invoiceLines',
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

  const tableData = (fields ?? [])?.map((item, index) => {
    return {
      code: item?.product?.sku,
      productName: item?.product?.name,
      quantityInv: item?.quantity,
      quantityRequest: item?.quantity,
      warehouseType:
        actionType === 'VIEW' ? (
          <Typography>{displayWarehouse[item?.warehouseType]}</Typography>
        ) : (
          <CoreAutocomplete
            control={control}
            name={`invoiceLines.${index}.warehouseType`}
            options={warehouseType}
          />
        ),
      // warehouse: (
      //   <CoreAutoCompleteAPI
      //     control={control}
      //     isViewProp={actionType === 'VIEW'}
      //     params={{
      //       warehouseType: watch(`invoiceLines.${index}.warehouseType`),
      //     }}
      //     name={`invoiceLines.${index}.warehouse`}
      //     label=''
      //      multiple
      //     labelPath='name'
      //     valuePath='id'
      //     placeholder='Chọn kho'
      //     fetchDataFn={getListWarehouse}
      //   />
      // ),
    }
  })

  return [{ tableData, columns }, {}] as const
}

export default useInventoryReceiving
