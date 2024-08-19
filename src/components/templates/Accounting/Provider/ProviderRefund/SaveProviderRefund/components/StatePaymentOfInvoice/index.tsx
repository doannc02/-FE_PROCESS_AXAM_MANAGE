import CustomStep from '@/components/atoms/CustomSteps'
import { GREEN, ORANGE, RED } from '@/helper/colors'
import { memo } from 'react'

const StatePaymentOfInvoice = ({
  paymentStatus,
}: {
  paymentStatus: string
}) => {
  return (
    <div className='flex justify-end'>
      <CustomStep
        listStep={[
          '',
          paymentStatus === 'PAID'
            ? 'Đã thanh toán'
            : paymentStatus === 'PARTIAL_PAYMENT'
            ? 'Thanh toán 1 phần'
            : paymentStatus === 'REVERSE'
            ? 'Đảo ngược'
            : 'Chưa thanh toán',
        ]}
        index={1}
        enableNextStep={false}
        color={
          paymentStatus === 'PAID'
            ? GREEN
            : paymentStatus === 'PARTIAL_PAYMENT'
            ? ORANGE
            : RED
        }
      />
    </div>
  )
}
export default memo(StatePaymentOfInvoice)
