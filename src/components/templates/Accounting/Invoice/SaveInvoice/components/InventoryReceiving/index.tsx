import { CoreTable } from '@/components/organism/CoreTable'
import useInventoryReceiving from './useInventoryReceiving'
import { useFormContext } from 'react-hook-form'
import { AccountMoveDetail } from '@/service/accounting/accountMove/getDetail/type'

const InventoryReceiving = () => {
  const { watch, control } = useFormContext<AccountMoveDetail>()
  const [values, {}] = useInventoryReceiving()
  const { columns, tableDataPurchaseOrSales, tableData } = values
  return (
    <>
      {watch('state') === 'DRAFT' ? (
        <CoreTable
          tableName='inventoryReceiving'
          columns={columns}
          data={tableData}
          paginationHidden
        />
      ) : watch('pickingPurchases').length > 0 ? (
        tableDataPurchaseOrSales
      ) : null}
    </>
  )
}
export default InventoryReceiving
