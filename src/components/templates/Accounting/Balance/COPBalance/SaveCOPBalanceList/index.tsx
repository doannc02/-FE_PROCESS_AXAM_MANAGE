import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreInput from '@/components/atoms/CoreInput'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { TopAction } from '@/components/molecules/TopAction'
import PageWithDetail from '@/components/organism/PageWithDetail'
import { backToListUI } from '@/helper/backToListUI'
import { useCheckPath } from '@/path'
import { useAppSelector } from '@/redux/hook'
import { MENU_URL } from '@/routes'
import { getAccountList } from '@/service/accounting/account/getList'
import { getAccountConfig } from '@/service/accounting/accountConfig/get'
import { postCheckMappingBalance } from '@/service/accounting/accountMoveLine/checkMapping'
import { getBranchList } from '@/service/common/branch/getList'
import { getCurrencyOfCompany } from '@/service/common/company/getListCurrency'
import { getPartnerList } from '@/service/common/partner/getListTiny'
import { Grid, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import DialogCfEditBalance from '../../DialogCfEditBalance'
import DialogDeleteBalance from '../../DialogDeleteBalance'
import useSaveCOPDebtBalance from './useSaveCOPDebtBalance'
import { balanceType } from '@/enum'

const SaveCOPDebtBalance = () => {
  const { t } = useTranslation('accounting/cop-balance')
  const [values, handles] = useSaveCOPDebtBalance()
  const { id, isUpdate, actionType, currencyId, methodForm, isLoadingSubmit } =
    values
  const idBranch = useAppSelector((state) => state.branchData.id)
  const { id: companyId } = useAppSelector((state) => state.companyConfigData)
  const { watch, control, trigger, setValue } = methodForm
  const { onSubmit, onCancel } = handles
  const router = useRouter()
  const { balanceTypePath } = useCheckPath()
  const { showDialog } = useDialog()

  const getPartnerByType = (type: 'INTERNAL' | 'EXTERNAL') => {
    return type === 'INTERNAL' ? getBranchList : getPartnerList
  }

  const type = watch('type')
  const paramPartner = () => {
    return type === 'INTERNAL'
      ? {
          activated: true,
          isDefaultCompany: true,
          page: 0,
          size: 20,
          branchNowId: idBranch ?? companyId,
        }
      : balanceTypePath === 'CUSTOMER'
      ? { isCustomer: true }
      : {
          isVendor: true,
        }
  }
  return (
    <PageWithDetail
      title={
        <div className='flex justify-between w-full'>
          <CoreBreadcrumbs
            isShowDashboard
            breadcrumbs={[
              {
                title:
                  balanceTypePath === 'CUSTOMER'
                    ? t('title_customer')
                    : t('title_provider'),
                pathname: MENU_URL.BALANCE[balanceTypePath],
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
        </div>
      }
      topAction={
        !router.asPath.includes('/addNew') && (
          <TopAction
            actionList={['edit', 'delete']}
            onEditAction={async () => {
              if (isUpdate) {
                const { data } = await postCheckMappingBalance({
                  id,
                })
                if (data && data.isHaveMatching) {
                  showDialog(
                    <DialogCfEditBalance
                      id={id}
                      refetch={() => {
                        router.replace({
                          pathname: `${MENU_URL.BALANCE[balanceTypePath]}/[id]`,
                          query: {
                            id,
                          },
                        })
                      }}
                    />
                  )
                } else {
                  router.replace({
                    pathname: `${MENU_URL.BALANCE[balanceTypePath]}/[id]`,
                    query: {
                      id,
                    },
                  })
                }
              }
            }}
            onDeleteAction={() => {
              showDialog(
                <DialogDeleteBalance
                  id={id}
                  beginType={
                    balanceTypePath === 'CUSTOMER' ? 'CUSTOMER' : 'VENDOR'
                  }
                  refetch={() => {
                    backToListUI(router.pathname, router)
                  }}
                />
              )
            }}
          />
        )
      }
    >
      <form
        className='block bg-[#ffffff] mt-10 rounded-xl mx-auto'
        onSubmit={onSubmit}
      >
        <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <CoreAutoCompleteAPI
              control={control}
              name='account'
              label='Số tài khoản'
              placeholder='Chọn số tài khoản'
              fetchDataFn={getAccountList}
              readOnly
            />
          </Grid>
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
            <CoreAutocomplete
              label='Loại đối tác'
              placeholder='Chọn loại đối tác'
              control={control}
              name='type'
              options={balanceType}
              required
              disableClearable
              onChangeValue={async (val) => {
                getPartnerByType(val)
                setValue('partner', null)
                const configData = await getAccountConfig()
                if (configData && configData.data && balanceTypePath) {
                  if (balanceTypePath === 'CUSTOMER') {
                    if (watch('type') === 'EXTERNAL') {
                      setValue('account', {
                        ...configData.data.receivableAccount,
                        name:
                          configData.data?.receivableAccount?.code +
                          ' - ' +
                          configData.data?.receivableAccount?.name,
                      } as any)
                    } else {
                      setValue('account', {
                        ...configData.data.receivableInternalAccount,
                        name:
                          configData.data?.receivableInternalAccount?.code +
                          ' - ' +
                          configData.data?.receivableInternalAccount?.name,
                      } as any)
                    }
                  } else {
                    watch('type') === 'EXTERNAL'
                      ? setValue('account', {
                          ...configData.data.payableAccount,
                          name:
                            configData.data?.payableAccount?.code +
                            ' - ' +
                            configData.data?.payableAccount?.name,
                        } as any)
                      : setValue('account', {
                          ...configData.data.payableInternalAccount,
                          name:
                            configData.data?.payableInternalAccount?.code +
                            ' - ' +
                            configData.data?.payableInternalAccount?.name,
                        } as any)
                  }
                }
              }}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6}>
            <CoreAutoCompleteAPI
              control={control}
              name='partner'
              label={'Đối tác'}
              labelPath2='code'
              placeholder={
                balanceTypePath === 'CUSTOMER' ? 'Chọn đối tác' : 'Chọn đối tác'
              }
              fetchDataFn={getPartnerByType(type)}
              params={{
                ...paramPartner(),
              }}
              required
              rules={{
                required: t('common:validation.required'),
              }}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6}>
            <CoreInput
              control={control}
              name='amountSourceDebit'
              label='Dư nợ'
              type='number'
              placeholder='Nhập số dư nợ'
              rules={{
                required: t('common:validation.required'),
                validate: (val: number) => {
                  if (val === 0 && watch('amountSourceCredit') === 0)
                    return 'Dư nợ hoặc dư có phải khác 0.'
                  else if (val !== 0 && watch('amountSourceCredit') !== 0)
                    return 'Dư nợ hoặc dư có phải bằng 0.'
                },
              }}
              onAfterChangeValue={() => trigger('amountSourceCredit')}
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
                  validate: (val: number) => {
                    if (val === 0 && watch('credit') === 0)
                      return 'Dư nợ gốc hoặc dư có gốc phải khác 0.'
                    else if (val !== 0 && watch('credit') !== 0)
                      return 'Dư nợ gốc hoặc dư có gốc phải bằng 0.'
                  },
                }}
                required
                onAfterChangeValue={() => trigger('amountSourceCredit')}
              />
            </Grid>
          )}

          <Grid item xs={12} sm={12} md={6} lg={6}>
            <CoreInput
              control={control}
              name='amountSourceCredit'
              label='Dư có'
              type='number'
              placeholder='Nhập số dư có'
              rules={{
                required: t('common:validation.required'),
                validate: (val: number) => {
                  if (val === 0 && watch('amountSourceDebit') === 0)
                    return 'Dư nợ hoặc dư có phải khác 0.'
                  else if (val !== 0 && watch('amountSourceDebit') !== 0)
                    return 'Dư nợ hoặc dư có phải bằng 0.'
                },
              }}
              onAfterChangeValue={() => trigger('amountSourceDebit')}
              required
            />
          </Grid>

          {watch('currencySource')?.id !== currencyId && (
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <CoreInput
                control={control}
                name='credit'
                type='number'
                label='Dư có gốc'
                placeholder='Nhập số dư có gốc'
                rules={{
                  required: t('common:validation.required'),
                  validate: (val: number) => {
                    if (val === 0 && watch('debit') === 0)
                      return 'Dư nợ gốc hoặc dư có gốc phải khác 0.'
                    else if (val !== 0 && watch('debit') !== 0)
                      return 'Dư nợ gốc hoặc dư có gốc phải bằng 0.'
                  },
                }}
                required
                onAfterChangeValue={() => trigger('debit')}
              />
            </Grid>
          )}
        </Grid>

        {actionType !== 'VIEW' && (
          <div className='space-x-12 text-center mt-15'>
            <CoreButton theme='cancel' onClick={onCancel}>
              {t('common:btn.cancel')}
            </CoreButton>
            <CoreButton theme='submit' type='submit' loading={isLoadingSubmit}>
              {isUpdate ? t('common:btn.save_change') : t('common:btn.add')}
            </CoreButton>
          </div>
        )}
      </form>
    </PageWithDetail>
  )
}

export default SaveCOPDebtBalance
