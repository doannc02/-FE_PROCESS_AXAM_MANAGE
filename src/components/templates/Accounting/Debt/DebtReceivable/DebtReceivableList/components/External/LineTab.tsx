import { TableCellWithBorderRight } from '@/components/organism/CoreTable'
import { balanceType } from '@/enum'
import { Collapse, TableCell, TableRow } from '@mui/material'
import React, { useState } from 'react'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
const LineTab = ({
  accountDebts,
  tabNumber,
  index,
}: {
  accountDebts: any[]
  tabNumber?: any
  index: number
}) => {
  const [open, setOpen] = useState(false)

  const handleCollapseToggle = () => {
    setOpen(!open)
  }

  const onClickCode = (row: any) => {
    console.log(row.type, 'lzzz')
    const type = {
      EXTERNAL: 1,
      STAFF: 2,
      INTERNAL: 3,
    }
    console.log(type[row?.type as 'EXTERNAL' | 'STAFF' | 'INTERNAL'], 'mmm')
    tabNumber(type[row?.type as 'EXTERNAL' | 'STAFF' | 'INTERNAL'])
  }

  return (
    <>
      <TableRow
        className='hover:bg-slate-100 cursor-pointer'
        onClick={handleCollapseToggle}
        style={{
          borderBottom: '1px solid rgba(224, 224, 224, 1)',
          backgroundColor: '#F6F7F9',
        }}
      >
        <TableCellWithBorderRight
          style={{
            borderBottom: '1px solid rgba(224, 224, 224, 1)',
            borderRight: 'none',
          }}
          align='center'
        >
          {
            <div className='flex justify-between'>
              {open ? (
                <>
                  {accountDebts?.length > 1 ? (
                    <KeyboardArrowUpIcon fontSize='small' />
                  ) : (
                    <></>
                  )}
                  {index + 1 < 9 ? `0${index + 1}` : index + 1}
                </>
              ) : (
                <>
                  {accountDebts?.length > 1 ? (
                    <KeyboardArrowDownIcon fontSize='small' />
                  ) : (
                    <div className='w-9px]'></div>
                  )}
                  {index + 1 < 9 ? `0${index + 1}` : index + 1}
                </>
              )}
            </div>
          }
        </TableCellWithBorderRight>

        <TableCellWithBorderRight
          style={{
            borderBottom: '1px solid rgba(224, 224, 224, 1)',
          }}
          align='center'
        >
          {
            balanceType.find(
              (i) =>
                i.value ===
                (accountDebts[0]?.type as 'EXTERNAL' | 'INTERNAL' | 'STAFF')
            )?.label
          }
        </TableCellWithBorderRight>

        <TableCellWithBorderRight
          style={{
            borderBottom: '1px solid rgba(224, 224, 224, 1)',
          }}
          align='center'
          onClick={() => onClickCode(accountDebts[0])}
        >
          {accountDebts[0]?.account?.code}
        </TableCellWithBorderRight>

        <TableCellWithBorderRight align='center'>
          <CurrencyFormatCustom amount={accountDebts[0]?.openBalance?.debit} />
        </TableCellWithBorderRight>

        <TableCellWithBorderRight align='center'>
          <CurrencyFormatCustom amount={accountDebts[0]?.openBalance?.credit} />
        </TableCellWithBorderRight>

        <TableCellWithBorderRight align='center'>
          <CurrencyFormatCustom amount={accountDebts[0]?.arise?.debit} />
        </TableCellWithBorderRight>

        <TableCellWithBorderRight align='center'>
          <CurrencyFormatCustom amount={accountDebts[0]?.arise?.credit} />
        </TableCellWithBorderRight>

        <TableCellWithBorderRight align='center'>
          <CurrencyFormatCustom
            amount={accountDebts[0]?.endingBalance?.debit}
          />
        </TableCellWithBorderRight>

        <TableCellWithBorderRight align='center'>
          <CurrencyFormatCustom
            amount={accountDebts[0]?.endingBalance?.credit}
          />
        </TableCellWithBorderRight>
      </TableRow>

      <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={9}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            {accountDebts.slice(1).map((ele, index) => (
              <TableRow key={index}>
                <TableCellWithBorderRight
                  className='w-[61.2px]'
                  style={{
                    borderBottom: '1px solid rgba(224, 224, 224, 1)',
                    borderRight: 'none',
                  }}
                  align='center'
                ></TableCellWithBorderRight>

                <TableCellWithBorderRight
                  className='w-[229.7px]'
                  style={{
                    borderBottom: '1px solid rgba(224, 224, 224, 1)',
                  }}
                  align='center'
                ></TableCellWithBorderRight>

                <TableCellWithBorderRight
                  className='w-[227px] hover:bg-slate-100 cursor-pointer'
                  style={{
                    borderBottom: '1px solid rgba(224, 224, 224, 1)',
                  }}
                  align='center'
                  onClick={() => onClickCode(ele)}
                >
                  {ele?.account?.code}
                </TableCellWithBorderRight>

                <TableCellWithBorderRight
                  className='w-[230px]'
                  align='center'
                  style={{
                    borderBottom: '1px solid rgba(224, 224, 224, 1)',
                  }}
                >
                  <CurrencyFormatCustom amount={ele?.openBalance?.debit} />
                </TableCellWithBorderRight>

                <TableCellWithBorderRight
                  className='w-[230px]'
                  align='center'
                  style={{
                    borderBottom: '1px solid rgba(224, 224, 224, 1)',
                  }}
                >
                  <CurrencyFormatCustom amount={ele?.openBalance?.credit} />
                </TableCellWithBorderRight>

                <TableCellWithBorderRight
                  className='w-[230px]'
                  align='center'
                  style={{
                    borderBottom: '1px solid rgba(224, 224, 224, 1)',
                  }}
                >
                  <CurrencyFormatCustom amount={ele?.arise?.debit} />
                </TableCellWithBorderRight>

                <TableCellWithBorderRight
                  className='w-[230px]'
                  align='center'
                  style={{
                    borderBottom: '1px solid rgba(224, 224, 224, 1)',
                  }}
                >
                  <CurrencyFormatCustom amount={ele?.arise?.credit} />
                </TableCellWithBorderRight>

                <TableCellWithBorderRight
                  className='w-[230px]'
                  align='center'
                  style={{
                    borderBottom: '1px solid rgba(224, 224, 224, 1)',
                  }}
                >
                  <CurrencyFormatCustom amount={ele?.endingBalance?.debit} />
                </TableCellWithBorderRight>

                <TableCellWithBorderRight
                  className='w-[230px]'
                  align='center'
                  style={{
                    borderBottom: '1px solid rgba(224, 224, 224, 1)',
                  }}
                >
                  <CurrencyFormatCustom amount={ele?.endingBalance?.credit} />
                </TableCellWithBorderRight>
              </TableRow>
            ))}
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

export default React.memo(LineTab)
