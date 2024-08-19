import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import useCheckPath from '@/components/hooks/path/useCheckPath'
import { TableCellWithBorderRight } from '@/components/organism/CoreTable'
import { MENU_URL } from '@/routes'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { Collapse, TableCell, TableRow } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const NormalLineTab = ({
  paramsDetailDebts,
  normalDebts,
  index,
}: {
  paramsDetailDebts: {
    start: string
    end: string
    accountLedgerId: number | null
    type: string
  }
  index: number
  normalDebts: any[]
}) => {
  const [open, setOpen] = useState(false)

  const handleCollapseToggle = () => {
    setOpen(!open)
  }

  const router = useRouter()

  const { typeDebt } = useCheckPath()
  const onClickCode = (row: any) => {
    console.log(row, 'row')
    router.push({
      pathname:
        typeDebt === 'PAYABLE'
          ? `${MENU_URL.DEBT.PAYABLE}/[id]`
          : `${MENU_URL.DEBT.RECEIVABLE}/[id]`,
      query: {
        id: row?.account?.id,
        start: paramsDetailDebts?.start,
        end: paramsDetailDebts?.end,
        partnerName: row?.partnerResponse?.name,
        partnerId: row?.partnerResponse?.id,
        type: paramsDetailDebts?.type ?? 'EXTERNAL',
      },
    })
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
                  {normalDebts?.length > 1 ? (
                    <KeyboardArrowUpIcon fontSize='small' />
                  ) : (
                    <></>
                  )}
                  {index + 1 < 9 ? `0${index + 1}` : index + 1}
                </>
              ) : (
                <>
                  {normalDebts?.length > 1 ? (
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
          {normalDebts[0]?.partnerResponse?.code}
        </TableCellWithBorderRight>

        <TableCellWithBorderRight
          style={{
            borderBottom: '1px solid rgba(224, 224, 224, 1)',
          }}
          align='center'
        >
          {normalDebts[0]?.partnerResponse?.name}
        </TableCellWithBorderRight>

        <TableCellWithBorderRight
          style={{
            borderBottom: '1px solid rgba(224, 224, 224, 1)',
          }}
          align='center'
          onClick={() => onClickCode(normalDebts[0])}
        >
          {normalDebts[0]?.account?.code}
        </TableCellWithBorderRight>

        <TableCellWithBorderRight align='center'>
          <CurrencyFormatCustom
            amount={normalDebts[0]?.openBalance?.debit ?? 0}
          />
        </TableCellWithBorderRight>

        <TableCellWithBorderRight align='center'>
          <CurrencyFormatCustom
            amount={normalDebts[0]?.openBalance?.credit ?? 0}
          />
        </TableCellWithBorderRight>

        <TableCellWithBorderRight align='center'>
          <CurrencyFormatCustom amount={normalDebts[0]?.arise?.debit ?? 0} />
        </TableCellWithBorderRight>

        <TableCellWithBorderRight align='center'>
          <CurrencyFormatCustom amount={normalDebts[0]?.arise?.credit ?? 0} />
        </TableCellWithBorderRight>

        <TableCellWithBorderRight align='center'>
          <CurrencyFormatCustom
            amount={normalDebts[0]?.endingBalance?.debit ?? 0}
          />
        </TableCellWithBorderRight>

        <TableCellWithBorderRight align='center'>
          <CurrencyFormatCustom
            amount={normalDebts[0]?.endingBalance?.credit ?? 0}
          />
        </TableCellWithBorderRight>
      </TableRow>

      <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={9}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            {normalDebts.slice(1).map((ele, index) => (
              <TableRow key={index}>
                <TableCellWithBorderRight
                  className='w-[58px]'
                  style={{
                    borderBottom: '1px solid rgba(224, 224, 224, 1)',
                    borderRight: 'none',
                  }}
                  align='center'
                ></TableCellWithBorderRight>

                <TableCellWithBorderRight
                  className='w-[230px]'
                  style={{
                    borderBottom: '1px solid rgba(224, 224, 224, 1)',
                    borderRight: 'none',
                  }}
                  align='center'
                ></TableCellWithBorderRight>

                <TableCellWithBorderRight
                  className='w-[230px]'
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
                  <CurrencyFormatCustom amount={ele?.openBalance?.debit ?? 0} />
                </TableCellWithBorderRight>

                <TableCellWithBorderRight
                  className='w-[230px]'
                  align='center'
                  style={{
                    borderBottom: '1px solid rgba(224, 224, 224, 1)',
                  }}
                >
                  <CurrencyFormatCustom
                    amount={ele?.openBalance?.credit ?? 0}
                  />
                </TableCellWithBorderRight>

                <TableCellWithBorderRight
                  className='w-[230px]'
                  align='center'
                  style={{
                    borderBottom: '1px solid rgba(224, 224, 224, 1)',
                  }}
                >
                  <CurrencyFormatCustom amount={ele?.arise?.debit ?? 0} />
                </TableCellWithBorderRight>

                <TableCellWithBorderRight
                  className='w-[230px]'
                  align='center'
                  style={{
                    borderBottom: '1px solid rgba(224, 224, 224, 1)',
                  }}
                >
                  <CurrencyFormatCustom amount={ele?.arise?.credit ?? 0} />
                </TableCellWithBorderRight>

                <TableCellWithBorderRight
                  className='w-[230px]'
                  align='center'
                  style={{
                    borderBottom: '1px solid rgba(224, 224, 224, 1)',
                  }}
                >
                  <CurrencyFormatCustom
                    amount={ele?.endingBalance?.debit ?? 0}
                  />
                </TableCellWithBorderRight>

                <TableCellWithBorderRight
                  className='w-[230px]'
                  align='center'
                  style={{
                    borderBottom: '1px solid rgba(224, 224, 224, 1)',
                  }}
                >
                  <CurrencyFormatCustom
                    amount={ele?.endingBalance?.credit ?? 0}
                  />
                </TableCellWithBorderRight>
              </TableRow>
            ))}
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

export default React.memo(NormalLineTab)
