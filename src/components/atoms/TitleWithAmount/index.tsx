import { RED } from '@/helper/colors'
import { Typography } from '@mui/material'
import { Variant } from '@mui/material/styles/createTypography'
import { memo } from 'react'
import { CurrencyFormatCustom } from '../CurrencyFormatCustom'

const TitleWithAmount = ({
  amount,
  title,
  variant = 'body1',
}: {
  amount: number
  title: string
  variant?: Variant
}) => {
  return (
    <div className='flex flex-row-reverse'>
      <div className='min-w-[200px] flex flex-row-reverse'>
        <CurrencyFormatCustom
          variant={variant}
          amount={!amount ? 0 : amount ?? 0}
          color={RED}
          showCurrencyName
        />
      </div>
      <Typography variant={variant}>{title}</Typography>
    </div>
  )
}

export default memo(TitleWithAmount)
