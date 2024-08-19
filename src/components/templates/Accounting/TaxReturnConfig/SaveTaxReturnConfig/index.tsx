import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreInput from '@/components/atoms/CoreInput'
import { TopAction } from '@/components/molecules/TopAction'
import CoreNavbar from '@/components/organism/CoreNavbar'
import PageContainer from '@/components/organism/PageContainer'
import { MENU_URL } from '@/routes'
import { Grid } from '@mui/material'
import { useRouter } from 'next/router'
import useSaveTaxReturnConfig from './useSaveTaxReturnConfig'
import { periodType } from '@/enum'
import CoreSwitch from '@/components/atoms/CoreSwitch'

const SaveTaxReturnConfig = () => {
  const [
    { id, control, isUpdate, isLoadingSubmit, isView, name },
    { t, onSubmit, onCancel },
  ] = useSaveTaxReturnConfig()

  const router = useRouter()
  const { actionType } = router.query

  return (
    <PageContainer
      title={
        <div className='flex justify-between items-center'>
          <CoreBreadcrumbs
            isShowDashboard
            breadcrumbs={[
              {
                title: t('title_config'),
                pathname: MENU_URL.TAX_RETURN_CONFIG,
              },
              {
                title: isUpdate ? name : t('common:btn.add'),
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
                    pathname: `${MENU_URL.TAX_RETURN_CONFIG}/[id]`,
                    query: {
                      id,
                    },
                  })
                }}
              />
            ),
            content: (
              <form
                className='block bg-[#ffffff] mt-15 rounded-xl mx-auto'
                onSubmit={onSubmit}
              >
                <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
                  <Grid item xs={12} sm={12} md={4} lg={4}>
                    <CoreInput
                      control={control}
                      name='code'
                      label='Mẫu'
                      placeholder='Nhập'
                      isViewProp={true}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={4} lg={4}>
                    <CoreInput
                      control={control}
                      name='name'
                      label='Tên'
                      placeholder='Nhập'
                      isViewProp={true}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={4} lg={4}>
                    <CoreInput
                      control={control}
                      name='circularName'
                      label='Thông tư'
                      placeholder='Nhập'
                      isViewProp={true}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={4} lg={4}>
                    <CoreAutocomplete
                      control={control}
                      label='Kỳ kê khai'
                      name='periodType'
                      placeholder='Chọn kỳ kê khai'
                      options={periodType}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <CoreSwitch control={control} name='isActive' />
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

export default SaveTaxReturnConfig
