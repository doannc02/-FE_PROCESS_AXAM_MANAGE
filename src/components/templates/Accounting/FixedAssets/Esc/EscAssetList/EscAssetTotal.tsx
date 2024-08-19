import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import { TableCell, TableRow, Typography } from '@mui/material'

type Props = {
  isLoading: boolean
  isFlag: boolean
  recordedValue: number
  periodicAllocation: number
  remainAmount: number
}

export const EscAssetTotal = ({
  isLoading,
  isFlag,
  recordedValue,
  periodicAllocation,
  remainAmount,
}: Props) => {
  return (
    <>
      {!isLoading && (
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
          <TableCell>
            <CurrencyFormatCustom variant='subtitle1' amount={recordedValue} />
          </TableCell>
          <TableCell>
            <CurrencyFormatCustom variant='subtitle1' amount={remainAmount} />
          </TableCell>
          <TableCell></TableCell>
          {isFlag && (
            <TableCell>
              <CurrencyFormatCustom
                variant='subtitle1'
                amount={periodicAllocation}
              />
            </TableCell>
          )}
          <TableCell></TableCell>

          <TableCell></TableCell>
          <TableCell></TableCell>
        </TableRow>
      )}
    </>
  )
}
