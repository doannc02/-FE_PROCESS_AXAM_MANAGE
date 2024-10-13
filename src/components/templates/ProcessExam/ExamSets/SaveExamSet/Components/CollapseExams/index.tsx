import { TableExams } from '@/components/organism/TableExams'
import { useExamsTable } from './useExamsTable'

const ExamsTable = () => {
  const [values, handles] = useExamsTable()
  const { columns, tableData } = values
  return (
    <TableExams
      isShowColumnStt
      fieldsName='exams'
      paginationHidden
      columns={columns}
      data={tableData}
    />
  )
}

export default ExamsTable
