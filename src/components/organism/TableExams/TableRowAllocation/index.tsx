import {
  Box,
  Collapse,
  Divider,
  Grid,
  Grow,
  TableCell,
  TableRow,
} from '@mui/material'
import _ from 'lodash'
import { Draggable } from 'react-beautiful-dnd'

import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import { ColumnProps, CoreTable } from '@/components/organism/CoreTable'
import { checkDateValid } from '@/utils/date/checkDate'
import { convertToDate } from '@/utils/date/convertToDate'
import { useState } from 'react'
import { WHITE } from '@/helper/colors'
import { useRouter } from 'next/router'
import { useTableRowAllocation } from './useTableRowAllocation'
import { subjectType } from '@/enum'
import { ActionTable } from '@/components/organism/TableCustomDnd/ActionTable'
import { AccordionCustom } from '@/components/atoms/AccordionCustom'
import CoreInput from '@/components/atoms/CoreInput'
import UploadAndEditFile from '@/components/molecules/UploadAndEditFile'
import { UploadFileCustom } from '@/components/molecules/UploadFileCustom'
import UploadBox, { fileUpload } from '@/components/molecules/UploadBox'

type Props = {
  index: number
  id: string
  columns: ColumnProps[]
  row: any
}

export const TableRowPE = (props: Props) => {
  const router = useRouter()
  const { actionType } = router.query
  const { index, id, row, columns } = props
  const [openChildIndex, setOpenChildIndex] = useState<number | null>(null)
  const [values, handles] = useTableRowAllocation({ index })
  const { methodForm } = values
  const { control } = methodForm
  const {} = handles

  const colorRowTable =
    row.displayType === 'SECTION'
      ? '#DFE0EB'
      : row.type === 'NOTE'
      ? '#F6F7F9'
      : null

  return (
    <Draggable index={index} draggableId={id?.toString()}>
      {(provided, snapshot) => (
        <>
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
                <TableCell
                  onClick={() => {
                    setOpenChildIndex(openChildIndex === index ? null : index)
                  }}
                  key={indexColumn}
                  {...column.styleCell}
                >
                  {column?.fieldName && !column?.render && (
                    <>
                      {_.isNumber(val) ? (
                        <CurrencyFormatCustom amount={val} />
                      ) : checkDateValid(val) ? (
                        convertToDate(val)
                      ) : (
                        val
                      )}
                    </>
                  )}
                  {column?.render && column.render(row, index)}
                </TableCell>
              )
            })}
          </TableRow>
          {openChildIndex === index && (
            <Grow
              style={{ transformOrigin: '0 0 0' }}
              {...(openChildIndex === index ? { timeout: 400 } : {})}
              in={openChildIndex === index}
            >
              <TableRow>
                <TableCell
                  align='center'
                  style={{
                    padding: `${openChildIndex ? 0 : 0}px 0px ${
                      openChildIndex ? 0 : 0
                    }px 0px`,
                  }}
                  colSpan={columns.length}
                >
                  <Collapse in={openChildIndex === index}>
                    <div
                      onClick={() =>
                        setOpenChildIndex(
                          openChildIndex === index ? null : index
                        )
                      }
                      style={{
                        height: '30px',
                        width: '120px',
                        borderRadius: '4px 4px 0px 0px',
                        backgroundColor: '#0078D4',
                        color: WHITE,
                      }}
                      className='flex items-center justify-center mt-5 ml-10 hover:cursor-pointer'
                    >
                      Chi tiết đề
                    </div>
                    <Divider color={'#0078D4'} sx={{ height: '3px' }} />
                    <div className='p-10 w-full'>
                      <Box className='flex flex-wrap'>
                        <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
                          <Grid item xs={12} sm={12} md={6} lg={6}>
                            <CoreInput
                              control={control}
                              label='Mô tả'
                              placeholder='Nhập mô tả'
                              name={`exams.${index}.description`}
                              multiline
                            />
                          </Grid>

                          <Grid item xs={12} sm={12} md={6} lg={6}>
                            <CoreInput
                              control={control}
                              label='comment'
                              placeholder='Nhập comment'
                              name={`exams.${index}.comment`}
                              multiline
                            />
                          </Grid>

                          <Grid item xs={12}>
                            <UploadBox
                              setUrl={(url) => console.log(url, 'Jack')}
                            />
                          </Grid>
                        </Grid>
                      </Box>
                    </div>
                  </Collapse>
                </TableCell>
              </TableRow>
            </Grow>
          )}
        </>
      )}
    </Draggable>
  )
}
