import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import {
  CoreTableProps,
  TableContainerCommon,
  TableHeadCommon,
} from '../CoreTable'
import PaginationCustom from '../PaginationCustom'
import { TRANSLATE } from '@/routes'

import { checkDateValid } from '@/utils/date/checkDate'
import { convertToDate } from '@/utils/date/convertToDate'

export const CustomTable = ({
  refTableContainer = null,
  className,
  data,
  columns,
  page = 0,
  size = 20,
  totalPages,
  paginationHidden,
  isLoading,
  isShowColumnStt = false,
  isShowColumnTurn = false,
  maxHeight,
  showInfoText = true,
  actionTable,
  stickyHeader = false,
  onReturnValueRow,
  onChangePageSize,
  onRowClick,
}: CoreTableProps & {
  isShowColumnTurn?: boolean
  onReturnValueRow?: (val: any) => any
}) => {
  const { t } = useTranslation(TRANSLATE.COMMON)

  if (isShowColumnStt) {
    columns = [
      {
        header: t('table.no') ?? 'No',
        fieldName: 'index',
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

  if (isShowColumnTurn) {
    columns = [
      {
        header: 'Lần chỉnh sửa',
        fieldName: 'turn',
      },
      ...columns,
    ]
    data = data.map((item: any, index: number) => {
      const noNumber = page * size + index + 1
      return {
        ...item,
        index: noNumber > 9 ? noNumber : `0${noNumber}`,
        turn: noNumber > 9 ? `Lần ${noNumber}` : `Lần 0${noNumber}`,
      }
    })
  }

  return (
    <Box className={className}>
      <TableContainerCommon
        style={{
          maxHeight: `${maxHeight}px`,
        }}
        ref={refTableContainer}
      >
        <Table
          stickyHeader={stickyHeader}
          aria-label='sticky table'
          sx={{ minWidth: 650 }}
        >
          <TableHeadCommon>
            <TableRow>
              {_.map(columns, (column, index) => (
                <TableCell
                  variant='head'
                  key={index}
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
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} variant='body'>
                  <div className='flex justify-center min-h-[30px]'>
                    <CircularProgress />
                  </div>
                </TableCell>
              </TableRow>
            ) : data?.length === 0 ? (
              showInfoText ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    variant='body'
                    align='center'
                    className='py-8'
                  >
                    <Typography variant='body1'>
                      {t('table.no_data')}
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : null
            ) : (
              _.map(data, (row: any, index) => (
                <TableRow
                  key={row?.key || row?.id || index}
                  className='hover:bg-slate-100 cursor-pointer'
                  onClick={() => {
                    onRowClick && onRowClick(row?.id, row)
                    if (onReturnValueRow) onReturnValueRow(row)
                  }}
                >
                  {_.map(columns, (column, indexColumn) => {
                    const val = _.get(row, column?.fieldName ?? '')
                    return (
                      <TableCell
                        key={indexColumn}
                        style={{
                          borderBottom:
                            index !== data.length - 1
                              ? '1px solid rgba(224, 224, 224, 1)'
                              : '',
                        }}
                      >
                        {column?.fieldName && !column?.render && (
                          <>{checkDateValid(val) ? convertToDate(val) : val}</>
                        )}
                        {column?.render && column.render(row, index)}
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))
            )}

            {actionTable && actionTable}
          </TableBody>
        </Table>
      </TableContainerCommon>
      {!paginationHidden && (
        <div className='py-5'>
          <PaginationCustom
            size={size ?? 1}
            page={page ?? 1}
            totalPages={totalPages ?? 1}
            onChangePagination={(val: any) =>
              onChangePageSize && onChangePageSize(val)
            }
          />
        </div>
      )}
    </Box>
  )
}
