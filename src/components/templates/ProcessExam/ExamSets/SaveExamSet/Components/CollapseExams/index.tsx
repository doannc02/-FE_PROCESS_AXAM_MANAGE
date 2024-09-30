import { AccordionCustom } from '@/components/atoms/AccordionCustom'
import { Typography } from '@mui/material'
import { useExamsTable } from './useExamsTable'
import { CoreTable } from '@/components/organism/CoreTable'

const ExamsTable = () => {
  const [values, handles] = useExamsTable()
  const { columns, tableData } = values
  return <CoreTable paginationHidden columns={columns} data={tableData} />
}

export default ExamsTable
