import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreInput from '@/components/atoms/CoreInput'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { TopAction } from '@/components/molecules/TopAction'
import PageWithDetail from '@/components/organism/PageWithDetail'
import { REGEX } from '@/helper/regex'
import { MENU_URL } from '@/routes'
import { Grid } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import DialogDeleteAccountType from '../DialogDeleteAccountType'
import useSaveAccountType from './useSaveAccountType'

const SaveAccountType = () => {
  const { t } = useTranslation('accounting/account-type')
  const [values, handles] = useSaveAccountType()
  const { id, control, isUpdate, isLoadingSubmit, isView } = values
  const { onSubmit, onCancel } = handles
  const router = useRouter()
  const { actionType } = router.query
  const { showDialog } = useDialog()

  return (
    <PageWithDetail
      title={
        <div className='flex justify-between w-full'>
          <CoreBreadcrumbs
            textCurrent={
              isUpdate
                ? actionType === 'VIEW'
                  ? t('common:detail')
                  : t('common:btn.edit')
                : t('common:btn.add')
            }
            textPrev={t('title')}
          />
          {!router.asPath.includes('/addNew') && (
            <TopAction
              actionList={isView ? ['edit', 'delete'] : ['delete']}
              onEditAction={() => {
                router.replace({
                  pathname: `${MENU_URL.CONFIG.ACCOUNTING.ACCOUNT_TYPE}/[id]`,
                  query: {
                    id,
                  },
                })
              }}
              onDeleteAction={() =>
                showDialog(
                  <DialogDeleteAccountType id={id} refetch={router.back} />
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
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <CoreInput
              control={control}
              name='code'
              label='Mã loại tài khoản'
              placeholder='Nhập mã loại tài khoản'
              required
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
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <CoreInput
              control={control}
              name='name'
              label='Tên loại tài khoản'
              placeholder='Nhập tên loại tài khoản'
              inputProps={{
                maxLength: 250,
              }}
              required
              rules={{ required: t('common:validation.required') }}
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

export default SaveAccountType
