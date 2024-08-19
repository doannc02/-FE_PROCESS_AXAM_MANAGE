import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreInput from '@/components/atoms/CoreInput'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { TopAction } from '@/components/molecules/TopAction'
import CoreNavbar from '@/components/organism/CoreNavbar'
import PageContainer from '@/components/organism/PageContainer'
import { MENU_URL } from '@/routes'
import { getAccountList } from '@/service/accounting/account/getList'
import { postCheckMappingBalance } from '@/service/accounting/accountMoveLine/checkMapping'
import { getBankOfCompanyList } from '@/service/common/company/getListBank'
import { getCurrencyOfCompany } from '@/service/common/company/getListCurrency'
import { Grid, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import DialogCfEditBalance from '../../DialogCfEditBalance'
import DialogDeleteBalance from '../../DialogDeleteBalance'
import useSaveBankBalance from './useSaveBankBalance'

const SaveBankBalance = () => {
  const { t } = useTranslation('accounting/bank-balance')
  const [values, handles] = useSaveBankBalance()
  const router = useRouter()
  const { actionType } = router.query
  const { isUpdate, id, currencyId, currency, methodForm, isLoadingSubmit } =
    values

  const { watch, control } = methodForm
  const { onSubmit, onCancel } = handles
  const { showDialog } = useDialog()

  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          isShowDashboard
          breadcrumbs={[
            {
              title: t('title'),
              pathname: MENU_URL.BALANCE.BANK_BALANCE,
            },
            {
              title: isUpdate
                ? actionType === 'VIEW'
                  ? t('common:detail')
                  : t('common:btn.edit')
                : t('common:btn.add'),
            },
          ]}
        />
      }
    >
      <CoreNavbar
        breadcrumbs={[
          {
            title: 'Chi tiết',
            rightAction: isUpdate ? (
              <TopAction
                actionList={['edit', 'delete']}
                onEditAction={async () => {
                  const { data } = await postCheckMappingBalance({
                    id,
                  })
                  if (data && data.isHaveMatching) {
                    showDialog(
                      <DialogCfEditBalance
                        id={id}
                        refetch={() => {
                          router.replace({
                            pathname: `${MENU_URL.BALANCE.BANK_BALANCE}/[id]`,
                            query: {
                              id,
                            },
                          })
                        }}
                      />
                    )
                  } else {
                    router.replace({
                      pathname: `${MENU_URL.BALANCE.BANK_BALANCE}/[id]`,
                      query: {
                        id,
                      },
                    })
                  }
                }}
                onDeleteAction={() => {
                  showDialog(
                    <DialogDeleteBalance
                      id={id}
                      beginType='BANK'
                      refetch={() => {
                        router.push({
                          pathname: MENU_URL.BALANCE.BANK_BALANCE,
                        })
                      }}
                    />
                  )
                }}
              />
            ) : null,
            content: (
              <form
                className='block bg-[#ffffff] mt-10 rounded-xl mx-auto'
                onSubmit={onSubmit}
              >
                <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <CoreAutoCompleteAPI
                      control={control}
                      name='currencySource'
                      label='Tiền tệ'
                      placeholder='Chọn tiền tệ'
                      fetchDataFn={getCurrencyOfCompany}
                      required
                      rules={{
                        required: t('common:validation.required'),
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <CoreAutoCompleteAPI
                      control={control}
                      name='bankAccount'
                      label='Tài khoản ngân hàng'
                      valuePath='id'
                      labelPath2='accountNumber'
                      labelPath='bank'
                      placeholder='Chọn tài khoản ngân hàng'
                      fetchDataFn={getBankOfCompanyList}
                      rules={{
                        required: t('common:validation.required'),
                      }}
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <CoreAutoCompleteAPI
                      control={control}
                      name='account'
                      label='Tài khoản kế toán'
                      placeholder='Chọn tài khoản kế toán'
                      labelPath2='code'
                      fetchDataFn={getAccountList}
                      rules={{
                        required: t('common:validation.required'),
                      }}
                      required
                    />
                  </Grid>

                  {watch('currencySource')?.id !== currencyId && (
                    <Grid item xs={12} sm={12} md={6} lg={6}></Grid>
                  )}

                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <CoreInput
                      control={control}
                      name='amountSourceDebit'
                      label='Dư nợ'
                      type='number'
                      placeholder='Nhập số dư nợ'
                      rules={{
                        required: t('common:validation.required'),
                        validate: (val: number) =>
                          val !== 0 || 'Dự nợ phải khác 0.',
                      }}
                      required
                    />
                  </Grid>

                  {watch('currencySource')?.id !== currencyId && (
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <CoreInput
                        control={control}
                        name='debit'
                        type='number'
                        label='Dư nợ quy đổi'
                        placeholder='Nhập số dư nợ quy đổi'
                        rules={{
                          required: t('common:validation.required'),
                        }}
                        required
                        InputProps={{
                          endAdornment: (
                            <Typography variant='body2'>{currency}</Typography>
                          ),
                        }}
                      />
                    </Grid>
                  )}
                </Grid>

                {actionType !== 'VIEW' && (
                  <div className='space-x-12 text-center mt-15'>
                    <CoreButton theme='cancel' onClick={onCancel}>
                      {t('common:btn.cancel')}
                    </CoreButton>
                    <CoreButton
                      theme='submit'
                      type='submit'
                      loading={isLoadingSubmit}
                    >
                      {isUpdate
                        ? t('common:btn.save_change')
                        : t('common:btn.add')}
                    </CoreButton>
                  </div>
                )}
              </form>
            ),
          },
        ]}
      ></CoreNavbar>
    </PageContainer>
  )
}

export default SaveBankBalance
