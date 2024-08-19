import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import { TableCellWithBorderRight } from '@/components/organism/CoreTable'
import { TaxAddendumTypeResponse } from '@/service/accounting/taxReturn/taxReturn/get/type'
import { checkDateValid } from '@/utils/date/checkDate'
import { convertToDate } from '@/utils/date/convertToDate'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { TableBody, TableCell, TableRow, Typography } from '@mui/material'
import _ from 'lodash'
import { useId, useState } from 'react'

export const LineBody = ({
  item,
  columns,
}: {
  item: TaxAddendumTypeResponse
  columns: any
}) => {
  const key = useId()

  const [open, setOpen] = useState(true)

  return (
    <TableBody key={key}>
      <TableRow>
        <TableCell
          colSpan={columns.length}
          sx={{
            backgroundColor: '#d5efee',
            cursor: 'pointer',
          }}
          onClick={() => setOpen(!open)}
        >
          <div className='flex gap-3 items-center'>
            <KeyboardArrowDownIcon
              fontSize='small'
              style={{ transform: open ? 'rotate(180deg)' : undefined }}
            />

            <Typography variant='subtitle1'>{item?.type}</Typography>
          </div>
        </TableCell>
      </TableRow>

      {open
        ? item.taxAddendumLineResponses.map((row, index) => {
            return (
              <TableRow
                key={key}
                className='hover:bg-slate-100 cursor-pointer'
                // onClick={() => {
                //   onRowClick && onRowClick(row?.id, row)
                // }}
              >
                {_.map(columns, (column, indexColumn) => {
                  const val = _.get(row, column.fieldName)

                  return column.fieldName === 'index' ? (
                    <TableCellWithBorderRight align='center'>
                      {index + 1}
                    </TableCellWithBorderRight>
                  ) : (
                    <TableCellWithBorderRight key={indexColumn} align='center'>
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
                    </TableCellWithBorderRight>
                  )
                })}
              </TableRow>
            )
          })
        : null}
    </TableBody>
  )
}
