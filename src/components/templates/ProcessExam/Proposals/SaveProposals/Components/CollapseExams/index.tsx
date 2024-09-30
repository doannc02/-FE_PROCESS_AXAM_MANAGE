import { AccordionCustom } from '@/components/atoms/AccordionCustom'
import { Typography } from '@mui/material'
import { useCollapseExams } from './useCollapseExams'
import { CoreTable } from '@/components/organism/CoreTable'

const CollapseExams = () => {
  const [values, handles] = useCollapseExams()
  const { columns, tableData } = values
  return (
    <AccordionCustom title={<Typography variant='subtitle2'>Test</Typography>}>
      <CoreTable paginationHidden columns={columns} data={tableData} />
    </AccordionCustom>
  )
}

export default CollapseExams
