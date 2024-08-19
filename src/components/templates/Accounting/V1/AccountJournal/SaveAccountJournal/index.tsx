import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreInput from '@/components/atoms/CoreInput'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { TopAction } from '@/components/molecules/TopAction'
import PageWithDetail from '@/components/organism/PageWithDetail'
import { accountJournalType } from '@/enum'
import { REGEX } from '@/helper/regex'
import { MENU_URL } from '@/routes'
import { getAccountList } from '@/service/accounting/account/getList'
import { Grid } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import DialogDeleteAccountJournal from '../DialogDeleteAccountJournal'
import useSaveAccountJournal from './useSaveAccountJournal'

const SaveAccountJournal = () => {
  const { t } = useTranslation('accounting/account-journal')
  const [values, handles] = useSaveAccountJournal()
  const router = useRouter()
  const { actionType } = router.query
  const {
    isUpdate,
    id,
    isLoadingSubmit,
    methodForm,
    isLoadingCurrencySelect,
    currencySelect,
  } = values

  const { watch, control } = methodForm
  const { onSubmit, onCancel } = handles
  const { showDialog } = useDialog()

  return (
    <PageWithDetail
      title={
        <div className='flex justify-between w-full'>
          <CoreBreadcrumbs
            isShowDashboard
            breadcrumbs={[
              {
                title: t('title'),
                pathname: `${MENU_URL.CONFIG.ACCOUNTING.ACCOUNT_JOURNAL}`,
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
        <div className='bg-white flex justify-between w-full items-center'>
          <div></div>
          {!router.asPath.includes('/addNew') && (
            <TopAction
              actionList={['edit', 'delete']}
              onEditAction={() => {
                router.replace({
                  pathname: `${MENU_URL.CONFIG.ACCOUNTING.ACCOUNT_JOURNAL}/[id]`,
                  query: {
                    id: Number(id),
                  },
                })
              }}
              onDeleteAction={() =>
                showDialog(
                  <DialogDeleteAccountJournal
                    id={id}
                    refetch={() => {
                      router.push({
                        pathname: MENU_URL.CONFIG.ACCOUNTING.ACCOUNT_JOURNAL,
                      })
                    }}
                  />
                )
              }
            />
          )}
        </div>
      }
    >
      <form
        className='block bg-[#ffffff] mt-15 rounded-xl mx-auto'
        onSubmit={onSubmit}
      >
        <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <CoreInput
              control={control}
              name='code'
              label='Mã sổ kế toán'
              placeholder='Nhập mã sổ kế toán'
              rules={{
                validate: {
                  isCode: (v: string) =>
                    REGEX.CODE.test(v) || t('common:validation.alias'),
                },
              }}
              inputProps={{ maxLength: 50 }}
              required
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <CoreInput
              control={control}
              name='name'
              label='Tên sổ kế toán'
              placeholder='Nhập tên sổ kế toán'
              inputProps={{
                maxLength: 250,
              }}
              rules={{
                required: t('common:validation.required'),
              }}
              required
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4} lg={4}>
            <CoreAutocomplete
              control={control}
              name='type'
              label='Kiểu'
              placeholder='Chọn kiểu sổ kế toán'
              options={accountJournalType}
              rules={{
                required: t('common:validation.required'),
              }}
              required
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4} lg={4}>
            <CoreAutocomplete
              control={control}
              name='currencyId'
              label='Tiền tệ'
              placeholder='Chọn tiền tệ'
              valuePath='id'
              labelPath='name'
              loading={isLoadingCurrencySelect}
              options={currencySelect}
              rules={{
                required: t('common:validation.required'),
              }}
              required
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4} lg={4}>
            <CoreAutoCompleteAPI
              control={control}
              name='defaultAccount'
              label='Tài khoản mặc định'
              placeholder='Chọn tài khoản mặc định'
              valuePath='id'
              labelPath='name'
              labelPath2='code'
              fetchDataFn={getAccountList}
              rules={{
                required: t('common:validation.required'),
              }}
              required
            />
          </Grid>
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

export default SaveAccountJournal
