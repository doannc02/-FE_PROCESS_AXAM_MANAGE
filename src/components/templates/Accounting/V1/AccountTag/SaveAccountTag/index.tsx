import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreInput from '@/components/atoms/CoreInput'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { TopAction } from '@/components/molecules/TopAction'
import CoreNavbar from '@/components/organism/CoreNavbar'
import PageContainer from '@/components/organism/PageContainer'
import { MENU_URL } from '@/routes'
import { Grid } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import DialogDeleteAccountTag from '../DialogDeleteAccountTag'
import useSaveAccountTag from './useSaveAccountTag'

const SaveAccountTag = () => {
  const { t } = useTranslation('accounting/account-tag')
  const [values, handles] = useSaveAccountTag()
  const { id, control, isUpdate, isLoadingSubmit, isView } = values
  const { onSubmit, onCancel } = handles
  const router = useRouter()
  const { actionType } = router.query
  const { showDialog } = useDialog()

  return (
    <PageContainer
      title={
        <div className='flex justify-between items-center'>
          <CoreBreadcrumbs
            isShowDashboard
            breadcrumbs={[
              {
                title: t('title'),
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
    >
      <CoreNavbar
        breadcrumbs={[
          {
            title: 'Chi tiết',
            rightAction: (
              <TopAction
                actionList={isView ? ['edit', 'delete'] : ['delete']}
                onEditAction={() => {
                  router.replace({
                    pathname: `${MENU_URL.CONFIG.ACCOUNTING.ACCOUNT_TAG}/[id]`,
                    query: {
                      id,
                    },
                  })
                }}
                onDeleteAction={() =>
                  showDialog(
                    <DialogDeleteAccountTag id={id} refetch={router.back} />
                  )
                }
              />
            ),
            content: (
              <form
                className='block bg-[#ffffff] mt-15 rounded-xl mx-auto'
                onSubmit={onSubmit}
              >
                <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <CoreInput
                      control={control}
                      name='name'
                      label='Tên thẻ'
                      placeholder='Nhập tên thẻ'
                      required
                      inputProps={{
                        maxLength: 250,
                      }}
                      rules={{ required: t('common:validation.required') }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <CoreAutocomplete
                      control={control}
                      name='applicability'
                      label='Khả năng áp dụng'
                      placeholder='Chọn khả năng áp dụng'
                      options={[
                        {
                          label: 'Accounts',
                          value: 'ACCOUNTS',
                        },
                        {
                          label: 'Taxes',
                          value: 'TAXES',
                        },
                        {
                          label: 'Products',
                          value: 'PRODUCTS',
                        },
                      ]}
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

export default SaveAccountTag
