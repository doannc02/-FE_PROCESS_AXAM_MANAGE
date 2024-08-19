import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import {
  CoreTableProps,
  TableCellWithBorderRight,
  TableContainerCommon,
  TableHeadCommon,
} from '@/components/organism/CoreTable'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import PaginationCustom from '@/components/organism/PaginationCustom'
import { typeDebtReceivable } from '@/enum'
import { useAppSelector } from '@/redux/hook'
import { TRANSLATE } from '@/routes'
import { TotalDebt } from '@/service/accounting/debtPaid/getTotal/type'
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
import { useState } from 'react'
import LineTab from './components/External/LineTab'
import NormalTab from './components/NormalTab/NormalTab'

export const TableDebt = ({
  type,
  paramsDetailDebts,
  index,
  className,
  data,
  childItems,
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
  setTabNumber,
}: CoreTableProps & {
  totalDebt: TotalDebt | null
}) => {
  const { t } = useTranslation(TRANSLATE.COMMON)

  const { currency } = useAppSelector((state) => state.companyConfigData)
  console.log(index, 'index')
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
        //index: noNumber > 9 ? noNumber : `0${noNumber}`,
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

              {index === 0 ? (
                <>
                  <TableCellWithBorderRight
                    align='center'
                    rowSpan={2}
                    style={{
                      minWidth: 200,
                    }}
                  >
                    Đối tượng
                  </TableCellWithBorderRight>
                  <TableCellWithBorderRight
                    align='center'
                    rowSpan={2}
                    style={{
                      minWidth: 200,
                    }}
                  >
                    TK Công nợ
                  </TableCellWithBorderRight>
                </>
              ) : (
                <>
                  <TableCellWithBorderRight
                    align='center'
                    rowSpan={2}
                    style={{
                      minWidth: 200,
                    }}
                  >
                    {index === 1 ? 'Mã Khách hàng' : 'Mã nhân viên'}
                  </TableCellWithBorderRight>
                  <TableCellWithBorderRight
                    align='center'
                    rowSpan={2}
                    style={{
                      minWidth: 200,
                    }}
                  >
                    {index === 1 ? 'Tên Khách hàng' : 'Tên nhân viên'}
                  </TableCellWithBorderRight>
                  <TableCellWithBorderRight
                    align='center'
                    rowSpan={2}
                    style={{
                      minWidth: 200,
                    }}
                  >
                    TK Công nợ
                  </TableCellWithBorderRight>
                </>
              )}
              <TableCellWithBorderRight
                align='center'
                colSpan={2}
                style={{
                  minWidth: 200,
                }}
              >
                Số dư đầu kỳ
              </TableCellWithBorderRight>
              <TableCellWithBorderRight
                align='center'
                colSpan={2}
                style={{
                  minWidth: 200,
                }}
              >
                Phát sinh
              </TableCellWithBorderRight>
              <TableCellWithBorderRight
                align='center'
                colSpan={2}
                style={{
                  minWidth: 200,
                }}
              >
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
              // _.map(data, (row: any, index) => (
              //   <TableRow
              //     key={row?.key || row?.id || index}
              //     className='hover:bg-slate-100 cursor-pointer'
              //     onClick={() => {
              //       onRowClick && onRowClick(row?.id, row)
              //     }}
              //   >
              //     {_.map(columns, (column, indexColumn) => {
              //       return (
              //         <>
              //           <TableCellWithBorderRight
              //             key={indexColumn}
              //             style={{
              //               borderBottom:
              //                 index !== data.length - 1
              //                   ? '1px solid rgba(224, 224, 224, 1)'
              //                   : '',
              //             }}
              //             align='center'
              //           >
              //
              //             {indexColumn === 0 && index === 0 && (
              //               <>{page * size + index + 1} </>
              //             )}
              //             {column?.fieldName && !column?.render && (
              //               <>
              //                 {index === 0 && _.get(row, column.fieldName)}
              //                 {indexColumn !== 1 && index !== 0
              //                   ? _.get(row, column.fieldName)
              //                   : null}
              //               </>
              //             )}
              //             {column?.render && column.render(row, index)}
              //           </TableCellWithBorderRight>
              //         </>
              //       )
              //     })}
              //   </TableRow>
              // ))

              <>
                {index === 0 &&
                  data.map((i, index) => {
                    console.log(i, 'log')
                    return (
                      <LineTab
                        index={index}
                        key={index}
                        tabNumber={setTabNumber}
                        accountDebts={i?.accountDebts ?? []}
                      />
                    )
                  })}
              </>

              // <>

              //   {type !== 'EXTERNAL' &&
              //     data.map((i, index) => {
              //       return <NormalTab key={index} normalDebts={i?.debts} />
              //     })}
              // </>
            )}
            {index !== 0 &&
              data.map((i, index) => {
                return (
                  <NormalTab
                    paramsDetailDebts={paramsDetailDebts as any}
                    key={index}
                    index={index}
                    normalDebts={i?.debts ?? []}
                  />
                )
              })}
            {totalDebt && (
              <TableRow className='bg-slate-100 h-22'>
                <TableCellWithBorderRight
                  align='center'
                  colSpan={index === 0 ? 3 : 4}
                >
                  <Typography variant='subtitle1'>Tổng:</Typography>
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
