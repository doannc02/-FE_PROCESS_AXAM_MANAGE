import { CoreTable } from '@/components/organism/CoreTable'
import useInventoryReceiving from './useInventoryReceiving'

const InventoryReceiving = () => {
  const [values, handles] = useInventoryReceiving()
  const { columns, tableData } = values
  return <CoreTable paginationHidden columns={columns} data={tableData} />
}
export default InventoryReceiving
