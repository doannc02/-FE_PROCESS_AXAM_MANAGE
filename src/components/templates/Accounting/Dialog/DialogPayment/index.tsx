import ConvertCurrency from '@/components/atoms/ConvertCurrency'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreButton } from '@/components/atoms/CoreButton'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import CoreInput from '@/components/atoms/CoreInput'
import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import LoadingPage from '@/components/atoms/LoadingPage'
import { RadioGroupCustom } from '@/components/atoms/RadioGroupButton'
import { WarningText } from '@/components/atoms/WarningText'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { Action } from '@/components/molecules/Action'
import { DialogCustom } from '@/components/organism/DialogCustom'
import { paymentMethodSelect } from '@/enum'
import { PRIMARY } from '@/helper/colors'
import { getCurrencyRate } from '@/service/common/currencyRate/getRate'
import { CurrencyRate } from '@/service/common/currencyRate/getRate/type'
import { Grid, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import { Controller } from 'react-hook-form'
import { DialogAddSTKBank } from '../DialogAddSTKBank'
import useDialogPayment from './useDialogPayment'

const DialogPayment = ({
  bankAccount,
  paymentTypeOfInv,
  id,
  name,
  type,
  amount,
  refetch,
}: {
  bankAccount?: any
  paymentTypeOfInv?: 'CASH' | 'BANK'
  id: number
  name: string
  type: 'INBOUND' | 'OUTBOUND'
  amount: number
  refetch: any
}) => {
  const { hideDialog } = useDialog()
  const { t } = useTranslation()
  const [values, handles] = useDialogPayment({
    bankAccount,
    paymentTypeOfInv,
    id,
    name,
    type,
    refetch,
  })
  const {
    amountValue,
    typePath,
    currencyId,
    isLoading,
    moneyPaid,
    methodForm,
    isLoadingAccountJournal,
    accountJournalSelect,
    isLoadingAccountSelect,
    accountSelect,
    isLoadingCurrencySelect,
    currencySelect,
    haveEarlyDiscount,
    isLoadingUserLogin,
    bankSelect,
  } = values

  const { control, watch, setValue } = methodForm
  const { onSubmit, refetchUserLoginData, setAmountValue } = handles

  const [isOpenDialogSTK, setIsOpenDialogSTK] = useState(false)

  const [currencyRateData, setCurrencyRateData] =
    useState<null | CurrencyRate>(null)

  const handleChangeCurrencyOrAmount = async () => {
    if (moneyPaid) {
      if (watch('currencyId') === currencyId) {
        if (amountValue < moneyPaid) {
          setValue('keepOpen', true)
          setValue('haveEarlyDiscount', null)
        } else if (amountValue > moneyPaid) {
          setValue('keepOpen', false)
          setValue('haveEarlyDiscount', haveEarlyDiscount)
        } else {
          setValue('keepOpen', false)
          setValue('haveEarlyDiscount', haveEarlyDiscount)
        }
      } else {
        const res = await getCurrencyRate({
          isSale: typePath === 'CUSTOMER',
          amount: watch('amount'),
          currencySourceId: Number(watch('currencyId')),
        })

        if (res && res.data) {
          setCurrencyRateData(res.data)
          setAmountValue(res.data.amountChange)

          const newVal = res.data.amountChange

          if (newVal < moneyPaid) {
            setValue('keepOpen', true)
            setValue('haveEarlyDiscount', null)
          } else if (newVal > moneyPaid) {
            setValue('keepOpen', false)
            setValue('haveEarlyDiscount', haveEarlyDiscount)
          } else {
            setValue('keepOpen', false)
            setValue('haveEarlyDiscount', haveEarlyDiscount)
          }
        }
      }
    }
  }

  return (
    <DialogCustom
      title='Ghi nhận thanh toán'
      onClose={hideDialog}
      width={1000}
      formProps={{
        className: 'p-10',
        onSubmit,
      }}
    >
      <div className='pt-5 px-15 pb-15'>
        {isLoading ? (
          <div className='min-h-[400px] pb-20'>
            <LoadingPage />
          </div>
        ) : (
          <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
            {watch('haveEarlyDiscount') === 'HAVE_EARLY_DISCOUNT' && (
              <Grid item xs={12}>
                <WarningText>Đã áp dụng thanh toán chiết khấu sớm</WarningText>
              </Grid>
            )}

            <Grid item xs={12} sm={12} md={6} lg={6}>
              <CoreAutocomplete
                control={control}
                name='accountJournalId'
                label='Sổ kế toán'
                placeholder='Chọn sổ kế toán'
                valuePath='id'
                labelPath='name'
                loading={isLoadingAccountJournal}
                options={accountJournalSelect}
                isViewProp={false}
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
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <div className='flex flex-col gap-5'>
                <CoreInput
                  control={control}
                  name='amount'
                  label='Số tiền'
                  placeholder='Nhập số tiền'
                  type='number'
                  onChangeValue={(val) => setAmountValue(val)}
                  onAfterChangeValue={() => {
                    handleChangeCurrencyOrAmount()
                  }}
                  isViewProp={false}
                  InputProps={{
                    style: { paddingRight: 0 },
                    endAdornment: (
                      <CoreAutocomplete
                        InputProps={{
                          style: {
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                            minWidth: 100,
                          },
                        }}
                        control={control}
                        isViewProp={false}
                        name='currencyId'
                        placeholder='Đơn vị'
                        disableClearable
                        labelPath='name'
                        valuePath='id'
                        loading={isLoadingCurrencySelect}
                        options={currencySelect}
                        isHasMessageError={false}
                        onAfterChangeValue={handleChangeCurrencyOrAmount}
                      />
                    ),
                  }}
                  required
                  rules={{ required: t('common:validation.required') }}
                />

                {watch('amount') &&
                  watch('currencyId') !== currencyId &&
                  currencyRateData && (
                    <ConvertCurrency currencyRateData={currencyRateData} />
                  )}
              </div>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6}>
              <CoreAutocomplete
                control={control}
                name='paymentMethod'
                label='Hình thức thanh toán'
                placeholder='Chọn hình thức thanh toán'
                options={paymentMethodSelect}
                isViewProp={false}
                readOnly
              />
            </Grid>

            {watch('paymentMethod') === 'BANK' && (
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <div className='flex flex-col gap-2'>
                  <CoreAutocomplete
                    control={control}
                    name='bankAccountId'
                    label='STK'
                    placeholder='Chọn stk'
                    loading={isLoadingUserLogin}
                    options={bankSelect}
                    isViewProp={false}
                    //labelPath2='code'
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

            <Grid item xs={12} sm={12} md={6} lg={6}>
              <CoreDatePicker
                control={control}
                name='paymentDate'
                title='Ngày thanh toán'
                placeholder='Chọn ngày thanh toán'
                format='YYYY-MM-DD'
                isViewProp={false}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6}>
              <CoreInput
                control={control}
                name='note'
                label='Nội dung giao dịch'
                placeholder='Nhập nội dung giao dịch'
                inputProps={{
                  maxLength: 250,
                }}
                isViewProp={false}
              />
            </Grid>

            {(currencyId === watch('currencyId') &&
              amount !== watch('amount')) ||
            (currencyId !== watch('currencyId') &&
              currencyRateData &&
              currencyRateData.amountChange &&
              currencyRateData.amountChange !== amount) ? (
              <>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  style={{
                    marginTop: '30px',
                  }}
                >
                  <div className='flex gap-15'>
                    <Typography variant='body1'>
                      Thanh toán chênh lệch
                    </Typography>
                    <div className='flex flex-col gap-8'>
                      {watch('amount') &&
                        watch('currencyId') !== currencyId &&
                        currencyRateData && (
                          <CurrencyFormatCustom
                            amount={currencyRateData.amountChange - amount}
                            showCurrencyName
                          />
                        )}

                      {watch('currencyId') === currencyId && (
                        <CurrencyFormatCustom
                          amount={watch('amount') - amount}
                          showCurrencyName
                        />
                      )}

                      <Controller
                        name='keepOpen'
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <RadioGroupCustom
                            value={value ? 'true' : 'false'}
                            onBlur={onBlur}
                            onChange={(e) => {
                              onChange(e.target.value === 'true')
                            }}
                            options={[
                              { value: 'false', label: 'Đánh dấu đã trả đủ' },
                              { value: 'true', label: 'Giữ vẫn mở' },
                            ]}
                            type='secondary'
                          />
                        )}
                      />
                    </div>
                  </div>
                </Grid>

                {!watch('keepOpen') &&
                  watch('haveEarlyDiscount') !== 'HAVE_EARLY_DISCOUNT' && (
                    <>
                      <Grid item xs={12} sm={12} md={6} lg={6}>
                        <CoreAutocomplete
                          control={control}
                          name='accountId'
                          label='Vào tài khoản giá trị chênh lệch'
                          placeholder='Chọn tài khoản'
                          valuePath='id'
                          labelPath='name'
                          labelPath2='code'
                          loading={isLoadingAccountSelect}
                          options={accountSelect}
                          required={!watch('keepOpen') ?? false}
                          isViewProp={false}
                          rules={{
                            validate: {
                              rule1: (v: string) => {
                                if (!watch('keepOpen') && !watch('accountId'))
                                  return 'Trường này là bắt buộc.'
                              },
                            },
                          }}
                        />
                      </Grid>

                      {/* <Grid item xs={12} sm={12} md={6} lg={6}>
                        <CoreInput
                          control={control}
                          name='description'
                          label='Nhãn'
                          placeholder='Nhập nhãn'
                          isViewProp={false}
                        />
                      </Grid> */}
                    </>
                  )}
              </>
            ) : null}
          </Grid>
        )}

        <div className='space-x-12 text-center my-10'>
          <CoreButton theme='cancel' onClick={hideDialog}>
            {t('common:btn.cancel')}
          </CoreButton>

          <CoreButton theme='submit' type='submit'>
            Tạo thanh toán
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

export default DialogPayment
