import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import { TableCell, TableRow, Typography } from '@mui/material'

type Props = {
  isFlag: boolean
  creditTotal: number
  debitTotal: number
  totalSourceCredit: number
  totalSourceDebit: number
}

export const BalanceTotal = ({
  isFlag,
  creditTotal,
  debitTotal,
  totalSourceCredit,
  totalSourceDebit,
}: Props) => {
  return (
    <TableRow className='bg-slate-100 h-22'>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
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
      <TableCell>
        <CurrencyFormatCustom variant='subtitle1' amount={debitTotal} />
      </TableCell>
      <TableCell>
        <CurrencyFormatCustom variant='subtitle1' amount={creditTotal} />
      </TableCell>

      {isFlag && (
        <TableCell>
          <CurrencyFormatCustom variant='subtitle1' amount={totalSourceDebit} />
        </TableCell>
      )}
      {isFlag && (
        <TableCell>
          <CurrencyFormatCustom
            variant='subtitle1'
            amount={totalSourceCredit}
          />
        </TableCell>
      )}
    </TableRow>
  )
}
