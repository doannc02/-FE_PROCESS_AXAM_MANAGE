import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreInput from '@/components/atoms/CoreInput'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { TopAction } from '@/components/molecules/TopAction'
import PageWithDetail from '@/components/organism/PageWithDetail'
import { REGEX } from '@/helper/regex'
import { MENU_URL } from '@/routes'
import { Grid, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import DialogDeleteLedger from '../DialogDeleteLedger'
import useSaveLedger from './useLedgerSave'

const SaveAccountLedger = () => {
  const { t } = useTranslation('accounting/account-ledger')
  const [values, handles] = useSaveLedger()
  const { id, control, isUpdate, isLoadingSubmit, isView } = values
  const { onSubmit, onCancel, watch } = handles
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
                pathname: MENU_URL.CONFIG.ACCOUNTING.LEDGER,
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
        !router.asPath.includes('/addNew') &&
        watch('code') !== 'SC00' && (
          <TopAction
            actionList={isView ? ['edit', 'delete'] : ['delete']}
            onEditAction={() => {
              router.replace({
                pathname: `${MENU_URL.CONFIG.ACCOUNTING.LEDGER}/[id]`,
                query: {
                  id,
                },
              })
            }}
            onDeleteAction={() =>
              showDialog(<DialogDeleteLedger id={id} refetch={router.back} />)
            }
          />
        )
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
              label='Mã sổ cái'
              placeholder='Nhập mã sổ cái'
              rules={{
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
              label='Tên sổ cái'
              placeholder='Nhập tên sổ cái'
              required
              inputProps={{
                maxLength: 250,
              }}
              rules={{ required: t('common:validation.required') }}
            />
          </Grid>
          <Grid item xs={12}>
            <CoreInput
              multiline
              control={control}
              name='description'
              label='Mô tả'
              placeholder='Mô tả'
              inputProps={{
                maxLength: 1000,
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

export default SaveAccountLedger
