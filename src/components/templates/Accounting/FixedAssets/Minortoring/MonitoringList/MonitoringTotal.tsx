import { TableCell, TableRow, Typography } from '@mui/material'
import { formatNumber } from '@/helper/formatNumber'
import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'

type Props = {
  isFlag: boolean
  total: number | any
}

export const MonitoringTotal = ({ isFlag, total }: Props) => {
  return (
    <TableRow className='bg-slate-100 h-22'>
      <TableCell>
        <Typography
          variant='body1'
          style={{
            fontWeight: 500,
          }}
        >
          Tổng:
        </Typography>
      </TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell>
        {isFlag && (
          <CurrencyFormatCustom
            variant='subtitle1'
            amount={total}
            showCurrencyName
          />
        )}
        {/* {isFlag && formatNumber(total)} */}
      </TableCell>
    </TableRow>
  )
}
