import { Box, Table, TableBody, TableCell, TableRow } from '@mui/material'
import _ from 'lodash'
import { ReactElement, useCallback } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import {
  CoreTableProps,
  TableContainerCommon,
  TableHeadCommon,
} from '../CoreTable'
import { TableRowCustom } from './TableRowCustom'
import { useRouter } from 'next/router'

export const TableCustomDnd = ({
  className,
  data,
  columns,
  page = 0,
  size = 20,
  isShowColumnStt = false,
  maxHeight,
  setValue = (name: string, value: any) => null,
  watch = (name: string) => null,
  fieldsName,
  actionTable,
}: CoreTableProps & {
  fieldsName: string
  setValue?: any // required with case change data of form
  watch?: (name: string) => void // required with case change data of form
  actionTable?: null | ReactElement
}) => {
  
  const router = useRouter()
  const { actionType } = router.query
  if (isShowColumnStt) {
    columns = [
      {
        header: 'STT',
        fieldName: 'index',
        styleCell: { style: { width: 100 } },
      },
      ...columns,
    ]
    data = data.map((item: any, index: number) => {
      const noNumber = page * size + index + 1
      return {
        ...item,
        index: noNumber > 9 ? noNumber : `0${noNumber}`,
      }
    })
  }

  const reOrder = (list: any, startIndex: number, endIndex: number) => {
    const result = Array.from(list ?? [])
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  const onDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return
    }

    const newData = reOrder(
      watch(fieldsName),
      result.source.index,
      result.destination.index
    )
    // clearErrors()
    setValue(fieldsName, newData)
  }

  const renderRow = useCallback(() => {
    return data.map((row, index) => {
      return (
        <TableRowCustom
          key={row.key ?? row.id ?? index}
          index={index}
          id={row.key ?? row.id}
          row={row}
          columns={columns}
        />
      )
    })
    // eslint-disable-next-line
  }, [data, columns])

  return (
    <Box className={className}>
      <TableContainerCommon style={{ maxHeight: `${maxHeight}px` }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHeadCommon>
            <TableRow>
              {_.map(columns, (column, index) => (
                <TableCell
                  variant='head'
                  key={index}
                  {...column.styleCell}
                  {...(column?.styleCell ?? {})}
                  style={{
                    minWidth: index !== 0 ? 200 : 60,
                    ...column?.styleCell?.style,
                  }}
                >
                  {column.header}
                </TableCell>
              ))}
            </TableRow>
          </TableHeadCommon>

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='droppable'>
              {(provided, _) => (
                <TableBody ref={provided.innerRef} {...provided.droppableProps}>
                  {renderRow()}
                  {provided.placeholder}
                </TableBody>
              )}
            </Droppable>
          </DragDropContext>
          {actionTable && actionType !== 'VIEW' && (
            <TableBody>{actionTable}</TableBody>
          )}
        </Table>
      </TableContainerCommon>
    </Box>
  )
}
