import {
  CoreTableProps,
  TableCellWithBorderRight,
  TableContainerCommon,
  TableHeadCommon,
} from '@/components/organism/CoreTable'
import { TRANSLATE } from '@/routes'
import { CashReportTotal } from '@/service/accounting/cashReport/getTotal/type'
import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableRow,
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useId } from 'react'
import { LineBody } from './LineBody'

export const TableHeadTaxReturn = ({
  addendumType,
}: {
  addendumType: 'SO' | 'PO'
}) => {
  const { t } = useTranslation(TRANSLATE.TAX_RETURN)

  return (
    <TableHeadCommon>
      <TableRow>
        <TableCellWithBorderRight align='center' rowSpan={2}>
          {t('common:table.no')}
        </TableCellWithBorderRight>

        <TableCellWithBorderRight
          align='center'
          colSpan={2}
          style={{
            minWidth: 350,
          }}
        >
          {addendumType === 'SO'
            ? 'Hoá đơn chứng từ bán ra'
            : 'Hoá đơn chứng từ mua vào'}
        </TableCellWithBorderRight>
        <TableCellWithBorderRight
          align='center'
          rowSpan={2}
          style={{
            minWidth: 200,
          }}
        >
          {addendumType === 'SO' ? 'Tên người mua' : 'Tên người bán'}
        </TableCellWithBorderRight>

        <TableCellWithBorderRight
          align='center'
          rowSpan={2}
          style={{
            minWidth: 200,
          }}
        >
          {addendumType === 'SO' ? 'MSTG người mua' : 'MST người bán'}
        </TableCellWithBorderRight>
        <TableCellWithBorderRight
          align='center'
          rowSpan={2}
          style={{
            minWidth: 200,
          }}
        >
          Doanh thu chưa có thuế GTGT
        </TableCellWithBorderRight>
        <TableCellWithBorderRight
          align='center'
          rowSpan={2}
          style={{
            minWidth: 250,
          }}
        >
          Thuế GTGT
        </TableCellWithBorderRight>
      </TableRow>

      <TableRow>
        <TableCellWithBorderRight
          align='center'
          style={{
            minWidth: 200,
          }}
        >
          Số hóa đơn
        </TableCellWithBorderRight>
        <TableCellWithBorderRight
          align='center'
          style={{
            minWidth: 200,
          }}
        >
          Thời gian lập hóa đơn
        </TableCellWithBorderRight>
      </TableRow>
    </TableHeadCommon>
  )
}

export const TaxReturnTable = (
  props: CoreTableProps & {
    totalReport?: CashReportTotal | null
    addendumType?: 'SO' | 'PO'
  }
) => {
  const { t } = useTranslation(TRANSLATE.TAX_RETURN)
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
    addendumType,
  } = props

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
          <TableBody>
            {isLoading && (
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
            )}
          </TableBody>

          {data.map((item, index) => (
            <LineBody
              key={`${key + index}`}
              item={item as any}
              columns={columns}
            />
          ))}
        </Table>
      </TableContainerCommon>
    </Box>
  )
}
