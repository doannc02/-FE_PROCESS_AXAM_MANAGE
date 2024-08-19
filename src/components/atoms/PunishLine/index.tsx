import { RED } from '@/helper/colors'
import PopupDetailInvoice from '@/components/templates/Accounting/Dialog/PopupDetailInvoice'
import { useFormCustom } from '@/lib/form'
import { MovePunishes } from '@/service/accounting/accountMove/getDetail/type'
import { Typography } from '@mui/material'
import { Variant } from '@mui/material/styles/createTypography'
import { memo } from 'react'
import CoreCheckbox from '../CoreCheckbox'
import { CurrencyFormatCustom } from '../CurrencyFormatCustom'

const PunishLine = ({
  data,
  index,
  variant = 'body1',
  refetch,
}: {
  data: MovePunishes
  index: number
  variant?: Variant
  refetch: any
}) => {
  const { punishRemainAmount, canUndo, id } = data

  const { control } = useFormCustom<{
    isCheck: boolean
  }>({
    defaultValues: {
      isCheck: data.state === 'CANCELED',
    },
  })

  return (
    <div className='flex flex-col'>
      <div className='flex flex-row-reverse'>
        <div className='min-w-[200px] flex flex-row-reverse'>
          <CurrencyFormatCustom
            amount={punishRemainAmount}
            color={RED}
            showCurrencyName
          />
        </div>

        <div className='min-w-[200px] flex flex-row-reverse items-center'>
          <Typography
            variant={variant}
            style={{
              textDecoration: 'line-through',
            }}
          >{`Lần ${index} (${data.code})`}</Typography>
        </div>

        <div className='min-w-[200px] flex flex-row-reverse items-center'>
          <CoreCheckbox
            name='isCheck'
            control={control}
            label={
              <Typography
                variant='body1'
                style={{
                  textDecoration: 'line-through',
                }}
              >
                Miễn phạt
              </Typography>
            }
            disabled={data.state === 'CANCELED'}
          />
        </div>
      </div>

      {data?.punishPayments &&
        data.punishPayments.length > 0 &&
        data.punishPayments.map((item, index) => (
          <div key={index} className='my-5'>
            <PopupDetailInvoice item={item} />
          </div>
        ))}
    </div>
  )
}

export default memo(PunishLine)
