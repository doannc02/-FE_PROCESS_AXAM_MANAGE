import PunishLine from '@/components/atoms/PunishLine'
import TitleWithAmount from '@/components/atoms/TitleWithAmount'
import MoneyBalanceItem from '@/components/organism/MoneyBalanceItem'
import PopupDetailInvoice from '@/components/templates/Accounting/Dialog/PopupDetailInvoice'
import { AccountMoveDetail } from '@/service/accounting/accountMove/getDetail/type'
import { BaseResponse } from '@/service/type'
import { Typography } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { v4 as uuidV4 } from 'uuid'
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from 'react-query'

const InvoicePaymentInfo = ({
  isUpdate,
  data,
  refetch,
}: {
  isUpdate: boolean
  data?: BaseResponse<AccountMoveDetail>
  refetch?: <TPageData>(
    options?: RefetchOptions & RefetchQueryFilters<TPageData>
  ) => Promise<QueryObserverResult<BaseResponse<AccountMoveDetail>, unknown>>
}) => {
  const { watch } = useFormContext<AccountMoveDetail>()
  if (
    !!watch(`invoiceLines.${0}.product`) &&
    !!watch(`invoiceLines.${0}.quantity`) &&
    !!watch(`invoiceLines.${0}.unitPrice`)
  ) {
    return (
      <div className='flex flex-col w-full gap-10 mt-10 mb-20'>
        <TitleWithAmount
          amount={watch('amountUntaxed')}
          title='Thành tiền chưa thuế'
        />

        {(watch('computeTaxInfo')
          ? watch('computeTaxInfo').summaryItems
          : []
        ).map((item, index: number) => {
          return (
            <TitleWithAmount
              key={uuidV4()}
              amount={item.amount}
              title={item.taxName}
            />
          )
        })}

        <TitleWithAmount amount={watch('totalTax')} title='Tổng thuế' />

        <TitleWithAmount amount={watch('amountTotal')} title='Thành tiền' />

        {watch('movePunishes') && watch('movePunishes').length > 0 && (
          <div className='flex flex-row-reverse'>
            <div className='flex flex-col'>
              <div className='flex flex-row-reverse'>
                <div className='w-260'>
                  <Typography variant='h6'>Phạt trả chậm</Typography>
                </div>
              </div>

              {(watch('movePunishes') ?? []).map((item, index) => {
                return (
                  <PunishLine
                    key={index}
                    index={index + 1}
                    data={item}
                    refetch={refetch}
                  />
                )
              })}
            </div>
          </div>
        )}

        {watch('paymentResponses') && watch('paymentResponses').length > 0 && (
          <div className='flex flex-row-reverse'>
            <div className='flex flex-col gap-5'>
              <div className='flex flex-row-reverse'>
                <div className='w-260'>
                  <Typography variant='h6'>Đã thanh toán</Typography>
                </div>
              </div>

              {watch('paymentResponses').map((item, index) => {
                return <PopupDetailInvoice key={index} item={item} />
              })}
            </div>
          </div>
        )}

        {watch('discount') !== null && Number(watch('discount')) > 0 && (
          <TitleWithAmount
            title='Áp dụng DKTK'
            amount={-(watch('discount') ?? 0)}
          />
        )}

        {watch('state') === 'POSTED' &&
          watch('moneyPaid') !== null &&
          watch('moneyPaid') !== undefined && (
            <TitleWithAmount
              title='Số tiền phải trả'
              variant='subtitle1'
              amount={watch('moneyPaid')}
            />
          )}

        {watch('moneyPaid') > 0 &&
          watch('moneyBalanceResponses') &&
          watch('moneyBalanceResponses').length > 0 && (
            <>
              <div className='flex flex-row-reverse my-10'>
                <div className='w-260'>
                  <Typography variant='h6'>Đối trừ công nợ</Typography>
                </div>
              </div>

              {isUpdate &&
                data &&
                watch('moneyBalanceResponses').map((item, index) => {
                  return (
                    <MoneyBalanceItem
                      key={index}
                      item={item}
                      dataInvoice={data.data}
                      type='OUTBOUND'
                      refetch={refetch}
                    />
                  )
                })}
            </>
          )}
      </div>
    )
  } else return null
}

export default InvoicePaymentInfo
