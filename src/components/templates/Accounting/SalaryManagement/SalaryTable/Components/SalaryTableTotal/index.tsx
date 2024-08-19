import { CurrencyFormatCustom } from "@/components/atoms/CurrencyFormatCustom";
import { TableCell, TableRow, Typography } from "@mui/material";
import React from "react";
type Props = {
    totalAmount: number
    isLoading: boolean
}
export default function SalaryTableTotal({totalAmount , isLoading} : Props) {
    return <>
    {!isLoading && (
      <TableRow className='bg-slate-100 h-22'>
        <TableCell>
          <Typography
            variant='body1'
            style={{
              fontWeight: 600,
            }}
          >
            Tổng:
          </Typography>
        </TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
        {true && (
          <TableCell>
            <CurrencyFormatCustom
              variant='subtitle1'
              amount={totalAmount}

            />
          </TableCell>
        )}
      </TableRow>
    )}
  </>
}
