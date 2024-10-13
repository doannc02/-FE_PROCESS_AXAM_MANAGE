import { TableCellWithBorderRight } from '@/components/organism/CoreTable'
import { checkDateValid } from '@/utils/date/checkDate'
import { convertToDate } from '@/utils/date/convertToDate'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { TableBody, TableCell, TableRow, Typography } from '@mui/material'
import _, { get } from 'lodash'
import { useId, useState } from 'react'

export const LineBody = ({
  item,
  columns,
  subColumnName,
  titleField,
  getTitleFieldFn,
  onRowClick,
  isTotalGroup = false,
}: {
  item: any
  columns: any
  subColumnName: string
  titleField: string
  getTitleFieldFn?: any
  onRowClick?: any
  isTotalGroup?: boolean
}) => {
  const key = useId()

  const [open, setOpen] = useState(true)

  return (
    <TableBody key={key}>
      {titleField ? (
        <TableRow>
          <TableCell
            colSpan={columns.length}
            sx={{
              backgroundColor: '#c5e0ed',
              cursor: 'pointer',
            }}
            onClick={() => setOpen(!open)}
          >
            <div className='flex gap-3 items-center'>
              <KeyboardArrowDownIcon
                fontSize='small'
                style={{ transform: open ? 'rotate(180deg)' : undefined }}
              />

              <Typography variant='subtitle1'>
                {getTitleFieldFn
                  ? getTitleFieldFn(get(item, titleField))
                  : get(item, titleField)}
              </Typography>
            </div>
          </TableCell>
        </TableRow>
      ) : (
        <TableRow
          key={key}
          className='hover:bg-slate-100 cursor-pointer'
          onClick={() => {
            onRowClick && onRowClick(item?.id, item)
          }}
        >
          {_.map(columns, (column, indexColumn) => {
            const val = _.get(item, column.fieldName)

            return column.fieldName === 'index' ? (
              <TableCellWithBorderRight align='center'>
                <KeyboardArrowDownIcon
                  fontSize='small'
                  style={{ transform: open ? 'rotate(180deg)' : undefined }}
                />
              </TableCellWithBorderRight>
            ) : (
              <TableCellWithBorderRight key={indexColumn} align='center'>
                {column?.fieldName && !column?.render && (
                  <>{checkDateValid(val) ? convertToDate(val) : val}</>
                )}
              </TableCellWithBorderRight>
            )
          })}
        </TableRow>
      )}

      {open
        ? get(item, subColumnName).map((row: any, index: number) => {
            return (
              <TableRow
                key={key}
                className='hover:bg-slate-100 cursor-pointer'
                onClick={() => {
                  onRowClick && onRowClick(row?.id, row)
                }}
              >
                {_.map(columns, (column, indexColumn) => {
                  const val = _.get(row, column.fieldName)

                  return column.fieldName === 'index' ? (
                    <TableCellWithBorderRight align='center'>
                      {index + 1 > 9 ? index + 1 : `0${index + 1}`}
                    </TableCellWithBorderRight>
                  ) : (
                    <TableCellWithBorderRight key={indexColumn} align='center'>
                      {column?.fieldName && !column?.render && (
                        <>{checkDateValid(val) ? convertToDate(val) : val}</>
                      )}
                    </TableCellWithBorderRight>
                  )
                })}
              </TableRow>
            )
          })
        : null}

      {isTotalGroup && (
        <TableRow
          key={key}
          className='hover:bg-slate-100 cursor-pointer'
          onClick={() => {
            onRowClick && onRowClick(item?.id, item)
          }}
        >
          <TableCellWithBorderRight colSpan={columns.length - 2}>
            <Typography variant='subtitle1' ml={0.5}>
              Tổng:
            </Typography>
          </TableCellWithBorderRight>
          <TableCellWithBorderRight align='center'>
            {get(item, 'amountUntaxedTotal')}
          </TableCellWithBorderRight>
          <TableCellWithBorderRight align='center'>
            {get(item, 'amountTaxTotal')}
          </TableCellWithBorderRight>
        </TableRow>
      )}
    </TableBody>
  )
}
