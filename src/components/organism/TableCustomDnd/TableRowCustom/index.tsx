import { TableCell, TableRow } from '@mui/material'
import _ from 'lodash'
import { Draggable } from 'react-beautiful-dnd'
import { ColumnProps } from '../../CoreTable'

import { checkDateValid } from '@/utils/date/checkDate'
import { convertToDate } from '@/utils/date/convertToDate'

type Props = {
  index: number
  id: string
  columns: ColumnProps[]
  row: any
}

export const TableRowCustom = (props: Props) => {
  const { index, id, row, columns } = props
  const colorRowTable =
    row.displayType === 'SECTION'
      ? '#DFE0EB'
      : row.type === 'NOTE'
      ? '#F6F7F9'
      : null

  return (
    <Draggable index={index} draggableId={id?.toString()}>
      {(provided, snapshot) => (
        <TableRow
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{
            backgroundColor: colorRowTable,
          }}
        >
          {_.map(columns, (column, indexColumn) => {
            const val = _.get(row, column?.fieldName ?? '')
            return (
              <TableCell key={indexColumn} {...column.styleCell}>
                {column?.fieldName && !column?.render && (
                  <>{checkDateValid(val) ? convertToDate(val) : val}</>
                )}
                {column?.render && column.render(row, index)}
              </TableCell>
            )
          })}
        </TableRow>
      )}
    </Draggable>
  )
}
