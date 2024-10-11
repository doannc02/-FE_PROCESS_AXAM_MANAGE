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
import { useFormContext } from 'react-hook-form'
import { Exam } from '@/service/examSet/type'

export const TableExams = ({
  isLoading,
  className,
  data,
  columns,
  page = 1,
  size = 20,
  isShowColumnStt = false,
  maxHeight,
  setValue = (name: string, value: any) => null,
  fieldsName,
  showInfoText,
  actionTable,
}: CoreTableProps & {
  showInfoText?: boolean
  fieldsName: string
  setValue?: any // required with case change data of form
  actionTable?: null | ReactElement
}) => {
  console.log('render xxxx')
  const router = useRouter()
  const methodForm =
    useFormContext<{
      exams: Exam[]
    }>()
  const { watch } = methodForm
  const { actionType } = router.query
  if (isShowColumnStt) {
    columns = [
      {
        header: 'STT',
        fieldName: 'index',
        styleCell: { style: { minWidth: '50px' } },
      },
      ...columns,
    ]
    data = data.map((item: any, index: number) => {
      const noNumber = (page - 1) * size + index + 1
      return {
        ...item,
        index: (
          <Typography style={{ minWidth: '50px' }}>
            {noNumber > 9 ? noNumber : `0${noNumber}`}
            {!watch(`exams.${index}.attached_file`) ||
            !watch(`exams.${index}.description`) ? (
              <span className='text-red-500'>*</span>
            ) : null}
          </Typography>
        ),
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
      watch('exams'),
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
                      {showInfoText ? (
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
                      ) : null}
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
