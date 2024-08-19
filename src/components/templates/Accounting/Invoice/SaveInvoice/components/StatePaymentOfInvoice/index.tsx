import { BLUE, GREEN, ORANGE, RED } from '@/helper/colors'
import { memo } from 'react'
import CustomStepInvoice from './customStepInvoice'

const typePaymentBGColor = {
  NOT_PAYMENT: RED,
  PAID: GREEN,
  PARTIAL_PAYMENT: BLUE,
}

const StatePaymentOfInvoice = ({
  state,
  paymentStatus,
}: {
  state: string
  paymentStatus: string
}) => {
  return (
    <>
      {state === 'DRAFT' ? (
        <></>
      ) : (
        <div
          className='absolute top-50 right-10 h-50 w-60'
          style={{
            backgroundColor:
              typePaymentBGColor[
                paymentStatus as 'NOT_PAYMENT' | 'PARTIAL_PAYMENT' | 'PAID'
              ],
            clipPath: ' polygon(0 0, 33% 0, 100% 66%, 100% 100%)',
          }}
        >
          {/* {state === 'POSTED' && (
        <CustomStep
          listStep={[
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
      )} */}

          {state === 'POSTED' && (
            <CustomStepInvoice
              listStep={[
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
              color={'white'}
            />
          )}
        </div>
      )}
    </>
  )
  // eslint-disable-next-line react-hooks/exhaustive-deps
}

export default memo(StatePaymentOfInvoice)
