import {
  CoreTableProps,
  TableContainerCommon,
  TableHeadCommon,
} from '@/components/organism/CoreTable'
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material'
import _ from 'lodash'
import { useRouter } from 'next/router'
import { ReactElement, useCallback } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { TableRowPE } from './TableRowAllocation'
import EmptyIcon from '@/components/icons/EmptyIcon'
import CoreLoading from '@/components/molecules/CoreLoading'

export const TableExams = ({
  isLoading,
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
  console.log('render xxxx')
  const router = useRouter()
  const { actionType } = router.query
  if (isShowColumnStt) {
    columns = [
      {
        header: 'STT',
        fieldName: 'index',
        styleCell: { style: { minWidth: 50 } },
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
        <TableRowPE
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
                    fontWeight: '700',
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
                  {isLoading ? (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        variant='body'
                        align='center'
                        className='py-8'
                      >
                        <CoreLoading />
                      </TableCell>
                    </TableRow>
                  ) : renderRow().length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={10}
                        variant='body'
                        align='center'
                        className='py-8'
                      >
                        <div className='flex justify-center min-h-[60px] flex-col'>
                          <EmptyIcon />

                          <Typography variant='body2'>
                            Không có dữ liệu
                          </Typography>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    renderRow()
                  )}
                  {/* {renderRow()} */}
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
