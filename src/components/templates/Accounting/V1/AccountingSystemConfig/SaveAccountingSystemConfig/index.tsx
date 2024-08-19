import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreInput from '@/components/atoms/CoreInput'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { TopAction } from '@/components/molecules/TopAction'
import PageWithDetail from '@/components/organism/PageWithDetail'
import { REGEX } from '@/helper/regex'
import { MENU_URL } from '@/routes'
import { getAccountTypeList } from '@/service/accounting/accountType/getList'
import { Grid } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import DialogDeleteAccountSystemConfig from '../DialogDeleteAccountSystemConfig'
import useSaveAccountingSystemConfig from './useSaveAccountingSystemConfig'

const SaveAccountingSystemConfig = () => {
  const { t } = useTranslation('accounting/accounting-system-config')
  const [values, handles] = useSaveAccountingSystemConfig()
  const { id, methodForm, isUpdate, isLoadingSubmit, isView, code } = values
  const { control, setValue } = methodForm
  const { onSubmit, onCancel } = handles
  const router = useRouter()
  const { actionType } = router.query
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
                    ? code
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
              actionList={isView ? ['edit', 'delete'] : ['delete']}
              onEditAction={() => {
                router.replace({
                  pathname: `${MENU_URL.CONFIG.ACCOUNTING.SYSTEM}/[id]`,
                  query: {
                    id,
                  },
                })
              }}
              onDeleteAction={() =>
                showDialog(
                  <DialogDeleteAccountSystemConfig
                    id={Number(id)}
                    refetch={router.back}
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
              required
              label='Mã'
              placeholder='Nhập mã'
              rules={{
                required: t('common:validation.alias'),
                validate: {
                  isCode: (v: string) =>
                    REGEX.CODE.test(v) || t('common:validation.alias'),
                },
              }}
              inputProps={{ maxLength: 50 }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <CoreInput
              control={control}
              name='name'
              required
              label='Tên tài khoản'
              placeholder='Nhập tên tài khoản'
              inputProps={{
                maxLength: 250,
              }}
              rules={{ required: t('common:validation.required') }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <CoreAutoCompleteAPI
              name='accountType'
              control={control}
              label='Kiểu'
              placeholder='Type'
              fetchDataFn={getAccountTypeList}
              onChangeValue={(val) => {
                if (val === 'ASSET_CASH') {
                  setValue('isAllowedReconcile', false)
                }
              }}
            />
          </Grid>
        </Grid>

        {actionType !== 'VIEW' && (
          <div className='space-x-12 text-center mt-10'>
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

export default SaveAccountingSystemConfig
