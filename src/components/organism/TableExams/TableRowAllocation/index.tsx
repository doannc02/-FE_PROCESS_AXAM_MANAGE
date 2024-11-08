import EditText from '@/components/molecules/EditText'
import UploadBox from '@/components/molecules/UploadBox'
import { ColumnProps } from '@/components/organism/CoreTable'
import { getRole } from '@/config/token'
import { GREEN, RED, WHITE } from '@/helper/colors'
import { checkDateValid } from '@/utils/date/checkDate'
import { convertToDate } from '@/utils/date/convertToDate'
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
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { FormProvider } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useTableRowAllocation } from './useTableRowAllocation'

type Props = {
  index: number
  id: string
  columns: ColumnProps[]
  row: any
}

const hashColorApprove = {
  approved: GREEN,
  rejected: RED,
} as any

export const TableRowPE = (props: Props) => {
  const { t } = useTranslation()
  const role = getRole()
  const router = useRouter()
  const { actionType, id: idRouter } = router.query
  const isView = !!idRouter && actionType === 'VIEW'
  const { index, id, row, columns } = props
  const [openChildIndex, setOpenChildIndex] = useState<number | null>(null)
  const [values, handles] = useTableRowAllocation({ index })
  const { methodForm } = values
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = methodForm
  const {} = handles

  const colorRowTable =
    row.displayType === 'SECTION'
      ? '#DFE0EB'
      : row.type === 'NOTE'
      ? '#F6F7F9'
      : null

  console.log(errors, 'herer')

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
                    if (column?.fieldName !== 'index') return
                    setOpenChildIndex(openChildIndex === index ? null : index)
                  }}
                  key={indexColumn}
                  {...column.styleCell}
                >
                  {column?.fieldName && !column?.render && (
                    <>{checkDateValid(val) ? convertToDate(val) : val}</>
                  )}
                  {column?.render && column.render(row, index)}
                </TableCell>
              )
            })}
          </TableRow>
          {openChildIndex === index || !!errors ? (
            <Grow
              style={{ transformOrigin: '0 0 0' }}
              {...(openChildIndex === index ? { timeout: 400 } : {})}
              in={openChildIndex === index || !!errors}
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
                  <Collapse in={!!errors || openChildIndex === index}>
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
                          <Grid item xs={12} sm={12} md={12} lg={12}>
                            <EditText
                              title='Mô tả đề'
                              error=''
                              disabled={isView || role === 'admin'}
                              editorText={watch(`exams.${index}.description`)}
                              placeholder='Mô tả đề'
                              setEditorText={(text) =>
                                setValue(`exams.${index}.description`, text)
                              }
                            />
                          </Grid>

                          <Grid item xs={12} sm={12} md={12} lg={12}>
                            <EditText
                              title='Nhận xét đề'
                              error=''
                              disabled={isView || role !== 'admin'}
                              editorText={watch(`exams.${index}.comment`)}
                              placeholder='Nhận xét của Admin'
                              setEditorText={(text) =>
                                setValue(`exams.${index}.comment`, text)
                              }
                            />
                          </Grid>

                          {
                            <Grid item xs={12}>
                              <FormProvider {...methodForm}>
                                <UploadBox
                                  isView={role === 'Admin'}
                                  name={`exams.${index}.attached_file`}
                                  url={watch(`exams.${index}.attached_file`)}
                                  setUrl={(url) => {
                                    if (url) {
                                      setValue(
                                        `exams.${index}.attached_file`,
                                        url
                                      )
                                    }
                                  }}
                                />
                              </FormProvider>
                            </Grid>
                          }
                        </Grid>
                      </Box>
                    </div>
                  </Collapse>
                </TableCell>
              </TableRow>
            </Grow>
          ) : null}
        </>
      )}
    </Draggable>
  )
}
