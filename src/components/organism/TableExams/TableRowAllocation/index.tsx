import EditText from '@/components/molecules/EditText'
import UploadBox from '@/components/molecules/UploadBox'
import { ColumnProps } from '@/components/organism/CoreTable'
import { getRole } from '@/config/token'
import { GREEN, RED } from '@/helper/colors'
import { checkDateValid } from '@/utils/date/checkDate'
import { convertToDate } from '@/utils/date/convertToDate'
import { Box, Collapse, Grid, Grow, TableCell, TableRow } from '@mui/material'
import _ from 'lodash'
import { useEffect, useState } from 'react'
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
  const { index, id, row, columns } = props
  const [openChildIndex, setOpenChildIndex] = useState<number | null>(null)
  const [values, handles] = useTableRowAllocation({ index })
  const { methodForm } = values
  const {
    watch,
    setValue,
    clearErrors, // Thêm clearErrors để xóa lỗi
    formState: { errors },
  } = methodForm

  const currentErrors = _.get(errors, `exams.${index}`, null)

  // Nếu có lỗi, mở dòng
  useEffect(() => {
    if (
      currentErrors &&
      Object.keys(currentErrors).length > 0 &&
      openChildIndex !== index
    ) {
      setOpenChildIndex(index)
    }
  }, [currentErrors, index, openChildIndex])

  const getErrorMessage = (path: string) => {
    const error = _.get(errors, path)
    return typeof error?.message === 'string' ? error.message : ''
  }

  const handleRowClick = () => {
    setOpenChildIndex((prev) => (prev === index ? null : index))
  }

  const colorRowTable =
    row.displayType === 'SECTION'
      ? '#DFE0EB'
      : row.type === 'NOTE'
      ? '#F6F7F9'
      : null

  return (
    <Draggable index={index} draggableId={id?.toString()}>
      {(provided) => (
        <>
          <TableRow
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            sx={{ backgroundColor: colorRowTable }}
          >
            {_.map(columns, (column, indexColumn) => {
              const val = _.get(row, column?.fieldName ?? '')
              return (
                <TableCell
                  onClick={() => {
                    if (
                      column.fieldName === 'index' ||
                      column.fieldName === 'button'
                    ) {
                      handleRowClick()
                    }
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

          {/* Hàng mở rộng */}
          <Grow
            style={{ transformOrigin: '0 0 0' }}
            {...(openChildIndex === index ? { timeout: 400 } : {})}
            in={openChildIndex === index}
          >
            <TableRow>
              <TableCell align='center' colSpan={columns.length}>
                <Collapse in={openChildIndex === index}>
                  <div className='p-10 w-full'>
                    <Box className='flex flex-wrap'>
                      <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={12}>
                          <EditText
                            title='Mô tả đề'
                            error={getErrorMessage(
                              `exams.${index}.description`
                            )}
                            disabled={role === 'Admin'}
                            editorText={watch(`exams.${index}.description`)}
                            setEditorText={(text) => {
                              // Xóa lỗi khi thay đổi giá trị
                              setValue(`exams.${index}.description`, text)
                              clearErrors(`exams.${index}.description`)
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <EditText
                            title='Nhận xét đề'
                            error={getErrorMessage(`exams.${index}.comment`)}
                            disabled={role !== 'Admin'}
                            editorText={watch(`exams.${index}.comment`)}
                            setEditorText={(text) => {
                              setValue(`exams.${index}.comment`, text)
                              clearErrors(`exams.${index}.comment`)
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <FormProvider {...methodForm}>
                            <UploadBox
                              isView={role === 'Admin'}
                              name={`exams.${index}.attached_file`}
                              url={watch(`exams.${index}.attached_file`)}
                              setUrl={(url) => {
                                if (url) {
                                  setValue(`exams.${index}.attached_file`, url)
                                }
                              }}
                            />
                          </FormProvider>
                        </Grid>
                      </Grid>
                    </Box>
                  </div>
                </Collapse>
              </TableCell>
            </TableRow>
          </Grow>
        </>
      )}
    </Draggable>
  )
}
