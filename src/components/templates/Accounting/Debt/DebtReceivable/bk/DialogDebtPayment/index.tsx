import { CoreButton } from '@/components/atoms/CoreButton'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import CoreCheckbox from '@/components/atoms/CoreCheckbox'
import CoreInput from '@/components/atoms/CoreInput'
import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import LoadingPage from '@/components/atoms/LoadingPage'
import { WarningText } from '@/components/atoms/WarningText'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import MoneyIcon from '@/components/icons/MoneyIcon'
import { PRIMARY, RED } from '@/helper/colors'
import { Action } from '@/components/molecules/Action'
import { DialogCustom } from '@/components/organism/DialogCustom'
import { DialogAddSTKBank } from '@/components/templates/Accounting/Dialog/DialogAddSTKBank'
import { paymentMethodSelect } from '@/enum'
import { CircularProgress, Grid, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import useDialogDebtPayment from './useDialogDebtPayment'

export type Props = {
  invoiceId: number[]
  saleOrderId: number[]
  refetchDebtException: any
  refetchDebtSale: any
}

const DialogDebtPayment = (props: Props) => {
  const [values, handles] = useDialogDebtPayment(props)
  const { hideDialog } = useDialog()
  const { t } = useTranslation()

  const [isOpenDialogSTK, setIsOpenDialogSTK] = useState(false)

  const {
    isLoading,
    methodForm,
    isLoadingAccountJournal,
    accountJournalSelect,
    isLoadingUserLogin,
    bankSelect,
  } = values

  const { control, watch, setValue } = methodForm
  const { onSubmit, refetchUserLoginData } = handles

  const accountMoves = watch('accountMoves') ?? []

  return (
    <DialogCustom
      title='Điều chỉnh công nợ'
      onClose={hideDialog}
      width={1000}
      formProps={{
        className: 'p-20',
        onSubmit,
      }}
    >
      <div className='p-5'>
        {isLoading ? (
          <div className='min-h-30 pb-20'>
            <LoadingPage />
          </div>
        ) : (
          <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
            {watch('haveEarlyDiscount') === 'HAVE_EARLY_DISCOUNT' && (
              <Grid
                item
                xs={12}
                style={{
                  paddingTop: 0,
                }}
              >
                <WarningText>Đã áp dụng thanh toán chiết khấu sớm</WarningText>
              </Grid>
            )}

            <Grid item xs={12}>
              <div
                className='flex justify-around items-center min-h-[96px] w-166 rounded-[6px] py-8 px-10 gap-8'
                style={{
                  border: '1px solid #DFE0EB',
                }}
              >
                <MoneyIcon />

                <div className='flex flex-col gap-6 h-23'>
                  {isLoading ? (
                    <CircularProgress size={15} />
                  ) : (
                    <CurrencyFormatCustom
                      amount={watch('totalHavePaid') ?? 0}
                      color={RED}
                      variant='h6'
                      showCurrencyName
                    />
                  )}

                  <Typography variant='body1'>Tổng công nợ phải thu</Typography>
                </div>
              </div>
            </Grid>
            {(accountMoves ?? []).map((accountMove, index) => {
              return (
                <Grid item xs={12} key={index}>
                  <div className='flex gap-5'>
                    <Typography variant='subtitle1'>
                      Hóa đơn {accountMove.code}
                    </Typography>
                  </div>

                  {accountMove.movePunishes.map((pu, puIndex) => {
                    return (
                      <div
                        className='flex items-center gap-10 mx-5 mt-3'
                        key={pu.id}
                      >
                        <Typography>{`Lần ${index}:`}</Typography>
                        <CurrencyFormatCustom
                          amount={pu.amountRemainingPunish}
                        />
                        <div>
                          <CoreCheckbox
                            name={`accountMoves.${index}.movePunishes.${puIndex}.isPenaltyExemption`}
                            control={control}
                            label='Miễn phạt'
                            onChangeValue={(checked: boolean) => {
                              if (checked)
                                setValue(
                                  'totalHavePaid',
                                  watch('totalHavePaid') -
                                    pu.amountRemainingPunish
                                )
                              else
                                setValue(
                                  'totalHavePaid',
                                  watch('totalHavePaid') +
                                    pu.amountRemainingPunish
                                )
                            }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </Grid>
              )
            })}
            <Grid item xs={12}>
              <CoreAutocomplete
                control={control}
                name='accountJournalId'
                label='Sổ kế toán'
                placeholder='Chọn sổ kế toán'
                valuePath='id'
                labelPath='name'
                loading={isLoadingAccountJournal}
                options={accountJournalSelect}
                required
                rules={{ required: t('common:validation.required') }}
                onChangeValue={(val) => {
                  if (val) {
                    const accountJournal = accountJournalSelect.find(
                      (ele) => ele.id === val
                    )
                    if (accountJournal && accountJournal.type) {
                      setValue('paymentMethod', accountJournal.type)
                    }
                  }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <CoreAutocomplete
                control={control}
                name='paymentMethod'
                label='Hình thức thanh toán'
                placeholder='Chọn hình thức thanh toán'
                options={paymentMethodSelect}
                readOnly
              />
            </Grid>
            {watch('paymentMethod') === 'BANK' && (
              <Grid item xs={12}>
                <div className='flex flex-col gap-2'>
                  <CoreAutocomplete
                    control={control}
                    name='bankAccountId'
                    label='STK'
                    placeholder='Chọn stk'
                    loading={isLoadingUserLogin}
                    options={bankSelect}
                    required
                    rules={{
                      required: t('common:validation.required'),
                    }}
                  />
                  <div
                    className='flex items-center gap-1 cursor-pointer'
                    onClick={() => {
                      setIsOpenDialogSTK(true)
                    }}
                  >
                    <Action actionList={['append']} />
                    <Typography variant='caption' color={PRIMARY}>
                      Tạo nhanh STK
                    </Typography>
                  </div>
                </div>
              </Grid>
            )}
            <Grid item xs={12}>
              <CoreInput
                multiline
                control={control}
                name='note'
                label='Ghi chú'
                placeholder='Nhập nội dung ghi chú'
                required
              />
            </Grid>
          </Grid>
        )}

        <div className='space-x-12 text-center my-10'>
          <CoreButton theme='cancel' onClick={hideDialog}>
            {t('common:btn.cancel')}
          </CoreButton>

          <CoreButton theme='submit' type='submit'>
            {t('common:btn.save_change')}
          </CoreButton>
        </div>
      </div>

      {isOpenDialogSTK && (
        <DialogAddSTKBank
          refetch={refetchUserLoginData}
          onCloseDialog={() => setIsOpenDialogSTK(false)}
          setValue={methodForm.setValue}
          name='bankAccountId'
        />
      )}
    </DialogCustom>
  )
}

export default DialogDebtPayment
