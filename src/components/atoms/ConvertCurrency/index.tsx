import { PRIMARY } from '@/helper/colors'
import { CurrencyRate } from '@/service/common/currencyRate/getRate/type'
import { Typography } from '@mui/material'
import { Variant } from '@mui/material/styles/createTypography'
import { CurrencyFormatCustom } from '../CurrencyFormatCustom'

const ConvertCurrency = ({
  variant = 'body2',
  currencyRateData,
}: {
  variant?: Variant
  currencyRateData: CurrencyRate
}) => {
  if (!currencyRateData) return null

  return (
    <div className='flex gap-2 justify-center items-center'>
      <Typography variant={variant}>Tỷ giá quy đổi:</Typography>
      <CurrencyFormatCustom
        variant={variant}
        color={PRIMARY}
        amount={currencyRateData?.amount}
      />
      <Typography variant={variant}>
        {currencyRateData.currencySource?.name}
      </Typography>
      <Typography variant={variant}>=</Typography>
      <CurrencyFormatCustom
        variant={variant}
        color={PRIMARY}
        amount={currencyRateData.amountChange}
      />
      <Typography variant={variant}>
        {currencyRateData.currencyDes?.name}
      </Typography>
    </div>
  )
}

export default ConvertCurrency
