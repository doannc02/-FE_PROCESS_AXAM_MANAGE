import {
  TableCellWithBorderRight,
  TableHeadCommon,
} from '@/components/organism/CoreTable'
import { TRANSLATE } from '@/routes'
import { TableRow } from '@mui/material'
import { useTranslation } from 'next-i18next'

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
