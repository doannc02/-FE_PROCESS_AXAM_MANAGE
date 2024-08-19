import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import {
  CoreTableProps,
  TableCellWithBorderRight,
  TableContainerCommon,
  TableHeadCommon,
} from '@/components/organism/CoreTable'
import PaginationCustom from '@/components/organism/PaginationCustom'
import { useAppSelector } from '@/redux/hook'
import { TotalDebt } from '@/service/accounting/debtPaid/getTotal/type'
import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  styled,
} from '@mui/material'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'

export const TableCellWithBorderRightWithBorderRight = styled(
  TableCellWithBorderRight
)(() => ({
  borderRight: '1px solid #DFE0EB',
}))

export const TableDebt = ({
  className,
  data,
  columns,
  page = 0,
  size = 20,
  totalPages,
  paginationHidden,
  isLoading,
  isShowColumnStt = false,
  maxHeight,
  showInfoText = true,
  totalDebt,
  onChangePageSize,
  onRowClick,
}: CoreTableProps & {
  totalDebt: TotalDebt | null
}) => {
  const { t } = useTranslation('common')

  const { currency } = useAppSelector((state) => state.companyConfigData)

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

  return (
    <Box className={className}>
      <TableContainerCommon
        style={{
          maxHeight: `${maxHeight}px`,
        }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHeadCommon>
            <TableRow>
              <TableCellWithBorderRight align='center' rowSpan={2}>
                STT
              </TableCellWithBorderRight>
              <TableCellWithBorderRight
                align='center'
                rowSpan={2}
                style={{
                  minWidth: 200,
                }}
              >
                Mã đơn hàng
              </TableCellWithBorderRight>
              <TableCellWithBorderRight
                align='center'
                rowSpan={2}
                style={{
                  minWidth: 200,
                }}
              >
                Ngày tạo DH
              </TableCellWithBorderRight>
              <TableCellWithBorderRight
                align='center'
                rowSpan={2}
                style={{
                  minWidth: 200,
                }}
              >
                Mã chứng từ
              </TableCellWithBorderRight>
              <TableCellWithBorderRight
                align='center'
                rowSpan={2}
                style={{
                  minWidth: 200,
                }}
              >
                Ngày lập chứng từ
              </TableCellWithBorderRight>
              <TableCellWithBorderRight
                align='center'
                rowSpan={2}
                style={{
                  minWidth: 200,
                }}
              >
                Nội dung
              </TableCellWithBorderRight>
              <TableCellWithBorderRight
                align='center'
                rowSpan={2}
                style={{
                  minWidth: 200,
                }}
              >
                TK công nợ
              </TableCellWithBorderRight>
              <TableCellWithBorderRight
                align='center'
                rowSpan={2}
                style={{
                  minWidth: 200,
                }}
              >
                TK đối ứng
              </TableCellWithBorderRight>

              <TableCellWithBorderRight align='center' colSpan={2}>
                Số dư đầu kỳ
              </TableCellWithBorderRight>
              <TableCellWithBorderRight align='center' colSpan={2}>
                Phát sinh
              </TableCellWithBorderRight>
              <TableCellWithBorderRight align='center' colSpan={2}>
                Số dư cuối kỳ
              </TableCellWithBorderRight>
            </TableRow>

            <TableRow>
              <TableCellWithBorderRight
                align='center'
                style={{
                  minWidth: 200,
                }}
              >
                {`Nợ (${currency})`}
              </TableCellWithBorderRight>
              <TableCellWithBorderRight
                align='center'
                style={{
                  minWidth: 200,
                }}
              >{`Có (${currency})`}</TableCellWithBorderRight>
              <TableCellWithBorderRight
                align='center'
                style={{
                  minWidth: 200,
                }}
              >
                {`Nợ (${currency})`}
              </TableCellWithBorderRight>
              <TableCellWithBorderRight
                align='center'
                style={{
                  minWidth: 200,
                }}
              >{`Có (${currency})`}</TableCellWithBorderRight>
              <TableCellWithBorderRight
                align='center'
                style={{
                  minWidth: 200,
                }}
              >
                {`Nợ (${currency})`}
              </TableCellWithBorderRight>
              <TableCellWithBorderRight
                align='center'
                style={{
                  minWidth: 200,
                }}
              >{`Có (${currency})`}</TableCellWithBorderRight>
            </TableRow>
          </TableHeadCommon>

          <TableBody>
            {!isLoading && data?.length > 0 && totalDebt && (
              <TableRow>
                <TableCellWithBorderRight />
                <TableCellWithBorderRight />
                <TableCellWithBorderRight />
                <TableCellWithBorderRight />
                <TableCellWithBorderRight />
                <TableCellWithBorderRight />
                <TableCellWithBorderRight />
                <TableCellWithBorderRight />
                <TableCellWithBorderRight align='center'>
                  <CurrencyFormatCustom
                    variant='subtitle1'
                    amount={totalDebt.openBalance.debit}
                  />
                </TableCellWithBorderRight>
                <TableCellWithBorderRight align='center'>
                  <CurrencyFormatCustom
                    variant='subtitle1'
                    amount={totalDebt.openBalance.credit}
                  />
                </TableCellWithBorderRight>
                <TableCellWithBorderRight />
                <TableCellWithBorderRight />
                <TableCellWithBorderRight align='center'>
                  <CurrencyFormatCustom
                    variant='subtitle1'
                    amount={totalDebt.openBalance.debit}
                  />
                </TableCellWithBorderRight>
                <TableCellWithBorderRight align='center'>
                  <CurrencyFormatCustom
                    variant='subtitle1'
                    amount={totalDebt.openBalance.credit}
                  />
                </TableCellWithBorderRight>
              </TableRow>
            )}

            {isLoading ? (
              <TableRow>
                <TableCellWithBorderRight
                  colSpan={columns.length}
                  variant='body'
                >
                  <div className='flex justify-center min-h-[30px]'>
                    <CircularProgress />
                  </div>
                </TableCellWithBorderRight>
              </TableRow>
            ) : data?.length === 0 ? (
              showInfoText ? (
                <TableRow>
                  <TableCellWithBorderRight
                    colSpan={columns.length}
                    variant='body'
                    align='center'
                    className='py-8'
                  >
                    <Typography variant='body1'>
                      {t('table.no_data')}
                    </Typography>
                  </TableCellWithBorderRight>
                </TableRow>
              ) : null
            ) : (
              _.map(data, (row: any, index) => (
                <TableRow
                  key={row?.key || row?.id || index}
                  className='hover:bg-slate-100 cursor-pointer'
                  onClick={() => {
                    onRowClick && onRowClick(row?.id, row)
                  }}
                >
                  {_.map(columns, (column, indexColumn) => {
                    return (
                      <TableCellWithBorderRight
                        key={indexColumn}
                        style={{
                          borderBottom:
                            index !== data.length - 1
                              ? '1px solid rgba(224, 224, 224, 1)'
                              : '',
                        }}
                        align='center'
                      >
                        {column?.fieldName && !column?.render && (
                          <>{_.get(row, column.fieldName)}</>
                        )}
                        {column?.render && column.render(row, index)}
                      </TableCellWithBorderRight>
                    )
                  })}
                </TableRow>
              ))
            )}

            {totalDebt && (
              <TableRow className='bg-slate-100 h-22'>
                <TableCellWithBorderRight />
                <TableCellWithBorderRight />
                <TableCellWithBorderRight />
                <TableCellWithBorderRight />
                <TableCellWithBorderRight />
                <TableCellWithBorderRight />
                <TableCellWithBorderRight />
                <TableCellWithBorderRight align='center'>
                  <Typography variant='subtitle1'>Tổng</Typography>
                </TableCellWithBorderRight>

                <TableCellWithBorderRight align='center'>
                  <CurrencyFormatCustom
                    variant='subtitle1'
                    amount={totalDebt.openBalance.debit}
                  />
                </TableCellWithBorderRight>
                <TableCellWithBorderRight align='center'>
                  <CurrencyFormatCustom
                    variant='subtitle1'
                    amount={totalDebt.openBalance.credit}
                  />
                </TableCellWithBorderRight>
                <TableCellWithBorderRight align='center'>
                  <CurrencyFormatCustom
                    variant='subtitle1'
                    amount={totalDebt.arise.debit}
                  />
                </TableCellWithBorderRight>
                <TableCellWithBorderRight align='center'>
                  <CurrencyFormatCustom
                    variant='subtitle1'
                    amount={totalDebt.arise.credit}
                  />
                </TableCellWithBorderRight>
                <TableCellWithBorderRight align='center'>
                  <CurrencyFormatCustom
                    variant='subtitle1'
                    amount={totalDebt.endingBalance.debit}
                  />
                </TableCellWithBorderRight>
                <TableCellWithBorderRight align='center'>
                  <CurrencyFormatCustom
                    variant='subtitle1'
                    amount={totalDebt.endingBalance.credit}
                  />
                </TableCellWithBorderRight>
              </TableRow>
            )}
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
