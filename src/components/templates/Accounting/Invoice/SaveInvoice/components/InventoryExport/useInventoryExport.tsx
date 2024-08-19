import { useCheckPath } from '@/path'
import { AccountMoveDetail } from '@/service/accounting/accountMove/getDetail/type'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import CustomCollapseAPI from '../../Utils/CustomCollapseAPI'
import { state, stateInventory } from '@/enum'

const useInventoryExport = () => {
  const { watch, control } = useFormContext<AccountMoveDetail>()
  const { typePath, typeOfInvoice } = useCheckPath()
  const router = useRouter()

  const { actionType } = router.query
  const id = Number(router.query?.id)

  const { fields } = useFieldArray({
    control,
    name: 'invoiceLines',
    keyName: 'key',
  })

  const { fields: fieldsSales } = useFieldArray({
    control,
    name: 'pickingSales',
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
        header: 'Số lượng theo chứng từ',
        fieldName: 'quantityInv',
      },
      {
        header: 'Số lượng yêu cầu',
        fieldName: 'quantityRequest',
      },
      // {
      //   header: 'Số lượng cần xuất',
      //   fieldName: 'quantityRequest',
      // },
    ],
    []
  )

  const tableDataDefaults = (fields ?? [])?.map((item, index) => {
    return {
      code: item?.product?.sku,
      productName: item?.product?.name,
      quantityInv: item?.quantity,
      quantityRequest: item?.quantity,
    }
  })

  const tableDataPurchaseOrSales = useMemo(() => {
    if (typePath === 'CUSTOMER' && watch('state') !== 'DRAFT') {
      return (fieldsSales ?? []).map((item, index) => {
        return (
          <CustomCollapseAPI
            stateInventory={item.state}
            code={item.code}
            key={item.key}
            id={item.id}
            index={index}
            typeInventory='OUT'
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

export default useInventoryExport
