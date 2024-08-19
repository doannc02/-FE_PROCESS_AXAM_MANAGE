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
import { useRouter } from 'next/router'
import useSaveTHCP from './useSaveTHCP'
import { subjectType } from '@/enum'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { PageResponse } from '@/service/type'
import { CoreTable } from '@/components/organism/CoreTable'
import { getProcessProduct } from '@/service/manufactory/productProcess/getList'

const SaveTHCP = () => {
  const [
    {
      id,
      name,
      isUpdate,
      isLoadingSubmit,
      isView,
      methodForm,
      columns,
      tableData,
    },
    { t, onSubmit, onCancel },
  ] = useSaveTHCP()

  const { control, watch } = methodForm

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
                pathname: MENU_URL.COST.THCP,
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
                    pathname: `${MENU_URL.COST.THCP}/[id]`,
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
                    <CoreAutocomplete
                      control={control}
                      name='subjectType'
                      label={'Phương pháp tính giá'}
                      options={subjectType}
                      isViewProp={isUpdate}
                    ></CoreAutocomplete>
                  </Grid>

                  {watch('subjectType') === 'STEP_STOOL_PRODUCTION' && (
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <CoreAutoCompleteAPI
                        control={control}
                        name='process'
                        label='Quy trình'
                        placeholder='Chọn quy trình sản xuất'
                        fetchDataFn={getProcessProduct}
                        params={{
                          isActive: true,
                          state: 'PUBLIC',
                        }}
                      />
                    </Grid>
                  )}
                </Grid>

                <div>
                  <CoreTable
                    className='mt-15'
                    // tableName='save-thcp'
                    data={tableData}
                    columns={columns}
                    isShowColumnStt
                  />
                </div>

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

export default SaveTHCP
