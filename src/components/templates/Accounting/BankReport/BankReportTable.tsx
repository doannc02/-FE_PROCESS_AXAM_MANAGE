import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import {
  CoreTableProps,
  TableCellWithBorderRight,
  TableContainerCommon,
  TableHeadCommon,
} from '@/components/organism/CoreTable'
import { useAppSelector } from '@/redux/hook'
import { TRANSLATE } from '@/routes'
import { CashReportTotal } from '@/service/accounting/cashReport/getTotal/type'
import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableRow,
  Typography,
} from '@mui/material'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useId } from 'react'

export const BankReportTable = (
  props: CoreTableProps & {
    totalReport?: CashReportTotal | null
  }
) => {
  const { t } = useTranslation(TRANSLATE.BANK_CASH_REPORT)
  let {
    className,
    data,
    columns,
    page = 0,
    size = 20,
    isLoading,
    isShowColumnStt = false,
    maxHeight,
    showInfoText = true,
    onRowClick,
    totalReport,
  } = props
  const { currency } = useAppSelector((state) => state.companyConfigData)

  if (isShowColumnStt) {
    columns = [
      {
        header: t('common:table.no') ?? 'No',
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

  const key = useId()

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
              {/* <TableCellWithBorderRight align='center' rowSpan={2}>
                {t('common:table.no')}
              </TableCellWithBorderRight> */}

              <TableCellWithBorderRight
                align='center'
                rowSpan={2}
                style={{
                  minWidth: 150,
                }}
              >
                {t('table.accountingDate')}
              </TableCellWithBorderRight>

              <TableCellWithBorderRight
                align='center'
                rowSpan={2}
                style={{
                  minWidth: 150,
                }}
              >
                {t('table.paymentDate')}
              </TableCellWithBorderRight>

              <TableCellWithBorderRight
                align='center'
                rowSpan={2}
                style={{
                  minWidth: 150,
                }}
              >
                {t('table.receiptNumber')}
              </TableCellWithBorderRight>
              <TableCellWithBorderRight
                align='center'
                rowSpan={2}
                style={{
                  minWidth: 150,
                }}
              >
                {t('table.payNumber')}
              </TableCellWithBorderRight>
              <TableCellWithBorderRight
                align='center'
                rowSpan={2}
                style={{
                  minWidth: 200,
                }}
              >
                {t('table.label')}
              </TableCellWithBorderRight>
              <TableCellWithBorderRight
                align='center'
                rowSpan={2}
                style={{
                  minWidth: 150,
                }}
              >
                {t('table.account')}
              </TableCellWithBorderRight>
              <TableCellWithBorderRight
                align='center'
                rowSpan={2}
                style={{
                  minWidth: 150,
                }}
              >
                {t('table.reciprocalAccount')}
              </TableCellWithBorderRight>

              <TableCellWithBorderRight
                align='center'
                colSpan={2}
                style={{
                  minWidth: 150,
                }}
              >
                Số phát sinh
              </TableCellWithBorderRight>
              <TableCellWithBorderRight
                align='center'
                rowSpan={2}
                style={{
                  minWidth: 150,
                }}
              >
                {t('table.inventoryNumber')}
              </TableCellWithBorderRight>
              <TableCellWithBorderRight
                align='center'
                rowSpan={2}
                style={{
                  minWidth: 250,
                }}
              >
                {t('table.partner')}
              </TableCellWithBorderRight>
            </TableRow>

            <TableRow>
              <TableCellWithBorderRight
                align='center'
                style={{
                  minWidth: 150,
                }}
              >
                {`Nợ (${currency})`}
              </TableCellWithBorderRight>
              <TableCellWithBorderRight
                align='center'
                style={{
                  minWidth: 150,
                }}
              >{`Có (${currency})`}</TableCellWithBorderRight>
            </TableRow>
          </TableHeadCommon>

          <TableBody>
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
                      {t('common:table.no_data')}
                    </Typography>
                  </TableCellWithBorderRight>
                </TableRow>
              ) : null
            ) : (
              _.map(data, (row: any, index) =>
                row?.bankAccountResponse ? (
                  <TableRow key={`${key + index}`}>
                    <TableCellWithBorderRight
                      colSpan={columns.length}
                      variant='body'
                      className='py-8'
                    >
                      <Typography variant='subtitle1'>
                        {`${row?.bankAccountResponse?.bank} - ${row?.bankAccountResponse?.accountNumber}`}
                      </Typography>
                    </TableCellWithBorderRight>
                  </TableRow>
                ) : (
                  <TableRow
                    key={`${key + index}`}
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
                )
              )
            )}

            {totalReport && (
              <TableRow className='bg-slate-100 h-22'>
                <TableCellWithBorderRight align='left' colSpan={7}>
                  <Typography
                    variant='subtitle1'
                    sx={{
                      fontWeight: 600,
                    }}
                  >
                    Tổng cộng:
                  </Typography>
                </TableCellWithBorderRight>
                <TableCellWithBorderRight align='center'>
                  <CurrencyFormatCustom
                    variant='subtitle1'
                    amount={totalReport.arise.debit}
                  />
                </TableCellWithBorderRight>
                <TableCellWithBorderRight align='center'>
                  <CurrencyFormatCustom
                    variant='subtitle1'
                    amount={totalReport.arise.credit}
                  />
                </TableCellWithBorderRight>
                <TableCellWithBorderRight align='center'>
                  <CurrencyFormatCustom
                    variant='subtitle1'
                    amount={totalReport.finalAmount}
                  />
                </TableCellWithBorderRight>
                <TableCellWithBorderRight />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainerCommon>
    </Box>
  )
}
