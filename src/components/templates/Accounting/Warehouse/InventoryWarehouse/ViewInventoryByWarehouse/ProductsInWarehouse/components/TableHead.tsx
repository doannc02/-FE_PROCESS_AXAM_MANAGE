import {
  TableCellWithBorderRight,
  TableHeadCommon,
} from '@/components/organism/CoreTable'
import { useAppSelector } from '@/redux/hook'
import { TRANSLATE } from '@/routes'
import { TableRow } from '@mui/material'
import { useTranslation } from 'next-i18next'

export const TableHeadTest = () => {
  const { currency } = useAppSelector((state) => state.companyConfigData)

  return (
    <TableHeadCommon>
      <TableRow>
        <TableCellWithBorderRight
          align='center'
          rowSpan={2}
          style={{
            minWidth: 200,
          }}
        >
          SKU
        </TableCellWithBorderRight>
        <TableCellWithBorderRight
          align='center'
          rowSpan={2}
          style={{
            minWidth: 350,
          }}
        >
          Tên sản phẩm
        </TableCellWithBorderRight>
        <TableCellWithBorderRight
          align='center'
          colSpan={2}
          style={{
            minWidth: 200,
          }}
        >
          Đầu kỳ
        </TableCellWithBorderRight>
        <TableCellWithBorderRight
          align='center'
          colSpan={2}
          style={{
            minWidth: 200,
          }}
        >
          Nhập kho
        </TableCellWithBorderRight>
        <TableCellWithBorderRight
          align='center'
          colSpan={2}
          style={{
            minWidth: 250,
          }}
        >
          Xuất kho
        </TableCellWithBorderRight>
        <TableCellWithBorderRight
          align='center'
          colSpan={2}
          style={{
            minWidth: 250,
          }}
        >
          Cuối kỳ
        </TableCellWithBorderRight>
      </TableRow>
      <TableRow>
        <TableCellWithBorderRight
          align='center'
          style={{
            minWidth: 200,
          }}
        >
          Số lượng
        </TableCellWithBorderRight>
        <TableCellWithBorderRight
          align='center'
          style={{
            minWidth: 200,
          }}
        >
          Giá trị ({`${currency}`})
        </TableCellWithBorderRight>
        <TableCellWithBorderRight
          align='center'
          style={{
            minWidth: 200,
          }}
        >
          Số lượng
        </TableCellWithBorderRight>
        <TableCellWithBorderRight
          align='center'
          style={{
            minWidth: 200,
          }}
        >
          Giá trị ({`${currency}`})
        </TableCellWithBorderRight>
        <TableCellWithBorderRight
          align='center'
          style={{
            minWidth: 200,
          }}
        >
          Số lượng
        </TableCellWithBorderRight>
        <TableCellWithBorderRight
          align='center'
          style={{
            minWidth: 200,
          }}
        >
          Giá trị ({`${currency}`})
        </TableCellWithBorderRight>
        <TableCellWithBorderRight
          align='center'
          style={{
            minWidth: 200,
          }}
        >
          Số lượng
        </TableCellWithBorderRight>
        <TableCellWithBorderRight
          align='center'
          style={{
            minWidth: 200,
          }}
        >
          Giá trị ({`${currency}`})
        </TableCellWithBorderRight>
      </TableRow>
    </TableHeadCommon>
  )
}
